import React from 'react';
import { View, Text, Button } from 'react-native';
import IntroQuestion from '../components/IntroQuestion';
import IntroAnswerList from '../components/IntroAnswerList';

export default class IntroQuestionsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: null,
    }
  };

  constructor(props) {
    super(props);

    this.state= {
      questions: ['What denomination do you identify as?', 'What is your Kashrut observance?'],
      answers: [ ['Modern Orthodox', 'Conservative', 'Reformed'], ['Strict Glatt', 'Kosher Style', 'I eat dairy out'] ],
    }

    this.count;
    this.question;
    this.answers;
  }

  onPress(){
    this.count++;
    this.count<this.state.questions.length 
    ?
    setTimeout(()=> this.props.navigation.push('Questions', {
      question: this.state.questions[this.count],
      answers: this.state.answers[this.count],
      count: this.count
    }) , 500 )
    : 
    setTimeout( ()=> this.props.navigation.navigate('FinisedQuestions', {answeredQuestions: true }), 500 )
    ;
  }

  render() {
    this.count = this.props.navigation.getParam('count', 0);

    this.question = this.props.navigation.getParam('question', this.state.questions[this.count]);

    this.answers = this.props.navigation.getParam('answers', this.state.answers[this.count])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <IntroQuestion question={this.question}/>
        <IntroAnswerList onPress={()=>this.onPress()} answers={this.answers} />
      </View>
    );
  }
}

//in component level state, we have a list of question and answer options. The first time this gets called, it grabs it from there and starts asking. When the user needs to navigate to the next question, the next question/answer pair from this data gets passed in as params to the navigate 