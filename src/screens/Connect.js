import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import MenPic from "../../assets/women.jpg";

export default class Connect extends Component {
  render() {
    return (
      <View>
        <View style={styles.matchmaker}>
          <Text style={styles.matchmakerText}> connect </Text>
        </View>
        <View style={styles.home}>
          <ImageBackground
            source={MenPic}
            imageStyle={{ borderRadius: 15 }}
            style={{
              flex: 1,
              borderRadius: 30,
              width: "100%",
              height: 430
            }}>
            <View
              style={{
                position: "absolute",
                top: 350,
                left: 15,
                right: 0,
                bottom: 0
              }}>
              <Text
                style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
                Nikkie, 24
              </Text>
              <Text
                style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
                Los Angeles, CA
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
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
    marginTop: 1,
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
    paddingRight: 120
  },
  home: {
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  }
});
