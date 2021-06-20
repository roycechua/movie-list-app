import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../common/components/SplashScreen';
import SignInScreen from '../features/auth/SignInScreen';
import SignUpScreen from '../features/auth/SignUpScreen';
import HomeScreen from '../features/home/HomeScreen';
import MovieDetailScreen from '../features/movies/MovieDetailScreen';
import WatchListScreen from '../features/watchlist/WatchListScreen';
import { fetchConfiguration } from '../features/config/configSlice';
import { useAppDispatch } from '../redux/hooks';

export type RootStackParamsList = {
	SignIn: undefined;
	SignUp: undefined;
	Home: undefined;
	MovieDetail: undefined;
	WatchList: undefined;
};

type Props = {};

const Stack = createStackNavigator();

const MainNavigationContainer: React.FC<Props> = (props: Props) => {
	// to be replaced later by redux state variables
	const [isLoading, setIsLoading] = useState(false);
	const [userToken, setUserToken] = useState(null);
	const [isSignout, setIsSignout] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchConfiguration())
	}, [])

	if (isLoading) {
		// We haven't finished checking for the token yet
		return <SplashScreen />;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{userToken == null ? (
					<>
						{/* No token found, user isn't signed in */}
						<Stack.Screen
							name='SignIn'
							component={SignInScreen}
							options={{
								title: 'Sign In',
								// When logging out, a pop animation feels intuitive
								// You can remove this if you want the default 'push' animation
								animationTypeForReplace: isSignout
									? 'pop'
									: 'push',
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
						<Stack.Screen name='Home' component={HomeScreen} />
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
