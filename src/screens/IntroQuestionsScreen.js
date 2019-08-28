import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Slider } from 'react-native-elements';
import OptionButton from '../components/OptionButton';
import { NextButton } from '../components/NextButton';
import { DisabledNextButton } from '../components/DisabledNextButton';
// import styles from '../styles/styles';
import { connect } from 'react-redux';
import { updateUserInfo } from '../actions/UserInfoActions';
import { initializeMatches } from '../actions/matchActions';
import {options, questions, category} from '../common/arrays'

export class IntroQuestionsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      gesturesEnabled: false,
    }
  };

    //We import questions/answers. The first time this gets called, it grabs it from there and starts asking. When the user needs to navigate to the next question, the next question/answer pair from this data gets passed in as params to the navigate
    state= {
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

    count;
    question;
    labels;

  onPress(str=""){
    //send response to db:
    this.props.dispatch(updateUserInfo('info', category[this.count], str ? str : (this.state.responseValue-1)));
    //set default for the preference:
    this.props.dispatch(updateUserInfo('preferences', this.state.preference[this.count], str==='Male' ? 'Female' : str==='Female' ?
  'Male' : this.state.preferenceDefault[this.count]));

    this.count++;

    if(this.count<questions.length){
      setTimeout(()=> this.props.navigation.push('Questions', {
        question: questions[this.count],
        labels: options[this.count],
        count: this.count
      }) , 500 )
    }
    //finished answering questions
    else{
      //send defaults for initial account setup
      this.props.dispatch(updateUserInfo('preferences', 'agePreference', [18, 39]));
      this.props.dispatch(updateUserInfo('preferences', 'distancePreference', 1000));
      this.props.dispatch(updateUserInfo('preferences', 'discoverable', true));
      this.props.dispatch(updateUserInfo('initialSetupComplete', null, true));
      this.props.dispatch(updateMatches());

      setTimeout( ()=> this.props.navigation.navigate('LoadingApp'), 500 )
      ;
    }
  }

  generateLabels(){
    return options[this.count].map((label, index)=> {
      return <Text key={index}>{label}</Text>
    })
  }

  buttonDisplay(){
    if (this.state.selected==='Female'){
      return(
      <View style={{ flex: 1, backgroundColor: '#F4F4F4'}}>
        <OptionButton label={options[this.count][0]} onPress={()=>this.buttonSelected("Male")} style={styles.optionButtonStyleUnselected} />
        <OptionButton label={options[this.count][1]} onPress={()=>this.buttonSelected("Female")} style={styles.optionButtonStyleSelected} />
      </View>)
    } else if (this.state.selected==='Male') {
      return(
      <View style={{ flex: 1, backgroundColor: '#F4F4F4'}}>
        <OptionButton label={options[this.count][0]} onPress={()=>this.buttonSelected("Male")} style={styles.optionButtonStyleSelected} />
        <OptionButton label={options[this.count][1]} onPress={()=>this.buttonSelected("Female")} style={styles.optionButtonStyleUnselected} />
      </View>)
    } else {
      return(
    <View style={{ flex: 1, backgroundColor: '#F4F4F4'}}>
      <OptionButton label={options[this.count][0]} onPress={()=>this.buttonSelected("Male")} style={styles.optionButtonStyleUnselected} />
      <OptionButton label={options[this.count][1]} onPress={()=>this.buttonSelected("Female")} style={styles.optionButtonStyleUnselected} />
    </View>)
    }
  }

  buttonSelected(str=""){
    this.setState({ selected: str })
    console.log(this.state.selected)

  }


  render() {
    this.count = this.props.navigation.getParam('count', 0);

    this.question = this.props.navigation.getParam('question', questions[this.count]);

    this.labels = this.props.navigation.getParam('labels', options[this.count])

    //if its the gender question
    if(this.count===0){
      return (
      <SafeAreaView style={styles.safeAreaViewSyle}>

          <View style={styles.logoContainerStyle}>
            <Text style={styles.logoFontStyle}>Basheret</Text>
          </View>


          <View style={styles.questionView}>
            <Text style={styles.question}>{this.question}</Text>
          </View>

          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            {this.buttonDisplay()}
          </View>

          <View style={{ flex: 1, backgroundColor: '#F4F4F4'}}>
            <NextButton
            onPress={()=>this.onPress(this.state.selected)}
            content={this.state.selected}
            >
            Next
            </NextButton>
          </View>

    </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.safeAreaViewSyle}>
        <View style={styles.logoContainerStyle}>
          <Text style={styles.logoFontStyle}>Basheret</Text>
        </View>

        <View style={styles.questionView}>
          <Text style={styles.question}>{this.question}</Text>
        </View>

        <View style={styles.sliderContainerStyle}>
          <Slider
            style={styles.verticalSlider}
            step={5}
            thumbStyle={{width: this.state.thumb, height: this.state.thumb, borderRadius: this.state.borderRadius}}
            trackStyle={{ width: this.state.track, borderRadius: this.state.borderRadius }}
            minimumValue={this.state.minObservance}
            maximumValue={this.state.maxObservance}
            orientation="vertical"
            value={50}
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

        <View style={styles.buttonContainer}>
          <NextButton
          onPress={()=>this.onPress()}
          content={this.state.responseValue}
          >
            Next
          </NextButton>
        </View>
      </SafeAreaView>

    );
  }
}

export default connect()(IntroQuestionsScreen);



const styles = StyleSheet.create({
  safeAreaViewSyle:{
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  logoContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoFontStyle: {
    fontSize: 50,
    fontFamily: 'fitamint-script',
    color: '#00387e',
  },

  questionView: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  question: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 40,
    paddingTop: 20,
    color: 'grey',
    maxWidth: 300,
  },

  optionButtonStyleUnselected:{
    borderRadius: 30,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 7,
  },

  optionButtonStyleSelected:{
    borderRadius: 30,
    borderColor: '#00387e',
    borderWidth: 2,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 7,
  },


  sliderLabels: {
    justifyContent: 'space-between',
    height: '98%',
    paddingLeft: 20,
    paddingTop: '3%'
  },

  verticalSlider: {
      height: '100%',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  sliderContainerStyle: {
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 3
  },

})
