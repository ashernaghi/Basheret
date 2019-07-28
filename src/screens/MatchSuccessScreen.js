import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {getCurrentMatches} from '../actions/matchActions';


export class MatchSuccessScreen extends React.Component {

componentDidMount(){
    // getCurrentMatches();
    if (!this.props.matchesCards) {
        this.props.dispatch(getCurrentMatches());
    }
  }

	static navigationOptions = ({ navigation }) => {
		return {
		  header: null,
		}
	};

	render() {
		return (
			<SafeAreaView style={styles.safeAreaStyle}>
				<View style={{ height: '30%', alignItems: 'center', justifyContent: 'flex-end'}}>
					<Text style={{ bottom: '5%', fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 50, color: 'white', textAlign: 'center', }}>The Sea Has{"\n"}Split</Text>
				</View>
				<View style={{ height: '30%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
						<View style={{width: 135, height: 135, borderRadius: 67.5,}}>
						<Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fblogintest-18329.appspot.com/o/users%2Ffuj930BI0LNhCUhz7xSAenALaEB2%2FprofilePhoto?alt=media&token=d722e8b9-1ba9-4801-a0fd-d570ee94381d' }} style={ styles.circleStyle }>
						</Image>
						</View>
						<Image source={{ uri: this.props.profilePhoto}} style={ styles.circleStyle }>
						</Image>
				</View>
				<View style={{ height: '25%', alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 36, color: 'white', textAlign: 'center', }}>It is as difficult to make{"\n"}matches as it was to split{"\n"}the sea...</Text>
				</View>
				<View style={{ height: '8%', alignItems: 'center', justifyContent: 'center' }}>
					<TouchableOpacity style={styles.buttonStyle}>
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
    userProfilePhoto: state.userInfo.user.info.profilePhoto,
    matchProfilePhoto: state.userInfo.user.profilePhoto,
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
