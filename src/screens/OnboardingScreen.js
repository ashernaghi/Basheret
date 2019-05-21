import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ActivityIndicator, Button, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import {loginWithFacebook, loginPhoneNumberSuccess} from '../actions/AuthActions';
import { FacebookLoginButton } from '../components/FacebookLoginButton'
import { Font, Linking, WebBrowser } from 'expo'
import firebase from '../actions/firebase'
import { loginWithPhoneNumber } from '../actions/AuthActions'

const captchaUrl = `https://fblogintest-18329.firebaseapp.com/?appurl=${Linking.makeUrl('')}`

export class OnboardingScreen extends React.Component {
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
        console.log('update', this.state);
        if(this.state.user){
            this.props.dispatch(loginWithPhoneNumber(this.state.user));
            this.props.navigation.navigate('LoadingApp');
        }
      }

    onPhoneChange = (phone) => {
        this.setState({phone})
    }

    onPhoneComplete = async () => {
        let token = null
        const listener = ({url}) => {
            WebBrowser.dismissBrowser()
            const tokenEncoded = Linking.parse(url).queryParams['token']
            if (tokenEncoded)
              console.log('token', tokenEncoded)
                token = decodeURIComponent(tokenEncoded)
        }
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
        } catch (e) {
            console.warn(e)
        }
        this.reset()
    }
    onSignOut = async () => {
        try {
            await firebase.auth().signOut()
        } catch (e) {
            console.warn(e)
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
        if (this.state.user)
            return (
                <ScrollView style={{padding: 20, marginTop: 20}}>
                    <Text>You signed in</Text>
                    <Button
                        onPress={this.onSignOut}
                        title="Sign out"
                    />
                </ScrollView>
            )
        if (!this.state.confirmationResult)
            return (
                <ScrollView style={{padding: 20, marginTop: 20}}>
                    <TextInput
                        value={this.state.phone}
                        onChangeText={this.onPhoneChange}
                        keyboardType="phone-pad"
                        placeholder="Enter your phone number"
                    />
                    <Button
                        onPress={this.onPhoneComplete}
                        title="Next"
                    />
                </ScrollView>
            )
        else
            return (
                <ScrollView style={{padding: 20, marginTop: 20}}>
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
                </ScrollView>
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
  backgroundColor: '#00387e',
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
  color: '#fbfbfb',
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
