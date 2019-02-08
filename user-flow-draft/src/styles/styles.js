import React from 'react';
import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  headerTextRight: {
    fontSize: 20,
    paddingBottom: 3
  },
  headerTextLeft: {
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
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerTouchable: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    alignItems: 'center'
  },
  answerText: {
    fontSize: 25,
  }
})