import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Slider } from 'react-native-elements';
import OptionButton from '../components/OptionButton';
import { NextButton } from '../components/NextButton';
import { connect } from 'react-redux';
import { updateUserInfo } from '../actions/UserInfoActions';
import { initializeMatches } from '../actions/matchActions';
import { options, questions, category } from '../common/arrays'

export class EditDenominationScreen extends React.Component {
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
        responseValue: 101,
        minObservance: 1,
        maxObservance: 101,
        thumb: 24,
        borderRadius: 12,
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
      return <Text key={index}>{label}</Text>
    })
  }

  render() {

    this.question = this.props.navigation.getParam('question', questions[1]);
    this.labels = this.props.navigation.getParam('labels', options[1])


    return (
      <View style={styles.questionView}>
        <Text style={styles.question}>{this.question}</Text>
        <View style={{flexDirection: 'row', padding: 40}}>
          <Slider
            style={styles.verticalSlider}
            step={5}
            thumbStyle={{width: this.state.thumb, height: this.state.thumb, borderRadius: this.state.borderRadius}}
            minimumValue={this.state.minObservance}
            maximumValue={this.state.maxObservance}
            orientation="vertical"
            value={50}
            onValueChange={val => this.setState({ responseValue: val })}
            onSlidingStart={()=>this.setState({thumb: this.state.thumb*1.2, borderRadius: this.state.borderRadius*1.2})}
            onSlidingComplete={()=>this.setState({thumb: this.state.thumb/1.2, borderRadius: this.state.borderRadius/1.2})}
            thumbTintColor='pink'
            maximumTrackTintColor='#d3d3d3'
            minimumTrackTintColor='pink'
          />
          <View style={styles.sliderLabels}>
            {this.generateLabels()}
          </View>
        </View>
        <NextButton
        onPress={()=>this.onPress()}
        content={this.state.responseValue}
        >
          {"Done"}
        </NextButton>
      </View>
    );
  }
}

export default connect(mapStateToProps)(EditDenominationScreen);

const mapStateToProps = state => {
  return {
    denomination: state.userInfo.user.info.denomination,
  };
};


const styles = StyleSheet.create({
  safeAreaViewSyle:{
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  questionView: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
  },

  question: {
    fontSize: 20,
    paddingLeft: 30,
    fontWeight: 'bold'
  },

  sliderLabels: {
    justifyContent: 'space-between',
    height: 300,
  },

  verticalSlider: {
      height: 300,
  },


})
