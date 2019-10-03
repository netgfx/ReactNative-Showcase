import { ActivityIndicator, Button, Text, StatusBar, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
// pages //
import Home from './Home';
import Profile from './components/Profile';
import List from './components/List';
import Webview from './components/Webview';
import Form from './components/Form';
import StickyScroll from './components/StickyScroll';
import RichText from './components/RichText';

import { AppRegistry } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tabIcon: {
		top: 20
	}
});

class NavigationDrawerStructure extends Component {
	//Structure for the navigatin Drawer
	toggleDrawer = () => {
		//Props to open/close the drawer
		this.props.navigationProps.toggleDrawer();
	};
	render() {
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
					<Text> Menu </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

class SignInScreen extends React.Component {
	static navigationOptions = {
		title: 'Please sign in'
	};

	render() {
		return (
			<View style={styles.container}>
				<Button title="Sign in!" onPress={this._signInAsync} />
			</View>
		);
	}

	_signInAsync = async () => {
		await AsyncStorage.setItem('userToken', 'abc');
		this.props.navigation.navigate('App');
	};
}

//////////////////////////////////////////////////////////////

const FirstActivity_StackNavigator = createStackNavigator(
	{
		//All the screen from the Screen1 will be indexed here
		Hone: {
			screen: Home,
			navigationOptions: ({ navigation }) => ({
				title: 'Home',
				gesturesEnabled: true,
				headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
				headerStyle: {
					backgroundColor: '#FF9800'
				},
				headerTintColor: '#fff'
			})
		},
		Webview: {
			screen: Webview,
			navigationOptions: ({ navigation }) => ({
				title: 'Webview #1',
				gesturesEnabled: true,
				//headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
				headerStyle: {
					backgroundColor: '#FF9800'
				},
				headerTintColor: '#fff'
			})
		},
		List: {
			screen: List,
			navigationOptions: ({ navigation }) => ({
				title: 'Categories List',
				gesturesEnabled: true,
				//headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
				headerStyle: {
					backgroundColor: '#FF9800'
				},
				headerTintColor: '#fff'
			})
		},
		Form: {
			screen: Form,
			navigationOptions: ({ navigation }) => ({
				title: 'Input Form',
				gesturesEnabled: true,
				//headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
				headerStyle: {
					backgroundColor: '#FF9800'
				},
				headerTintColor: '#fff'
			})
		},
		StickyScroll: {
			screen: StickyScroll,
			navigationOptions: ({ navigation }) => ({
				title: 'Main Area',
				gesturesEnabled: true,
				//headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
				headerStyle: {
					backgroundColor: '#FF9800'
				},
				headerTintColor: '#fff'
			})
		},
		RichText: {
			screen: RichText,
			navigationOptions: ({ navigation }) => ({
				title: 'Terms & Conditions',
				gesturesEnabled: true,
				//headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
				headerStyle: {
					backgroundColor: '#FF9800'
				},
				headerTintColor: '#fff'
			})
		}
	},
	{ headerLayoutPreset: 'center' }
);

const Screen2_StackNavigator = createStackNavigator(
	{
		//All the screen from the Screen2 will be indexed here
		Second: {
			screen: Profile,
			navigationOptions: ({ navigation }) => ({
				title: 'Profile',
				gesturesEnabled: true,
				headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
				headerStyle: {
					backgroundColor: '#FF9800'
				},
				headerTintColor: '#fff'
			})
		}
	},
	{ headerLayoutPreset: 'center' }
);

////////////////////////////////////////

class ModalScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text style={{ fontSize: 30 }}> This is a modal! </Text> <Button onPress={() => this.props.navigation.goBack()} title="Dismiss" />
			</View>
		);
	}
}
////////////////////////////////////

class AuthLoadingScreen extends React.Component {
	constructor() {
		super();
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken');

		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		this.props.navigation.navigate(userToken ? 'App' : 'Auth');
	};

	// Render any loading content that you like here
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}

////////////////////////////////////////////

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

// Drawer Navigator
const Drawer = createDrawerNavigator(
	{
		Screen1: {
			//Title
			screen: FirstActivity_StackNavigator,
			navigationOptions: {
				gesturesEnabled: true,
				drawerLabel: 'Home',
				drawerIcon: () => <Image source={require('./img/home.png')} style={[ styles.tabIcon, { tintColor: 'black' } ]} />
			}
		},
		Screen2: {
			//Title
			screen: Screen2_StackNavigator,
			navigationOptions: {
				gesturesEnabled: true,
				drawerLabel: 'Demo Screen 2',
				drawerIcon: () => <Image source={require('./img/tablet.png')} style={[ styles.tabIcon, { tintColor: 'black' } ]} />
			}
		}
	},
	{
		headerLayoutPreset: 'center',
		contentOptions: {
			activeBackgroundColor: 'white',
			inactiveBackgroundColor: '#f0f0f0',
			iconContainerStyle: {
				height: 50
			},
			itemsContainerStyle: {
				backgroundColor: 'white',
				alpha: 0,
				transparent: true
			}
		}
	}
);

const MainStack = createSwitchNavigator(
	{
		AuthLoadingScreen: AuthLoadingScreen,
		App: Drawer,
		Auth: AuthStack
	},
	{
		initialRouteName: 'AuthLoadingScreen'
	}
);

// const RootStack = createStackNavigator(
// 	{
// 		Main: {
// 			screen: MainStack
// 		},
// 		MyModal: {
// 			screen: ModalScreen
// 		}
// 	},
// 	{
// 		mode: 'modal',
// 		headerMode: 'none'
// 	}
// );

const ReactTest = createAppContainer(Drawer);

AppRegistry.registerComponent('ReactTest', () => ReactTest);

// https://stackoverflow.com/questions/50290050/how-to-implement-both-drawernavigator-and-stacknavigator
