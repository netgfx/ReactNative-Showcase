import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import Constants from 'expo-constants';
import { httpRequest } from '../API/API';

export default class List extends Component {
	state = {
		data: [],
		isLoading: true
	};

	componentDidMount() {
		httpRequest.makeAPICall('categories', this.renderList.bind(this));
	}

	renderList(data) {
		this.setState({ data: data, isLoading: false });
	}

	////// components ///////
	_renderItem = ({ item }) => (
		<View style={styles.item}>
			<Image style={{ width: 50, height: 50 }} source={{ uri: item.strCategoryThumb }} />
			<Text style={styles.title}>{item.strCategory}</Text>
		</View>
	);

	render() {
		return (
			<SafeAreaView style={styles.container} hidesWhenStopped={true}>
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#1e1e1e" style={styles.spinner} animating={this.state.isLoading} />
				</View>

				<FlatList style={styles.list} data={this.state.data} renderItem={this._renderItem} keyExtractor={(item) => item.idCategory} />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		marginTop: Constants.statusBarHeight
	},
	list: {},
	spinner: {
		justifyContent: 'center',
		alignSelf: 'center',
		top: '50%'
	},
	item: {
		backgroundColor: '#f0f0f0',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		flexDirection: 'row',
		width: '100%',
		alignContent: 'center'
	},
	title: {
		fontSize: 24,
		color: '#1e1e1e',
		marginLeft: 20,
		alignSelf: 'center'
	}
});
