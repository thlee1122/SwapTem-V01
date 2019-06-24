import React                                        from "react";
import { View, StatusBar, SafeAreaView, TouchableOpacity,
         Image, Dimensions, ScrollView }                                     from 'react-native';
import { Text, Button }                             from 'native-base';
import styles                                       from '../../styles/RegisterItemStyles';
import FeatherIcon                                  from 'react-native-vector-icons/Feather';
import MaterialIcons                                  from 'react-native-vector-icons/MaterialIcons';
import { topSizes, pantSizes, shoesSizes }          from '../../data/sampleRegisterItemData';

class GenderSizeSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownSectionClicked: false,
      currentSizeValue: "",
      showSizeSection: false,
    };

    this.sizeData = [];
  }

  componentWillMount() {
    const { categories, categoryLevelThree } = this.props;

    if(categories.finalSubCategory !== ("Bags" || "Accessories")) {
      this.setState({
        showSizeSection: true
      });

    } else {
      this.setState({
        showSizeSection: false
      })
    }

    if(categories.finalSubCategory === "Shoes") {
      this.sizeData = shoesSizes;

    } else if(
      categoryLevelThree === "Jackets & Coats" || 
      categoryLevelThree === "Tops & Tees" ||
      categoryLevelThree === "Shirts" ||
      categoryLevelThree === "Dresses" ||
      categoryLevelThree === "Activewear" ||
      categoryLevelThree === "Sweaters" ||
      categoryLevelThree === "Socks, Necties & Scarves") {
      this.sizeData = topSizes;

    } else {
      this.sizeData = pantSizes;
    }
  }

  handleDropdown = () => {
    this.setState({
      dropDownSectionClicked: !this.state.dropDownSectionClicked
    });
  }

  handleSizeClick = (sizeValue) => {
    this.setState({
      currentSizeValue: sizeValue,
      dropDownSectionClicked: false
    });
  }

  render() {
    const { genderError, genderClicked, categoryLevelThree, gender, size, type,
            handleSelection, categories, sizeError, 
            // handleDropDown,
            handleInputSubmit, handleBackButton } = this.props;

    const { height, width } = Dimensions.get('window');
    const imageFile = require("../../../images/02.png");

    return (
      <React.Fragment>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          style={{ color: 'white', zIndex: 10 }}
        />

        <SafeAreaView style={{marginTop: -20, backgroundColor: 'black'}}>
          <View style={{backgroundColor: 'black', height: 300}}>
            <TouchableOpacity 
              style={{
                paddingLeft: 10,
                paddingTop: 32
              }} 
              onPress={() => {handleBackButton("gender and size input")}}
            >
              <FeatherIcon name="arrow-left" size={30} color={"white"}/>
            </TouchableOpacity>
            
            <View style={{flexDirection: 'row', marginLeft: 16, marginTop: 132, marginRight: 16}}>
              <Image 
                source={imageFile}
                style={{
                  width: 70,
                  height: 50,
                  alignSelf: 'center',
                  marginRight: 20,
                }}
              />
              <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', lineHeight: 30, width: width * 0.68, paddingTop: 10}}>
                { categories.finalSubCategory === "Shoes" ? "Select Gender" : "Select Gender & Size" }
              </Text>
            </View>
          </View>

          <View style={{paddingTop: 31, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16, lineHeight: 24, fontWeight: 'bold'}}>
                Please select Gender for your item.
              </Text>

              <View 
                style={{
                  flexDirection: 'row', 
                  alignSelf: 'center',
                  marginTop: 24
                }}
              >
                <Button
                  style={{
                    display: 'flex',
                    alignItems: 'center', 
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: "black",
                    height: 64,
                    width: 150,
                    marginTop: 10,
                    marginBottom: 10,
                    marginRight: 20,
                    backgroundColor: genderClicked === true && gender === "Male" ? "black" : "white"
                  }}
                  onPress={(e) => handleSelection("genderSelection", "Male")}
                >
                  <Text 
                    style={{
                      color: genderClicked === true && gender === "Male" ? "white" : "black",
                      textAlign: 'center', 
                      flex: 1,
                    }}
                  >
                    Male
                  </Text>
                </Button>

                <Button
                  style={{
                    backgroundColor: genderClicked === true && gender === "Female" ? "black" : "white",
                    display: 'flex',
                    alignItems: 'center', 
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: "black",
                    height: 64,
                    width: 160,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onPress={(e) => handleSelection("genderSelection", "Female")}
                >
                  <Text 
                    style={{
                      color: genderClicked === true && gender === "Female" ? "white" : "black",
                      textAlign: 'center', 
                      flex: 1,
                    }}
                  >
                    Female
                  </Text>
                </Button>
              </View>

              {
                // categoryLevelThree !== "" && (categories.categoryLevelTwo === "4a380c0c-9b9e-459d-b988-b7d9b2720d7d" ||
                // categories.categoryLevelTwo === "07f12a59-6272-49c5-ad38-ba7623c0cf84") ?
                this.state.showSizeSection === true &&
                <View style={{flexDirection: 'column', marginTop: 32}}>
                  <Text style={{fontSize: 16, lineHeight: 24, fontWeight: 'bold'}}>
                    Please select Size for your item.
                  </Text>
                  
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      width: '100%',
                      height: 60,
                      marginTop: 32,
                      marginBottom: 20,
                      borderColor: "#A3A3A2",
                      backgroundColor: 'white'
                    }}
                    onPress={(e) => this.handleDropdown()}
                  >
                    <Text
                      style={{
                        fontSize: 14, 
                        fontWeight: 'bold', 
                        lineHeight: 20,
                        flex: 1,
                        marginTop: 18,
                        color: "#A3A3A2",
                        paddingLeft: 16
                      }}
                    >
                      {
                        this.state.currentSizeValue === "" ?
                        "Select size"
                        : `US ${this.state.currentSizeValue}`
                      }
                    </Text>
                  </TouchableOpacity>

                  {
                    this.state.dropDownSectionClicked === true &&
                    <ScrollView style={{marginTop: 10, height: 275, borderWidth: 1, borderColor: '#ECEBEB'}}>
                    {
                      this.sizeData.map((singleSizeData, index) => {
                        return (
                          <View style={{flexDirection: 'row'}} key={index}>
                            <TouchableOpacity
                              style={{
                                borderTopWidth: 1, 
                                borderTopColor: '#ECEBEB',
                                width: '100%'
                              }}
                              onPress={(e) => this.handleSizeClick(singleSizeData.value)}
                            >
                              <Text style={{fontSize: 16, fontWeight: 'bold', padding: 16}}>
                                {`US ${singleSizeData.value}`}
                              </Text>
                            </TouchableOpacity>

                            {
                              this.state.currentSizeValue === singleSizeData.value &&
                              <MaterialIcons
                                name="check"
                                size={22}
                                style={{
                                  position: 'absolute',
                                  right: 16,
                                  top: 16,
                                }}
                              />
                            }
                          </View>
                        )
                      })
                    }
                    </ScrollView>
                  }
                </View>
              }
            </View>

            <View style={{alignSelf: 'center', marginTop: 50}}>
              <TouchableOpacity 
                style={{
                  flexDirection: 'row', 
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 278,
                  height: 58,
                  marginBottom: 40,
                  borderColor: this.state.currentSizeValue !== "" && genderClicked === true ? "black" : '#CECECE',
                  backgroundColor: this.state.currentSizeValue !== "" && genderClicked === true ? "white" :'#CECECE'
                }}
                disabled={this.state.currentSizeValue !== "" && genderClicked === true ? false : true}
                onPress={(e) => handleInputSubmit("typeGenderSizeInput", this.state.currentSizeValue)}
              >
                <Text 
                  style={{
                    fontSize: 14, 
                    fontWeight: 'bold', 
                    lineHeight: 20,
                    flex: 1,
                    textAlign: 'center',
                    marginTop: 18,
                    color: this.state.currentSizeValue !== "" && genderClicked === true ? "black" : 'white'
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

export default GenderSizeSection;

