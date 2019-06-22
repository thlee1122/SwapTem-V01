import React                                            from "react";
import { View, Dimensions, SafeAreaView, StatusBar,
         Image, TouchableOpacity, ScrollView }                                     from 'react-native';  
import { Text  }                                        from 'native-base';
import { Dropdown }                                     from 'react-native-material-dropdown';
import FeatherIcon                                      from 'react-native-vector-icons/Feather';
import MaterialIcons                                    from 'react-native-vector-icons/MaterialIcons';
import styles                                           from '../../styles/RegisterItemStyles';

class FashionTypeSelection extends React.Component {
  constructor(props) {
    super(props);

    this.clothingFilters = [];
    this.shoesFilters = [];
    this.bagsFilters = [];
    this.jewelryFilters = [];


    this.state = {
      showFilterDropDown: false,
      currentFilterSelection: ""
    };

    this.filterData = [];
  };

  componentWillMount() {
    const { fashionSubCategories, categories } = this.props;
    let tempClothingFilters = [];
    let tempShoesFilters = [];
    let tempBagsFilters = [];
    let tempJewelryFilters = [];

    fashionSubCategories[0].children.map((item, index) => {
      if(item.name === "Clothing") {
        tempClothingFilters.push(item.categoryFilters);
      } else if(item.name === "Shoes") {
        tempShoesFilters.push(item.categoryFilters);
      } else if(item.name === "Bags") {
        tempBagsFilters.push(item.categoryFilters);
      } else if(item.name === "Jewelry") {
        tempJewelryFilters.push(item.categoryFilters);
      }
    });

    tempClothingFilters[0].map((item, index) => {
      let singleFilter = {};
      singleFilter.value = item.name;
      singleFilter.id = item.id;

      this.clothingFilters.push(singleFilter);
    });

    tempShoesFilters[0].map((item, index) => {
      let singleFilter = {};
      singleFilter.value = item.name;
      singleFilter.id = item.id;

      this.shoesFilters.push(singleFilter);
    });

    tempBagsFilters[0].map((item, index) => {
      let singleFilter = {};
      singleFilter.value = item.name;
      singleFilter.id = item.id;

      this.bagsFilters.push(singleFilter);
    });

    tempJewelryFilters[0].map((item, index) => {
      let singleFilter = {};
      singleFilter.value = item.name;
      singleFilter.id = item.id;

      this.jewelryFilters.push(singleFilter);
    });


    if(categories.finalSubCategory === "Shoes") {
      this.filterData = this.shoesFilters;

    } else if(categories.finalSubCategory === "Clothing") {
      this.filterData = this.clothingFilters;

    } else if(categories.finalSubCategory === "Bags") {
      this.filterData = this.bagsFilters;

    } else if(categories.finalSubCategory === "Accessories") {
      this.filterData = this.jewelryFilters;
    }
  }

  handleDropdown = () => {
    this.setState({
      showFilterDropDown: !this.state.showFilterDropDown
    })
  }

  handleTypeClick = (typeValue) => {
    this.setState({
      showFilterDropDown: false,
      currentFilterSelection: typeValue
    });
  }

  handleContinueButton = () => {
    const { handleInputSubmit, handleDropdown } = this.props;

    console.log("****** this.props", this.props);

    // onPress={(e) => handleInputSubmit("fashionTypeInput")}
    // handleDropDown("fashionTypeDropdown", value, id)
    // handleDropdown("fashionTypeDropdown");

    handleInputSubmit("fashionTypeInput", this.state.currentFilterSelection);

  }

  // handleSizeClick = (sizeValue) => {
  //   this.setState({
  //     currentSizeValue: sizeValue,
  //     dropDownSectionClicked: false
  //   });
  // }

  render() {
    const { typeSelectionError, categories, handleDropDown, handleBackButton } = this.props;

    const { height, width } = Dimensions.get('window');
    const imageFile = require("../../../images/02.png");


    console.log("666666 this.props", this.props);

    console.log("777777 this.filterData", this.filterData);

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
              onPress={() => {handleBackButton("filter type selection")}}
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
                Select Fashion Type
              </Text>
            </View>
          </View>

          <View style={{paddingTop: 31, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16, lineHeight: 24, fontWeight: 'bold'}}>
                Please select a Type for your Fashion Item.
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
                    this.state.currentFilterSelection === "" ?
                    "Please select a type"
                    : `${this.state.currentFilterSelection} Selected`
                  }
                </Text>
              </TouchableOpacity>

              {
                this.state.showFilterDropDown === true &&
                <ScrollView style={{marginTop: 10, height: 275, borderWidth: 1, borderColor: '#ECEBEB'}}>
                  {
                    this.filterData.map((singleFilterData, index) => {
                      return (
                        <View style={{flexDirection: 'row'}} key={index}>
                          <TouchableOpacity
                            style={{
                              borderTopWidth: 1, 
                              borderTopColor: '#ECEBEB',
                              width: '100%'
                            }}
                            onPress={(e) => this.handleTypeClick(singleFilterData.value)}
                          >
                            <Text style={{fontSize: 16, fontWeight: 'bold', padding: 16}}>
                              {`${singleFilterData.value}`}
                            </Text>
                          </TouchableOpacity>

                          {
                            this.state.currentFilterSelection === singleFilterData.value &&
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

            <View style={{alignSelf: 'center', marginTop: 50}}>
              <TouchableOpacity 
                style={{
                  flexDirection: 'row', 
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 278,
                  height: 58,
                  marginBottom: 40,
                  borderColor: this.state.currentFilterSelection !== "" ? "black" : '#CECECE',
                  backgroundColor: this.state.currentFilterSelection !== ""  ? "white" :'#CECECE'
                }}
                disabled={this.state.currentFilterSelection !== "" ? false : true}
                // onPress={(e) => handleInputSubmit("fashionTypeInput")}
                onPress={(e) => this.handleContinueButton()}
              >
                <Text 
                  style={{
                    fontSize: 14, 
                    fontWeight: 'bold', 
                    lineHeight: 20,
                    flex: 1,
                    textAlign: 'center',
                    marginTop: 18,
                    color: this.state.currentFilterSelection !== "" ? "black" : 'white'
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

export default FashionTypeSelection;






{/* <React.Fragment>
  <View style={{flexDirection: 'column', marginTop: 30, width: 350, alignSelf: 'center'}}>
    <Text style={styles.categorySectionTitle}>Item Type</Text>
    <Text style={[styles.tradeSectionSubTitle, {color: typeSelectionError === true ? "red" : "#00529b"}]}>
      Please select a Type for your Fashion Item.
    </Text>

    <Dropdown
      label={"Please select a type"}
      labelFontSize={13}
      labelHeight={10}
      labelPadding={1}
      baseColor="black"
      selectedItemColor="#3578e5"
      // data={
      //   categories.categoryLevelTwo === "4a380c0c-9b9e-459d-b988-b7d9b2720d7d" ? this.clothingFilters 
      //   : categories.categoryLevelTwo === "07f12a59-6272-49c5-ad38-ba7623c0cf84" ? this.shoesFilters
      //   : categories.categoryLevelTwo === "6a60e00e-f8e5-4f49-92fb-62d2d1154452" ? this.bagsFilters
      //   : categories.categoryLevelTwo === "ed8f58f9-aed2-449b-b61c-7fb92ea36b8e" ? this.jewelryFilters
      //   : null
      // }
      dropdownPosition={4.2}
      textColor="#3578e5"
      containerStyle={styles.selectFashionTypeDropdown}
      dropdownOffset={{top: 0, left: 0 }}
      rippleInsets={{top:0, bottom: 0}}
      onChangeText={(value, id)=>{handleDropDown("fashionTypeDropdown", value, id)}}
    />
  </View>
</React.Fragment> */}


