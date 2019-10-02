import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Button, Alert, TextInput } from 'react-native';
import { createSwitchNavigator, createAppContainer, NavigationActions } from 'react-navigation';
// import all basic components

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: '#F5FCFF',
		paddingLeft: 20,
		paddingRight: 20
	},
	innerContaner: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'stretch',
		backgroundColor: '#F5FCFF',
		maxHeight: '80%'
	},
	bottomView: {
		flex: 1,
		justifyContent: 'flex-end',
		height: '20%',
		alignContent: 'center',
		marginBottom: 20
	},
	bottomButton: {
		alignSelf: 'center'
	},
	welcome: {
		textAlign: 'center'
	}
});

export default class Form extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Profile Page</Text>
				<View style={styles.innerContaner}>
					<TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => _onChangeText(text)} value="" placeholder="Add some text!" />
					<TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => _onChangeText(text)} value="" placeholder="Add some text #2" />
				</View>
				<View style={styles.bottomView}>
					<Button onPress={this._showAlert} title="Submit" style={styles.bottomButton} />
				</View>
			</View>
		);
	}

	_onChangeText(text) {
		console.log(text);
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
}
