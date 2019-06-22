import React                                        from "react";
import { View, StatusBar, SafeAreaView, TouchableOpacity,
         Image, Dimensions, ScrollView }                                     from 'react-native';
import { Text, Button }                             from 'native-base';
import { Dropdown }                                 from 'react-native-material-dropdown';
import { Switch }                                   from 'react-native-switch';
import styles                                       from '../../styles/RegisterItemStyles';
import FeatherIcon                                  from 'react-native-vector-icons/Feather';
import MaterialIcons                                  from 'react-native-vector-icons/MaterialIcons';
import { topSizes, pantSizes, shoesSizes }          from '../../data/sampleRegisterItemData';

class GenderSizeSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // selectedSwapCategories: [],
      dropDownSectionClicked: false,
      // selectedSwapCategoryObj: {
      //   Fashion: [],
      //   Electronics: [],
      //   Books: []
      // },

      sizeClicked: false
    };

    // this.clothingFilters = [];
    // this.shoesFilters = [];
    // this.bagsFilters = [];
    // this.jewelryFilters = [];
    this.showSizeSection = false;

    this.sizeData = [];
  }

  componentWillMount() {
    const { categories, categoryLevelThree } = this.props;

    if(categories.finalSubCategory !== ("Bags" || "Accessories")) {
      this.showSizeSection = true;
    } else {
      this.showSizeSection = false;
    }



    // data={
    //   categories.categoryLevelTwo === "07f12a59-6272-49c5-ad38-ba7623c0cf84" ? shoesSizes
    //   : categoryLevelThree === "Jackets & Coats" || 
    //     categoryLevelThree === "Tops & Tees" ||
    //     categoryLevelThree === "Shirts" ||
    //     categoryLevelThree === "Dresses" ||
    //     categoryLevelThree === "Activewear" ||
    //     categoryLevelThree === "Sweaters" ||
    //     categoryLevelThree === "Socks, Necties & Scarves" ? topSizes
    //   : pantSizes
    // }

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

  handleSizeClick = () => {
    this.setState({
      sizeClicked: !this.state.sizeClicked
    });
  }


  render() {
    const { genderError, genderClicked, categoryLevelThree, gender, size, type,
            handleSelection, categories, sizeError, handleDropDown,
            handleInputSubmit, handleBackButton } = this.props;

    console.log("55555555 this.props", this.props);

    const { height, width } = Dimensions.get('window');
    const imageFile = require("../../../images/02.png");

    //categories.finalSubCategory === "Shoes"

    console.log("@@@@@@ this.sizeData", this.sizeData);

    return (
      <React.Fragment>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          style={{ color: 'white', zIndex: 10 }}
        />

        <SafeAreaView style={{marginTop: -20, backgroundColor: 'black'}}>
          <View
            style={{backgroundColor: 'black', height: 300}}
          >
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
                {
                  categories.finalSubCategory === "Shoes" ?
                  "Select Gender"
                  :
                  "Select Gender & Size"
                }
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
                // style={styles.genderButtonSection}
              >
                <Button
                  // styles.genderSelectionButon
                  style={{
                    display: 'flex',
                    alignItems: 'center', 
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: "black",
                    height: 64,
                    width: 160,
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
                    marginRight: 20
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
                this.showSizeSection === true &&
                <View style={{flexDirection: 'column', marginTop: 40}}>
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
                      Select swap categories
                    </Text>
                  </TouchableOpacity>


                  
                  {
                    this.state.dropDownSectionClicked === true &&
                    <ScrollView style={{marginTop: 40, height: 280, borderWidth: 1, borderColor: '#ECEBEB'}}>
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
                              onPress={(e) => this.handleSizeClick()}
                            >
                              <Text style={{fontSize: 16, fontWeight: 'bold', padding: 16}}>
                                {`US ${singleSizeData.value}`}
                              </Text>
                            </TouchableOpacity>

                            {
                              this.state.sizeClicked === true &&
                              <MaterialIcons
                                name="check"
                                size={22}
                                style={{
                                  position: 'absolute',
                                  right: 0,
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
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

export default GenderSizeSection;




{/* <React.Fragment>
  <View style={styles.genderSection}>
    <Text style={{fontWeight: 'bold', fontSize: 22, marginBottom: 10}}>Gender</Text>
    <Text style={[styles.genderSectionSubtitle, {color: genderError === true ? "red" : "#00529b"}]}>
      Please select Gender for your item.
    </Text>

    <View style={styles.genderButtonSection}>
      <Button
        style={[ styles.genderSelectionButon, 
          {backgroundColor: genderClicked === true && gender === "Male" ? "#3578e5" : "white"}]}
        onPress={(e) => handleSelection("genderSelection", "Male")}
      >
        <Text 
          style={[ styles.genderSelectionButtonText,
            {color: genderClicked === true && gender === "Male" ? "white" : "#3578e5",}
            ]}>Male</Text>
      </Button>

      <Button
        style={[ styles.genderSelectionButon, 
          {backgroundColor: genderClicked === true && gender === "Female" ? "#3578e5" : "white"}]}
        onPress={(e) => handleSelection("genderSelection", "Female")}
      >
        <Text 
          style={[ styles.genderSelectionButtonText,
            {color: genderClicked === true && gender === "Female" ? "white" : "#3578e5"}
            ]}>Female</Text>
      </Button>
    </View>
  </View>

  {
    categoryLevelThree !== "" && (categories.categoryLevelTwo === "4a380c0c-9b9e-459d-b988-b7d9b2720d7d" ||
    categories.categoryLevelTwo === "07f12a59-6272-49c5-ad38-ba7623c0cf84") ?
    <View style={styles.sizeSection}>
      <Text style={{fontWeight: 'bold', fontSize: 22, marginBottom: 10}}>Size</Text>
      <Text style={[styles.sizeSectionSubTitle, {color: sizeError === true ? "red" : "#00529b"}]}>
        Please select Size for your item.
      </Text>
      
      <Dropdown
        label={"Please select size"}
        labelFontSize={13}
        labelHeight={10}
        labelPadding={1}
        baseColor="black"
        selectedItemColor="#3578e5"
        data={
          categories.categoryLevelTwo === "07f12a59-6272-49c5-ad38-ba7623c0cf84" ? shoesSizes
          : categoryLevelThree === "Jackets & Coats" || 
            categoryLevelThree === "Tops & Tees" ||
            categoryLevelThree === "Shirts" ||
            categoryLevelThree === "Dresses" ||
            categoryLevelThree === "Activewear" ||
            categoryLevelThree === "Sweaters" ||
            categoryLevelThree === "Socks, Necties & Scarves" ? topSizes
          : pantSizes
        }
        dropdownPosition={4.2}
        textColor="#3578e5"
        containerStyle={styles.selectDropdown}
        dropdownOffset={{top: 0, left: 0 }}
        rippleInsets={{top:0, bottom: 0}}
        onChangeText={(value)=>{handleDropDown("sizeDropdown", value)}}
      />
    </View>
    : null
  }

  <Button 
    style={[styles.hashTagePageButton, {marginTop: 30}]}
    onPress={(e) => handleInputSubmit("typeGenderSizeInput")}
    disabled={gender !== "" && size !== "" && type.length !== 0 && genderClicked === true ? false : true}
  >
    <Text style={styles.hashTagePageButtonText}>Next</Text>
  </Button>
</React.Fragment> */}


