import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  questionView: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: 'beige', 
    padding: 50
  },
  headerText: {
    fontSize: 20,
    paddingBottom: 3
  },
  touchableOpacityHeader: {
    alignItems: 'center', 
    flex: 1, 
    flexDirection: 'row',
  },
  headerIcons: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 35,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerTouchable: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    width: 100,
    alignItems: 'center'
  },
  answerText: {
    fontSize: 20,
  },
  profilePhoto: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  sliderLabels: {
    justifyContent: 'space-between',
    height: 400,
  },
  verticalSlider: {
    height: 400
  }
})