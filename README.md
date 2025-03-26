# Habit Tracker App

A cross-platform mobile application designed to help users establish and maintain healthy habits and routines. The app integrates with the device's calendar and uses AI-powered suggestions to optimize habit scheduling.

## Features

- Calendar Integration: Connect with Google Calendar and Apple Calendar
- Habit and Routine Definition
- AI-Powered Scheduling Suggestions
- Step-by-Step Guidance
- Progress Tracking and Analytics
- Customizable Notifications
- Beautiful and Intuitive UI

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment setup
- iOS: Xcode (for Mac users)
- Android: Android Studio and Android SDK

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/habit-tracker.git
cd habit-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (Mac users only):
```bash
cd ios
pod install
cd ..
```

4. Start the Metro bundler:
```bash
npm start
# or
yarn start
```

5. Run the app:
```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── screens/           # Main app screens
├── navigation/        # Navigation configuration
├── services/         # API and external service integrations
├── store/            # State management (Redux)
├── utils/            # Helper functions
├── types/            # TypeScript type definitions
└── constants/        # App constants
```

## Development

- The app uses TypeScript for type safety
- Redux Toolkit for state management
- React Navigation for routing
- React Native Calendar Events for calendar integration
- SQLite for local storage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Native community
- Contributors and maintainers of all used libraries 