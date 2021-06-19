import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamsList } from '../../navigation/MainNavigationContainer';

// Props
type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'SignUp'>;

type Props = {
	navigation: SignUpScreenNavigationProp;
};

const SignUpScreen : React.FC<Props> = (props : Props) => {
	return (
		<View>
			<Text>SignUpScreen</Text>
		</View>
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({});
