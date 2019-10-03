import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
import { createSwitchNavigator, createAppContainer, NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';
//
import GLOBALS from '../Globals';

// import all basic components

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
		paddingTop: 20,
		alignItems: 'center',
		marginTop: 50,
		justifyContent: 'center'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	innerContaner: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		maxHeight: 200
	},
	a: {
		fontWeight: '300',
		color: '#FF3366' // make links coloured pink
	},
	richText: {
		flex: 1,
		paddingRight: 20,
		paddingLeft: 20
	}
});

export default class Profile extends Component {
	//Screen1 Component
	render() {
		const htmlContent = GLOBALS.TERMS;

		return (
			<SafeAreaView style={styles.container} hidesWhenStopped={true}>
				<ScrollView style={styles.richText}>
					<HTMLView value={htmlContent} stylesheet={styles} />
				</ScrollView>
			</SafeAreaView>
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
					style: 'cancel'
				},
				{ text: 'OK', onPress: () => console.log('OK Pressed') }
			],
			{ cancelable: false }
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
