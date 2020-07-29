# Arthome QC app

For more info see [React Native](https://reactnative.dev/)

Setting up the development environment

# [Setup on Windows](settup_windows.md)
# [Setup on MacOS](setup_macos.md)

# Start project

Run `yarn install`

Start on iOS simulator `yarn ios`

Start on Android simualtor `yarn android`

<h3>Note</h3>

    If get this error "SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable".

<h4>MacOS</h4>

1. Go to the android/ directory of your react-native project
2. Create a file called local.properties with this line:

    `sdk.dir = /Users/USERNAME/Library/Android/sdk`

    Where USERNAME is your macOS username

<h4>Window<h4>

1. Go to the android/ directory of your react-native project
2. Create a file called local.properties with this line:

    `sdk.dir = C:\\Users\\USERNAME\\AppData\\Local\\Android\\sdk`

    Replace USERNAME with your user name
