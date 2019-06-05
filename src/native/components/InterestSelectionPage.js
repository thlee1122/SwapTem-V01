import React, { Component }                               from 'react';
import { View, TouchableOpacity, ScrollView}              from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import SingleInterestSelection                            from './SingleInterestSelection';

class InterestSelectionPage extends Component {
  constructor(props) {
    super(props);
    this.selectedSelections = [];

    this.state = { 
      selectedSelections: []
    };
  }

  addSelection = (item) => {
    this.selectedSelections.push(item.title);

    this.setState({
      selectedSelections: this.selectedSelections
    });
  }

  deleteSelection = (item) => {
    this.selectedSelections = this.selectedSelections.filter((selectedItem) => {
      return selectedItem !== item.title;
    });

    this.setState({
      selectedSelections: this.selectedSelections
    });
  }

  render() {
    const interestedCategories = [
      {
        imageFile: require("../../images/fashion_48px.png"),
        title: "Fashion"
      },
      {
        imageFile: require("../../images/book_48px.png"),
        title: "Books"
      },
      {
        imageFile: require("../../images/imac_48px.png"),
        title: "Electronics"
      },
      {
        imageFile: require("../../images/home-kitchen_48px.png"),
        title: "Home & Kitchen"
      },
      {
        imageFile: require("../../images/game_48px.png"),
        title: "Gaming & Entertainment"
      },
      {
        imageFile: require("../../images/outdoor_48px.png"),
        title: "Sports & Outdoors"
      },
    ];

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <ScrollView>
            <View 
              style={{
                paddingTop: 32, 
                paddingBottom: 32, 
                paddingLeft: 35, 
                paddingRight: 35,
                borderBottomWidth: 1,
                borderBottomColor: '#A3A3A2'
              }}
            >
              <Text style={{color: 'black', fontSize: 16, lineHeight: 24, textAlign: 'center'}}>
                Please select up to 3 categories that you are interested in.
              </Text>
            </View>

            <View 
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start'
              }}
            >
              {
                interestedCategories.map((item, index) => {
                  return (
                    <SingleInterestSelection 
                      key={index}
                      item={item}
                      addSelection={this.addSelection}
                      deleteSelection={this.deleteSelection}
                      selectedSelections={this.state.selectedSelections}
                    />
                  );
                })
              } 
            </View>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 30,
                width: '70%',
                height: 58,
                alignSelf: 'center',
                marginTop: 30,
                marginBottom: 30
              }}
              // onPress={ () => { Actions.home() }}
              onPress={ () => { Actions.termsPage() }}
            >
              <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 18}}>
              Continue
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default InterestSelectionPage;

