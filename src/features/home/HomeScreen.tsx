import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigation/MainNavigationContainer';

// Props
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'Home'>;

type Props = {
	navigation: HomeScreenNavigationProp;
};

const HomeScreen : React.FC<Props>  = (props : Props) => {
	return (
		<View>
			<Text>HomeScreen</Text>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
