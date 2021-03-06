# movie-list-app
This app allows you to browse and search through the trending movies that you can rate as well as store in your watchlist for reference. This app was built using React Native.

# Prerequisites
To run the app locally on your machine, you need to have Node.js v12.0 or above installed as well as Android Studio (for Android) and Xcode (for iOS).

# Install the packages
For a new clone of this repository, you will need to open your terminal/cmd to the repository folder and run the command 

```
yarn install
```

This will install all the required packages to build and run the mobile application. For iOS however, you will need to run an additional command below to install the iOS dependencies.

```
npx pod-install
```

# Run the App
To run the application, open your terminal at the repository folder and execute the command

```
yarn run android
```

For iOS, you will need to execute the command below separately

```
yarn run ios
```

# Notes 
Currently, pagination support has been prepared and but not yet implemented for this version of the application and the watchlist data will be retained only as long as the user session is active.