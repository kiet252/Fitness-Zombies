import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Region } from "react-native-maps";

import useRunTracker, {
  formatDuration,
} from "./hooks/useRunTracker";

import RunMap from "./run/RunMap";
import RunTopBar from "./run/RunTopBar";
import RunDistanceDisplay from "./run/RunDistanceDisplay";
import RunStatsPanel from "./run/RunStatsPanel";
import RunControls from "./run/RunControls";

import { createRun } from "@/services/run.service";

export default function NormalRunScreen() {

  const tracker = useRunTracker();


  async function finishRun(){

    try {

      await createRun({
        type:"normal",

        startTime:
          new Date(
            Date.now() -
            tracker.elapsedSeconds * 1000
          ).toISOString(),

        endTime:
          new Date().toISOString(),

        distanceMeters:
          Math.round(tracker.distanceMeters),

        durationSeconds:
          tracker.elapsedSeconds,

        caloriesBurned:
          tracker.calories,

        bestSpeedKmh:
          Number(
            tracker.bestSpeedKmh.toFixed(2)
          ),

        routeData:{
          points:
            tracker.routeCoordinates
        }
      });


      Alert.alert(
        "Run saved",
        `You completed ${tracker.distanceKm.toFixed(2)} km`,
        [
          {
            text:"Done",
            onPress:()=>router.back()
          }
        ]
      );


    } catch(error){

      Alert.alert(
        "Error",
        "Could not save run"
      );

    }

  }



  if(
    tracker.permissionGranted === null ||
    !tracker.currentLocation
  ){

    return (
      <View style={styles.loading}>

        <ActivityIndicator
          size="large"
          color="#3DDC84"
        />

        <Text style={styles.loadingText}>
          Connecting GPS...
        </Text>

      </View>
    );
  }



  const initialRegion:Region={
    latitude:
      tracker.currentLocation.latitude,

    longitude:
      tracker.currentLocation.longitude,

    latitudeDelta:0.006,

    longitudeDelta:0.006
  };



  return (

  <View style={styles.container}>

    <RunMap

      mapRef={tracker.mapRef}

      currentLocation={
        tracker.currentLocation
      }

      routeCoordinates={
        tracker.routeCoordinates
      }

      initialRegion={
        initialRegion
      }

      routeColor="#3DDC84"

      onPanDrag={() =>
        tracker.setIsMapFollowing(false)
      }

    />


    <View style={styles.overlay}>


      <RunTopBar

        statusText="GPS LOCKED"

        color="#3DDC84"

        onBack={() =>
          router.back()
        }

        onRecenter={
          tracker.recenter
        }

      />



      <RunDistanceDisplay

        distance={
          tracker.distanceKm.toFixed(2)
        }

        unit="KILOMETERS"

      />



      <View style={styles.bottomContainer}>


        <RunStatsPanel

          stats={[
            {
              icon:
                <MaterialCommunityIcons
                  name="timer-outline"
                  size={19}
                  color="#B0B7C3"
                />,

              label:"TIME",

              value:
                formatDuration(
                  tracker.elapsedSeconds
                )
            },


            {
              icon:
                <MaterialCommunityIcons
                  name="speedometer"
                  size={19}
                  color="#B0B7C3"
                />,

              label:"KM/H",

              value:
                tracker.currentSpeedKmh
                .toFixed(1)
            },


            {
              icon:
                <MaterialCommunityIcons
                  name="run-fast"
                  size={19}
                  color="#B0B7C3"
                />,

              label:"PACE",

              value:
                tracker.pace
            },


            {
              icon:
                <MaterialCommunityIcons
                  name="fire"
                  size={19}
                  color="#B0B7C3"
                />,

              label:"KCAL",

              value:
                String(tracker.calories)
            }

          ]}

        />



        <RunControls

          text="Finish"

          onPress={
            finishRun
          }

        />


      </View>


    </View>


  </View>

  );
}



const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#081016",
},


overlay:{
  ...StyleSheet.absoluteFillObject,
  justifyContent:"space-between",
},


bottomContainer:{
  marginBottom:20,
  gap:12,
},


loading:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#081016"
},


loadingText:{
  marginTop:15,
  color:"#B0B7C3"
}

});