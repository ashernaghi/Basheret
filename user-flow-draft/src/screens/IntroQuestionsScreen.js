import React from 'react';
import { View, Text, Button } from 'react-native';
import IntroQuestion from '../components/IntroQuestion';
import IntroAnswerList from '../components/IntroAnswerList';
import { connect } from 'react-redux';
import { userInfoUpdate } from '../actions/UserInfoActions';

export class IntroQuestionsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  constructor(props) {
    super(props);

    this.state= {
      category: ['denomination', 'kashrutLevel', 'shabbatObservance'],
      questions: ['What denomination do you identify with?', 'What is your Kashrut level?', 'How would you define your Shabbat observance?'],
      answers: [ ['Modern Orthodox', 'Yeshivish', 'Open Orthodox', 'Traditional'], ['Glatt Kosher', 'I eat milchig out', 'Kosher Style'], ['I keep all the Chumrahs', 'I use my phone', 'I drive to shul'] ],
    }

    this.count;
    this.question;
    this.answers;
  }

  onPress(userAnswer){
    //dispatch action with category 
    this.props.dispatch(userInfoUpdate(this.state.category[this.count], userAnswer));
    this.count++;
    this.count<this.state.questions.length ?
    setTimeout(()=> this.props.navigation.push('Questions', {
      question: this.state.questions[this.count],
      answers: this.state.answers[this.count],
      count: this.count
    }) , 500 ) : 
    setTimeout( ()=> this.props.navigation.navigate('SetupProfile', {answeredQuestions: true }), 500 )
    ;
  }

  render() {
    this.count = this.props.navigation.getParam('count', 0);

    this.question = this.props.navigation.getParam('question', this.state.questions[this.count]);

    this.answers = this.props.navigation.getParam('answers', this.state.answers[this.count])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'beige', padding: 50 }}>
        <IntroQuestion question={this.question}/>
        <IntroAnswerList onPress={(userAnswer)=>this.onPress(userAnswer)} answers={this.answers} />
      </View>
    );
  }
}

export default connect()(IntroQuestionsScreen);

//in component level state, we have a list of question and answer options. The first time this gets called, it grabs it from there and starts asking. When the user needs to navigate to the next question, the next question/answer pair from this data gets passed in as params to the navigate 