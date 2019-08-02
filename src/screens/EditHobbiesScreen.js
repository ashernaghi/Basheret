import React, { Component, Fragment } from "react";
import { StyleSheet, Alert, View, Text, TouchableOpacity, ScrollView,} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { NextButton } from '../components/NextButton';
import { updateUserInfo } from '../actions/UserInfoActions';
import { connect } from "react-redux";

//import { reportUser } from "../actions/index";

class EditHobbiesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
   return {
     header: null,
     }
   };

  constructor(props) {
    super(props);
    const data = [
      'Art',
      'Baking',
      'Card/Board Games',
      'Comedy',
      'Cooking',
      'Food',
      'Hiking',
      'Learning Torah',
      'Martial Arts',
      'Meditation',
      'Movies/TV',
      'Music',
      'Photography',
      'Reading',
      'Sports',
      'Theatre',
      'Traveling',
      'Video Games',
      'Writing',
    ];
    this.state = {
      selectedItems: this.props.selectedhobbies || [],
      unselectedItems: this.props.unselectedhobbies || data,
    };
  }

  handleSave(){
    if(this.state.selectedItems.length == 0){
      this.props.dispatch(updateUserInfo('info', 'selectedhobbies', null ))
      this.props.dispatch(updateUserInfo('info', 'unselectedhobbies', this.state.unselectedItems))
      this.props.navigation.navigate('Profile');
    } else {
      this.props.dispatch(updateUserInfo('info', 'selectedhobbies', this.state.selectedItems ))
      this.props.dispatch(updateUserInfo('info', 'unselectedhobbies', this.state.unselectedItems))
      this.props.navigation.navigate('Profile');
    }
  }

  onUnselectedButtonPressed(index, event) {
    var item = this.state.unselectedItems[index];
    var newUnselectedItems = [...this.state.unselectedItems];
    newUnselectedItems.splice(index, 1);
    this.setState((state, props) => ({
      selectedItems: [...state.selectedItems, item],
      unselectedItems: newUnselectedItems
    }));
  }

  onSelectedButtonPressed(index, event) {
    var item = this.state.selectedItems[index];
    var newSelectedItems = [...this.state.selectedItems];
    newSelectedItems.splice(index, 1);
    this.setState((state, props) => ({
      selectedItems: newSelectedItems,
      unselectedItems: [...state.unselectedItems, item]
    }));
  }
  render() {
    const unSelectedItems = this.state.unselectedItems
      .sort()
      .map((item, index) => (
        <TouchableOpacity
          style={styles.unselectedButtonWrapper}
          key={item}
          onPress={this.onUnselectedButtonPressed.bind(this, index)}
        >
          <Feather
            name="plus"
            size={15}
            color="white"
            style={{ paddingRight: 5 }}
          />
          <Text style={styles.whiteText}>{item}</Text>
        </TouchableOpacity>
      ));
    const selectedItems = this.state.selectedItems.map((item, index) => (
      <TouchableOpacity
        style={styles.selectedButtonWrapper}
        key={item}
        onPress={this.onSelectedButtonPressed.bind(this, index)}
      >
        <MaterialCommunityIcons
          name="close"
          size={15}
          color="black"
          style={{ paddingRight: 5 }}
        />
        <Text style={styles.blackText}>{item}</Text>
      </TouchableOpacity>
    ));
    return (
      <Fragment>
        <View style={styles.container}>

          <View style={styles.headerContainerStyle}>
            <View style={ styles.backArrowStyle }>
              <Ionicons
                name="ios-arrow-back"
                size={27}
                color="grey"
                onPress={() => this.props.navigation.navigate('Profile')}
              />
            </View>
            <View style={styles.logoContainerStyle}>
              <Text style={styles.logoFontStyle}>Basheret</Text>
            </View>
          </View>

          <View style={styles.questionContainerStyle}>
            <Text style={styles.questionTextStyle}>What are your Hobbies:</Text>
          </View>

          <ScrollView style={styles.scrollViewStyle}>
            <View style={styles.resultsContainer}>{selectedItems}</View>
          </ScrollView>

          <ScrollView style={styles.scrollViewStyle}>
            <View style={styles.optionsContainer}>{unSelectedItems}</View>
          </ScrollView>

          <View style={styles.submitContainer}>
            <NextButton
            onPress={() => this.handleSave()}
            content='enabled'>
              <Text>Save</Text>
            </NextButton>
          </View>
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    //reportUser: report => dispatch(reportUser(report)),
    selectedhobbies: state.userInfo.user.info.selectedhobbies,
    unselectedhobbies: state.userInfo.user.info.unselectedhobbies,
  };
};

export default connect(mapStateToProps)(EditHobbiesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
  },

  logoContainerStyle:{
    alignSelf: 'center',
    alignItems:'center',
    justifyContent: 'center',
    marginRight: 90,
    marginLeft: 90, },

  logoFontStyle: {
    fontSize: 50,
    fontFamily: 'fitamint-script',
    color: '#00387e',
  },

  headerContainerStyle: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  backArrowStyle:{
    alignSelf: 'center',
    justifySelf:'flex-start',
  },

  selectedButtonWrapper: {
    margin: 5,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 20,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#00387e',
    flexDirection: 'row',
  },
  unselectedButtonWrapper: {
    margin: 5,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 20,
    backgroundColor: "#00387e",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonWrapper: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 20,
    flex: .4,
    alignItems: "center",
    backgroundColor: "#00387e"
  },

  questionContainerStyle: {
    flex: 0.5,
  },

  questionTextStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 40,
    paddingTop: 20,
    color: 'grey'
  },

  submitContainer: {
    alignItems: 'center',
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: "center",
  },
  resultsContainer: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  optionsContainer: {
    flex: 1,
    display: 'flex',
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  whiteText: {
    color: "white",
    fontSize: 13,
    fontWeight: 'bold',
  },

  blackText: {
    color: "black",
    fontSize: 13,
    fontWeight: 'bold',
  },

  scrollViewStyle:{
    flex: 2,
  },
});
