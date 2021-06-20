import React from 'react';
import MainNavigationContainer from './src/navigation/MainNavigationContainer';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query'
import { store } from './src/redux/store';
import theme from './src/themes/themes';

const queryClient = new QueryClient();

const App: React.FC = () => {
	return (
		<StoreProvider store={store}>
			<PaperProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<MainNavigationContainer />
				</QueryClientProvider>
			</PaperProvider>
		</StoreProvider>
	);
};

export default App;
