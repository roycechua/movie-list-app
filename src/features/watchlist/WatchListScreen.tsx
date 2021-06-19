import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamsList } from '../../navigation/MainNavigationContainer';

// Props
type WatchListScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'WatchList'>;

type Props = {
	navigation: WatchListScreenNavigationProp;
};


const WatchListScreen : React.FC<Props>  = (props : Props) => {
	return (
		<View>
			<Text>WatchListScreen</Text>
		</View>
	);
};

export default WatchListScreen;

const styles = StyleSheet.create({});
