import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ActivityIndicator, Button, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import {loginWithFacebook, loginPhoneNumberSuccess} from '../actions/AuthActions';
import { Font, Linking, WebBrowser } from 'expo'
import firebase from '../actions/firebase'
import { loginWithPhoneNumber } from '../actions/AuthActions'
import PhoneInput from 'react-native-phone-input'

const captchaUrl = `https://fblogintest-18329.firebaseapp.com/?appurl=${Linking.makeUrl('')}`

export class OnboardingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            phone: '',
            confirmationResult: undefined,
            code: ''
        }
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user})
        })
    }

    componentDidUpdate(){
        if(this.state.user){
            this.props.dispatch(loginWithPhoneNumber(this.state.user));
            this.props.navigation.navigate('LoadingApp');
        }
      }

    onPhoneChange = (phone) => {
        this.setState({phone})
    }

    validNumber = () => {
        console.log('validating')
        let {phone} = this.state
        phone = phone.replace("-",'')
        if (phone=='') {
            const error = "Please enter a phone number"
            this.setState({error});
            return false;
        }
        else if(isNaN(phone)){
            const error = "Please enter a valid phone number"
            this.setState({error});
            return false;
        }
        else if (phone.length < 10) {
            const error = "Please check that you entered the correct number of digits"
            this.setState({error});
            return false;
        }
        else {
            this.setState({phone});
            const error = "";
            this.setState({error});
            return true;
        }
    }

    onPhoneComplete = async () => {
        if (!this.validNumber()) {
            return;
        }
        console.log('test')
        let token = null
        const listener = ({url}) => {
            WebBrowser.dismissBrowser()
            const tokenEncoded = Linking.parse(url).queryParams['token']
            if (tokenEncoded)
                token = decodeURIComponent(tokenEncoded)
            else {
                const error = "Please try again"
                this.setState({error});
            }
        }
        console.log('phone',this.state.phone);
        Linking.addEventListener('url',listener)
        await WebBrowser.openBrowserAsync(captchaUrl)
        Linking.removeEventListener('url', listener)
        if (token) {
            const {phone} = this.state
            //fake firebase.auth.ApplicationVerifier
            const captchaVerifier = {
                type: 'recaptcha',
                verify: () => Promise.resolve(token)
            }
            try {
                console.log('siging in', phone)
                const confirmationResult = await firebase.auth().signInWithPhoneNumber(phone, captchaVerifier)
                this.setState({confirmationResult})
            } catch (e) {
                console.warn(e)
            }

        }
    }
    onCodeChange = (code) => {
        this.setState({code})
    }
    onSignIn = async () => {
        const {confirmationResult, code} = this.state
        try {
            await confirmationResult.confirm(code)
            this.reset()
        } catch (e) {
            const error = "Invalid Code, please try again"
            this.setState({error});
        }
    }

    reset = () => {
        this.setState({
            phone: '',
            phoneCompleted: false,
            confirmationResult: undefined,
            code: ''
        })
    }

    render() {
        if (!this.state.confirmationResult)
            return (
                <View style={styles.container}>
                    <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
                      <Text
                      style={styles.loginLogoText}
                      >
                        Basheret
                      </Text>
                    {this.props.loggingIn && <ActivityIndicator />}
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 400 }}>
                        <PhoneInput
                            ref='phone'
                            value={this.state.phone}
                            onChangePhoneNumber={this.onPhoneChange}
                            placeholder="Your phone"

                        />
                        <Button
                            onPress={this.onPhoneComplete}
                            title="Sign In"
                        />
                        <Text>
                            {this.state.error}
                        </Text>
                    </View>
                  </View>
            )
        else
            return (
                <View style={styles.container}>
                    <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
                      <Text
                      style={styles.loginLogoText}
                      >
                        Basheret
                      </Text>
                    {this.props.loggingIn && <ActivityIndicator />}
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 400 }}>
                        <TextInput
                        value={this.state.code}
                        onChangeText={this.onCodeChange}
                        keyboardType="numeric"
                        placeholder="Code from SMS"
                    />
                    <Button
                        onPress={this.onSignIn}
                        title="Sign in"
                    />
                    <Text>
                        {this.state.error}
                    </Text>
                    </View>
                  </View>
            )
    }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loggingIn: state.auth.loggingIn,
    loginError: state.auth.error
  };
};

//if logging in is false and error is false, then show it's logging in

export default connect(mapStateToProps)(OnboardingScreen);


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white',
  justifyContent: 'center',
  padding: 10
},

loginButtonTextStyle: {
  color: '#fbfbfb',
  fontSize: 15
},

facebookLoginButton: {
  backgroundColor: '#d81159',
  padding: 20,
  alignItems: 'center',
  alignSelf: 'center',
  width: 300,
  borderRadius: 30,
},

loginLogoText: {
  color: '#00387e',
  fontFamily: 'fitamint-script',
  fontSize: 90
}
});

// export class OnboardingScreen extends React.Component {
//   constructor(props){
//     super(props);
//   }
//   // if they login successfully, the props will change, the component will update, and we can navigate to loadingapp
//   componentDidUpdate(){
//     if(this.props.user){
//       this.props.navigation.navigate('LoadingApp');
//     }
//   }
//
//   onPress(){
//     this.props.dispatch(loginWithFacebook());
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
//           <Text
//           style={styles.loginLogoText}
//           >
//             Basheret
//           </Text>
//         {this.props.loggingIn && <ActivityIndicator />}
//         </View>
//         <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>
//
//           <FacebookLoginButton onPress={() => this.onPress()}/>
//         </View>
//
//       </View>
//     );
//   }
// }
