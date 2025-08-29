
Cyber Habit - Capacitor-ready PWA
--------------------------------
This repository contains the web assets (PWA) for Cyber Habit plus a GitHub Actions workflow that will build an Android APK (debug) when you push to the `main` branch.

How to use locally:

1. Install Node.js and npm.
2. In the project root run:
   npm install @capacitor/core @capacitor/cli @capacitor/local-notifications --save-dev
3. Initialize Capacitor:
   npx cap init "Cyber Habit" com.example.cyberhabit --web-dir="."
4. Add Android platform:
   npx cap add android
5. Build and run in Android Studio:
   npx cap open android
6. Or build via CLI:
   npx cap copy android
   cd android && ./gradlew assembleDebug
7. Install APK via adb:
   adb install -r android/app/build/outputs/apk/debug/app-debug.apk

Or push this repo to GitHub and the included workflow will attempt to produce an APK artifact automatically.
