import React from 'react';
import MainNavigationContainer from './src/navigation/MainNavigationContainer';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/redux/store';

const App : React.FC = () => {
	return (
		<StoreProvider store={store}>
			<MainNavigationContainer/>
		</StoreProvider>
	);
}

export default App;
