import { createDrawerNavigator } from 'react-navigation';
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack';
import HomeStack from './HomeStack';
// import HomeStack from './HomeStack';

export const Drawer = createDrawerNavigator({
  Home: { screen: HomeStack },
  Profile: { screen: ProfileStack },
  Settings: { screen: SettingsStack },
})

//Question: Why is there no back button for settings and profile? Want it to go back to Home