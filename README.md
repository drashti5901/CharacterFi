# CharacterFi

A React Native app for browsing the [Rick and Morty API](https://rickandmortyapi.com). Browse characters, episodes, and locations — with offline-first favourites powered by SQLite.

---

## Features

- **Characters** — infinite scroll list with live search & filter (status/gender/species), skeleton loaders, progressive image shimmer, hide-on-scroll animated header
- **Episodes** — paginated list grouped by season, episode detail with character avatar grid
- **Locations** — paginated list with type emoji icons, location detail with resident avatar grid
- **Favourites** — fully offline, SQLite-persisted, optimistic UI with swipe-to-remove
- **Cross-tab navigation** — tap a character from Episode Detail or Location Detail to jump to the Characters stack
- **Network offline screen** — animated overlay shown automatically when the device has no internet
- **Animated hide-on-scroll header** on every list screen
- **React.lazy + Suspense** code-splitting per screen for faster initial load
- **Shared component library** — `ErrorState`, `ProgressiveImage`, `SkeletonCard`, `NoNetworkScreen` used across all features

---

## Project Setup

### Prerequisites

- Node.js ≥ 22
- Yarn 1.x (`npm install -g yarn`)
- Ruby 3.x (for CocoaPods on iOS)
- Xcode ≥ 15 (iOS) or Android Studio (Android)
- React Native CLI environment — follow the [official guide](https://reactnative.dev/docs/set-up-your-environment)

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
# reset cache if you see stale module errors
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
| `@tanstack/react-query` | ^5.99.0 | Server-state fetching, caching, infinite pagination |
| `axios` | ^1.15.0 | HTTP client for API requests |
| `@op-engineering/op-sqlite` | ^15.2.11 | SQLite persistence for favourites |
| `@shopify/flash-list` | ^2.3.1 | High-performance list (replaces FlatList) |
| `react-native-reanimated` | ^4.3.0 | Animated press effects |
| `react-native-worklets` | 0.8 | Required peer dep for Reanimated 4 |
| `react-native-screens` | ^4.24.0 | Native screen optimisation |
| `react-native-safe-area-context` | ^5.5.2 | Safe area insets |
| `@react-native-community/netinfo` | ^12.0.1 | Network connectivity detection |
| `@testing-library/react-native` | ^13.3.3 | Hook and component testing |

---

## Folder Structure

```
CharacterFi/
├── App.tsx                        # App root — QueryClient, Redux, NavigationContainer
├── index.js                       # Entry point
├── __tests__/                     # Jest test suites
│   ├── App.test.tsx
│   ├── characters.api.test.ts
│   ├── favouritesSlice.test.ts
│   └── useDebounce.test.ts
└── src/
    ├── api/                       # All HTTP + database access
    │   ├── client.ts              # Axios instance
    │   ├── characters.ts          # fetchCharacters, fetchCharacterById, fetchCharactersByIds
    │   ├── episodes.ts            # fetchEpisodes, fetchEpisodeById
    │   ├── locations.ts           # fetchLocations, fetchLocationById
    │   └── database.ts            # op-sqlite helpers (init, insert, delete, getAll)
    │
    ├── features/
    │   ├── characters/
    │   │   ├── components/
    │   │   │   ├── CharacterCard.tsx          # Character list card
    │   │   │   ├── CharacterCard.styles.ts
    │   │   │   ├── EpisodeCard.tsx            # Episode chip on character detail
    │   │   │   ├── EpisodeCard.styles.ts
    │   │   │   ├── FilterSheet.tsx            # Status / gender / species filter modal
    │   │   │   ├── FilterSheet.styles.ts
    │   │   │   ├── InfoRow.tsx                # Label + value row for detail screen
    │   │   │   └── InfoRow.styles.ts
    │   │   ├── hooks/
    │   │   │   ├── useCharacters.ts           # Infinite paginated character query
    │   │   │   └── useCharacterDetail.ts      # Single character query
    │   │   └── screens/
    │   │       ├── CharacterListScreen.tsx
    │   │       ├── CharacterListScreen.styles.ts
    │   │       ├── CharacterDetailScreen.tsx
    │   │       └── CharacterDetailScreen.styles.ts
    │   │
    │   ├── episodes/
    │   │   ├── components/
    │   │   │   ├── EpisodeCard.tsx            # Episode row for list screen
    │   │   │   ├── EpisodeCard.styles.ts      # Also contains SectionHeader + SkeletonEpisodeCard
    │   │   │   ├── EpisodeHero.tsx            # Animated hero banner on detail screen
    │   │   │   ├── EpisodeHero.styles.ts
    │   │   │   ├── CharacterAvatarGrid.tsx    # Character avatar grid on detail screen
    │   │   │   └── CharacterAvatarGrid.styles.ts
    │   │   ├── hooks/
    │   │   │   └── useEpisodes.ts             # Infinite paginated episodes query
    │   │   └── screens/
    │   │       ├── EpisodeListScreen.tsx
    │   │       ├── EpisodeListScreen.styles.ts
    │   │       ├── EpisodeDetailScreen.tsx
    │   │       └── EpisodeDetailScreen.styles.ts
    │   │
    │   ├── locations/
    │   │   ├── components/
    │   │   │   ├── LocationCard.tsx           # Location row for list screen + skeleton
    │   │   │   ├── LocationCard.styles.ts
    │   │   │   ├── LocationHero.tsx           # Hero section on detail screen
    │   │   │   ├── LocationHero.styles.ts
    │   │   │   ├── LocationInfoSection.tsx    # Type / dimension / residents info rows
    │   │   │   ├── LocationInfoSection.styles.ts
    │   │   │   ├── ResidentAvatarGrid.tsx     # Resident avatar grid on detail screen
    │   │   │   └── ResidentAvatarGrid.styles.ts
    │   │   ├── hooks/
    │   │   │   └── useLocations.ts            # Infinite paginated locations query
    │   │   ├── utils/
    │   │   │   └── locationUtils.ts           # idsFromUrls, iconForType helpers
    │   │   └── screens/
    │   │       ├── LocationListScreen.tsx
    │   │       ├── LocationListScreen.styles.ts
    │   │       ├── LocationDetailScreen.tsx
    │   │       └── LocationDetailScreen.styles.ts
    │   │
    │   └── favourites/
    │       ├── components/
    │       │   ├── FavouritesEmptyState.tsx   # Empty list placeholder
    │       │   └── FavouritesEmptyState.styles.ts
    │       └── screens/
    │           ├── FavouritesScreen.tsx
    │           └── FavouritesScreen.styles.ts
    │
    ├── navigation/
    │   ├── RootNavigator.tsx          # Bottom tabs + stack composition
    │   ├── lazyScreens.ts             # Central React.lazy imports for all screens
    │   ├── ScreenFallback.tsx         # Suspense fallback (skeleton)
    │   └── stacks/
    │       ├── CharactersNavigator.tsx    # CharacterList → CharacterDetail → EpisodeDetail
    │       ├── EpisodesNavigator.tsx      # EpisodeList → EpisodeDetail
    │       ├── LocationsNavigator.tsx     # LocationList → LocationDetail
    │       └── FavouritesNavigator.tsx    # FavouritesList → FavouriteDetail → EpisodeDetail
    │
    ├── shared/
    │   ├── components/
    │   │   ├── ErrorState.tsx             # Generic error + retry UI (used on all screens)
    │   │   ├── ErrorState.styles.ts
    │   │   ├── NoNetworkScreen.tsx        # Animated overlay when offline
    │   │   ├── ProgressiveImage.tsx       # Blur-up shimmer image loader
    │   │   ├── ProgressiveImage.styles.ts
    │   │   ├── SkeletonCard.tsx           # Generic shimmer placeholder card
    │   │   └── SkeletonCard.styles.ts
    │   ├── hooks/
    │   │   ├── useDebounce.ts             # Debounce hook for search input
    │   │   ├── useNetworkStatus.ts        # NetInfo subscription → boolean | null
    │   │   └── useScrollHeader.ts         # Animated hide-on-scroll header values
    │   ├── types/
    │   │   ├── api.ts                     # Character, Episode, Location, PaginatedResponse interfaces
    │   │   └── navigation.ts              # Stack param list types for all navigators
    │   ├── utils/
    │   │   └── theme.ts                   # Colors, FontSize, FontWeight, Spacing, BorderRadius
    │   └── queryClient.ts                 # TanStack Query client singleton
    │
    └── store/
        ├── index.ts                       # Redux store configuration
        ├── hooks.ts                       # useAppDispatch / useAppSelector
        ├── favouritesSlice.ts             # Favourites state + SQLite thunks
        └── uiSlice.ts                     # UI state (filters, search)
```

### Folder Convention

Each feature follows the same layout:

```
features/<name>/
├── components/    # Dumb presentational components + co-located styles
├── hooks/         # React Query hooks scoped to this feature
├── screens/       # Screen-level components + co-located styles
└── utils/         # Pure helper functions (no React, no side-effects)
```

Every component has a companion `*.styles.ts` file in the same directory — styles are never co-located inside `.tsx` files.

---

## Architecture Decisions

| Decision | Rationale |
|---|---|
| **Feature-first folder structure** | Each tab is a self-contained slice (`characters/`, `episodes/`, etc.). Shared code lives in `shared/`. This prevents cross-feature coupling. |
| **React Query for server state** | Handles caching, background refetch, pagination, and loading/error states without boilerplate. Redux is only used for client state (favourites list, UI filters). |
| **SQLite via op-sqlite for favourites** | Favourites must survive app restarts without internet. `op-sqlite` is a JSI-based SQLite binding with no bridge overhead. |
| **FlashList over FlatList** | Rick and Morty character lists can reach 800+ items. FlashList recycles cells at the native layer with significantly lower memory and frame-drop footprint. |
| **React.lazy + Suspense per screen** | All 7 screens are lazy-imported from `lazyScreens.ts`. This reduces the JS bundle parsed on startup. |
| **Animated hide-on-scroll header** | Built with `useScrollHeader` hook using `Animated.diffClamp` + interpolation — no Reanimated worklet needed, keeping the implementation simple. |
| **`useNetworkStatus` + `NoNetworkScreen`** | NetInfo subscription at the app root; overlay is rendered in `App.tsx` above the navigator so it blocks interaction on all tabs without unmounting them. |
| **Co-located styles** | Every component owns a sibling `*.styles.ts` — no global stylesheet, no inline StyleSheet objects in `.tsx` files. |
| **Navigation split into stack files** | `RootNavigator.tsx` only composes the bottom tabs; each tab's stack lives in `stacks/<Name>Navigator.tsx` for clear ownership. |

---

## Known Issues / Limitations

- **429 Rate Limiting** — The Rick and Morty API returns `429 Too Many Requests` when paginating quickly. A `isFetchingRef` guard prevents duplicate requests but rapid scrolls may occasionally trigger the limit. The list recovers automatically on the next scroll event.
- **SQLite first-load window** — The favourites database is initialised asynchronously on app launch. A favourite toggle fired in the first ~100 ms before the table exists is silently dropped.
- **Cross-tab navigation back stack** — Tapping a character from Episode Detail or Location Detail pushes onto the Characters stack. If the user is already deep in that stack, the existing back stack is preserved rather than reset.
- **No auto-retry on network recovery** — Detail screens show a manual Retry button for initial load failures; they do not re-fetch automatically when connectivity is restored.
- **Batch character fetch on detail screens** — Episode Detail and Location Detail fetch all resident/character IDs in a single batch request. Very large casts (50+ characters) produce one large API call rather than paginated requests.
- **Emoji tab bar icons** — No vector icon library is used. Emoji rendering varies slightly between Android and iOS versions.
- **Android NDK required for op-sqlite** — The SQLite native module requires the Android NDK to be installed and configured in Android Studio.


---
