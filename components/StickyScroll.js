import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { Animated, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
const { height, width } = Dimensions.get('window');

export default class ScrollSwagger extends Component {
	constructor(props) {
		super(props);
		this.animatedValue = new Animated.Value(0);
		this.value = 0;
		this.animatedValue.addListener(({ value }) => {
			this.value = value;
			console.log(value);
			if (this.state.flipped == false && value >= 90 && value < 180) {
				this.setState({
					img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
					flipped: true
				});
			} else if (this.state.flipped == true && value <= 90 && value > 0) {
				this.setState({
					img: 'https://images.alphacoders.com/371/thumb-1920-371.jpg',
					flipped: false
				});
			}
		});
		this.state = {
			scrollY: new Animated.Value(0),
			dataSource: [ { key: 'Sticky' }, { key: 'Dan' }, { key: 'Dominic' }, { key: 'Jackson' }, { key: 'James' }, { key: 'Joel' }, { key: 'John' }, { key: 'Jillian' }, { key: 'Jimmy' }, { key: 'Julie' }, { key: 'John' }, { key: 'Jillian' }, { key: 'Jimmy' }, { key: 'Julie' } ],
			img: 'https://images.alphacoders.com/371/thumb-1920-371.jpg',
			flipped: false
		};
	}

	componentDidMount() {
		Image.prefetch('https://images.alphacoders.com/371/thumb-1920-371.jpg');
		Image.prefetch('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png');
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
		this.SetInterpolate = this.animatedValue.interpolate({
			inputRange: [ 0, 180 ],
			outputRange: [ '180deg', '360deg' ]
		});

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

		const Rotate_Y_AnimatedStyle = {
			transform: [ { rotateY: this.SetInterpolate }, { translateY: misMovY } ]
		};

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
						<TouchableOpacity onPress={() => this._flipImage()}>
							<Animated.Image
								source={{
									uri: this.state.img
								}}
								style={[
									{
										bottom: 0,
										width: width,
										height: 250,
										opacity: imgOp
									},
									Rotate_Y_AnimatedStyle
								]}
							/>
						</TouchableOpacity>
					}
				/>
				{/* <Animated.View
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
				/> */}
			</View>
		);
	}
	_handleScroll(e) {
		// console.log(e.nativeEvent.contentOffset.y, "jvjhvhm");
	}

	_flipImage() {
		console.log('flipping!');
		if (this.value >= 90) {
			Animated.spring(this.animatedValue, {
				toValue: 0,
				tension: 10,
				friction: 8,
				useNativeDriver: true
			}).start(() => {
				console.log('end1');
				this.setState({
					flipped: true
				});
			});
		} else {
			Animated.spring(this.animatedValue, {
				toValue: 180,
				tension: 10,
				friction: 8,
				useNativeDriver: true
			}).start(() => {
				console.log('end2');
				this.setState({
					flipped: false
				});
			});
		}
	}
}
