import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamsList } from '../../navigation/MainNavigationContainer';

// Props
type MovieDetailScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'MovieDetail'>;

type Props = {
	navigation: MovieDetailScreenNavigationProp;
};

const MovieDetailScreen : React.FC<Props>  = (props : Props) => {
	return (
		<View>
			<Text>MovieDetailScreen</Text>
		</View>
	);
};

export default MovieDetailScreen;

const styles = StyleSheet.create({});
