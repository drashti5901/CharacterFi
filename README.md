# CharacterFi

A React Native app for browsing the [Rick and Morty API](https://rickandmortyapi.com). Browse characters, episodes, and locations — with offline-first favourites powered by SQLite.

---

## Features

- **Characters** — infinite scroll list with search & filter, skeleton loaders, progressive image shimmer, hide-on-scroll header
- **Episodes** — paginated list grouped by season with episode detail and character avatar grid
- **Locations** — paginated list with type emoji icons and resident avatar grid
- **Favourites** — fully offline, SQLite-persisted, optimistic UI updates
- Cross-tab navigation (e.g. tap a character from an episode detail)
- Animated hide-on-scroll header on all list screens
- React.lazy + Suspense code splitting per screen

---

## Project Setup

### Prerequisites

- Node.js ≥ 18
- Yarn 1.x (`npm install -g yarn`)
- Ruby 3.x (for CocoaPods on iOS)
- Xcode ≥ 15 (iOS) or Android Studio (Android)
- React Native environment configured — follow the [official guide](https://reactnative.dev/docs/set-up-your-environment)

### 1. Install JS dependencies

```sh
yarn install
```

### 2. Install iOS pods

```sh
cd ios && pod install && cd ..
```

### 3. Start Metro

```sh
yarn start
# or reset cache if you see stale module errors
yarn start --reset-cache
```

### 4. Run the app

```sh
# Android
yarn android

# iOS
yarn ios
```

### 5. Run tests

```sh
yarn test
```

---

## Libraries Used

| Library | Version | Purpose |
|---|---|---|
| `react-native` | 0.85.1 | Core framework (New Architecture + Hermes) |
| `react` | 19.2.3 | UI library |
| `@react-navigation/native` | ^7.2.2 | Navigation container |
| `@react-navigation/native-stack` | ^7.14.11 | Stack navigators |
| `@react-navigation/bottom-tabs` | ^7.15.9 | Bottom tab navigator |
| `@reduxjs/toolkit` | ^2.11.2 | Redux store + slices |
| `react-redux` | ^9.2.0 | React bindings for Redux |
| `@tanstack/react-query` | ^5.99.0 | Server-state fetching, caching, pagination |
| `axios` | ^1.15.0 | HTTP client for API requests |
| `@op-engineering/op-sqlite` | ^15.2.11 | SQLite persistence for favourites |
| `@shopify/flash-list` | ^2.3.1 | High-performance list (replaces FlatList) |
| `react-native-reanimated` | ^4.3.0 | Animated press effects |
| `react-native-worklets` | 0.8 | Required peer dep for Reanimated 4 |
| `react-native-screens` | ^4.24.0 | Native screen optimisation |
| `react-native-safe-area-context` | ^5.5.2 | Safe area insets |
| `@testing-library/react-native` | latest | Hook and component testing |

---

## Project Structure

```
src/
├── api/                  # Axios API functions + SQLite database service
├── features/
│   ├── characters/       # Character list, detail, hooks
│   ├── episodes/         # Episode list, detail, hooks
│   ├── locations/        # Location list, detail, hooks
│   └── favourites/       # Favourites screen (offline-first)
├── navigation/           # RootNavigator (stacks + bottom tabs)
├── shared/
│   ├── components/       # ProgressiveImage, SkeletonCard
│   ├── hooks/            # useDebounce, useScrollHeader
│   ├── types/            # API types, navigation param lists
│   └── utils/            # Theme (colours, spacing, typography)
└── store/                # Redux store, favouritesSlice, uiSlice
```

---

## Known Issues / Limitations

- **429 Rate Limiting** — The Rick and Morty API can return `429 Too Many Requests` when paginating quickly. A synchronous `isFetchingRef` guard is in place to prevent duplicate requests, but rapid repeated scrolls may still occasionally hit the limit. The list will recover automatically on the next scroll.
- **SQLite first-load** — On a fresh install the favourites database is initialised asynchronously on app launch. There is a brief window (typically <100 ms) where the table may not exist yet; any favourite toggle before initialisation completes is silently dropped.
- **Cross-tab navigation** — Tapping a character from Episode Detail or Location Detail navigates to the Characters stack. If the user is deep inside the Characters stack this will navigate to the detail but not reset the back stack.
- **No network error retry on detail screens** — Detail screens (Character, Episode, Location) show a Retry button only for initial load failures; they do not automatically retry on network recovery.
- **No pagination on detail character grids** — Episode Detail and Location Detail fetch all character IDs at once via batch API. Episodes/locations with very large casts (e.g. 50+ characters) will fire a single large batch request.
- **Tab bar icons use emoji** — Emoji rendering varies slightly between Android and iOS, and between OS versions. No vector icon library is used.
- **iOS only tested via pod install** — Android build is untested end-to-end; the SQLite native module (`op-sqlite`) requires the Android NDK to be configured correctly.

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
