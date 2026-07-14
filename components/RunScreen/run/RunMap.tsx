import { StyleSheet } from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import LocationMarker from "./LocationMarker";

type Coordinate = {
  latitude: number;
  longitude: number;
};

type Props = {
  mapRef: React.RefObject<MapView | null>;
  currentLocation: Coordinate;
  routeCoordinates: Coordinate[];
  initialRegion: Region;
  onPanDrag: () => void;
  routeColor?: string;
};

const DARK_MAP_STYLE = [
  {
    elementType: "geometry",
    stylers: [{ color: "#0E1923" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#162A38" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#08131A" }],
  },
];

export default function RunMap({
  mapRef,
  currentLocation,
  routeCoordinates,
  initialRegion,
  onPanDrag,
  routeColor = "#3DDC84",
}: Props) {
  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFillObject}
      provider={PROVIDER_GOOGLE}
      initialRegion={initialRegion}
      customMapStyle={DARK_MAP_STYLE}
      showsUserLocation
      showsCompass={false}
      showsScale={false}
      rotateEnabled
      pitchEnabled={false}
      onPanDrag={onPanDrag}
    >

      {routeCoordinates.length >= 2 && (
        <>
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={`${routeColor}55`}
            strokeWidth={12}
          />

          <Polyline
            coordinates={routeCoordinates}
            strokeColor={routeColor}
            strokeWidth={6}
          />
        </>
      )}

      <Marker
        coordinate={currentLocation}
        anchor={{
          x:0.5,
          y:0.5,
        }}
        tracksViewChanges={false}
      >
        <LocationMarker />
      </Marker>

    </MapView>
  );
}