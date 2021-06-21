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
import { useMutation, useQueryClient } from 'react-query';
import Spacer from '../../common/components/Spacer';
import { RootStackParamsList } from '../../navigation/MainNavigationContainer';
import { useAppSelector } from '../../redux/hooks';
import API from '../../services/API';
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
	const { movie, type } = route.params;

	// retrieve user data
	const { data } = useAppSelector((state) => state.user);

	// Access the react query client
	const queryClient = useQueryClient();

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

	// Mutations
	const addToWatchlistMutation = useMutation(API.addToWatchlist, {
		onSuccess: () => {
			alert('Movie added to watch list');

			// Invalidate and refetch
			queryClient.invalidateQueries('getWatchlist');
			queryClient.invalidateQueries('getTrendingMovies');
		},
		onError: (error: Error) => {
			alert(
				`Error encountered while adding movie to watch list. '${error.message}'`
			);
		},
	});

	const handleAddToWatchList = () => {
		addToWatchlistMutation.mutate({
			account_id: data.id,
			session_id: data.sessionId,
			media_type: 'movie',
			media_id: movie.id,
			watchlist: true,
		});
	};

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
			<Text style={{ fontSize: 30 }}>{movie.original_title}</Text>
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
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
				}}
			>
				<Text style={{ fontSize: 25 }}>Overview</Text>
				{type !== 'watchlist' ? (
					<Button icon='plus-circle' onPress={handleAddToWatchList}>
						Add to Watch List
					</Button>
				) : null}
			</View>
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
