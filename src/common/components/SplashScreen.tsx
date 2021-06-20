import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Screen from './Screen';

const SplashScreen = () => {
	return (
		<Screen center>
			<ActivityIndicator size='large' />
		</Screen>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({});
