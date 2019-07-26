import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ImageBackground, SafeAreaView,  } from 'react-native';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';




class Header extends React.Component {


	renderLeftButton(){
		if (this.props.leftIconName != undefined) {
			return (
				<View>
			      <TouchableOpacity style={ styles.touchableOpacityHeader } onPress={() => this.props.navigation.navigate(this.props.leftDestination)}>
			      <Ionicons
			        name={this.props.leftIconName}
			        size={30}
			        color="grey"
			        style={styles.leftIcon}
			      />
			      </TouchableOpacity>
			    </View>
			)
		}
		else {
			return (
				<View>
			      <TouchableOpacity style={ styles.touchableOpacityHeader }>
			      <Ionicons
			        size={30}
			        color="grey"
			        style={styles.leftIcon}
			      />
			      </TouchableOpacity>
			    </View>
			)
		}
	}

  	render() {
  			console.log('left icon name is: ' + this.props.leftIconName);

		return (
			<View style={styles.headerStyle}>
			 	{this.renderLeftButton()}
			    <View>
			      <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 50, color: '#00387e', }} >
			      	{this.props.text}
			      </Text>
			    </View>
			    <View>
			      <Ionicons
			      onPress={() => this.props.navigation.navigate(this.props.rightDestination)}
			      name={this.props.rightIconName}
			      size={30}
			      color="grey"
			      style={styles.rightIcon}
			      />
			    </View>
		 	</View>
		);
	}
}


export default Header;

const styles = StyleSheet.create({

  rightIcon: {
    paddingLeft: 35,
    paddingRight: 35,
  },

  leftIcon: {
    paddingLeft: 35,
    paddingRight: 35,
  },

  headerStyle: {
    backgroundColor: '#F4F4F4',
    shadowColor: 'transparent',
    borderBottomColor:'transparent',
    borderBottomWidth: 0,
    height: 85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

});
