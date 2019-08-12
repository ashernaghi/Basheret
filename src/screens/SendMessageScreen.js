import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import plusIcon from "../../assets/plus.png";
import image from "../../assets/sample.jpg";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import firebase from "../../src/actions/firebase";
import { BlurView } from "expo-blur";
const uri =
  "https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png";

class SendMessageScreen extends Component {
  state = { text: "" };

  sendMessage = () => {
    firebase
      .firestore()
      .collection("chats")
      .doc(this.props.navigation.state.params.toWhomId)
      .set({
        senderName: this.props.navigation.state.params.sender,
        senderId: this.props.navigation.state.params.senderId,
        toWhom: this.props.navigation.state.params.toWhom,
        toWhomId: this.props.navigation.state.params.toWhomId,
        message: this.state.text
      });
  };
  render() {
    return (
      <View
        style={{
          width: "100%",
          height: "30%",
          paddingLeft: 20,
          paddingRight: 10,
          marginTop: 60
        }}>
        <Text style={{ color: "rgb(156, 0, 119)", fontSize: 23 }}>
          To: {this.props.navigation.state.params.toWhom}{" "}
        </Text>
        <View style={styles.hairline} />
        <TextInput
          style={{
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 20,
            paddingTop: 0,
            fontSize: 20
          }}
          multiline={true}
          numberOfLines={2}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.sendMessage();
              this.props.navigation.navigate("MessageScreen");
            }}
            style={{
              height: 40,
              width: 190,
              backgroundColor: "rgb(156, 0, 119)",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
              marginBottom: 10
            }}>
            <Text style={{ color: "white", fontSize: 20 }}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.contact
  };
}

export default connect(mapStateToProps)(withNavigation(SendMessageScreen));
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(244, 244, 244)"
  },
  container2: {
    height: "20%",
    width: "100%",
    flexDirection: "row",
    marginTop: 20
  },
  headingText: {
    fontFamily: "FitamintScript",
    color: "rgb(3, 47, 128)",
    fontSize: 60
  },
  container3: {
    backgroundColor: "rgb(244, 244, 244)"
  },
  container4: {
    paddingLeft: 140,
    paddingRight: 140
  },
  matchmaker: {
    marginTop: 10,
    alignItems: "center"
  },
  matchmakerText: {
    fontFamily: "FitamintScript",
    color: "rgb(156, 0, 119)",
    fontSize: 60
  },
  matchContact: {
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonContainer: {
    paddingLeft: 60,
    paddingRight: 120,
    marginTop: 20
  },
  hairline: {
    backgroundColor: "#A2A2A2",
    height: 2,
    width: "100%"
  }
});
