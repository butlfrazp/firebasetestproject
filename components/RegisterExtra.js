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
  ActivityIndicator
} from 'react-native';
import * as firebase from "firebase";

class RegisterExtra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //userId: firebase.auth().currentUser.uid,
      username: '',
      password: this.props.password,
      phoneNumber: '',
      profileImage: '../src/default-profile.png',
      email: this.props.email,
      error: '',
      button: <Text style={{color: 'slategrey'}}>Done!</Text>
    };
  }


  async signup () {
    if (this.state.phoneNumber != '' && this.state.username != '') {
    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password);
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
              username: this.state.username,
              email: this.state.email,
              phoneNumber: this.state.phoneNumber
            });
            this.setState({
              error: 'Success'
            })
            this.props.navigator.push({
              id: 'Home'
            });

        console.log("Account created");

        // Navigate to the Home page, the user is auto logged in

    } catch (error) {
      this.setState({
        error: error.toString()
      })
    }
  }else{
    this.setState({
      error: 'error'
    })
  }

  }

  login() {
    this.props.navigator.pop()
  }

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'lightcyan'}}>
      <View style={styles.container}>
      <Text style={styles.error}>{this.state.error}</Text>
      <KeyboardAvoidingView behavior='padding' style={styles.keyboardStyle}>
      <TouchableOpacity>
        <Image source={require('../src/default-profile.png')} style={styles.profileImage}/>
      </TouchableOpacity>
        <Text>Enter a username</Text>
        <TextInput
        ref="1"
        placeholder="Enter a username here"
        style={styles.textInput}
        onChangeText={(username) => this.setState({username})}
        keyboardType="email-address"
        placeholderTextColor="slategrey"
        keyboardAppearance="dark"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => this.focusNextField('2')}
        />
        <Text>Enter a Phone number</Text>
        <TextInput
        ref="2"
        placeholder="Enter a phone number"
        style={styles.textInput}
        onChangeText={(phoneNumber) => this.setState({phoneNumber})}
        keyboardType="default"
        placeholderTextColor="slategrey"
        keyboardAppearance="dark"
        returnKeyType="next"
        onSubmitEditing={() => this.focusNextField('3')}
        />

        <TouchableOpacity style={styles.registerBtn} onPress={this.signup.bind(this)}>
          {this.state.button}
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.login.bind(this)}>
          <Text style={{color: 'slategrey'}}>Back</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    borderRadius: 120 / 2,
  },
  keyboardStyle: {
    marginBottom: 30,
    alignItems: 'center',
    width: Dimensions.get('window').width
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

export default RegisterExtra
