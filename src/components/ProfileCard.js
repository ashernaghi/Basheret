import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ProfileCard = (props) => {
  return(
    <View style={styles.cardStyle}>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <Text style={styles.textStyle}>{props.content}</Text>
    </View>
  )
}


export { ProfileCard };

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: "#fbfbfb",
    alignSelf: 'stretch',
    padding: 10
  },

  titleStyle: {
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingLeft: 5
  },

  textStyle: {
    fontSize: 13,
    fontFamily: 'Helvetica Neue',
    padding: 5
  },

});
