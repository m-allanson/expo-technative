import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import MapView, { Marker } from '@/components/Map';

const doughnutsLocation = {
  latitude: 51.51543151117076,
  longitude: -0.1514631734319042,
  title: 'Doughnuts!',
  description: 'You can find doughnuts here',
};

export default function DoughnutScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState<any>({
    latitude: 51.50220369753901,
    longitude: -0.08527524770843187,
    latitudeDelta: 0.41032699647349347,
    longitudeDelta: 0.514980773876963,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([doughnutsLocation]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      let locationSubscription: Location.LocationSubscription | undefined;
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            setLocation(location);
            setMarkers([
              markers[0],
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                title: 'My simulated location',
                description: 'This is where I am',
              },
            ]);
            console.log(
              'New location update: ' + location.coords.latitude + ', ' + location.coords.longitude
            );
          }
        );
      }
      return () => locationSubscription?.remove();
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    const doughnutDistance = getDistance(
      {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
      {
        longitude: doughnutsLocation.longitude,
        latitude: doughnutsLocation.latitude,
      }
    );

    text = `You are ${doughnutDistance} meters away from doughnuts`;
  }

  return (
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Doughnut Distance</ThemedText>

        <MapView
          style={styles.map}
          region={region}
          onRegionChange={setRegion}
          showsUserLocation={true}
          pitchEnabled={false}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>

        <Collapsible title="Current map position">
          <ThemedText>Lat: {region.latitude}</ThemedText>
          <ThemedText>Lon: {region.longitude}</ThemedText>
          <ThemedText>LatDelta:{region.latitudeDelta}</ThemedText>
          <ThemedText>LonDelta:{region.longitudeDelta}</ThemedText>
        </Collapsible>

        <ThemedText type="default">{text}</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: 4,
    top: 24,
    paddingTop: 8,
  },
  map: {
    width: '100%',
    height: 450,
  },
});
