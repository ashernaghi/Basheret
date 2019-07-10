import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SocialScreen from '../screens/SocialScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditModalScreen from  '../screens/EditModalScreen';
import ContactsModal from '../screens/ContactsModal';
import EditNameScreen from '../screens/EditNameScreen';
import EditAgeScreen from '../screens/EditAgeScreen';
import EditGenderScreen from '../screens/EditGenderScreen';
import EditAboutMeScreen from '../screens/EditAboutMeScreen';
import EditShomerScreen from '../screens/EditShomerScreen';
import EditHometownScreen from '../screens/EditHometownScreen';
import EditCurrentResidenceScreen from '../screens/EditCurrentResidenceScreen';
import EditHighSchoolScreen from '../screens/EditHighSchoolScreen';
import EditUniversityScreen from '../screens/EditUniversityScreen';
import EditYeshivaMidrashaScreen from '../screens/EditYeshivaMidrashaScreen';
import EditProfessionScreen from '../screens/EditProfessionScreen';
import EditDenominationScreen from '../screens/EditDenominationScreen';
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
  EditName: { screen: EditNameScreen },
  EditAge: { screen: EditAgeScreen },
  EditGender: { screen: EditGenderScreen },
  EditAboutMe: { screen: EditAboutMeScreen },
  EditShomer: { screen: EditShomerScreen },
  EditHometown: { screen: EditHometownScreen },
  EditCurrentResidence: {screen: EditCurrentResidenceScreen},
  EditHighSchool: { screen: EditHighSchoolScreen },
  EditUniversity: { screen: EditUniversityScreen },
  EditYeshivaMidrasha: { screen: EditYeshivaMidrashaScreen },
  EditProfession: { screen: EditProfessionScreen },
  EditDenomination: { screen: EditDenominationScreen },

},
{
  initialRouteName: 'Home',
  transitionConfig: (nav) => handleCustomTransition(nav)
});

export default RootStack = createStackNavigator(
  {
    Main: { screen: MainStack },
    EditProfileModal: { screen: EditModalScreen},
    ContactsModal: {screen: ContactsModal},
    CandidateModal: {screen: ProfileScreen}
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
