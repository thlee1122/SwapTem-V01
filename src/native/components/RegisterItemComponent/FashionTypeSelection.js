import React                                        from "react";
// import get                                       from "lodash.get";
import { 
  View, Image, Animated, ScrollView, 
  TextInput, KeyboardAvoidingView, Platform, 
  TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';  

import {
  Container, Content, List, ListItem, Body, 
  Left, Right, Text, Button, Tabs, Tab, 
  TabHeading, Card, CardItem }                      from 'native-base';
import { Dropdown }                                 from 'react-native-material-dropdown';
import styles                                       from '../../styles/RegisterItemStyles';
import { clothingTypes, shoesTypes, bagsTypes,
         accessoriesTypes }                         from '../../data/sampleRegisterItemData';

class FashionTypeSelection extends React.Component {

  render() {
    const { typeSelectionError, categories, handleDropDown } = this.props;

    return (
      <React.Fragment>
        <View style={{flexDirection: 'column', marginTop: 30, marginLeft: 13}}>
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
            data={
              categories.categoryLevelTwo.indexOf(0) !== -1 ? clothingTypes
              : categories.categoryLevelTwo.indexOf(1) !== -1 ? shoesTypes
              : categories.categoryLevelTwo.indexOf(2) !== -1 ? bagsTypes
              : categories.categoryLevelTwo.indexOf(3) !== -1 ? accessoriesTypes
              : null
            }
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
