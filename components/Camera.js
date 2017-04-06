import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  StatusBar
} from 'react-native';

import Cam from 'react-native-camera'



class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      camera: {
        aspect: Cam.constants.Aspect.fill,
        captureTarget: Cam.constants.CaptureTarget.cameraRoll,
        type: Cam.constants.Type.back,
        orientation: Cam.constants.Orientation.auto,
        flashMode: Cam.constants.FlashMode.auto
      }
    }
  }
  cameraFlip = () => {
    let camPosition;
    const {back, front} = Cam.constants.Type;

    if (this.state.camera.type === back) {
      camPosition = front;
    }else if (this.state.camera.type === front) {
      camPosition = back;
    }
    console.log(camPosition);
    this.setState({
      camera: {
        ...this.state.camera,
        type: camPosition
      }
    })

  }
  back() {
    this.props.navigator.pop()
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Cam
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          >

          <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>

          <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center'}}>
            <TouchableHighlight onPress={this.back.bind(this)} style={{marginLeft: 20, backgroundColor: 'floralwhite', height: 40, width: 80, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 15}}>
              <Text>Back</Text>
            </TouchableHighlight>
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableHighlight onPress={this.cameraFlip} style={{marginRight: 20, backgroundColor: 'floralwhite', height: 40, width: 120, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 15}}>
            <Text>Flip camera</Text>
          </TouchableHighlight>
          </View>

          </View>


          <View style={{flex: 9, backgroundColor: 'green'}}>
          </View>
          <View style={{flex: 1, marginBottom: 60}}>
            <TouchableHighlight onPress={this.takePicture} style={{backgroundColor: 'floralwhite', height: 100, width: 100, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'lightslategray', borderRadius: 50}}>
              <Text>[CAPTURE]</Text>
            </TouchableHighlight>
          </View>
        </Cam>
      </View>
    );
  }
  takePicture = () => {
    this.camera.capture()
      .then((data) => {
        console.log(data)
        this.props.navigator.push({
          id: 'Register',
          passProps: {
            picture: data
          }
        })
      })
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  capture: {
    backgroundColor: '#fff',
    color: '#000',
    justifyContent: 'flex-end'
  },
  camSwitchText: {
    backgroundColor: 'red',
  }
});

export default Camera
