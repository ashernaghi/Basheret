import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';

export default SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
})