import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  StyleSheet,
  View,
  DeviceEventEmitter,
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
import ZombieStatusCard from "./run/ZombieStatusCard";

import { createRun } from "@/services/run.service";


export default function ZombieRunScreen() {

  const tracker = useRunTracker();


  async function finishRun() {

    try {

      await createRun({

        type: "zombie",

        startTime:
          new Date(
            Date.now() -
            tracker.elapsedSeconds * 1000
          ).toISOString(),

        endTime:
          new Date().toISOString(),

        distanceMeters:
          Math.round(
            tracker.distanceMeters
          ),

        durationSeconds:
          tracker.elapsedSeconds,

        caloriesBurned:
          tracker.calories,

        bestSpeedKmh:
          Number(
            tracker.bestSpeedKmh.toFixed(2)
          ),

        routeData: {
          points:
            tracker.routeCoordinates
        }

      });

      DeviceEventEmitter.emit("run_finished");

      Alert.alert(
        "Zombie Run Complete!",
        "Run saved successfully",
        [
          {
            text: "OK",
            onPress: () => router.back()
          }
        ]
      );


    } catch(error) {

      Alert.alert(
        "Error",
        "Could not save zombie run"
      );

    }

  }



  if (
    tracker.permissionGranted === null ||
    !tracker.currentLocation
  ) {
    return null;
  }



  const initialRegion: Region = {

    latitude:
      tracker.currentLocation.latitude,

    longitude:
      tracker.currentLocation.longitude,

    latitudeDelta: 0.006,

    longitudeDelta: 0.006,

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

        routeColor="#FF4D57"

        onPanDrag={() =>
          tracker.setIsMapFollowing(false)
        }

      />



      <View style={styles.overlay}>


        <RunTopBar

          statusText="SAFE ZONE"

          color="#39E58C"

          onBack={() =>
            router.back()
          }

          onRecenter={
            tracker.recenter
          }

        />



        <ZombieStatusCard

          currentPace={
            tracker.pace
          }

          targetPace="12'00"
        />



        <RunDistanceDisplay

          distance={
            tracker.distanceKm.toFixed(2)
          }

          unit="KM"

        />



        <View style={styles.bottomContainer}>


          <RunStatsPanel

            stats={[

              {
                icon:
                  <MaterialCommunityIcons
                    name="speedometer"
                    size={19}
                    color="#B0B7C3"
                  />,

                label: "SPEED",

                value:
                  tracker.currentSpeedKmh
                  .toFixed(1)
              },


              {
                icon:
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={19}
                    color="#B0B7C3"
                  />,

                label: "TIME",

                value:
                  formatDuration(
                    tracker.elapsedSeconds
                  )
              },


              {
                icon:
                  <MaterialCommunityIcons
                    name="fire"
                    size={19}
                    color="#B0B7C3"
                  />,

                label: "KCAL",

                value:
                  String(tracker.calories)
              },


              {
                icon:
                  <MaterialCommunityIcons
                    name="heart-pulse"
                    size={19}
                    color="#B0B7C3"
                  />,

                label: "HR",

                value: "141"
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
  }

});