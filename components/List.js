import React, { Component } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

const rows = [ { id: 0, text: 'View' }, { id: 1, text: 'Text' }, { id: 2, text: 'Image' }, { id: 3, text: 'ScrollView' }, { id: 4, text: 'ListView' } ];

const extractKey = ({ id }) => id;

export default class App extends Component {
	getRandomArbitrary(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

	renderItem = ({ item }) => {
		let style = styles.row;

		let test = getRandomArbitrary(0, 2);
		console.log(test);
		if (test == 0) {
			style = styles.rowRed;
		}
		return <Text style={style}>{item.text}</Text>;
	};

	render() {
		return <FlatList style={styles.container} data={rows} renderItem={this.renderItem} keyExtractor={extractKey} />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	row: {
		padding: 15,
		marginBottom: 5,
		backgroundColor: 'skyblue'
	},
	rowRed: {
		padding: 15,
		marginBottom: 5,
		backgroundColor: '#ff0000'
	}
});
