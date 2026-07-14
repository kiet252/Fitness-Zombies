import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import MapView, { LatLng } from "react-native-maps";

import { RunRoutePoint } from "@/services/run.service";


type RunStatus = "running" | "paused" | "finished";


const MIN_SEGMENT_DISTANCE_METERS = 5;
const MAX_SEGMENT_DISTANCE_METERS = 100;
const MAX_REASONABLE_SPEED_KMH = 50;
const MIN_RUNNING_SPEED = 1.5;


export default function useRunTracker() {

  const mapRef = useRef<MapView>(null);

  const locationSubscriptionRef =
    useRef<Location.LocationSubscription | null>(null);

  const lastAcceptedPointRef =
    useRef<RunRoutePoint | null>(null);

  const runStatusRef =
    useRef<RunStatus>("running");

  const isMapFollowingRef =
    useRef(true);

  const bestSpeedRef =
    useRef(0);


  const [permissionGranted,setPermissionGranted]
    = useState<boolean|null>(null);


  const [currentLocation,setCurrentLocation]
    = useState<RunRoutePoint|null>(null);


  const [routeCoordinates,setRouteCoordinates]
    = useState<RunRoutePoint[]>([]);


  const [distanceMeters,setDistanceMeters]
    = useState(0);


  const [elapsedSeconds,setElapsedSeconds]
    = useState(0);


  const [currentSpeedKmh,setCurrentSpeedKmh]
    = useState(0);


  const [bestSpeedKmh,setBestSpeedKmh]
    = useState(0);


  const [runStatus,setRunStatus]
    = useState<RunStatus>("running");


  const [isMapFollowing,setIsMapFollowing]
    = useState(true);



  /*
      START GPS
  */

  useEffect(()=>{

    startTracking();


    return ()=>{
      locationSubscriptionRef.current?.remove();
    };

  },[]);



  /*
      TIMER
  */

  useEffect(()=>{

    if(runStatus !== "running"){
      return;
    }


    const timer=setInterval(()=>{

      setElapsedSeconds(prev=>prev+1);

    },1000);


    return ()=>clearInterval(timer);


  },[runStatus]);



  useEffect(()=>{

    runStatusRef.current = runStatus;

  },[runStatus]);



  useEffect(()=>{

    isMapFollowingRef.current =
      isMapFollowing;

  },[isMapFollowing]);




  async function startTracking(){

    const permission =
      await Location.requestForegroundPermissionsAsync();


    if(
      permission.status !==
      Location.PermissionStatus.GRANTED
    ){
      setPermissionGranted(false);
      return;
    }


    setPermissionGranted(true);



    const position =
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });



    const firstPoint:RunRoutePoint={

      latitude:
        position.coords.latitude,

      longitude:
        position.coords.longitude,

      timestamp:
        new Date(position.timestamp)
        .toISOString()

    };


    setCurrentLocation(firstPoint);

    setRouteCoordinates([firstPoint]);

    lastAcceptedPointRef.current =
      firstPoint;



    locationSubscriptionRef.current =
      await Location.watchPositionAsync(

        {
          accuracy:Location.Accuracy.High,
          timeInterval:1000,
          distanceInterval:5,
        },

        handleLocationUpdate

      );

  }





  function handleLocationUpdate(
  location: Location.LocationObject
) {

  // Ignore inaccurate GPS readings
  if (
    location.coords.accuracy &&
    location.coords.accuracy > 20
  ) {
    return;
  }


  const nextPoint: RunRoutePoint = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    timestamp: new Date(location.timestamp).toISOString()
  };


  if(runStatusRef.current !== "running"){
    setCurrentLocation(nextPoint);
    setCurrentSpeedKmh(0);
    return;
  }


  const previous =
    lastAcceptedPointRef.current;


  if(!previous){
    setCurrentLocation(nextPoint);
    lastAcceptedPointRef.current = nextPoint;
    return;
  }


  const distance =
    calculateDistanceMeters(
      previous,
      nextPoint
    );


  // Ignore GPS noise
  if(
    distance < MIN_SEGMENT_DISTANCE_METERS ||
    distance > MAX_SEGMENT_DISTANCE_METERS
  ){
    return;
  }


  setCurrentLocation(nextPoint);


  const speed =
    calculateSpeedKmh(
      location,
      previous,
      nextPoint,
      distance
    );

    if(speed < MIN_RUNNING_SPEED){
        return;
    }


  setCurrentSpeedKmh(speed);


  if(speed > bestSpeedRef.current){
    bestSpeedRef.current = speed;
    setBestSpeedKmh(speed);
  }


  lastAcceptedPointRef.current = nextPoint;


  setDistanceMeters(prev =>
    prev + distance
  );


  setRouteCoordinates(prev => [
    ...prev,
    nextPoint
  ]);


  if(isMapFollowingRef.current){
    moveMapToLocation(nextPoint);
  }
}





  function moveMapToLocation(
    coordinate:LatLng
  ){

    mapRef.current?.animateCamera({

      center:coordinate,
      zoom:17

    });

  }




  function pauseResume(){

    setRunStatus(prev=>{

      if(prev==="running"){

        setCurrentSpeedKmh(0);

        return "paused";
      }


      if(currentLocation){

        lastAcceptedPointRef.current =
          currentLocation;

      }


      return "running";

    });

  }




  function recenter(){

    if(!currentLocation)
      return;


    setIsMapFollowing(true);


    moveMapToLocation(
      currentLocation
    );

  }




  const distanceKm =
    distanceMeters / 1000;



  const calories =
    Math.floor(distanceKm * 65);



  const pace =
    formatPace(
      elapsedSeconds,
      distanceKm
    );



  return {

    mapRef,

    permissionGranted,

    currentLocation,

    routeCoordinates,

    distanceMeters,

    distanceKm,

    elapsedSeconds,

    currentSpeedKmh,

    bestSpeedKmh,

    calories,

    pace,

    runStatus,

    setRunStatus,

    isMapFollowing,

    setIsMapFollowing,

    pauseResume,

    recenter,

  };

}






function calculateDistanceMeters(
  first:LatLng,
  second:LatLng
){

 const R=6371000;


 const lat1=
 first.latitude*Math.PI/180;

 const lat2=
 second.latitude*Math.PI/180;


 const dLat=
 (second.latitude-first.latitude)
 *Math.PI/180;


 const dLon=
 (second.longitude-first.longitude)
 *Math.PI/180;



 const a =
 Math.sin(dLat/2)**2+
 Math.cos(lat1)*
 Math.cos(lat2)*
 Math.sin(dLon/2)**2;



 return R*
 2*
 Math.atan2(
 Math.sqrt(a),
 Math.sqrt(1-a)
 );

}





function calculateSpeedKmh(
 location:Location.LocationObject,
 previous:RunRoutePoint,
 next:RunRoutePoint,
 distance:number
){

 const gps =
 location.coords.speed;


 if(gps && gps >= 1){

   return Math.min(
    gps*3.6,
    MAX_REASONABLE_SPEED_KMH
   );

 }


 const time =
 (
 new Date(next.timestamp).getTime()
 -
 new Date(previous.timestamp).getTime()
 )/1000;


 if(time<=0)
  return 0;


 return (
 distance/time
 )*3.6;

}

function formatPace(
seconds:number,
distance:number
){

 if(distance < 0.01)
   return "--'--\"";


 const pace =
 seconds/distance;


 const min =
 Math.floor(pace/60);


 const sec =
 Math.floor(pace%60);


 return `${min}'${sec
 .toString()
 .padStart(2,"0")}"`;

}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;


  if (hours > 0) {
    return `${hours
      .toString()
      .padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }


  return `${minutes
    .toString()
    .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}