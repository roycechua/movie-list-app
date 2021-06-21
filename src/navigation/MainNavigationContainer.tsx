import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../common/components/SplashScreen';
import SignInScreen from '../features/auth/SignInScreen';
import SignUpScreen from '../features/auth/SignUpScreen';
import HomeScreen from '../features/home/HomeScreen';
import MovieDetailScreen from '../features/movies/MovieDetailScreen';
import WatchListScreen from '../features/watchlist/WatchListScreen';
import { fetchConfiguration } from '../features/config/configSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setLogout } from '../features/auth/authSlice';
import { isReadyRef, navigationRef } from './RootNavigation';

export type RootStackParamsList = {
	SignIn: undefined;
	SignUp: undefined;
	Home: undefined;
	MovieDetail: any | undefined;
	WatchList: undefined;
};

type Props = {};

const Stack = createStackNavigator();

const MainNavigationContainer: React.FC<Props> = (props: Props) => {
	const { colors } = useTheme();

	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const isAttemptingFetchConfiguration = useAppSelector(
		(state) => state.config.isAttemptingFetchConfiguration
	);

	useEffect(() => {
		dispatch(fetchConfiguration());
	}, []);

	if (isAttemptingFetchConfiguration) {
		// We haven't finished checking for the token yet
		return <SplashScreen />;
	}

	const handleLogout = () => dispatch(setLogout());

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				// @ts-ignore
				isReadyRef.current = true;
			}}
		>
			<Stack.Navigator>
				{!isLoggedIn ? (
					<>
						{/* No token found, user isn't signed in */}
						<Stack.Screen
							name='SignIn'
							component={SignInScreen}
							options={{
								title: 'Sign In',
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='SignUp'
							component={SignUpScreen}
							options={{
								title: 'Sign Up',
								headerShown: false,
							}}
						/>
						{/* <Stack.Screen name='ResetPassword' component={ResetPassword} /> */}
					</>
				) : (
					<>
						{/* User is signed in */}
						<Stack.Screen
							name='Home'
							component={HomeScreen}
							options={{
								headerStyle: {
									backgroundColor: colors.primary,
								},
								headerTitleStyle: {
									color: 'white',
								},
								headerRight: () => (
									<TouchableOpacity onPress={handleLogout}>
										<View style={{ margin: 10 }}>
											<MaterialCommunityIcons
												name='logout'
												size={24}
												color='white'
											/>
										</View>
									</TouchableOpacity>
								),
							}}
						/>
						<Stack.Screen
							name='MovieDetail'
							component={MovieDetailScreen}
						/>
						<Stack.Screen
							name='WatchList'
							component={WatchListScreen}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default MainNavigationContainer;

const styles = StyleSheet.create({});
