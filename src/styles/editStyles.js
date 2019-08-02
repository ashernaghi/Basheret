import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
  },

  headerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  backArrowStyle:{
    alignSelf: 'center',
    justifyContent:'flex-start',
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

  questionContainerStyle: {
    flex: 1,
  },

  questionTextStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 40,
    paddingTop: 20,
    color: 'grey'
  },

  buttonContainerStyle: {
    flex: 1,
    justifyContent: 'center'
  },

  emptySpaceContainerStyle: {
    flex: 2,
  },
});
