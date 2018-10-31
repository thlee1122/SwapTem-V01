import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Animated, ScrollView, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';

import { Dropdown } from 'react-native-material-dropdown';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import MultiSelect from 'react-native-multiple-select';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import ImagePicker from 'react-native-image-picker';



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


const items = [
  {  
    name: "Fashion",
    id: 0,
    children: [{
        name: "Women's Clothing",
        id: 10,
      },{
        name: "Men's Clothing",
        id: 17,
      },{
        name: "Women's Shoes",
        id: 13,
      },{
        name: "Men's Shoes",
        id: 14,
      },{
        name: "Accessories",
        id: 15,
      },{
        name: "Handbags",
        id: 16,
      }, {
        name: "Beauty",
        id: 16,
      }, {
        name: "Jewelry",
        id: 16,
      }, {
        name: "Watches",
        id: 16,
      }]
  },
  {
    name: "Electronics",
    id: 1,
    children: [{
        name: "Camera & Photo",
        id: 20,
      },{
        name: "Cell Phones, Smart Watches, & Accessories",
        id: 21,
      },{
        name: "Computers & Tablets",
        id: 22,
      },{
        name: "Portable Audio & Headphones",
        id: 23,
      }, {
        name: "Smart Home",
        id: 23,
      }, {
        name: "TV, Video & Home Audio",
        id: 23,
      }, {
        name: "Video Games & Console",
        id: 23,
      }, {
        name: "Drones",
        id: 23,
      }]
  },
  {
    name: "Collectibles",
    id: 2,
    children: [{
        name: "Art",
        id: 33,
      }, {
        name: "Antiques",
        id: 33,
      }, {
        name: "Coins & Paper Money",
        id: 30,
      },{
        name: "Collectibles",
        id: 31,
      },{
        name: "Comics",
        id: 32,
      },{
        name: "Entertainment Memorabilia",
        id: 33,
      }, {
        name: "Sports Trading Card",
        id: 33,
      }, {
        name: "Sports Memorabilia & Apparel",
        id: 33,
      }, {
        name: "Stamps",
        id: 33,
      }]
  },
];

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


class RegisterItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // text: 'Useless Placeholder',
      // modalVisible: false
      assistanceResponse: 1,
      userResponse: 1,
      itemTitle: "",
      brandName: "",
      itemDescription: "",
      hashTags: "",
      recommendedValueSelection: "",



      selectedItems: []
    };
    this.assistanceResponse = 1;

    this.registerDataObj = {
      firstSelection: "",
      categorySelection: "",
      genderSelection: "",
      fashionCategorySelection: "",
      shoesCategorySelection: "",
      itemTitle: "",
      brandName: "",
      shoesSize: "",
      itemCondition: "",
      itemDescription: "",
      hashTags: "",
      recommendedValueSelection: "",

      selectedItems: ""
    };

    this._scrollViewBottom = "";
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  handleSelection = (selectionType, value) => {
    if(this.state.assistanceResponse === 1) {
      this.registerDataObj["firstSelection"] = value;
    } else if(this.state.assistanceResponse === 3) {
      this.registerDataObj["genderSelection"] = value;
    } else if(selectionType === "conditionSelection") {
      this.registerDataObj["itemCondition"] = value;
    } else if(selectionType === "recommendedValueSelection") {
      this.registerDataObj["recommendedValueSelection"] = value
    } else if(selectionType === "categoryMultiSelection") {
      this.registerDataObj["selectedItems"] = this.state.selectedItems;
    }

    this.setState({
      assistanceResponse: this.state.assistanceResponse + 1,
      userResponse: this.state.userResponse + 1
    });

    console.log(typeof this.registerDataObj['selectedItems']);
    // this.refs._scrollView.scrollTo({x: 0, y: this._scrollViewBottom, animated: true});
    // console.log(this.registerDataObj);
  }

  handleDropDown = (dropDownName, value) => {

    if(dropDownName === "categoryDropdown") {
      this.registerDataObj["categorySelection"] = value;
    } else if(dropDownName === "fashionCategoryDropdown") {
      this.registerDataObj["fashionCategorySelection"] = value;
    } else if(dropDownName === "shoesCategoryDropdown") {
      this.registerDataObj["shoesCategorySelection"] = value;
    } else if(dropDownName === "shoesSizeDropdown") {
      this.registerDataObj["shoesSize"] = value;
    }

    console.log(dropDownName);
    console.log(value);

    this.setState({
      assistanceResponse: this.state.assistanceResponse + 1,
      userResponse: this.state.userResponse + 1
    });

    // this.refs._scrollView.scrollTo({x: 0, y: this._scrollViewBottom, animated: true});
  }

  handleInputSubmit = (inputType) => {
    if(inputType === "itemTitleInput") {
      this.registerDataObj["itemTitle"] = this.state.itemTitle;
    } else if(inputType === "itemBrandInput") {
      this.registerDataObj["brandName"] = this.state.brandName;
      this.setState({
        brandName: ""
      });

      // console.log(this.refs.brandNameInput);
      // console.log(this.refs.brandNameInput._lastNativeText);
      // this.refs.brandNameInput._lastNativeText = "";
      // this.refs.brandNameInput.clear();

    } else if(inputType === "itemDescInput") {
      this.registerDataObj["itemDescription"] = this.state.itemDescription;
      this.setState({
        itemDescription: ""
      });
    } else if(inputType === "hashTagsInput") {
      this.registerDataObj["hashTags"] = this.state.hashTags;
      this.setState({
        hashTags: ""
      });
    }

    this.setState({
      assistanceResponse: this.state.assistanceResponse + 1,
      userResponse: this.state.userResponse + 1
    });

    // this.refs._scrollView.scrollTo({x: 0, y: this._scrollViewBottom, animated: true});
  }

  // handleTextInputKeyboard = () => {
  //   // const userResponseSection = document.getElementById("userResponseSection");
  //   // console.log(userResponseSection);
  //   const userResponseSection = this.refs.userResponseSection;
  //   userResponseSection.props.style.marginBottom = 300;
  //   console.log(userResponseSection);
  // }

  componentDidMount() {
    console.log("sdsdsds");

    if(this.state.assistanceResponse === 8) {
      console.log("@@#@#@ assistanceResponse", this.state.assistanceResponse);
    }
  }

  pickImageHandler = () => {
   ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
     if (res.didCancel) {
       console.log("User cancelled!");
     } else if (res.error) {
       console.log("Error", res.error);
     } else {
       this.setState({
         pickedImage: { uri: res.uri }
       });

     }
   });
  }


  render() {
    console.log(this.registerDataObj);
    console.log(this.state);

    const mainCategory = [
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

    const fashionCategory = [
      { value: 'Clothing' },
      { value: 'Shoes' },
      { value: 'Jewelry' },
      { value: 'Watches'},
      { value: 'Accessories'},
    ];

    const maleShoesCategory = [
      { value: 'Boots' },
      { value: 'Dress Shoes' },
      { value: 'Lace-up Shoes' },
      { value: 'Loafers' },
      { value: 'Sandals' },
      { value: 'Slippers' },
      { value: 'Sneakers' },
    ];

    const femaleShoesCategory = [
      { value: 'Ballerina Shoes' },
      { value: 'Boots' },
      { value: 'Dress Shoes' },
      { value: 'Flats' },
      { value: 'Heels' },
      { value: 'Lace-up Shoes' },
      { value: 'Loafers' },
      { value: 'Sandals' },
      { value: 'Slippers' },
      { value: 'Sneakers' },
    ];

    const shoesSizes = [
      { value: 4 },
      { value: 4.5 },
      { value: 5 },
      { value: 5.5 },
      { value: 6 },
      { value: 6.5 },
      { value: 7 },
      { value: 7.5 },
      { value: 8 },
      { value: 8.5 },
      { value: 9 },
      { value: 9.5 },
      { value: 10 },
      { value: 10.5 },
      { value: 11 },
      { value: 11.5 },
      { value: 12 },
    ];

    console.log(this.state);

    const { selectedItems } = this.state;

    // let _scrollViewBottom;
    console.log(this._scrollViewBottom);

    return (
      <Container>
        <View style={{backgroundColor: 'white', flex: 1}}>        
          
            <ScrollView 
              ref='_scrollView'
              contentContainerStyle={{ paddingVertical: 20 }} 
              alwaysBounceVertical={true}
              onContentSizeChange={(contentWidth, contentHeight)=>{
              this._scrollViewBottom = contentHeight;
              }}
            >
              <View 
                style={{
                  width: 80, 
                  height: 80, 
                  backgroundColor:'#959595',
                  borderRadius: 50,
                }}
              />
              <Text style={{fontWeight: 'bold', marginTop: 15}}>Personal Assistant</Text>

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
                      First of all, are you trying to {"\n"}<Text style={{fontWeight: "bold"}}>SWAP, SELL</Text> or open for <Text style={{fontWeight: "bold"}}>BOTH</Text>?
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
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15 }}>
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
                        are you trying to <Text style={{fontWeight: "bold"}}>{`${this.registerDataObj['firstSelection'].toUpperCase()}`}</Text>?
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
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />
                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        You have selected <Text style={{fontWeight: "bold"}}>{`${this.registerDataObj["categorySelection"].toUpperCase()}`}</Text>. {"\n"}                        
                      </Text>
                      <Text style={{marginTop: -15}}>Please choose <Text style={{fontWeight: "bold"}}>GENDER</Text> for your item.</Text>

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
              
              {/* Fourth Aisstant Conversation START */}
                {
                  this.state.userResponse >= 4 && this.registerDataObj["gender"] !== null || undefined ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        Alright! What kind of <Text style={{fontWeight: "bold"}}>{`${this.registerDataObj["categorySelection"].toUpperCase()}`}</Text> is it?
                      </Text>
                      
                      <Text style={{marginTop: 5}}>
                        Please choose one <Text style={{fontWeight: "bold"}}>sub category</Text> from the list.
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>

                }
              {/* Fourth Aisstant Conversation END */}

              {/* Fourth User Response START */}
                {
                  this.state.assistanceResponse >= 5 && this.registerDataObj["fashionCategorySelection"] !== null || undefined ?
                    <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                      <Text style={{color: 'white'}}>
                        {this.registerDataObj["fashionCategorySelection"].toUpperCase()}
                      </Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  :
                  <React.Fragment></React.Fragment>
                }

              {/* Fourth User Response END */}

              {/* Fifth Aisstant Conversation START */}
                {
                  this.state.userResponse >= 5 && this.registerDataObj["fashionCategorySelection"] !== null || undefined ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        Awesome! What kind of <Text style={{fontWeight: "bold"}}>{`${this.registerDataObj["fashionCategorySelection"].toUpperCase()}`}</Text> is it?
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>
                }

              {/* Fifth Aisstant Conversation END */}

              {/* Fifth User Response START */}
                {
                  this.state.assistanceResponse >= 6 && this.registerDataObj["shoesCategorySelection"] !== null || undefined ?
                    <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                      <Text style={{color: 'white'}}>
                        {this.registerDataObj["shoesCategorySelection"].toUpperCase()}
                      </Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  :
                  <React.Fragment></React.Fragment>
                }

              {/* Fifth User Response END */}

              {/* Sixth Aisstant Conversation START */}
                {
                  this.state.userResponse >= 6 && this.registerDataObj["shoesCategorySelection"] !== null || undefined ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        <Text style={{fontWeight: "bold"}}>{`${this.registerDataObj["shoesCategorySelection"].toUpperCase()}`}</Text>! {"\n"}
                        Please provide title for your item.
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>
                }

              {/* Sixth Aisstant Conversation END */}

              {/* Sixth User Response START */}
                {
                  this.state.assistanceResponse >= 7 && this.registerDataObj["itemTitle"] !== null || undefined ?
                    <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                      <Text style={{color: 'white'}}>
                        {this.registerDataObj["itemTitle"].toUpperCase()}
                      </Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  :
                  <React.Fragment></React.Fragment>
                }

              {/* Sixth User Response END */}

              {/* Seventh Aisstant Conversation START */}
                {
                  this.state.userResponse >= 7 && this.registerDataObj["itemTitle"] !== null || undefined ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        What size is it?
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>
                }

              {/* Seventh Aisstant Conversation END */}

              {/* Seventh User Response START */}
                {
                  this.state.assistanceResponse >= 8 && this.registerDataObj["shoesSize"] !== null || undefined ?
                    <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                      <Text style={{color: 'white'}}>
                        {this.registerDataObj["shoesSize"]}
                      </Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Seventh User Response END */}

              {/* Seventh Aisstant Conversation START */}
                {
                  this.state.userResponse >= 8 && this.registerDataObj["shoesSize"] !== null || undefined ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        Please select a CONDITION
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Seventh Aisstant Conversation END */}

              {/* Eigth User Response START */}
                {
                  this.state.assistanceResponse >= 9 && this.registerDataObj["itemCondition"] !== null || undefined ?
                    <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                      <Text style={{color: 'white'}}>
                        {this.registerDataObj["itemCondition"].toUpperCase()}
                      </Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Eigth User Response END */}

              {/* Eigth Aisstant Conversation START */}
                {
                  this.state.userResponse >= 9 && this.registerDataObj["itemCondition"] !== null || undefined ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        What brand is it?
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Eigth Aisstant Conversation END */}

              {/* Ninth User Response START */}
                {
                  this.state.assistanceResponse >= 10 && this.registerDataObj["brandName"] !== null || undefined ?
                    <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                      <Text style={{color: 'white'}}>
                        {this.registerDataObj["brandName"]}
                      </Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Ninth User Response END */}

              {/* Ninth Aisstant Conversation START */}
                {
                  this.state.userResponse >= 10 && this.registerDataObj["brandName"] !== null || undefined ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        Please describe your item. {"\n"}
                        (5+ words)
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Ninth Aisstant Conversation END */}

              {/* Tenth User Response START */}
                {
                  this.state.assistanceResponse >= 11 && this.registerDataObj["itemDescription"] !== null || undefined ?
                    <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                      <Text style={{color: 'white'}}>
                        {this.registerDataObj["itemDescription"]}
                      </Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Tenth User Response END */}

              {/* Tenth Aisstant Conversation START */}
                {
                  this.state.userResponse >= 11 && this.registerDataObj["itemDescription"] !== null || undefined ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        Please add tags for your item (# tags){"\n"}
                        Ex. #shoes #sneaker #nike
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Tenth Aisstant Conversation END */}

              {/* Eleventh User Response START */}
                {
                  this.state.assistanceResponse >= 12 && this.registerDataObj["hashTags"] !== null || undefined ?
                    <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                      <Text style={{color: 'white'}}>
                        {this.registerDataObj["hashTags"]}
                      </Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Eleventh User Response END */}

              {/* Eleventh Aisstant Conversation START */}
                {
                  this.state.userResponse >= 12 && this.registerDataObj["hashTags"] !== null || undefined ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text style={{fontWeight: 'bold'}}>
                        Based on the information{"\n"}
                        provided, the "Recommended Value"
                        is $60.00.
                      </Text>

                      <Text style={{marginTop: 8}}>
                        In average, it takes about {"\n"}
                        3-5 days to get Swapped.
                      </Text>

                      <Text style={{marginTop: 8}}>
                        Would you like to use {"\n"}
                        "Recommended Value"?
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Eleventh Aisstant Conversation END */}

              {/* Twelfth User Response START */}
                {
                  this.state.assistanceResponse >= 13 && this.registerDataObj["recommendedValueSelection"] !== null || undefined ?
                    <View style={{display: "flex", backgroundColor: "#3578e5", borderRadius: 10, padding: 10, alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
                      <Text style={{color: 'white'}}>
                        {this.registerDataObj["recommendedValueSelection"]}
                      </Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Twelfth User Response END */}

              {/* Twelfth Aisstant Conversation START */}
                {
                  this.state.userResponse >= 13 && this.registerDataObj["recommendedValueSelection"] !== null || undefined ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        Please select up to <Text style={{fontWeight: 'bold'}}>5
                        categories</Text> that you are
                        looking to {this.registerDataObj["firstSelection"].toUpperCase()}.
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Twelfth Aisstant Conversation END */}

              {/* Thirteenth User Response START */}
                {
                  this.state.assistanceResponse >= 14 && this.registerDataObj["selectedItems"].length > 0 ?
                    <View 
                      style={{
                          display: "flex", 
                          backgroundColor: "#3578e5", 
                          borderRadius: 10, 
                          padding: 10, 
                          alignSelf: 'flex-end', 
                          marginRight: 15, 
                          marginTop: 10,
                          maxWidth: 280
                        }}>
                      <Text style={{color: 'white'}}>
                        You have selected following categories: {"\n"}
                      </Text>
                      <Text style={{fontWeight: 'bold', color: 'white', marginTop: 5}}>{this.registerDataObj["selectedItems"].join(", ")}</Text>

                      <Text style={{color: "white", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Thirteenth User Response END */}

              {/* Thirteenth Aisstant Conversation START */}
                {
                  this.state.userResponse >= 14 && this.registerDataObj["selectedItems"].length > 0 ?
                  <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                    <View 
                      style={{
                        width: 50, 
                        height: 50, 
                        backgroundColor:'#E3E3E3',
                        borderRadius: 50,
                      }}
                    />

                    <View style={{backgroundColor: "#E3E3E3", borderRadius: 10, padding: 10, marginLeft: 15, width: 280}}>
                      <Text>
                        Thank you for providing me that information!
                      </Text>
                      <Text style={{marginTop: 5}}>
                        One last step, could you please{"\n"}
                        upload or take photos of your item.
                      </Text>

                      <Text style={{color: "#575757", marginTop: 10, fontSize: 12}}>35 mins ago</Text>
                    </View>
                  </View>
                  :
                  <React.Fragment></React.Fragment>
                }
              {/* Thirteenth Aisstant Conversation END */}

            </ScrollView>

            {/* User Response Section START */}
            <KeyboardAvoidingView 
              // behavior="padding" 
              behavior="position"
              keyboardVerticalOffset={88}
              enabled
            >
            <View 
              ref="userResponseSection" 
              style={{
                top: 0,
                minHeight: 60,
                maxHeight: 250,
                borderTopWidth: 1, 
                borderTopColor: '#959595', 
                marginBottom: 0, 
                zIndex: 10, 
                backgroundColor: 'white'
              }}
            >
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

                : this.state.assistanceResponse === 4 && this.registerDataObj["genderSelection"] !== null || undefined ?
                <View>
                  <Dropdown
                    label='Select sub category'
                    baseColor="black"
                    selectedItemColor="#3578e5"
                    data={fashionCategory}
                    dropdownPosition={4.2}
                    labelFontSize={15}
                    textColor="#3578e5"
                    containerStyle={{backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 2, height: 60, width: 345, marginLeft: 15, marginRight: 15, paddingLeft: 10, paddingRight: 10, paddingTop: 5}}
                    dropdownOffset={{top: 20, left: 0 }}
                    onChangeText={(value)=>{this.handleDropDown("fashionCategoryDropdown", value)}}
                  />
                </View>

                : this.state.assistanceResponse === 5 && this.registerDataObj["fashionCategorySelection"] === "Shoes" ?
                <View>
                  <Dropdown
                    label={`Select sub category for ${this.registerDataObj["fashionCategorySelection"]}`}
                    baseColor="black"
                    selectedItemColor="#3578e5"
                    data={
                      this.registerDataObj["fashionCategorySelection"] === "Shoes" && this.registerDataObj["genderSelection"] === "Male" ?
                      maleShoesCategory
                      :
                      femaleShoesCategory
                    }
                    dropdownPosition={4.2}
                    labelFontSize={15}
                    textColor="#3578e5"
                    containerStyle={{backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 2, height: 60, width: 345, marginLeft: 15, marginRight: 15, paddingLeft: 10, paddingRight: 10, paddingTop: 5}}
                    dropdownOffset={{top: 20, left: 0 }}
                    onChangeText={(value)=>{this.handleDropDown("shoesCategoryDropdown", value)}}
                  />
                </View>
      
                : this.state.assistanceResponse === 6 && this.registerDataObj["shoesCategorySelection"] !== null || undefined ?
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                  <TextInput
                    style={{
                      height: 45, 
                      backgroundColor: '#EDEDED', 
                      borderRadius: 10, 
                      color: "#00529b", 
                      fontWeight: 'bold',
                      width: 315,
                    }}
                    paddingLeft={10}
                    placeholder="Ex. Fresh White Low-top Sneakers"
                    onChangeText={(text) => this.setState({itemTitle: text})}
                  >
                  </TextInput>

                  <Button 
                    style={{marginLeft: 10, backgroundColor: 'white'}}
                    onPress={(e) => this.handleInputSubmit("itemTitleInput")}
                    disabled={this.state.itemTitle !== "" && this.state.itemTitle.length > 0 ? false : true}
                  >
                    <FontAwesomeIcon 
                      name="send" 
                      size={20} 
                      color={ 
                        this.state.itemTitle !== "" && this.state.itemTitle.length > 0 ? "#3578e5"
                        : "#E3E3E3"
                      } 
                    />
                  </Button>
                </View>

                : this.state.assistanceResponse === 7 && this.registerDataObj["itemTitle"] !== null || undefined ?
                <View>
                  <Dropdown
                    label={`Select size for your ${this.registerDataObj["itemTitle"].toUpperCase()}`}
                    baseColor="black"
                    selectedItemColor="#3578e5"
                    data={shoesSizes}
                    dropdownPosition={4.2}
                    labelFontSize={15}
                    textColor="#3578e5"
                    containerStyle={{backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 2, height: 60, width: 345, marginLeft: 15, marginRight: 15, paddingLeft: 10, paddingRight: 10, paddingTop: 5}}
                    dropdownOffset={{top: 20, left: 0 }}
                    onChangeText={(value)=>{this.handleDropDown("shoesSizeDropdown", value)}}
                  />
                </View>

                : this.state.assistanceResponse === 8 && this.registerDataObj["shoesSize"] !== null || undefined ?

                <ScrollView
                  showsHorizontalScrollIndicator={true}
                  horizontal={true}
                >
                  <View style={{display: 'flex', flex: -1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginLeft: 15, marginRight: 15}}>
                    <Button 
                      style={{
                        display: 'flex',
                        alignItems: 'center', 
                        alignSelf: 'center', 
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: "#3578e5",
                        height: 90,
                        marginTop: 10,
                        marginBottom: 10
                      }}
                      onPress={(e) => this.handleSelection("conditionSelection", "New")} 
                    > 
                      <View style={{display: 'flex', flexDirection: 'column', padding: 0}}>
                        <Text style={{textAlign: 'center', color: "#3578e5"}}>New</Text>
                        <Text style={{textAlign: 'center', color: "#3578e5", fontSize: 10}}>
                          New with tags {"\n"}
                          (NWT). Unopened {"\n"}
                          package. Unused.
                        </Text>
                      </View>
                    </Button>

                    <Button 
                      style={{
                        display: 'flex',
                        alignItems: 'center', 
                        alignSelf: 'center', 
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: "#3578e5",
                        height: 90,
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10
                      }}
                      onPress={(e) => this.handleSelection("conditionSelection", "Like New")} 
                    > 
                      <View style={{display: 'flex', flexDirection: 'column', padding: 0}}>
                        <Text style={{textAlign: 'center', color: "#3578e5"}}>Like New</Text>
                        <Text style={{textAlign: 'center', color: "#3578e5", fontSize: 10}}>
                          New without tags {"\n"}
                          (NWOT). No signs {"\n"}
                          of wear. Unused.
                        </Text>
                      </View>
                    </Button>

                    <Button 
                      style={{
                        display: 'flex',
                        alignItems: 'center', 
                        alignSelf: 'center', 
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: "#3578e5",
                        height: 90,
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10
                      }}
                      onPress={(e) => this.handleSelection("conditionSelection", "Good")} 
                    > 
                      <View style={{display: 'flex', flexDirection: 'column', padding: 0}}>
                        <Text style={{textAlign: 'center', color: "#3578e5"}}>Good</Text>
                        <Text style={{textAlign: 'center', color: "#3578e5", fontSize: 10}}>
                          Gently used One/ {"\n"}
                          few minor flaws. {"\n"}
                          Functional.
                        </Text>
                      </View>
                    </Button>

                    <Button 
                      style={{
                        display: 'flex',
                        alignItems: 'center', 
                        alignSelf: 'center', 
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: "#3578e5",
                        height: 90,
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10
                      }}
                      onPress={(e) => this.handleSelection("conditionSelection", "Fair")} 
                    > 
                      <View style={{display: 'flex', flexDirection: 'column', padding: 0}}>
                        <Text style={{textAlign: 'center', color: "#3578e5"}}>Fair</Text>
                        <Text style={{textAlign: 'center', color: "#3578e5", fontSize: 10}}>
                          Used, functional, {"\n"}
                          multiple flaws / {"\n"}
                          defects
                        </Text>
                      </View>
                    </Button>

                    <Button 
                      style={{
                        display: 'flex',
                        alignItems: 'center', 
                        alignSelf: 'center', 
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: "#3578e5",
                        height: 90,
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10
                      }}
                      onPress={(e) => this.handleSelection("conditionSelection", "Poor")} 
                    > 
                      <View style={{display: 'flex', flexDirection: 'column', padding: 0}}>
                        <Text style={{textAlign: 'center', color: "#3578e5"}}>Poor</Text>
                        <Text style={{textAlign: 'center', color: "#3578e5", fontSize: 10}}>
                          Major flaws, may {"\n"}
                          be damaged, {"\n"}
                          for parts
                        </Text>
                      </View>
                    </Button>
                  </View>
                </ScrollView>

                : this.state.assistanceResponse === 9 && this.registerDataObj["itemCondition"] !== null || undefined ?
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                  <TextInput
                    style={{
                      height: 45,
                      backgroundColor: '#EDEDED', 
                      borderRadius: 10,
                      color: "#00529b",
                      fontWeight: 'bold',
                      width: 315,
                    }}
                    ref="brandNameInput"
                    paddingLeft={10}
                    placeholder="Ex. Nike"
                    value={this.state.brandName}
                    onChangeText={(text) => this.setState({brandName: text})}
                  >
                  </TextInput>

                  <Button 
                    style={{marginLeft: 10, backgroundColor: 'white'}}
                    onPress={(e) => this.handleInputSubmit("itemBrandInput")}
                    disabled={this.state.brandName !== "" && this.state.brandName.length > 0 ? false : true}
                  >
                    <FontAwesomeIcon 
                      name="send" 
                      size={20} 
                      color={ 
                        this.state.brandName !== "" && this.state.brandName.length > 0 ? "#3578e5"
                        : "#E3E3E3"
                      } 
                    />
                  </Button>
                </View>
                
                : this.state.assistanceResponse === 10 && this.registerDataObj["brandName"] !== null || undefined ?
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                  <TextInput
                    style={{
                      height: 45,
                      backgroundColor: '#EDEDED', 
                      borderRadius: 10,
                      color: "#00529b",
                      fontWeight: 'bold',
                      width: 315,
                    }}
                    paddingLeft={10}
                    placeholder="Ex. Very clean and beautiful white low-top sneaker!"
                    value={this.state.itemDescription}
                    onChangeText={(text) => this.setState({itemDescription: text})}
                  >
                  </TextInput>

                  <Button 
                    style={{marginLeft: 10, backgroundColor: 'white'}}
                    onPress={(e) => this.handleInputSubmit("itemDescInput")}
                    disabled={this.state.itemDescription !== "" && this.state.itemDescription.length > 0 ? false : true}
                  >
                    <FontAwesomeIcon 
                      name="send" 
                      size={20} 
                      color={ 
                        this.state.itemDescription !== "" && this.state.itemDescription.length > 0 ? "#3578e5"
                        : "#E3E3E3"
                      } 
                    />
                  </Button>
                </View>

                : this.state.assistanceResponse === 11 && this.registerDataObj["itemDescription"] !== null || undefined ?
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15}}>
                  <TextInput
                    style={{
                      height: 45,
                      backgroundColor: '#EDEDED', 
                      borderRadius: 10,
                      color: "#00529b",
                      fontWeight: 'bold',
                      width: 315,
                    }}
                    paddingLeft={10}
                    placeholder="Ex. #shoes #sneakers #nike"
                    value={this.state.hashTags}
                    onChangeText={(text) => this.setState({hashTags: text})}
                  >
                  </TextInput>

                  <Button 
                    style={{marginLeft: 10, backgroundColor: 'white'}}
                    onPress={(e) => this.handleInputSubmit("hashTagsInput")}
                    disabled={this.state.hashTags !== "" && this.state.hashTags.length > 0 ? false : true}
                  >
                    <FontAwesomeIcon 
                      name="send" 
                      size={20} 
                      color={ 
                        this.state.hashTags !== "" && this.state.hashTags.length > 0 ? "#3578e5"
                        : "#E3E3E3"
                      } 
                    />
                  </Button>
                </View>
                
                : this.state.assistanceResponse === 12 && this.registerDataObj["hashTags"] !== null || undefined ?
                <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginLeft: 15, marginRight: 15}}>
                  <Button 
                    style={{
                      display: 'flex',
                      alignItems: 'center', 
                      alignSelf: 'center', 
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: "#3578e5",
                      height: 90,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 30
                    }}
                    onPress={(e) => this.handleSelection("recommendedValueSelection", "Yes, Use Recommended Value")} 
                  > 
                    <View style={{display: 'flex', flexDirection: 'column', padding: 0}}>
                      <Text style={{textAlign: 'center', color: "#3578e5"}}>YES,</Text>
                      <Text style={{textAlign: 'center', color: "#3578e5", fontSize: 10}}>
                        Use Recommended{"\n"}
                        Value
                      </Text>
                    </View>
                  </Button>

                  <Button 
                    style={{
                      display: 'flex',
                      alignItems: 'center', 
                      alignSelf: 'center', 
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: "#3578e5",
                      height: 90,
                      marginTop: 10,
                      marginBottom: 10,
                      marginRight: 30
                    }}
                    onPress={(e) => this.handleSelection("recommendedValueSelection", "No, I will input my own value.")} 
                  > 
                    <View style={{display: 'flex', flexDirection: 'column', padding: 0}}>
                      <Text style={{textAlign: 'center', color: "#3578e5"}}>NO,</Text>
                      <Text style={{textAlign: 'center', color: "#3578e5", fontSize: 10}}>
                        I will input my own{"\n"}
                        value.
                      </Text>
                    </View>
                  </Button>
                </View>
                
                : this.state.assistanceResponse === 13 && this.registerDataObj["recommendedValueSelection"] !== null || undefined ?
                <View style={{flex: -1}}>
                  <SectionedMultiSelect
                    hideTags
                    style={{borderWidth: 1, borderColor: 'black', backgroundColor: 'blue', zIndex: 10}}
                    items={items} 
                    uniqueKey='name'
                    subKey='children'
                    selectText='Select Categories'
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={this.state.selectedItems}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Submit"
                    // showRemoveAll
                    colors={{
                      success: '#3578e5',
                      chipColor: '#3578e5'
                    }}

                    styles={{
                      backdrop: {
                        justifyContent: 'center',
                      },
                      container: {
                        width: '80%',
                        height: '70%',
                        flex: 0,
                        alignSelf: 'center',
                        marginTop: -20
                      },

                      selectToggle: {
                        backgroundColor: '#CCC',
                        borderWidth: 0.5,
                        // borderColor: 'black',
                        padding: 20,
                        height: 100,
                        marginTop: 8,
                        width: 320,
                        alignItems: 'center', 
                        alignSelf: 'center',
                        borderRadius: 10,
                        // flex: 1,
                        marginBottom: 8
                      },

                      selectToggleText: {
                        color: 'black',
                        zIndex: 10,
                        height: 40,
                        flex: 1,
                        paddingTop: 8
                      },

                      selectToggleIconComponent: {
                        height: 15,
                        color: 'white',
                        zIndex: 10
                      }

                    }}
                  />
                  <Text 
                    style={{
                      fontSize: 13, 
                      color: 'red', 
                      alignItems: 'center', 
                      alignSelf: 'center',
                      display: this.state.selectedItems.length > 5 ? "flex" : "none"
                    }}
                  >
                    Please only select up to 5 categories. 
                  </Text>
                  <Button 
                    style={{
                      alignItems: 'center', 
                      alignSelf: 'center', 
                      width: 320, 
                      borderRadius: 10, 
                      marginTop: 5, 
                      height: 40, 
                      marginBottom: 10
                    }}
                    disabled={this.state.selectedItems.length > 1 && this.state.selectedItems.length <= 5 ? false : true}
                    onPress={(e) => this.handleSelection("categoryMultiSelection", "category multi selection submit")} 
                  >
                    <Text style={{textAlign: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: 115  }}>Submit</Text>
                  </Button>

                </View>

                : this.state.assistanceResponse === 14 ?
                <View style={{flex: -1}}>
                  <Button onPress={this.pickImageHandler} >
                    <Text>Pick Image</Text>
                  </Button>
                </View>
                
                :
                <React.Fragment></React.Fragment>
              }
             </View>
             </KeyboardAvoidingView>
            {/* User Response Section END */}
          
        </View>
        
      </Container>
    );
  }
}

export default RegisterItemComponent;