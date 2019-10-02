import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { Animated, FlatList, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export default class ScrollSwagger extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(0),
			dataSource: [ { key: 'Sticky' }, { key: 'Dan' }, { key: 'Dominic' }, { key: 'Jackson' }, { key: 'James' }, { key: 'Joel' }, { key: 'John' }, { key: 'Jillian' }, { key: 'Jimmy' }, { key: 'Julie' }, { key: 'John' }, { key: 'Jillian' }, { key: 'Jimmy' }, { key: 'Julie' } ]
		};
	}
	renderRow(rowData) {
		console.log(rowData.item.key);
		let color = 'white';
		if (rowData.item.key === 'Sticky') {
			color = 'purple';
		}
		return (
			<View
				style={{
					backgroundColor: color,
					width: width,
					height: 60,
					borderWidth: 1,
					marginVertical: 0,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text style={{ color: 'black' }}>{rowData.item.key}</Text>
			</View>
		);
	}
	render() {
		var headMov = this.state.scrollY.interpolate({
			inputRange: [ 0, 180, 181 ],
			outputRange: [ 0, -180, -180 ]
		});
		var hamovY = this.state.scrollY.interpolate({
			inputRange: [ 0, 180, 181 ],
			outputRange: [ 0, -20, -20 ]
		});
		var hamovX = this.state.scrollY.interpolate({
			inputRange: [ 0, 180, 181 ],
			outputRange: [ 0, -120, -120 ]
		});
		var imgOp = this.state.scrollY.interpolate({
			inputRange: [ 0, 200 ],
			outputRange: [ 1, 0.1 ]
		});
		var misMovY = this.state.scrollY.interpolate({
			inputRange: [ 0, 50, 100 ],
			outputRange: [ 0, 10, 20 ]
		});
		var headColor = this.state.scrollY.interpolate({
			inputRange: [ 0, 100 ],
			outputRange: [ 'green', 'blue' ]
		});
		var harot = this.state.scrollY.interpolate({
			inputRange: [ 0, 100 ],
			outputRange: [ '0deg', '360deg' ]
		});
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					scrollEventThrottle={1}
					stickyHeaderIndices={[ 1 ]}
					data={this.state.dataSource}
					renderItem={this.renderRow}
					keyExtractor={(item) => item}
					onScroll={Animated.event(
						[
							{
								nativeEvent: { contentOffset: { y: this.state.scrollY } }
							}
						],
						{ listener: this._handleScroll.bind(this) },
						{
							useNativeDriver: true // <- Native Driver used for animated events
						}
					)}
					ListHeaderComponent={
						<Animated.Image
							source={{
								uri: 'https://images.alphacoders.com/371/thumb-1920-371.jpg'
							}}
							style={{
								bottom: 0,
								width: width,
								height: 250,
								opacity: imgOp,
								transform: [ { translateY: misMovY } ]
							}}
						/>
					}
					//renderScrollComponent={this.renderScroll.bind(this)}
				/>
				<Animated.View
					style={{
						top: -height + 100,
						zIndex: 2,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'yellow',
						width: 100,
						alignSelf: 'center',
						transform: [ { translateY: hamovY }, { translateX: hamovX }, { rotate: harot } ]
					}}
				/>
			</View>
		);
	}
	_handleScroll(e) {
		// console.log(e.nativeEvent.contentOffset.y, "jvjhvhm");
	}
}
