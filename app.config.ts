module.exports = {
  name: "Nomad",
  slug: "digital-nomad-app",
  owner: "dadinho94",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "digitalnomadapp",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.eduardoborsa.digitalnomadapp",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#1B1B1B",
    },
    package: "com.eduardoborsa.digitalnomadapp",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#1B1B1B",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "808f0ed1-87f9-4d9f-a22f-728cdda45d23",
    },
  },
  updates: {
    url: "https://u.expo.dev/808f0ed1-87f9-4d9f-a22f-728cdda45d23",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
};
