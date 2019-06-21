import React                                        from "react";
import { View, StatusBar, SafeAreaView, TouchableOpacity,
         Image, Dimensions }                                     from 'react-native';
import { Text, Button }                             from 'native-base';
import { Dropdown }                                 from 'react-native-material-dropdown';
import { Switch }                                   from 'react-native-switch';
import styles                                       from '../../styles/RegisterItemStyles';
import FeatherIcon                                  from 'react-native-vector-icons/Feather';
import { topSizes, pantSizes, shoesSizes }          from '../../data/sampleRegisterItemData';

class GenderSizeSection extends React.Component {

  render() {
    const { genderError, genderClicked, categoryLevelThree, gender, size, type,
            handleSelection, categories, sizeError, handleDropDown, handleInputSubmit } = this.props;

    console.log("55555555 this.props", this.props);

    const { height, width } = Dimensions.get('window');
    const imageFile = require("../../../images/02.png");

    //categories.finalSubCategory === "Shoes"

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
              <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', lineHeight: 30, width: width * 0.68}}>
                {
                  categories.finalSubCategory === "Shoes" ?
                  "Select Gender"
                  :
                  "Select Gender & Size"
                }
              </Text>
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


