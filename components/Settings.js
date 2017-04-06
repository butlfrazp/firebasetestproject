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
  Image
} from 'react-native';
import * as firebase from "firebase";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.username = '';
    this.phoneNumber = '';
    this.email = '';
    this.userId = firebase.auth().currentUser.uid;
    this.state = {
      email: 'Loading...',
      phoneNumber: 'Loading...',
      username: 'Loading...',
      error: ''
    };
  }
  componentDidMount() {
    firebase.database().ref('/users/' + this.userId).once('value').then((snapshot) => {
      this.username = snapshot.val().username;
      this.phoneNumber = snapshot.val().phoneNumber;
      this.email = snapshot.val().email;
      console.log(this.username)
      this.setState({
        username: this.username,
        email: this.email,
        phoneNumber: this.phoneNumber
      })
    })
  }
  cancel() {
    this.props.navigator.pop();
  }
  submit() {
    this.props.navigator.pop();
  }
  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'floralwhite'}}>

      <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding' style={styles.keyboardStyle}>
      <TouchableOpacity>
        <Image source={require('../src/default-profile.png')} style={styles.profileImage}/>
      </TouchableOpacity>
      <Text style={styles.error}>{this.state.error}</Text>
        <Text>Your Username</Text>
        <TextInput
        editable={false}
        style={styles.textInput}
        value={this.state.username}
        placeholderTextColor="slategrey"
        keyboardAppearance="dark"
        returnKeyType="next"
        />
        <Text>Your Phone Number</Text>
        <TextInput
        editable={false}
        style={styles.textInput}
        value={this.state.phoneNumber}
        placeholderTextColor="slategrey"
        keyboardAppearance="dark"
        returnKeyType="next"
        />
        <Text>Your Email</Text>
        <TextInput
        editable={false}
        style={styles.textInput}
        value={this.state.email}
        placeholderTextColor="slategrey"
        keyboardAppearance="dark"
        returnKeyType="done"
        />
        <TouchableOpacity style={styles.loginBtn} onPress={this.submit.bind(this)}>
          <Text style={{color: 'slategrey'}}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={this.cancel.bind(this)}>
          <Text style={{color: 'slategrey'}}>Cancel</Text>
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
    alignItems: 'center'
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

export default Settings
