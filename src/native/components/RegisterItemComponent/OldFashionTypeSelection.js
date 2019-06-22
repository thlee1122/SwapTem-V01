import React                                        from "react";
import { View }                                     from 'react-native';  
import { Text  }                                    from 'native-base';
import { Dropdown }                                 from 'react-native-material-dropdown';
import styles                                       from '../../styles/RegisterItemStyles';

class FashionTypeSelection extends React.Component {
  constructor(props) {
    super(props);

    this.clothingFilters = [];
    this.shoesFilters = [];
    this.bagsFilters = [];
    this.jewelryFilters = [];
  };

  componentWillMount() {
    const { fashionSubCategories } = this.props;
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
  }

  render() {
    const { typeSelectionError, categories, handleDropDown } = this.props;

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default FashionTypeSelection;
