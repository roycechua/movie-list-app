import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	StatusBar,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigation/MainNavigationContainer';
import Screen from '../../common/components/Screen';
import {
	ActivityIndicator,
	TextInput,
	useTheme,
	Badge,
	Card,
} from 'react-native-paper';
import Spacer from '../../common/components/Spacer';
import SearchResults from './components/SearchResults';
import API from '../../services/API';
import { useQuery } from 'react-query';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../themes/themes';
import moment from 'moment';
import Res from '../../themes/Res';

// Props
type HomeScreenNavigationProp = StackNavigationProp<
	RootStackParamsList,
	'Home'
>;

type Props = {
	navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = (props: Props) => {
	const { colors } = useTheme();

	const dispatch = useAppDispatch();
	// const { configuration } = useAppSelector((state) => state.config);

	// search feature
	const [searchText, setSearchText] = useState('');
	const handleClearSearchText = () => setSearchText('');

	// retrieve data
	const trendingMoviesQuery = useQuery(
		'getTrendingMovies',
		() => API.getTrendingMovies(),
		{ keepPreviousData: true, staleTime: 5000 }
	);

	return (
		<ScrollView contentContainerStyle={{ padding: 10 }} showsVerticalScrollIndicator={false}>
			<StatusBar
				animated={true}
				backgroundColor={colors.primary}
				barStyle={'light-content'}
			/>
			<TextInput
				left={<TextInput.Icon name='magnify' />}
				right={
					searchText.length > 0 ? (
						<TextInput.Icon
							name='close'
							onPress={handleClearSearchText}
						/>
					) : null
				}
				label='Search'
				placeholder='Search for Movie Titles'
				// onSubmitEditing={toggleIsSearchFocused}
				value={searchText}
				onChangeText={setSearchText}
				autoCapitalize={'none'}
				autoCorrect={false}
			/>

			<Spacer margin={10} />
			{searchText.length > 0 ? (
				<SearchResults searchText={searchText} />
			) : (
				<View>
					<View style={styles.sectionContainer}>
						<Text style={styles.trendingMoviesTitle}>
							Trending Movies
						</Text>
						<MaterialCommunityIcons
							name='arrow-right'
							size={24}
							color='white'
						/>
					</View>
					<Spacer margin={5} />
					<FlatList
						data={trendingMoviesQuery.data?.data.results}
						keyExtractor={(item) => item.id.toString()}
						horizontal
						renderItem={({ item, index }) => (
							<View style={{ width: 150 }}>
								<Image
									source={{
										uri: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
									}}
									style={{
										width: 150,
										height: 230,
										resizeMode: 'contain',
									}}
								/>
								<Text>
									{item.title ||
										item.original_title ||
										item.original_name}
								</Text>
								<Text>
									{moment(item.release_date).format(
										'MMMM DD, YYYY'
									)}
								</Text>
								{item.adult ? (
									<Badge style={styles.adultBadge}>
										Adult
									</Badge>
								) : null}
							</View>
						)}
						ItemSeparatorComponent={() => <Spacer margin={5} />}
						ListEmptyComponent={
							<>
								{trendingMoviesQuery.isLoading ? (
									<ActivityIndicator
										size='large'
										style={{ alignSelf: 'center' }}
									/>
								) : (
									<Text
										style={{
											alignSelf: 'center',
											margin: 20,
										}}
									>
										No Trending Movies
									</Text>
								)}
							</>
						}
						extraData={trendingMoviesQuery.isLoading}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					/>
					<Spacer margin={5} />
					<View style={styles.sectionContainer}>
						<Text style={styles.trendingMoviesTitle}>
							Your Watchlist
						</Text>
						<MaterialCommunityIcons
							name='arrow-right'
							size={24}
							color='white'
						/>
					</View>
					<Spacer margin={5} />
					<FlatList
						data={trendingMoviesQuery.data?.data.results}
						keyExtractor={(item) => item.id.toString()}
						horizontal
						renderItem={({ item, index }) => (
							<View style={{ width: 150 }}>
								<Image
									source={{
										uri: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
									}}
									style={{
										width: 150,
										height: 230,
										resizeMode: 'contain',
									}}
								/>
								<Text>
									{item.title ||
										item.original_title ||
										item.original_name}
								</Text>
								<Text>
									{moment(item.release_date).format(
										'MMMM DD, YYYY'
									)}
								</Text>
								{item.adult ? (
									<Badge style={styles.adultBadge}>
										Adult
									</Badge>
								) : null}
							</View>
						)}
						ItemSeparatorComponent={() => <Spacer margin={5} />}
						ListEmptyComponent={
							<>
								{trendingMoviesQuery.isLoading ? (
									<ActivityIndicator
										size='large'
										style={{ alignSelf: 'center' }}
									/>
								) : (
									<Text
										style={{
											alignSelf: 'center',
											margin: 20,
										}}
									>
										No Trending Movies
									</Text>
								)}
							</>
						}
						extraData={trendingMoviesQuery.isLoading}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			)}
		</ScrollView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	sectionContainer: {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		padding: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	adultBadge: {
		backgroundColor: theme.colors.primary,
		alignSelf: 'flex-start',
	},
	trendingMoviesTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		color: 'white',
	},
});
