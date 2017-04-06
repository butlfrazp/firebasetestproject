/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Navigator,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import * as firebase from "firebase";
import Spinner from 'react-native-spinkit';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  async signup () {
    this.props.navigator.push({
      id: 'Register'
    });
  }

  async login () {
    try {

      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
      this.setState({
        error: 'Success'

      })
      this.props.navigator.push({
        id: 'Home',
      });

    }catch (error) {
      this.setState({
        error: error.message
      })
    }
  }

  check() {
    if (this.state.username == '' || this.state.password == '') {
      this.setState({
        error: 'All fields are required'
      });
    }
  }
  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'floralwhite'}}>
      <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding' style={styles.keyboardStyle}>
      <Text style={styles.error}>{this.state.error}</Text>
      <TouchableOpacity>
        <Image source={require('../src/default-profile.png')} style={styles.profileImage}/>
      </TouchableOpacity>
        <Text>Enter an email</Text>
        <TextInput
        ref="1"
        placeholder="Enter an email here"
        style={styles.textInput}
        onChangeText={(email) => this.setState({email})}
        keyboardType="email-address"
        placeholderTextColor="slategrey"
        keyboardAppearance="dark"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => this.focusNextField('2')}
        />
        <Text>Enter a Password</Text>
        <TextInput
        ref="2"
        placeholder="Enter a password here"
        style={styles.textInput}
        onChangeText={(password) => this.setState({password})}
        keyboardType="default"
        placeholderTextColor="slategrey"
        secureTextEntry={true}
        keyboardAppearance="dark"
        returnKeyType="done"
        />
        <TouchableOpacity style={styles.loginBtn} onPress={this.login.bind(this)}>
          <Text style={{color: 'slategrey'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={this.signup.bind(this)}>
          <Text style={{color: 'slategrey'}}>Need to sign up?</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: 'moccasin',
    height: 40,
    width: 240,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'slategrey',
    marginBottom: 15
  },
  registerBtn: {
    backgroundColor: 'lightblue',
    height: 40,
    width: 240,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'slategrey',
    marginBottom: 15
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    marginBottom: 40,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color: 'crimson',
    marginBottom: 15,
    marginRight: 30,
    marginLeft: 30
  },
  profileImage: {
    height: 120,
    width: 120,
    alignItems: 'center',
    borderRadius: 120 / 2
  },
  keyboardStyle: {
    marginBottom: 30,
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    marginRight: 15,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    margin: 10,
    textAlign: 'center',
    backgroundColor: 'white',
  }
});

export default Login
