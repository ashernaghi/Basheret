import React from 'react';
import { Text, View } from 'react-native';
import { Slider } from 'react-native-elements';
import SaveButton from '../components/SaveButton';
import styles from '../styles/styles';
import { connect } from 'react-redux';
import { userInfoUpdate } from '../actions/UserInfoActions';

export class IntroQuestionsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      gesturesEnabled: false,
    }
  };

  constructor(props) {
    super(props);

    this.state= {
      category: ['gender', 'denomination', 'kashrutObservance', 'shabbatObservance'],
      questions: ['What is your gender?', 'How would you describe your denomination according to this range?', 'How would you describe your Kashrut observance according to this range?', 'How would you describe your Shabbat observance according to this range?'],
      labels: [['Male', 'Female'], ['Reform', 'Conservative', 'Traditional', 'Modern Orthodox', 'Yeshivish'], ['Don\'t Keep It', 'Kosher Style', 'Eat Milchig Out', 'Glatt Kosher', 'Chalav Yisrael'], ['Don\'t Keep It', 'Friday Night Dinner', 'Drive To Shul', 'Use My Phone', 'Keep All Chumrahs'] ],
      responseValue: 100,
      minObservance: 0,
      maxObservance: 100,
      thumb: 24,
      borderRadius: 12,
    }

    this.count;
    this.question;
    this.labels;
  }


  onPress(str=""){
    this.props.dispatch(userInfoUpdate(this.state.category[this.count],str ? str : this.state.responseValue));
    this.count++;
    this.count<this.state.questions.length ?
    setTimeout(()=> this.props.navigation.push('Questions', {
      question: this.state.questions[this.count],
      labels: this.state.labels[this.count],
      count: this.count
    }) , 500 ) : 
    setTimeout( ()=> this.props.navigation.navigate('FinishedQuestions', {answeredQuestions: true }), 500 )
    ;
  }

  generateLabels(){
    return this.state.labels[this.count].map((label, index)=> {
      return <Text key={index} >{label}</Text>
    })
  }

  render() {
    this.count = this.props.navigation.getParam('count', 0);

    this.question = this.props.navigation.getParam('question', this.state.questions[this.count]);

    this.labels = this.props.navigation.getParam('labels', this.state.labels[this.count])

    //if its the gender question
    if(this.count===0){
      console.log('LABELS',this.state.labels);
      return (
        <View style={styles.questionView}>
        <Text style={styles.question}>{this.question}</Text>
        <View style={styles.container}>
          <SaveButton text={this.state.labels[this.count][0]} onPress={()=>this.onPress("Male")}/>
          <SaveButton text={this.state.labels[this.count][1]} onPress={()=>this.onPress("Female")}/>
        </View>
      </View>
      );
    }

    return (
      <View style={styles.questionView}>
        <Text style={styles.question}>{this.question}</Text>
        <View style={styles.container}>
          <Slider
            style={styles.verticalSlider}
            step={5}
            thumbStyle={{width: this.state.thumb, height: this.state.thumb, borderRadius: this.state.borderRadius}}
            minimumValue={this.state.minObservance}
            maximumValue={this.state.maxObservance}
            orientation="vertical"
            value={this.state.responseValue}
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
        <SaveButton text={"Save"} onPress={()=>this.onPress()}/>
      </View>
    );
  }
}

export default connect()(IntroQuestionsScreen);

//in component level state, we have a list of question and answer options. The first time this gets called, it grabs it from there and starts asking. When the user needs to navigate to the next question, the next question/answer pair from this data gets passed in as params to the navigate 