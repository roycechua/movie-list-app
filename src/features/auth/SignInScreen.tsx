import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamsList } from '../../navigation/MainNavigationContainer';

// Props
type SignInScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'SignIn'>;

type Props = {
	navigation: SignInScreenNavigationProp;
};

const SignInScreen: React.FC<Props> = (props: Props) => {
	return (
		<View>
			<Text>SignInScreen</Text>
		</View>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({});
