import moment from 'moment';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Badge, Card } from 'react-native-paper';
import { useQuery } from 'react-query';
import Spacer from '../../../common/components/Spacer';
import { navigate } from '../../../navigation/RootNavigation';
import API from '../../../services/API';
import Res from '../../../themes/Res';
import theme from '../../../themes/themes';

type Props = {
    searchText?: string,
}

const SearchResults : React.FC<Props> = (props: Props) => {
    let searchText = props.searchText;

    const searchQuery = useQuery(
		['getSearch'],
		() => API.searchMovies({ query: searchText }),
		{ keepPreviousData: true, staleTime: 5000 }
	);

	// navigate to movie detail screen
	const handleViewMovieDetails = (movie: any) => {
		navigate('MovieDetail', {
			movie,
			type: 'movieDetail'
		});
	};

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={searchQuery.data?.data.results}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item, index }) => (
					<TouchableOpacity onPress={() => handleViewMovieDetails(item)}>
						<Card>
							<Card.Content
								style={{ flex: 1, flexDirection: 'row' }}
							>
								<View style={{ justifyContent: 'center' }}>
									<Image
										source={
											item.poster_path
												? {
														uri: `https://image.tmdb.org/t/p/w154${item.poster_path}`,
												}
												: Res.noImageAvailable
										}
										style={{
											width: 100,
											height: 150,
											resizeMode: 'contain',
										}}
									/>
								</View>
								<Spacer margin={5} />
								<View style={{ flex: 1 }}>
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
									<Spacer margin={5} />
									<Text>
										{item.overview ||
											'No Movie Overview Available'}
									</Text>
									{item.adult ? (
										<Badge style={styles.adultBadge}>
											Adult
										</Badge>
									) : null}
								</View>
							</Card.Content>
						</Card>
					</TouchableOpacity>
				)}
				ItemSeparatorComponent={() => <Spacer margin={5} />}
				ListEmptyComponent={
					<>
						{searchQuery.isLoading ? (
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
				extraData={searchQuery.isLoading}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default SearchResults;

const styles = StyleSheet.create({
    adultBadge: {
		backgroundColor: theme.colors.primary,
		alignSelf: 'flex-start',
	},
});
