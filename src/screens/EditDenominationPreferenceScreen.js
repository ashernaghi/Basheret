import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Ionicons } from '@expo/vector-icons';
import OptionButton from '../components/OptionButton';
import { NextButton } from '../components/NextButton';
import { connect } from 'react-redux';
import { updateUserInfo } from '../actions/UserInfoActions';
import { initializeMatches } from '../actions/matchActions';
import { options, questions, category } from '../common/arrays'

export class EditDenominationPreferenceScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      gesturesEnabled: false,
    }
  };

  constructor(props) {
      super(props);
      this.state= {
        preference: ['genderPreference', 'denominationPreference', 'kashrutPreference', 'shabbatPreference'],
        preferenceDefault: [ [], [0, 100], [0, 100], [0, 100] ],
        responseValue: this.props.denomination+1,
        minObservance: 1,
        maxObservance: 101,
        thumb: 40,
        track: 40,
        borderRadius: 20,
        selected: '',
        value: 0,
      }

      this.count;
      this.question;
      this.labels;
    }
    //We import questions/answers. The first time this gets called, it grabs it from there and starts asking. When the user needs to navigate to the next question, the next question/answer pair from this data gets passed in as params to the navigate

  onPress(str=""){
    //send response to db:
    this.props.dispatch(updateUserInfo('info', category[1], str ? str : (this.state.responseValue-1)));
    this.props.navigation.navigate('Profile')
  }

  generateLabels(){
    return options[1].map((label, index)=> {
      return (
        <View style={{justifyContent: 'center'}}>
          <Text key={index}>{label}</Text>
        </View>
      )
    })
  }

  changeValue = (values) => {
    let finalValue = values.length ===1 ? values[0] : values;
    this.props.dispatch(updateUserInfo('preferences', denomination, finalValue))
  }

  render() {

    this.question = this.props.navigation.getParam('question', questions[1]);
    this.labels = this.props.navigation.getParam('labels', options[1])

    return (
      <View style={styles.questionView}>
        <View style={{ flexDirection: 'row', justifyContent:'center', alignItems:'center', paddingBottom: 20 }}>
          <View>
            <Ionicons
              name="ios-arrow-back"
              size={27}
              color="grey"
              onPress={() => this.props.navigation.navigate('Profile')}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 90, marginLeft: 90, }}>
            <Text style={{ fontSize: 50, fontFamily: 'fitamint-script', color: '#00387e', }}>Basheret</Text>
          </View>
        </View>
        <Text style={styles.question}>{this.question}</Text>
          <View style={{flexDirection: 'row', paddingLeft: 40, paddingTop: 40}}>
            <View>
              <MultiSlider
              markerStyle={{width:20, height: 20, borderRadius: 10, backgroundColor: '#00387E'}}
              selectedStyle={{backgroundColor: '#00387E'}}
              values={[this.props.denominationPreference]}
              onValuesChange={values=>this.changeValue(values)}
              min={100}
              max={1000}
              step={100}
              />
            </View>
            <View style={styles.sliderLabels}>
              {this.generateLabels()}
            </View>
          </View>
          <View style={styles.button}>
            <NextButton
            onPress={()=>this.onPress()}
            content={this.state.responseValue}
            >
              {"Done"}
            </NextButton>
          </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    denominationPreference: state.userInfo.user.preferences.denominationPreference,
    shabbatPreference: state.userInfo.user.preferences.shabbatPreference,
    kashrutPreference: state.userInfo.user.preferences.kashrutPreference,  
  };
};

export default connect(mapStateToProps)(EditDenominationPreferenceScreen);

const styles = StyleSheet.create({
  safeAreaViewSyle:{
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  questionView: {
    paddingTop: 65,
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  question: {
    fontSize: 25,
    paddingLeft: 30,
    fontWeight: 'bold',
    maxWidth: 260,
    color: 'grey',
  },

  sliderLabels: {
    justifyContent: 'space-between',
    height: '69%',
    paddingLeft: 20,
    paddingTop: '1%'
  },

  button: {
    bottom: 100
  }

})
