import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamsList } from '../../navigation/MainNavigationContainer';
import Screen from '../../common/components/Screen';
import { Button, TextInput } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import Spacer from '../../common/components/Spacer';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from './authSlice';

// Props
type SignInScreenNavigationProp = StackNavigationProp<
	RootStackParamsList,
	'SignIn'
>;

type Props = {
	navigation: SignInScreenNavigationProp;
};

const SignInScreen: React.FC<Props> = (props: Props) => {
	const { colors } = useTheme();

	const dispatch = useAppDispatch();
	const { attemptingLogin } = useAppSelector(state => state.auth);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		if(username && password) {
			dispatch(login({username, password}));
		} else {
			alert('Please enter a username and password')
		}
	};

	return (
		<Screen padding={20}>
			<Spacer margin={50} />
			<View style={{ alignItems: 'center' }}>
				<Text style={{ color: colors.primary, ...styles.titleStyle }}>
					Movies Hub
				</Text>
			</View>
			<Spacer margin={20} />
			<View>
				<TextInput
					left={<TextInput.Icon name='account' />}
					mode={'outlined'}
					label='Username'
					placeholder='Username'
					disabled={attemptingLogin}
					value={username}
					onChangeText={setUsername}
				/>
				<Spacer margin={15} />
				<TextInput
					left={<TextInput.Icon name='lock' />}
					mode={'outlined'}
					label='Password'
					placeholder='Password'
					secureTextEntry
					disabled={attemptingLogin}
					value={password}
					onChangeText={setPassword}
				/>
				<Spacer margin={15} />
				<Button
					mode='contained'
					style={{ height: 50, justifyContent: 'center' }}
					contentStyle={{ height: 50 }}
					disabled={attemptingLogin}
					loading={attemptingLogin}
					onPress={handleLogin}
				>
					Login
				</Button>
			</View>
		</Screen>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	titleStyle: {
		fontSize: 35,
		fontWeight: 'bold',
	},
});
