import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {getCurrentMatches} from '../actions/matchActions';
import { showProfileScreen, mutualMatchScreen } from '../actions/UserInfoActions';



export class MatchSuccessScreen extends React.Component {

componentDidMount(){
    // getCurrentMatches();
    this.props.dispatch(mutualMatchScreen(false));
    if (!this.props.matchesCards) {
        this.props.dispatch(getCurrentMatches());
    }
    console.log('profile Photo is: ' + this.props.candidate.profilePhoto);
 }

componentWillUnmount(){
    this.props.dispatch(showProfileScreen('self'))
 }

	static navigationOptions = ({ navigation }) => {
		return {
		  header: null,
		}
	};

	render() {
		    this.props.dispatch(showProfileScreen('self'))
    const { navigate } = this.props.navigation;

		return (
			<SafeAreaView style={styles.safeAreaStyle}>
				<View style={{ height: '20%', alignItems: 'center', justifyContent: 'flex-end'}}>
					<Text style={{ bottom: '5%', fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 50, color: 'white', textAlign: 'center', }}>The Sea Has{"\n"}Split</Text>
				</View>
				<View style={{ height: '35%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
						<Image source={{ uri: this.props.candidate.profilePhoto }} style={ styles.circleStyle }>
						</Image>
						<Image source={{ uri: this.props.profilePhoto}} style={ styles.circleStyle }>
						</Image>
				</View>
				<View style={{ height: '35%', alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 36, color: 'white', textAlign: 'center', }}>It is as difficult to make{"\n"}matches as it was to split{"\n"}the sea...</Text>
				</View>
				<View style={{ height: '10%', alignItems: 'center', justifyContent: 'center' }}>
					<TouchableOpacity
						style={styles.buttonStyle}
						onPress={()=>{navigate('Chat', {m: this.props.candidate})}}
					>
			          <Text style={styles.buttonTextStyle}>
			            Message
			          </Text>
			    	</TouchableOpacity>
				</View>
			</SafeAreaView>

		)
	}
}

const mapStateToProps = state => {
  return {
  	//matchProfilePhoto: state.userInfo.user[type].profilePhoto,
    candidate: state.userInfo.user.candidate,

    matches: state.userInfo.user.matches,
    matchesCards: state.userInfo.user.matchesCards,
    profilePhoto: state.userInfo.user.info.profilePhoto,
  };
};

export default connect(mapStateToProps)(MatchSuccessScreen);

const styles = StyleSheet.create({
	safeAreaStyle: {
		backgroundColor: '#00387e',
		flex: 1
	},

	circleStyle: {
	    width: 135,
	    height: 135,
	    borderRadius: 67.5,
	    margin: 10,
	    justifyContent: 'center',
	    alignItems: 'center',
  },

	buttonStyle: {
		  backgroundColor: '#d81159',
		  padding: 20,
		  alignItems: 'center',
		  alignSelf: 'center',
		  width: 300,
		  borderRadius: 30,
	},

	buttonTextStyle: {
	  color: '#fbfbfb',
	  fontSize: 15,
	},



});
