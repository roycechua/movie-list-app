import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import React, { useLayoutEffect } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	ScrollView,
} from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { AirbnbRating, Rating } from 'react-native-ratings';
import Spacer from '../../common/components/Spacer';
import { RootStackParamsList } from '../../navigation/MainNavigationContainer';
import Res from '../../themes/Res';
import theme from '../../themes/themes';

// Props
type MovieDetailScreenNavigationProp = StackNavigationProp<
	RootStackParamsList,
	'MovieDetail'
>;

type Props = {
	navigation: MovieDetailScreenNavigationProp;
	route: {
		params: any;
	};
};

const MovieDetailScreen: React.FC<Props> = (props: Props) => {
	const { colors } = useTheme();
	const { navigation, route } = props;
	const { movie } = route.params;

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: movie.original_title,
			headerTitleStyle: {
				color: 'white',
			},
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: colors.primary,
			},
		});
	}, [navigation]);

	return (
		<ScrollView style={{ padding: 20 }}>
			<View style={{ alignItems: 'center' }}>
				<Image
					source={
						movie.poster_path
							? {
									uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
							  }
							: Res.noImageAvailable
					}
					style={{
						width: 500,
						height: 500,
						resizeMode: 'contain',
						borderRadius: 15,
					}}
				/>
			</View>
			<Spacer margin={5} />
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Text style={{ fontSize: 30 }}>{movie.original_title}</Text>
				<Button icon='plus-circle' onPress={() => {}}>
					Add to Watch List
				</Button>
			</View>
			<Text style={{ fontSize: 15 }}>
				Release Date:{' '}
				{moment(movie.release_date).format('MMMM DD, YYYY')}
			</Text>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Text>User's rating: </Text>
				<AirbnbRating
					showRating={false}
					count={5}
					// showRating
					defaultRating={movie.vote_average - 5}
					size={20}
					isDisabled
				/>
			</View>
			<Spacer margin={10} />
			<Text style={{ fontSize: 25 }}>Overview</Text>
			<Text style={{ fontSize: 15 }}>{movie.overview}</Text>
			<Spacer margin={10} />
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Text>Your rating: </Text>
				<AirbnbRating
					showRating={false}
					count={5}
					// showRating
					defaultRating={0}
					size={20}
					onFinishRating={(rating) => {}}
				/>
			</View>
			<Spacer margin={20} />
		</ScrollView>
	);
};

export default MovieDetailScreen;

const styles = StyleSheet.create({});
