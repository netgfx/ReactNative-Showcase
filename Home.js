import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Button } from 'react-native';
import { createSwitchNavigator, createAppContainer, NavigationActions } from 'react-navigation';
// import all basic components

export default class Home extends Component {
	//Screen1 Component
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.innerContaner}>
					<Text style={styles.welcome}>Welcome to React Native Navigation Sample!</Text>
					<Button style={styles.buttons} onPress={this._goToSecondScreen} title="Go to Second Screen" />
					<Button style={styles.buttons} onPress={this._showMoreApp} title="Open Menu" />
					<Button style={styles.buttons} onPress={this._navigateToWebview} title="Open Webview" />
					<Button style={styles.buttons} onPress={this._navigateToList} title="Navigate to List" />
					<Button style={styles.buttons} onPress={this._navigateToForm} title="Navigate to Form" />
					<Button style={styles.buttons} onPress={this._navigateToStickyScroll} title="Navigate to Sticky" />
					<Button style={styles.buttons} onPress={this._navigateToRichText} title="Navigate to RichText" />
				</View>
			</View>
		);
	}

	_navigateToRichText = () => {
		this.props.navigation.navigate('RichText');
	};

	_navigateToForm = () => {
		this.props.navigation.navigate('Form');
	};

	_navigateToList = () => {
		this.props.navigation.navigate('List');
	};

	_navigateToWebview = () => {
		this.props.navigation.navigate('Webview');
	};

	_goToSecondScreen = () => {
		console.log('go to 2nd screen');
		this.props.navigation.navigate('Screen2', {}, NavigationActions.navigate({ routeName: 'Second' }));
	};

	_showMoreApp = () => {
		console.log('open menu');
		this.props.navigation.openDrawer();
		//this.props.navigation.navigate('Screen2', {}, NavigationActions.navigate({ routeName: 'Second' }));
	};

	_signOutAsync = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

	_navigateToStickyScroll = async () => {
		//await AsyncStorage.clear();
		this.props.navigation.navigate('StickyScroll');
	};
}

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
		justifyContent: 'space-evenly',
		alignItems: 'stretch',
		backgroundColor: '#F5FCFF',
		maxHeight: 400,
		maxWidth: 200
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	tabIcon: {
		width: 16,
		height: 16
	},
	buttons: {
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
});
