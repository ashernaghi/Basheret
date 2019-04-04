import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SocialScreen from '../screens/SocialScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditModalScreen from  '../screens/EditModalScreen';
import ContactsModal from '../screens/ContactsModal';
import { fromLeft, fromRight } from 'react-navigation-transitions';

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'Home'
    && nextScene.route.routeName === 'Social') {
    return fromRight();
  }
  else{
    return fromLeft();
  }
}

const MainStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Social: { screen: SocialScreen },
  Profile: { screen: ProfileScreen },
  Settings: { screen: SettingsScreen },
},
{
  initialRouteName: 'Home',
  transitionConfig: (nav) => handleCustomTransition(nav)
});

export default RootStack = createStackNavigator(
  {
    Main: { screen: MainStack },
    EditProfileModal: { screen: EditModalScreen},
    ContactsModal: {screen: ContactsModal}
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
