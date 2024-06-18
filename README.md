# About

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). It's based on [Expo's _Getting started_ guide](https://docs.expo.dev/get-started/introduction/).

I've added an extra screen to the app to experiment with maps and geolocation.

## Getting started

- `npm install`
- `npx expo start`

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Further info

This demo attemps to add a map using `react-native-maps`. However, trying to support maps for the web platform, I ran into the following issue: https://github.com/react-native-maps/react-native-maps/issues/4641

A suggested fix is [to use `react-native-web-maps` for the web platform maps](https://teovillanueva.github.io/react-native-web-maps/), but I didn't have much success in the time available.

For now, on web you'll see a "maps not available" message.
