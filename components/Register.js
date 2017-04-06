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
  Dimensions
} from 'react-native';
import * as firebase from "firebase";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      profileImage: this.props.data,
      confirmPassword: '',
      error: ''
    };
  }

  async signup () {
    if (this.state.confirmPassword === this.state.password && this.state.password !== '') {
            this.setState({
              error: 'Success'
            })
            this.props.navigator.push({
              id: 'RegisterExtra',
              passProps: {
                email: this.state.email,
                password: this.state.password
              }
            });

        console.log("Account created");

        // Navigate to the Home page, the user is auto logged in

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
  camera() {
    this.props.navigator.push({
      id: 'Camera'
    })
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'lightcyan'}}>
      <View style={styles.container}>
      <Text style={styles.error}>{this.state.error}{this.props.data}</Text>
      <KeyboardAvoidingView behavior='padding' style={styles.keyboardStyle}>
      <TouchableOpacity onPress={this.camera.bind(this)}>
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
        returnKeyType="next"
        onSubmitEditing={() => this.focusNextField('3')}
        />
        <Text>Confirm the Password</Text>
        <TextInput
        ref="3"
        placeholder="Confirmm your password"
        style={styles.textInput}
        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
        keyboardType="default"
        placeholderTextColor="slategrey"
        secureTextEntry={true}
        keyboardAppearance="dark"
        returnKeyType="done"
        onSubmitEditing={this.signup.bind(this)}
        />
        <TouchableOpacity style={styles.registerBtn} onPress={this.signup.bind(this)}>
          <Text style={{color: 'slategrey'}}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.login.bind(this)}>
          <Text style={{color: 'slategrey'}}>Back to login</Text>
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

export default Register
