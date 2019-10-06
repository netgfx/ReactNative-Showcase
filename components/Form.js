import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Button, Alert, TextInput, Keyboard } from 'react-native';
import { createSwitchNavigator, createAppContainer, NavigationActions } from 'react-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
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
	state = {
		date: new Date(),
		mode: 'date',
		show: false,
		formatedDate: ''
	};

	show = (mode) => {
		this.setState({
			show: true,
			mode
		});
	};

	setDate = (event, date) => {
		date = date || this.state.date;
		console.log(date);
		this.setState({
			date: date,
			formatedDate: date.toString(),
			show: false
		});
	};

	datepicker = () => {
		this.show('date');
	};

	showDatepicker() {
		Keyboard.dismiss();
		this.setState({ show: true });
	}

	render() {
		const { show, date, mode } = this.state;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}> Profile Page </Text>
				<View style={styles.innerContaner}>
					<TextInput
						style={{
							height: 40,
							borderBottomColor: 'gray',
							borderBottomWidth: 1
						}}
						onChangeText={(text) => _onChangeText(text)}
						value=""
						placeholder="Add some text!"
					/>
					<TextInput
						style={{
							height: 40,
							borderBottomColor: 'gray',
							borderBottomWidth: 1
						}}
						onChangeText={(text) => _onChangeText(text)}
						value={this.state.formatedDate}
						placeholder="Add some text #2"
						editable={true}
						onFocus={this.showDatepicker.bind(this)}
					/>
					{show && <DateTimePicker value={this.state.date} mode={this.state.mode} is24Hour={true} display="default" onChange={this.setDate} />}
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
