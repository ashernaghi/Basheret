import React, { Component, Fragment } from "react";
import { View, Text, Button, FlatList } from "react-native";
import styled from "styled-components/native";
 
export default class ReportUserScreen extends Component {
  constructor(props) {
    super(props);
    const data = [
      "Spam",
      "Inappropriate Picture",
      "Aggressive Behavior",
      "Misc",
      "Harrasment",
      "User Selling Items",
      "Violence",
      "Self-Injury",
      "Hate Speech",
      "Terrorism"
    ];
    this.state = {
      selectedItems: [],
      unselectedItems: data
    };
   }

  onUnselectedButtonPressed(index,event) {
      console.log("HIHI");
      console.log("event:", event);
      console.log("target:", event.target);
      console.log("ttagname:", event.target.tagName);
      console.log("index",index);
      var item = this.state.unselectedItems[index];
      console.log(item)
      console.log(this.state);
      var newUnselectedItems = [...this.state.unselectedItems];
      newUnselectedItems.splice(index,1); 
      this.setState((state,props) => ({
        selectedItems: [...state.selectedItems,item],
        unselectedItems: newUnselectedItems
    }));
  }

  onSelectedButtonPressed(index,event) {
    console.log("event:", event);
    console.log("index",index);
    var item = this.state.selectedItems[index];
    console.log(item)
    console.log(this.state);
    var newSelectedItems = [...this.state.selectedItems];
    newSelectedItems.splice(index,1); 
    this.setState((state,props) => ({
      selectedItems: newSelectedItems,
      unselectedItems: [...state.unselectedItems,item]
  }));
}
  render() {
      console.log("unselected",this.state.unselectedItems);
      console.log("selected",this.state.selectedItems);
    const unSelectedItems = this.state.unselectedItems.sort().map((item,index) => 
        (
      <UnselectedButtonWrapper key={item} onPress={this.onUnselectedButtonPressed.bind(this,index)}>
        <WhiteText>
        {item}
        </WhiteText>
      </UnselectedButtonWrapper>
    )
    );
    const selectedItems = this.state.selectedItems.map((item,index) => (
        <SelectedButtonWrapper key={item}  onPress={this.onSelectedButtonPressed.bind(this,index)}>
              <Text>{item}</Text>
            </SelectedButtonWrapper>
    ));
    return (
      <Fragment>
        <Container>
          <Title>Report a User:</Title>
          <ResultsContainer>
        {selectedItems}
          </ResultsContainer>
          <OptionsContainer>{unSelectedItems}</OptionsContainer>
          <SubmitContainer>
            <SubmitButtonWrapper>
              <WhiteText>Done</WhiteText>
            </SubmitButtonWrapper>
          </SubmitContainer>
        </Container>
      </Fragment>
    );
  }
}

const Container = styled.View`
  height: 80%;
`;

const OptionsContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 6;
  align-items: flex-start;
`;

const ResultsContainer = styled.View`
  flex: 3;
  padding: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const SelectedButtonWrapper = styled.TouchableOpacity`
  margin: 5px 5px;
  padding: 5px 5px;
  background-color: white;
  border-radius: 25px;
  border-style: solid;
  border-width: 2px;
  border-color: #0f52ba;
`;

const UnselectedButtonWrapper = styled.TouchableOpacity`
  margin: 5px 5px;
  padding: 5px 5px;
  background-color: #0f52ba;
  border-radius: 25px;
`;

const Title = styled.Text`
  flex: 1;
  width: 200px;
  padding: 10px 10px;
  font-size: 20px;
`;

const SubmitButtonWrapper = styled(UnselectedButtonWrapper)`
  width: 40%;
  align-items: center;
`;

const WhiteText = styled.Text`
  color: white;
`;

const SubmitContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  width: 100%;
`;
