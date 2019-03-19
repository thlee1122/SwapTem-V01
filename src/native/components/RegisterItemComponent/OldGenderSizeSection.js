import React                                        from "react";
import { View }                                     from 'react-native';
import { Text, Button }                             from 'native-base';
import { Dropdown }                                 from 'react-native-material-dropdown';
import { Switch }                                   from 'react-native-switch';
import styles                                       from '../../styles/RegisterItemStyles';
import { topSizes, pantSizes, shoesSizes }          from '../../data/sampleRegisterItemData';

class GenderSizeSection extends React.Component {

  render() {
    const { genderError, genderClicked, gender, categoryLevelThree, size, type,
            handleSelection, categories, sizeError, handleDropDown, handleInputSubmit } = this.props;

    console.log("inside genderSizeSection levelTwo", categories);
    console.log("inside genderSizeSection categoryLevelThree", categoryLevelThree);
    console.log("inside genderSizeSection categoryLevelThree", typeof categoryLevelThree);

    return (
      <React.Fragment>
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
          categories.categoryLevelTwo.indexOf(0) !== -1 ||
          categories.categoryLevelTwo.indexOf(1) !== -1 ?
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
                categories.categoryLevelTwo.indexOf(1) !== -1 ? shoesSizes
                : categoryLevelThree === "Outerwear" || 
                  categoryLevelThree==="Tees" ||
                  categoryLevelThree==="Casual Shirts" ||
                  categoryLevelThree==="Dress Shirts" ||
                  categoryLevelThree==="Activewear" ||
                  categoryLevelThree==="Sweaters" ? topSizes
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
      </React.Fragment>
    );
  }
}

export default GenderSizeSection;
