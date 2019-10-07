import React, {Component} from 'react';
//import react in our code.
import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  NavigationActions,
} from 'react-navigation';
// import all basic components

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  innerContaner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    maxHeight: 200,
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
  tabIcon: {
    width: 16,
    height: 16,
  },
});

export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',

    headerLeft: null,
  };
  //Screen1 Component
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Profile Page </Text>
        <View style={styles.innerContaner}>
          <Button onPress={this._showAlert} title="Show Alert" />
          <Button onPress={this._showModal} title="Open Modal" />
        </View>
      </View>
    );
  }

  _showAlert = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  _showModal = () => {
    console.log('opening modal');
    this.props.navigation.navigate('MyModal');
    //this.props.navigation.navigate('Main', {}, NavigationActions.navigate({ routeName: 'MyModal' }));
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
