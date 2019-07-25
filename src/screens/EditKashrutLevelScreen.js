import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Slider } from 'react-native-elements';
import OptionButton from '../components/OptionButton';
import { NextButton } from '../components/NextButton';
import { connect } from 'react-redux';
import { updateUserInfo } from '../actions/UserInfoActions';
import { initializeMatches } from '../actions/matchActions';
import { options, questions, category } from '../common/arrays'

export class EditKashrutLevelScreen extends React.Component {
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
    this.props.dispatch(updateUserInfo('info', category[2], str ? str : (this.state.responseValue-1)));
    this.props.navigation.navigate('Profile')
  }

  generateLabels(){
    return options[2].map((label, index)=> {
      return <Text key={index}>{label}</Text>
    })
  }

  render() {

    this.question = this.props.navigation.getParam('question', questions[2]);
    this.labels = this.props.navigation.getParam('labels', options[2])
    console.log(this.props);
    console.log(this.props.kashrutObservance);
    return (
      <View style={styles.questionView}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
          <Text style={{ fontSize: 50, fontFamily: 'fitamint-script', color: '#00387e', }}>Basheret</Text>
        </View>
        <Text style={styles.question}>{this.question}</Text>
          <View style={{flexDirection: 'row', paddingLeft: 40, paddingTop: 40}}>
            <Slider
              style={styles.verticalSlider}
              step={5}
              thumbStyle={{width: this.state.thumb, height: this.state.thumb, borderRadius: this.state.borderRadius}}
              trackStyle={{ width: this.state.track, borderRadius: this.state.borderRadius }}
              minimumValue={this.state.minObservance}
              maximumValue={this.state.maxObservance}
              orientation="vertical"
              value={this.props.kashrutObservance}
              onValueChange={val => this.setState({ responseValue: val })}
              onSlidingStart={()=>this.setState({thumb: this.state.thumb*1.2, borderRadius: this.state.borderRadius*1.2})}
              onSlidingComplete={()=>this.setState({thumb: this.state.thumb/1.2, borderRadius: this.state.borderRadius/1.2})}
              thumbTintColor='#00387e'
              maximumTrackTintColor='#d3d3d3'
              minimumTrackTintColor='#d3d3d3'
            />
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
    kashrutObservance: state.userInfo.user.info.kashrutObservance,
  };
};

export default connect(mapStateToProps)(EditKashrutLevelScreen);

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
    maxWidth: 225,
    color: 'grey',
  },

  sliderLabels: {
    justifyContent: 'space-between',
    height: '68%',
    paddingLeft: 20,
    paddingTop: '3%'
  },

  verticalSlider: {
      height: '70%',
  },

  button: {
    bottom: 100
  }

})
