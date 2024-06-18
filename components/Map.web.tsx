// // @ts-expect-error exists but not exported in ts
// import MapView from '@teovilla/react-native-web-maps/dist/module/index.web';

// // @ts-expect-error
// import { Marker } from '@teovilla/react-native-web-maps/dist/module/index.web';

// export { Marker };
// export default MapView;

import { ThemedText } from './ThemedText';
const MapView = () => {
  return <ThemedText>Maps not available for web (yet)!</ThemedText>;
};

export default MapView;

export const Marker = () => {};
