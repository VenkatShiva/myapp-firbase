/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet,
  View,
  Image,
  Easing,
  Animated,
  StatusBar,
 } from 'react-native';

import firebase from '@react-native-firebase/auth';
import { connect }  from 'react-redux';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import { 
  createStackNavigator,
} from "react-navigation-stack";
import StackNavigator from './src/components/stackNavigator';
import Profile from './src/components/Profile';
import CustomDrawerContent from './src/components/customDrawerContent';
import AutheticationTabNavigator from './src/components/autheticationTabNavigator'

// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
// });
//console.log("imported elements",CustomDrawerContent,"\n profile",Profile);
const firebaseCredentials = Platform.select({
  ios: 'https://invertase.link/firebase-ios',
  android: 'https://invertase.link/firebase-android',
});

const MyDrawerNavigator = createDrawerNavigator({
  Chat: {
    screen: StackNavigator,
    navigationOptions:{
      drawerIcon: (<Image
        source = {require('./assets/images/chat.png')}
        style={{width: 40, height: 40}}
      />),
      drawerLabel:'Chat'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions:{
      drawerIcon: (<Image
        source={require('./assets/images/user.png')}
        style={{width: 40, height: 40}}
      />),
      drawerLabel:'Profile',
    }
  },
},{
  contentComponent: CustomDrawerContent,
  contentOptions:{
    activeTintColor : "#3000F4",
    inactiveTintColor: "black",
    activeBackgroundColor: "white",
    labelStyle: {
      textAlign: "center",
      fontSize: 17,
      flex:1,
      marginLeft:-20,
      opacity:1,
    },
    iconContainerStyle: {
      opacity: 1
    },
    inactiveLabelStyle:{
      opacity:1,
    }
  },
  drawerBackgroundColor: "#aac3e3"
});
const MyStackNavigator  = createStackNavigator({
  loginPage: {
      screen: AutheticationTabNavigator,
  },
  myApp:{
      screen: MyDrawerNavigator,
  },
  },{
    headerMode: 'none',
  transitionConfig:() => {
      return {
        transitionSpec: {
          duration: 500,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {      
          const { layout, position, scene } = sceneProps
    
          const thisSceneIndex = scene.index
          const width = layout.initWidth
          const opacity = position.interpolate({
              inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex+1],
              outputRange: [0, 1, 1],
            });
          const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex+1],
            outputRange: [width, 0, 0],
          })
    
          return { opacity, transform: [ { translateX } ] }
        },
      }
    }
})
const MyApp = createAppContainer(MyStackNavigator);

class App extends Component {
  componentDidMount(){
    console.log(firebase.auth);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#80b2f2" barStyle="light-content" />
        <MyApp />
      </View>
    );
  }
}
function mapStateToProps(state){
  return {
    state :state,
  }
}
export default connect(mapStateToProps,null)(App);
const styles = StyleSheet.create({
  container:{
    flex:1,
    borderWidth: 1,
    borderColor: '#aac3e3',
    overflow: "hidden",
    backgroundColor:"white",
  },
  center:{
    justifyContent: "center",
    alignItems:"center",
  },
  drawerHead:{
      height: 120,
  },
  text:{
      fontFamily: "LobsterTwo-BoldItalic",
      color: "black",
      fontSize: 20,
  }
});
