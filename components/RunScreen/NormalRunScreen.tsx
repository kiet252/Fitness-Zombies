import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, {
  LatLng,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";

import {
  createRun,
  RunRoutePoint,
} from "@/services/run.service";

type RunStatus = "running" | "paused" | "finished";
type LocationSubscription = Location.LocationSubscription;

const MIN_SEGMENT_DISTANCE_METERS = 2;
const MAX_SEGMENT_DISTANCE_METERS = 100;
const MAX_REASONABLE_SPEED_KMH = 50;

const DARK_MAP_STYLE = [
  {
    elementType: "geometry",
    stylers: [{ color: "#0E1923" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#768898" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#0E1923" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#1D3545" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#101F29" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#162A38" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#0C161E" }],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#1D3948" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#162833" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#08131A" }],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

function calculateDistanceMeters(
  first: LatLng,
  second: LatLng,
): number {
  const earthRadiusMeters = 6_371_000;

  const latitude1 = (first.latitude * Math.PI) / 180;
  const latitude2 = (second.latitude * Math.PI) / 180;

  const latitudeDifference =
    ((second.latitude - first.latitude) * Math.PI) / 180;

  const longitudeDifference =
    ((second.longitude - first.longitude) * Math.PI) / 180;

  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(longitudeDifference / 2) ** 2;

  const angularDistance =
    2 *
    Math.atan2(
      Math.sqrt(haversine),
      Math.sqrt(1 - haversine),
    );

  return earthRadiusMeters * angularDistance;
}

function calculateSpeedKmh(
  location: Location.LocationObject,
  previousPoint: RunRoutePoint,
  nextPoint: RunRoutePoint,
  segmentDistanceMeters: number,
): number {
  const gpsSpeedKmh =
    location.coords.speed != null &&
    location.coords.speed >= 0
      ? location.coords.speed * 3.6
      : null;

  const previousTimestamp = new Date(
    previousPoint.timestamp,
  ).getTime();

  const nextTimestamp = new Date(nextPoint.timestamp).getTime();

  const elapsedSeconds =
    (nextTimestamp - previousTimestamp) / 1000;

  const calculatedSpeedKmh =
    elapsedSeconds > 0
      ? (segmentDistanceMeters / elapsedSeconds) * 3.6
      : 0;

  let speed =
    gpsSpeedKmh != null && gpsSpeedKmh >= 0.5
      ? gpsSpeedKmh
      : calculatedSpeedKmh;

  if (
    !Number.isFinite(speed) ||
    speed < 0 ||
    speed > MAX_REASONABLE_SPEED_KMH
  ) {
    speed = 0;
  }

  return speed;
}

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(
    (totalSeconds % 3600) / 60,
  );
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function formatPace(
  elapsedSeconds: number,
  distanceKilometers: number,
): string {
  if (distanceKilometers <= 0.01) {
    return "--'--\"";
  }

  const secondsPerKilometer =
    elapsedSeconds / distanceKilometers;

  const paceMinutes = Math.floor(
    secondsPerKilometer / 60,
  );

  const paceSeconds = Math.floor(
    secondsPerKilometer % 60,
  );

  return `${paceMinutes}'${paceSeconds
    .toString()
    .padStart(2, "0")}"`;
}

export default function NormalRunScreen() {
  const mapRef = useRef<MapView>(null);

  const locationSubscriptionRef =
    useRef<LocationSubscription | null>(null);

  const lastAcceptedPointRef =
    useRef<RunRoutePoint | null>(null);

  const runStartTimeRef = useRef(new Date());
  const isFinishingRef = useRef(false);
  const runStatusRef = useRef<RunStatus>("running");
  const isMapFollowingRef = useRef(true);
  const bestSpeedKmhRef = useRef(0);

  const [permissionGranted, setPermissionGranted] =
    useState<boolean | null>(null);

  const [currentLocation, setCurrentLocation] =
    useState<RunRoutePoint | null>(null);

  const [routeCoordinates, setRouteCoordinates] =
    useState<RunRoutePoint[]>([]);

  const [distanceMeters, setDistanceMeters] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [currentSpeedKmh, setCurrentSpeedKmh] =
    useState(0);

  const [bestSpeedKmh, setBestSpeedKmh] = useState(0);

  const [runStatus, setRunStatus] =
    useState<RunStatus>("running");

  const [isMapFollowing, setIsMapFollowing] =
    useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const distanceKilometers = distanceMeters / 1000;

  const estimatedCalories = useMemo(() => {
    return Math.floor(distanceKilometers * 65);
  }, [distanceKilometers]);

  const pace = useMemo(
    () => formatPace(elapsedSeconds, distanceKilometers),
    [elapsedSeconds, distanceKilometers],
  );

  useEffect(() => {
    requestLocationAndStartTracking();

    return () => {
      locationSubscriptionRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (runStatus !== "running") {
      return;
    }

    const timer = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [runStatus]);

  useEffect(() => {
    runStatusRef.current = runStatus;
  }, [runStatus]);

  useEffect(() => {
    isMapFollowingRef.current = isMapFollowing;
  }, [isMapFollowing]);

  async function requestLocationAndStartTracking() {
    try {
      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (
        permission.status !==
        Location.PermissionStatus.GRANTED
      ) {
        setPermissionGranted(false);

        Alert.alert(
          "Location permission required",
          "Zombie Runner needs your location to track your route.",
        );

        return;
      }

      setPermissionGranted(true);

      const initialPosition =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      const initialCoordinate: RunRoutePoint = {
        latitude: initialPosition.coords.latitude,
        longitude: initialPosition.coords.longitude,
        timestamp: new Date(
          initialPosition.timestamp,
        ).toISOString(),
      };

      setCurrentLocation(initialCoordinate);
      setRouteCoordinates([initialCoordinate]);

      lastAcceptedPointRef.current = initialCoordinate;

      moveMapToLocation(initialCoordinate, false);

      locationSubscriptionRef.current =
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 3,
          },
          handleLocationUpdate,
        );
    } catch (error) {
      console.error(
        "Could not start location tracking:",
        error,
      );

      setPermissionGranted(false);

      Alert.alert(
        "GPS error",
        "Your current location could not be detected.",
      );
    }
  }

  function handleLocationUpdate(
    location: Location.LocationObject,
  ) {
    const nextCoordinate: RunRoutePoint = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: new Date(
        location.timestamp,
      ).toISOString(),
    };

    setCurrentLocation(nextCoordinate);

    if (runStatusRef.current !== "running") {
      setCurrentSpeedKmh(0);
      return;
    }

    const previousCoordinate =
      lastAcceptedPointRef.current;

    if (!previousCoordinate) {
      lastAcceptedPointRef.current = nextCoordinate;

      setRouteCoordinates((previous) => [
        ...previous,
        nextCoordinate,
      ]);

      return;
    }

    const segmentDistance = calculateDistanceMeters(
      previousCoordinate,
      nextCoordinate,
    );

    if (
      segmentDistance < MIN_SEGMENT_DISTANCE_METERS ||
      segmentDistance > MAX_SEGMENT_DISTANCE_METERS
    ) {
      return;
    }

    const speedKmh = calculateSpeedKmh(
      location,
      previousCoordinate,
      nextCoordinate,
      segmentDistance,
    );

    setCurrentSpeedKmh((previousSpeed) => {
      if (speedKmh === 0) {
        return 0;
      }

      if (previousSpeed === 0) {
        return speedKmh;
      }

      return previousSpeed * 0.65 + speedKmh * 0.35;
    });

    if (speedKmh > bestSpeedKmhRef.current) {
      bestSpeedKmhRef.current = speedKmh;
      setBestSpeedKmh(speedKmh);
    }

    lastAcceptedPointRef.current = nextCoordinate;

    setDistanceMeters(
      (previousDistance) =>
        previousDistance + segmentDistance,
    );

    setRouteCoordinates((previousCoordinates) => [
      ...previousCoordinates,
      nextCoordinate,
    ]);

    if (isMapFollowingRef.current) {
      moveMapToLocation(nextCoordinate, true);
    }
  }

  function moveMapToLocation(
    coordinate: LatLng,
    animated = true,
  ) {
    mapRef.current?.animateCamera(
      {
        center: coordinate,
        pitch: 0,
        heading: 0,
        altitude: 700,
        zoom: 17,
      },
      {
        duration: animated ? 500 : 0,
      },
    );
  }

  function handlePauseResume() {
    setRunStatus((previousStatus) => {
      if (previousStatus === "running") {
        setCurrentSpeedKmh(0);
        return "paused";
      }

      if (currentLocation) {
        lastAcceptedPointRef.current = currentLocation;
      }

      return "running";
    });
  }

  function handleRecenter() {
    if (!currentLocation) {
      return;
    }

    setIsMapFollowing(true);
    moveMapToLocation(currentLocation);
  }

  function handleFinish() {
    setRunStatus("paused");
    setCurrentSpeedKmh(0);

    Alert.alert(
      "Finish run?",
      `Distance: ${distanceKilometers.toFixed(
        2,
      )} km\nTime: ${formatDuration(
        elapsedSeconds,
      )}\nBest speed: ${bestSpeedKmh.toFixed(1)} km/h`,
      [
        {
          text: "Continue",
          style: "cancel",
          onPress: () => {
            if (currentLocation) {
              lastAcceptedPointRef.current =
                currentLocation;
            }

            setRunStatus("running");
          },
        },
        {
          text: "Finish",
          style: "destructive",
          onPress: finishRun,
        },
      ],
    );
  }

  async function finishRun() {
    if (isFinishingRef.current) {
      return;
    }

    isFinishingRef.current = true;
    setIsSaving(true);

    locationSubscriptionRef.current?.remove();
    locationSubscriptionRef.current = null;

    try {
      await createRun({
        type: "normal",
        startTime: runStartTimeRef.current.toISOString(),
        endTime: new Date().toISOString(),
        distanceMeters: Math.round(distanceMeters),
        durationSeconds: elapsedSeconds,
        caloriesBurned: estimatedCalories,
        bestSpeedKmh: Number(
          bestSpeedKmhRef.current.toFixed(2),
        ),
        routeData: {
          points: routeCoordinates,
        },
      });

      setRunStatus("finished");

      Alert.alert(
        "Run saved",
        `You completed ${distanceKilometers.toFixed(
          2,
        )} km.\nBest speed: ${bestSpeedKmhRef.current.toFixed(
          1,
        )} km/h`,
        [
          {
            text: "Done",
            onPress: () => router.back(),
          },
        ],
      );
    } catch (error: any) {
      console.error(
        "Failed to save run:",
        error?.response?.data ?? error,
      );

      isFinishingRef.current = false;
      setRunStatus("paused");

      Alert.alert(
        "Could not save run",
        error?.response?.data?.message ??
          error?.message ??
          "Please check your connection and try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  const initialRegion: Region = {
    latitude: currentLocation?.latitude ?? 10.8231,
    longitude: currentLocation?.longitude ?? 106.6297,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  };

  if (
    permissionGranted === null ||
    !currentLocation
  ) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" />

        <ActivityIndicator
          size="large"
          color="#3DDC84"
        />

        <Text style={styles.loadingText}>
          Connecting to GPS...
        </Text>
      </View>
    );
  }

  if (!permissionGranted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <StatusBar barStyle="light-content" />

        <Ionicons
          name="location-outline"
          size={60}
          color="#FF4D4F"
        />

        <Text style={styles.permissionTitle}>
          Location permission required
        </Text>

        <Text style={styles.permissionDescription}>
          Enable location access so Zombie Runner can
          track your live route.
        </Text>

        <Pressable
          style={styles.permissionButton}
          onPress={requestLocationAndStartTracking}
        >
          <Text style={styles.permissionButtonText}>
            Try again
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={
          Platform.OS === "android"
            ? PROVIDER_GOOGLE
            : undefined
        }
        initialRegion={initialRegion}
        customMapStyle={DARK_MAP_STYLE}
        showsUserLocation
        showsMyLocationButton
        showsCompass={false}
        showsScale={false}
        showsBuildings
        rotateEnabled
        pitchEnabled={false}
        onPanDrag={() => setIsMapFollowing(false)}
      >
        {routeCoordinates.length >= 2 && (
          <>
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="rgba(61, 220, 132, 0.22)"
              strokeWidth={12}
              lineCap="round"
              lineJoin="round"
            />

            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#3DDC84"
              strokeWidth={6}
              lineCap="round"
              lineJoin="round"
            />
          </>
        )}

        <Marker
          coordinate={currentLocation}
          anchor={{ x: 0.5, y: 0.5 }}
          tracksViewChanges={false}
        >
          <View style={styles.locationMarkerOuter}>
            <View style={styles.locationMarkerMiddle}>
              <View style={styles.locationMarkerInner} />
            </View>
          </View>
        </Marker>
      </MapView>

      <SafeAreaView
        pointerEvents="box-none"
        style={styles.overlay}
      >
        <View style={styles.topBar}>
          <Pressable
            style={styles.circleButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color="#FFFFFF"
            />
          </Pressable>

          <View style={styles.gpsBadge}>
            <View style={styles.gpsDot} />
            <Text style={styles.gpsText}>
              GPS LOCKED
            </Text>
          </View>

          <Pressable
            style={styles.circleButton}
            onPress={handleRecenter}
          >
            <Ionicons
              name="navigate-outline"
              size={21}
              color="#CFD8E1"
            />
          </Pressable>
        </View>

        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>
            {distanceKilometers.toFixed(2)}
          </Text>

          <Text style={styles.distanceLabel}>
            KILOMETERS
          </Text>

          {runStatus === "paused" && (
            <View style={styles.pausedBadge}>
              <Text style={styles.pausedBadgeText}>
                RUN PAUSED
              </Text>
            </View>
          )}
        </View>

        {!isMapFollowing && (
          <Pressable
            style={styles.recenterButton}
            onPress={handleRecenter}
          >
            <Ionicons
              name="locate"
              size={20}
              color="#101418"
            />

            <Text style={styles.recenterText}>
              Recenter
            </Text>
          </Pressable>
        )}

        <View style={styles.bottomPanel}>
          <View style={styles.statsRow}>
            <StatItem
              icon={
                <MaterialCommunityIcons
                  name="timer-outline"
                  size={19}
                  color="#B0B7C3"
                />
              }
              value={formatDuration(elapsedSeconds)}
              label="TIME"
            />

            <StatItem
              icon={
                <MaterialCommunityIcons
                  name="speedometer"
                  size={19}
                  color="#B0B7C3"
                />
              }
              value={currentSpeedKmh.toFixed(1)}
              label="KM/H"
            />

            <StatItem
              icon={
                <MaterialCommunityIcons
                  name="run-fast"
                  size={19}
                  color="#B0B7C3"
                />
              }
              value={pace}
              label="PACE / KM"
            />

            <StatItem
              icon={
                <MaterialCommunityIcons
                  name="fire"
                  size={19}
                  color="#B0B7C3"
                />
              }
              value={estimatedCalories.toString()}
              label="KCAL"
            />
          </View>

          <Text style={styles.bestSpeedText}>
            Best speed: {bestSpeedKmh.toFixed(1)} km/h
          </Text>

          <View style={styles.actionsRow}>
            <Pressable
              disabled={isSaving}
              style={({ pressed }) => [
                styles.actionButton,
                styles.pauseButton,
                pressed && styles.pressedButton,
                isSaving && styles.disabledButton,
              ]}
              onPress={handlePauseResume}
            >
              <Ionicons
                name={
                  runStatus === "running"
                    ? "pause"
                    : "play"
                }
                size={20}
                color="#FFA940"
              />

              <Text style={styles.pauseButtonText}>
                {runStatus === "running"
                  ? "Pause"
                  : "Resume"}
              </Text>
            </Pressable>

            <Pressable
              disabled={isSaving}
              style={({ pressed }) => [
                styles.actionButton,
                styles.finishButton,
                pressed && styles.pressedButton,
                isSaving && styles.disabledButton,
              ]}
              onPress={handleFinish}
            >
              {isSaving ? (
                <ActivityIndicator
                  size="small"
                  color="#FF4D4F"
                />
              ) : (
                <Ionicons
                  name="stop-outline"
                  size={21}
                  color="#FF4D4F"
                />
              )}

              <Text style={styles.finishButtonText}>
                {isSaving ? "Saving..." : "Finish"}
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

type StatItemProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

function StatItem({
  icon,
  value,
  label,
}: StatItemProps) {
  return (
    <View style={styles.statItem}>
      {icon}

      <Text
        style={styles.statValue}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>

      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#081016",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#081016",
  },
  loadingText: {
    marginTop: 16,
    color: "#B0B7C3",
    fontSize: 14,
    fontWeight: "600",
  },
  permissionContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#081016",
  },
  permissionTitle: {
    marginTop: 20,
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  permissionDescription: {
    marginTop: 10,
    color: "#B0B7C3",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  permissionButton: {
    marginTop: 26,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#3DDC84",
  },
  permissionButtonText: {
    color: "#07110B",
    fontWeight: "800",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },
  topBar: {
    marginTop: Platform.OS === "android" ? 20 : 4,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circleButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "rgba(7, 14, 20, 0.90)",
  },
  gpsBadge: {
    minHeight: 34,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(61,220,132,0.10)",
    backgroundColor: "rgba(7, 14, 20, 0.90)",
  },
  gpsDot: {
    width: 8,
    height: 8,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: "#3DDC84",
    shadowColor: "#3DDC84",
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  gpsText: {
    color: "#3DDC84",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  distanceContainer: {
    position: "absolute",
    top: "35%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  distanceText: {
    color: "#FFFFFF",
    fontSize: 64,
    fontWeight: "900",
    letterSpacing: -3,
    textShadowColor: "rgba(0, 0, 0, 0.65)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 8,
  },
  distanceLabel: {
    marginTop: -5,
    color: "#3DDC84",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2.2,
  },
  pausedBadge: {
    marginTop: 14,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFA940",
    backgroundColor: "rgba(20, 17, 10, 0.92)",
  },
  pausedBadgeText: {
    color: "#FFA940",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  recenterButton: {
    position: "absolute",
    right: 20,
    bottom: 205,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderRadius: 20,
    backgroundColor: "#3DDC84",
  },
  recenterText: {
    color: "#101418",
    fontSize: 12,
    fontWeight: "800",
  },
  bottomPanel: {
    marginHorizontal: 18,
    marginBottom: Platform.OS === "android" ? 14 : 4,
    paddingTop: 17,
    paddingHorizontal: 15,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "#24303A",
    borderRadius: 24,
    backgroundColor: "rgba(7, 13, 18, 0.97)",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  statItem: {
    width: "24%",
    alignItems: "center",
  },
  statValue: {
    width: "100%",
    marginTop: 4,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },
  statLabel: {
    marginTop: 6,
    color: "#8B96A2",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 1.1,
  },
  bestSpeedText: {
    marginTop: 13,
    color: "#3DDC84",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
  actionsRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 16,
    borderWidth: 1,
  },
  pauseButton: {
    borderColor: "rgba(255,169,64,0.52)",
    backgroundColor: "rgba(255,169,64,0.12)",
  },
  finishButton: {
    borderColor: "rgba(255,77,79,0.58)",
    backgroundColor: "rgba(255,77,79,0.13)",
  },
  pauseButtonText: {
    color: "#FFA940",
    fontSize: 14,
    fontWeight: "800",
  },
  finishButtonText: {
    color: "#FF4D4F",
    fontSize: 14,
    fontWeight: "800",
  },
  pressedButton: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  locationMarkerOuter: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(61, 220, 132, 0.18)",
  },
  locationMarkerMiddle: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "rgba(61, 220, 132, 0.55)",
  },
  locationMarkerInner: {
    width: 13,
    height: 13,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 7,
    backgroundColor: "#3DDC84",
  },
  disabledButton: {
    opacity: 0.55,
  },
});