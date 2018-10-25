import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Animated, ScrollView} from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';

import { Dropdown } from 'react-native-material-dropdown';
// import { connect } from 'react-redux';

// class FadeInView extends React.Component {
//   state = {
//     fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
//   }

//   componentDidMount() {
//     Animated.timing(                  // Animate over time
//       this.state.fadeAnim,            // The animated value to drive
//       {
//         toValue: 1,                   // Animate to opacity: 1 (opaque)
//         duration: 1000,              // Make it take a while
//       }
//     ).start();                        // Starts the animation
//   }

//   render() {
//     let { fadeAnim } = this.state;

//     return (
//       <Animated.View                 // Special animatable View
//         style={{
//           ...this.props.style,
//           opacity: fadeAnim,         // Bind opacity to animated value
//         }}
//       >
//         {this.props.children}
//       </Animated.View>
//     );
//   }
// }

class RegisterItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // text: 'Useless Placeholder',
      // modalVisible: false
      assistanceResponse: 1,
      userResponse: 1

    };
    this.assistanceResponse = 1;

    this.registerDataObj = {
      firstSelection: "",
      categorySelection: "",
      genderSelection: ""
    };
  }

  handleSelection = (selectionType, value) => {
    if(this.state.assistanceResponse === 1) {
      this.registerDataObj["firstSelection"] = value;
    } else if(this.state.assistanceResponse === 3) {
      this.registerDataObj["genderSelection"] = value;
    }

    this.setState({
      assistanceResponse: this.state.assistanceResponse + 1,
      userResponse: this.state.userResponse + 1
    });

    // console.log(this.registerDataObj);
  }

  handleDropDown = (dropDownName, value) => {

    if(dropDownName === "categoryDropdown") {
      this.registerDataObj["categorySelection"] = value;
    }
    console.log(dropDownName);
    console.log(value);

    this.setState({
      assistanceResponse: this.state.assistanceResponse + 1,
      userResponse: this.state.userResponse + 1
    });
  }



  render() {
    console.log(this.registerDataObj);
    console.log(this.state);

    let mainCategory = [
      { value: 'Automotive & Industrial'},
      { value: 'Beauty'},
      { value: 'Books'}, 
      { value: 'Clothing, Shoes & Accessories'}, 
      { value: 'Collectibles & Art'},
      { value: 'Electronics'},
      { value: 'Health'},
      { value: 'Home, Garden & Tools'},
      { value: 'Toys, Kids & Baby'},
      { value: 'Sporting & Outdoor Goods'},
    ];

    let fashionCategory = [
      { value: 'Automotive & Industrial' },
    ];

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>        
          
            <ScrollView contentContainerStyle={{ flex: 1 }} scrollEnabled={true}>
              <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 20, height: 555, }}>
                <View 
                  style={{
                    width: 80, 
                    height: 80, 
                    backgroundColor:'#959595',
                    borderRadius: 50,
                  }}
                />
                <Text style={{fontWeight: 'bold', marginTop: 15}}>Personal SwapTem Assistant</Text>

                {/* First Aisstant Conversation START */}
                <View style={{flexDirection: 'row', marginTop: 25, marginLeft: 15}}>
                  <View 
                    style={{
                      width: 50, 
                      height: 50, 
                      backgroundColor:'#E3E3E3',
                      borderRadius: 50,
                    }}
                  />

                  <View style={{flex: 1, flexDirection: 'column', marginLeft: 15, marginRight: 15}}>
                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10}}>
                      <Text>
                        Hello, Tae Hoon! {"\n"}
                        I'm your personal assistant to help you list your item. {"\n"}
                        Let's get started!
                        This will only take a minute.
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginTop: 10}}>
                      <Text style={{height: 40}}>
                        First of all, are you trying to {"\n"}SWAP, SELL or open for BOTH?
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>

                    
                  </View>
                </View>
                {/* First Aisstant Conversation END */}

                {/* First User Response START */}
                {
                  this.state.assistanceResponse >= 2 && this.registerDataObj["firstSelection"] !== null || undefined ?
                  
                  <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                    <Text style={{color: 'white'}}>
                      {this.registerDataObj["firstSelection"].toUpperCase()}
                    </Text>

                    <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                  </View>
                  
                  :
                  <React.Fragment></React.Fragment>
                }
                {/* First User Respsonse END */}

                {/* Second Aisstant Conversation START */}
                {
                  this.state.userResponse >= 2 ?
                    <View style={{flexDirection: 'row', marginTop: 10, marginLeft: -10 }}>
                      <View 
                        style={{
                          width: 50, 
                          height: 50, 
                          backgroundColor:'#E3E3E3',
                          borderRadius: 50,
                        }}
                      />
                      <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15}}>
                        <Text>
                          Great! Which category of product {"\n"}
                          are you trying to {`${this.registerDataObj['firstSelection'].toUpperCase()}`}?
                        </Text>

                        <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                      </View>
                    </View>
                  :
                    <React.Fragment></React.Fragment>
                }
                {/* Second Aisstant Conversation END */}

                {/* Second User Response START */}
                {
                  this.state.assistanceResponse >= 3 && this.registerDataObj["categorySelection"] !== null || undefined ?

                  <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                    <Text style={{color: 'white'}}>
                      {this.registerDataObj["categorySelection"].toUpperCase()}
                    </Text>

                    <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                  </View>

                  :
                  <React.Fragment></React.Fragment>
                }
                {/* Second User Response SECOND */}

                {/* Third Aisstant Conversation START */}

                  {
                    this.state.userResponse >= 3 && this.registerDataObj["categorySelection"] === "Clothing, Shoes & Accessories" ?
                    <View style={{flexDirection: 'row', marginTop: 10, marginLeft: -10 }}>
                      <View 
                        style={{
                          width: 50, 
                          height: 50, 
                          backgroundColor:'#E3E3E3',
                          borderRadius: 50,
                        }}
                      />
                      <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15}}>
                        <Text>
                          You have selected {`${this.registerDataObj["categorySelection"].toUpperCase()}`}. {"\n"}
                          Please choose GENDER for your item.
                        </Text>

                        <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                      </View>
                    </View>
                    :
                    <React.Fragment></React.Fragment>
                  }

                {/* Third Aisstant Conversation END */}

                {/* Third User Response START */}
                  {
                    this.state.assistanceResponse >= 4 && this.registerDataObj["genderSelection"] !== null || undefined ?

                    <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                      <Text style={{color: 'white'}}>
                        {this.registerDataObj["genderSelection"].toUpperCase()}
                      </Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>

                    :
                    <React.Fragment></React.Fragment>
                  }
                {/* Third User Response END */}

              </View>

              




            </ScrollView>

            {/* User Response Section START */}
            <View style={{flex: 1, top: 0, height: 66, borderTopWidth: 1, borderTopColor: '#959595'}}>
              {
                this.state.assistanceResponse === 1 ?
                
                <View style={{display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginLeft: 15, marginRight: 15}}>
                  <Button 
                    style={{
                      display: 'flex', 
                      width: 100, 
                      alignItems: 'center', 
                      alignSelf: 'center', 
                      height: 40
                    }}
                    onPress={(e) => this.handleSelection("tradeSelection", "swap")} 
                  >
                    <Text style={{textAlign: 'center', marginLeft: 10}}>SWAP</Text>
                  </Button>

                  <Button 
                    style={{
                      display: 'flex', 
                      width: 100, 
                      alignItems: 'center', 
                      alignSelf: 'center', 
                      height: 40
                    }}
                    onPress={(e) => this.handleSelection("tradeSelection", "sell")} 
                  >
                    <Text style={{textAlign: 'center', marginLeft: 15}}>SELL</Text>
                  </Button>

                  <Button 
                    style={{
                      display: 'flex', 
                      width: 100, 
                      alignItems: 'center', 
                      alignSelf: 'center', 
                      height: 40
                    }}                    
                    onPress={(e) => this.handleSelection("tradeSelection", "both")} 
                  >
                    <Text style={{textAlign: 'center', marginLeft: 10}}>BOTH</Text>
                  </Button>
                </View>



                : this.state.assistanceResponse === 2 ?
                <View>
                  <Dropdown
                    label='Select category'
                    baseColor="black"
                    selectedItemColor="#3578e5"
                    data={mainCategory}
                    dropdownPosition={4.2}
                    labelFontSize={15}
                    textColor="#3578e5"
                    containerStyle={{backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 2, height: 60, width: 345, marginLeft: 15, marginRight: 15, paddingLeft: 10, paddingRight: 10, paddingTop: 5}}
                    dropdownOffset={{top: 20, left: 0 }}
                    onChangeText={(value)=>{this.handleDropDown("categoryDropdown", value)}}
                  />
                </View>
                


                : this.state.assistanceResponse === 3 && this.registerDataObj["categorySelection"] === "Clothing, Shoes & Accessories" ?
                <View style={{display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginLeft: 15, marginRight: 15}}>
                  <Button 
                    style={{
                      display: 'flex', 
                      width: 100, 
                      alignItems: 'center', 
                      alignSelf: 'center', 
                      height: 40
                    }}
                    onPress={(e) => this.handleSelection("genderSelection", "Male")} 
                  >
                    <Text style={{textAlign: 'center', marginLeft: 10}}>Male</Text>
                  </Button>

                  <Button 
                    style={{
                      display: 'flex', 
                      width: 100, 
                      alignItems: 'center', 
                      alignSelf: 'center', 
                      height: 40,
                      backgroundColor: '#FA6D7D'
                    }}
                    onPress={(e) => this.handleSelection("genderSelection", "Female")} 
                  >
                    <Text style={{textAlign: 'center', marginLeft: 5}}>Female</Text>
                  </Button>

                  <Button 
                    style={{
                      display: 'flex', 
                      width: 100, 
                      alignItems: 'center', 
                      alignSelf: 'center', 
                      height: 40,
                      backgroundColor: '#1F222F'
                    }}                    
                    onPress={(e) => this.handleSelection("genderSelection", "Unisex")} 
                  >
                    <Text style={{textAlign: 'center', marginLeft: 8}}>Unisex</Text>
                  </Button>
                </View>

                :
                <React.Fragment></React.Fragment>
              }

            </View>
            {/* User Response Section END */}
          
        </Content>
      </Container>
    );
  }
}

export default RegisterItemComponent;