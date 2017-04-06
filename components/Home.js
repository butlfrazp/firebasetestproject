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
  ListView
} from 'react-native';

import * as firebase from "firebase";



class Home extends Component {
  constructor(props) {
    super(props);
    this.username = '';
    this.userId = firebase.auth().currentUser.uid;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
      error: '',
      description: '',
      name: '',
      location: '',
      dataSource: ds.cloneWithRows(['description', 'description', 'description']),
      username: '',
      greeting: 'Loading...'
     }
  }
  componentWillMount() {
    firebase.database().ref('/users/' + this.userId).once('value').then((snapshot) => {
    this.username = snapshot.val().username;
    console.log(this.username)
    this.setState({
      username: this.username,
      greeting: 'Hi, ' + this.username
    })
  })
  }

  async logout() {
    try {
      await firebase.auth().signOut()

      this.setState({
        error: 'success'
      })

      this.props.navigator.pop()

    }catch(error) {
      this.setState({
        error: error.toString()
      })
    }
  }
  settings() {
    this.props.navigator.push({
      id: 'Settings'
    })
  }
  pressed() {
    alert('pressed')
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.topContainer}>
          <View style={{flex: 1}}>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerText}>Brand</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
            <Text>{this.state.greeting}</Text>
          </View>
      </View>
      <View style={styles.listViewContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity style={styles.listContainer} onPress={this.pressed.bind(this)}>
              <View style={styles.listView}>
                <Image
                  style={styles.profileImage}
                  source={require('../src/default-profile.png')}
                />
                <View style={styles.innerText}>
                  <View style={{flex: 4, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'left'}}>{rowData}</Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{flex: 1, marginLeft: 10}}><Text style={{textAlign: 'left'}}>name</Text></View>
                    <View style={{flex: 1}}><Text style={{textAlign: 'right'}}>location</Text></View>
                  </View>
                </View>
                </View>
            </TouchableOpacity>
          }
        />
        </View>
        <View style={styles.bottomContainer}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.logout.bind(this)}>
              <Text style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 5, borderColor: 'lightslategray', borderWidth: 1}}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.settings.bind(this)}>
              <Text style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 5, borderColor: 'lightslategray', borderWidth: 1}}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1.25,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: .5,
    borderColor: 'lightslategray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'lightslategray'
  },
  container: {
    flex: 1,
    backgroundColor: 'floralwhite'
  },
  listViewContainer: {
    flex: 9
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  profileImage: {
    height: 80,
    width: 80,
    alignItems: 'flex-start',
    marginLeft: 5,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 80 / 2,
    borderWidth: .5,
    borderColor: 'lightslategray'
  },
  listView: {
    flex: 1,
    paddingBottom: 15,
    borderBottomWidth: .5,
    borderBottomColor: 'lightslategray',
    width: 80,
    flexDirection: 'row'
  },
  innerText: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 20,
  }
});

export default Home
