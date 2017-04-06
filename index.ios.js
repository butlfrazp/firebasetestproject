/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Settings from './components/Settings';
import RegisterExtra from './components/RegisterExtra';
import Camera from './components/Camera';

import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAlHwIO_dGxPiRagENqgtqDZAczGydc5ls",
  authDomain: "prototype-bcaf3.firebaseapp.com",
  databaseURL: "https://prototype-bcaf3.firebaseio.com",
  storageBucket: "prototype-bcaf3.appspot.com",
  messagingSenderId: "1000480262089"
};
firebase.initializeApp(config);

export default class prototypeApp extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{id: 'Login'}}
        renderScene={this.navigatorRenderScene}
      />
    );
  }
  navigatorRenderScene(route, navigator){
    navigator = navigator;
    switch(route.id) {
      case 'Login':
        return(<Login navigator={navigator} title="login" />)
      case 'Home':
        return(<Home navigator={navigator} title="Home" />)
      case 'Register':
        return(<Register navigator={navigator} title="Register" {...route.passProps}/>)
      case 'Settings':
        return(<Settings navigator={navigator} title="Settings" />)
      case 'RegisterExtra':
        return(<RegisterExtra navigator={navigator} title="More information" {...route.passProps}/>)
      case 'Camera':
        return(<Camera navigator={navigator} title="Camera" {...route.passProps}/>)
    }
  }
}


AppRegistry.registerComponent('prototypeApp', () => prototypeApp);
