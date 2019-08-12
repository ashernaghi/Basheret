import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import plusIcon from "../../assets/plus.png";
import image from "../../assets/sample.jpg";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import * as Animatable from "react-native-animatable";
import { BlurView } from "expo-blur";
import firebase from "../../src/actions/firebase";
import { Card, ListItem, Button, Icon } from "react-native-elements";

class MatchMaker extends Component {
  state = {
    show1: false,
    text: "",
    showMessage: false,
    sender: "",
    senderId: "",
    toWhom: "",
    toWhomId: "",
    user1Img: false,
    user2Img: false
  };
  plusImage = () => {
    return (
      <Image
        style={{
          width: 30,
          height: 30
        }}
        source={plusIcon}
      />
    );
  };

  imageIcon = imgUrl => {
    return (
      <Image
        style={{
          width: 120,
          height: 120,
          borderRadius: 400 / 2
        }}
        source={{ uri: imgUrl }}
      />
    );
  };

  sendMessage = () => {
    firebase
      .firestore()
      .collection("chats")
      .doc(this.state.toWhomId)
      .set({
        senderName: this.state.sender,
        senderId: this.state.senderId,
        toWhom: this.state.toWhom,
        toWhomId: this.state.toWhomId,
        message: this.state.text
      })
      .then(() => {
        this.setState({
          text: ""
        });
        Alert.alert(
          "Message Sent Successfully ",
          "To: " + this.state.toWhom,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={styles.matchmaker}>
          <Text style={styles.matchmakerText}> matchmaker </Text>
        </View>
        {this.state.show1 ? (
          <Animatable.View
            animation='zoomIn'
            iterationCount={1}
            style={styles.matchContact}>
            <TouchableOpacity
              style={{
                backgroundColor: "rgb(196, 196, 196)",
                height: 100,
                width: 100,
                borderRadius: 80,
                paddingTop: 30,
                marginRight: 20,
                justifyContent: "center",
                alignItems: "center"
              }}>
              <View style={{ marginBottom: 30 }}>
                {this.props.userData.userProfile1 != ""
                  ? this.imageIcon(this.props.userData.userProfile1)
                  : this.plusImage()}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "rgb(196, 196, 196)",
                height: 100,
                width: 100,
                borderRadius: 80,
                paddingTop: 30,
                marginLeft: 20,
                justifyContent: "center",
                alignItems: "center"
              }}>
              <View style={{ marginBottom: 30 }}>
                {this.props.userData.userProfile2 != ""
                  ? this.imageIcon(this.props.userData.userProfile2)
                  : this.plusImage()}
              </View>
            </TouchableOpacity>
          </Animatable.View>
        ) : (
          <View style={styles.matchContact}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  user1Img: true
                });
                navigate("contactList", { user: 1 });
              }}
              style={{
                backgroundColor: "rgb(196, 196, 196)",
                height: 120,
                width: 120,
                borderRadius: 80,
                paddingTop: 30,
                marginRight: 20,
                justifyContent: "center",
                alignItems: "center"
              }}>
              <View style={{ marginBottom: 30 }}>
                {this.props.userData.userProfile1 != "" && this.state.user1Img
                  ? this.imageIcon(this.props.userData.userProfile1)
                  : this.plusImage()}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  user2Img: true
                });
                navigate("contactList", { user: 2 });
              }}
              style={{
                backgroundColor: "rgb(196, 196, 196)",
                height: 120,
                width: 120,
                borderRadius: 80,
                paddingTop: 30,
                marginLeft: 20,
                justifyContent: "center",
                alignItems: "center"
              }}>
              <View style={{ marginBottom: 30 }}>
                {this.props.userData.userProfile2 != "" && this.state.user2Img
                  ? this.imageIcon(this.props.userData.userProfile2)
                  : this.plusImage()}
              </View>
            </TouchableOpacity>
          </View>
        )}
        {/* <View style={{ width: "100%", height: "30%" }} /> */}
        {this.state.show1 ? (
          <View
            style={{
              width: "100%",
              height: "30%",
              paddingLeft: 40,
              marginTop: 60
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  sender: this.props.userData.username2,
                  senderId: this.props.userData.userId2,
                  toWhom: this.props.userData.username1,
                  toWhomId: this.props.userData.userId1,
                  showMessage: true
                });
              }}>
              <Text style={{ color: "rgb(156, 0, 119)", fontSize: 15 }}>
                {this.plusImage()} Message to {this.props.userData.username1}{" "}
                about {this.props.userData.username2}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  sender: this.props.userData.username1,
                  senderId: this.props.userData.userId1,
                  toWhom: this.props.userData.username2,
                  toWhomId: this.props.userData.userId2,
                  showMessage: true
                });
              }}>
              <Text
                style={{
                  color: "rgb(156, 0, 119)",
                  fontSize: 15,
                  marginTop: 40
                }}>
                {this.plusImage()} Message to {this.props.userData.username2}{" "}
                about {this.props.userData.username1}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: "100%", height: "30%" }} />
        )}
        {!this.state.show1 ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.user1Img && this.state.user2Img) {
                  if (!this.state.show1) {
                    this.props.showHeader({ showHeader: this.state.show1 });
                    this.setState({ show1: true });
                  } else {
                    this.props.showHeader({ showHeader: this.state.show1 });
                    this.setState({ show1: false });
                  }
                } else {
                  Alert.alert(
                    "Both contacts are not selected",
                    "Please first select both contacts to continue",
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                    { cancelable: false }
                  );
                }
              }}
              style={{
                height: 40,
                width: 140,
                backgroundColor: "rgb(156, 0, 119)",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                marginTop: 60,
                marginBottom: 10
              }}>
              <Text style={{ color: "white", fontSize: 20 }}>Connect</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer2}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  show1: false,
                  sender: "",
                  senderId: "",
                  toWhom: "",
                  toWhomId: "",
                  user1Img: false,
                  user2Img: false
                });
                let data = {
                  userId1: "",
                  username1: "",
                  userProfile1: ""
                };
                this.props.adduser1(data);
                this.props.adduser2(data);
                this.props.showHeader({ showHeader: true });
                this.props.showComponent({ show: false });
                this.props.navigation.navigate("MatchMaking", {
                  name: "Brent"
                });
              }}
              style={{
                height: 40,
                width: 250,
                backgroundColor: "rgb(156, 0, 119)",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                marginTop: 45,
                marginBottom: 10
              }}>
              <Text style={{ color: "white", fontSize: 15 }}>
                1/3 of the way to Olam Haba
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.showMessage ? (
          <BlurView tint='light' intensity={130} style={styles.notBlurred}>
            <View
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: 20,
                paddingRight: 10,
                marginTop: 130
              }}>
              <Card title='Send Message' borderColor='black'>
                <Text style={{ color: "rgb(156, 0, 119)", fontSize: 23 }}>
                  To: {this.state.toWhom}{" "}
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
                <View style={styles.buttonContainer12}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        showMessage: false
                      });
                      this.sendMessage();
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
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Send Message
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          </BlurView>
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.contact
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showHeader: data => dispatch({ type: "SHOW_HEADER", payload: data }),
    showComponent: data => dispatch({ type: "SHOW_COMPONENT", payload: data }),
    adduser1: data => dispatch({ type: "ADD_USER_1", payload: data }),
    adduser2: data => dispatch({ type: "ADD_USER_2", payload: data })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(MatchMaker));
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
    paddingLeft: 110,
    paddingRight: 120,
    marginTop: 20
  },
  buttonContainer2: {
    paddingLeft: 60,
    paddingRight: 120,
    marginTop: 120
  },
  notBlurred: {
    ...StyleSheet.absoluteFill
  },
  buttonContainer12: {
    paddingLeft: 30,
    paddingRight: 120,
    marginTop: 20
  }
});
