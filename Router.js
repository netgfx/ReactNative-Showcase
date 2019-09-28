import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
    Home: { screen: Home },
});

const App = createAppContainer(MainNavigator);

export default App;