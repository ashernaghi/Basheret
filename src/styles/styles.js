import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

  headerText: {
    fontSize: 15,
    paddingBottom: 3,
    fontWeight: 'bold',
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
    textAlign: 'center',
  },

  uploadPhotoOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  uploadIcon:{
    padding: 30,
  },

  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 10,
    height: 55,
  },
  filterContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  settingsContainer: {
    backgroundColor: '#F4F4F4'
  },
  settingsTitle: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'grey',
  },
  profilePhoto: {
    height: 360,
    width: 375,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'flex-end',

  },
})
