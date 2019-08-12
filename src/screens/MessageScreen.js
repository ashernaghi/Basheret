import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from "react-native";
import plusIcon from "../../assets/plus.png";
import image from "../../assets/sample.jpg";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { BlurView } from "expo-blur";
const uri =
  "https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png";

class MessageScreen extends Component {
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
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <View style={styles.matchmaker}>
          <Text style={styles.matchmakerText}> matchmaker </Text>
        </View>
        <View style={styles.matchContact}>
          <TouchableOpacity
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
              {this.props.userData.userProfile1 != ""
                ? this.imageIcon(this.props.userData.userProfile1)
                : this.plusImage()}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
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
              {this.props.userData.userProfile2 != ""
                ? this.imageIcon(this.props.userData.userProfile2)
                : this.plusImage()}
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            height: "30%",
            paddingLeft: 40,
            marginTop: 60
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("SendMessageScreen", {
                sender: this.props.userData.username2,
                senderId: this.props.userData.userId2,
                toWhom: this.props.userData.username1,
                toWhomId: this.props.userData.userId1
              });
            }}>
            <Text style={{ color: "rgb(156, 0, 119)", fontSize: 15 }}>
              {this.plusImage()} Message to {this.props.userData.username1}{" "}
              about {this.props.userData.username2}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("SendMessageScreen", {
                sender: this.props.userData.username1,
                senderId: this.props.userData.userId1,
                toWhom: this.props.userData.username2,
                toWhomId: this.props.userData.userId2
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("MatchMaking", { name: "Brent" });
            }}
            style={{
              height: 40,
              width: 250,
              backgroundColor: "rgb(156, 0, 119)",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
              marginBottom: 10
            }}>
            <Text style={{ color: "white", fontSize: 15 }}>
              1/3 of the way to Olam Haba
            </Text>
          </TouchableOpacity>
        </View>
        <BlurView tint='light' intensity={50} style={styles.notBlurred}>
          <Image style={{ width: 96, height: 96 }} source={{ uri }} />
        </BlurView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.contact
  };
}

export default connect(mapStateToProps)(withNavigation(MessageScreen));
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
    marginTop: 120
  },
  notBlurred: {
    flex: 1,
    backgroundColor: "rgb(244, 244, 244)"
  }
});
