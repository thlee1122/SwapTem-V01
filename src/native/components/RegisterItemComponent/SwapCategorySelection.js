import React                                        from "react";
import { Actions }                                      from 'react-native-router-flux';
import { View, TextInput, TouchableOpacity, 
         StatusBar, SafeAreaView }                          from 'react-native';
import { Text, Button, Container }                             from 'native-base';
// import SectionedMultiSelect                         from 'react-native-sectioned-multi-select';
import styles                                       from '../../styles/RegisterItemStyles';
import { items }                                    from '../../data/sampleRegisterItemData';

import SingleSwapFirstLevelCategory       from './SingleSwapFirstLevelCategory';

class SwapCategorySelection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedSwapCategories: [],

      dropDownSectionClicked: false,

      // firstLevelClicked: false
    };

    this.sampleSwapCategories = [
      {
        firstLevel: "Fashion",
        secondLevel: ["Clothing", "Shoes", "Bags", "Accessories"]
      },
      {
        firstLevel: "Electronics",
        secondLevel: ["TV & Video", "Home Audio & Theater", "Camera, Photo & Video", "Cell Phones & Accessories"]
      },
      {
        firstLevel: "Electronics",
        secondLevel: ["TV & Video", "Home Audio & Theater", "Camera, Photo & Video", "Cell Phones & Accessories"]
      },
      {
        firstLevel: "Books",
        secondLevel: ["Textbooks", "Fiction Books", "Magazine", "Novels",]
      },

    ]
  }

  handleDropdown = () => {
    this.setState({
      dropDownSectionClicked: !this.state.dropDownSectionClicked
    });
  }

  // handleFirstLevelCategoryClick = () => {
  //   this.setState({
  //     firstLevelClicked: !this.state.firstLevelClicked
  //   });
  // }

  render() {
    const { selectedSwapCategoriesState, swapCategorySelectionError, selectedSwapCategories,
    onSelectedItemsChange, onSelectedItemObjectsChange, handleSwapCategoryContinue} = this.props;
    newSelectedSwapCategories = [22, 23];

    console.log("&&&&&&&&&&&", this.state);

    return (
      <SafeAreaView style={{marginTop: -20, backgroundColor: 'white'}}>
        <View style={styles.swapCategorySelectionSection}>
          <Text style={{fontWeight: 'bold', fontSize: 32, marginBottom: 56, textAlign: 'center'}}>
            {
              this.state.selectedSwapCategories.length === 0 ?
              "Select Swap Categories"
              : (this.state.selectedSwapCategories).join(" ")
            }
          </Text>
          <Text
            style={[ styles.swapCategorySubTitle,
                  {display: selectedSwapCategoriesState.length > 5 ? "flex" : "none"}]}
          >
            Please only select up to 5 categories.
          </Text>
          <Text style={[styles.swapCategoryErrorMsg, 
            {fontSize: 16, marginBottom: 32, lineHeight: 22, color: swapCategorySelectionError === true && selectedSwapCategories.length < 1 
            ? "red" : "#A3A3A2"}]}>
            Please select categories that you are willing to SWAP.
          </Text>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 10,
              width: '100%',
              height: 60,
              marginTop: 20,
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
            this.state.dropDownSectionClicked === true ?
            <View style={{marginTop: 40}}>
            {
              this.sampleSwapCategories.map((singleSwapCategory, index) => {
                // console.log("^^^^^^^^ singleSwapCategory", singleSwapCategory);
                return (
                  <SingleSwapFirstLevelCategory
                    key={index}
                    firtLevelCategory={singleSwapCategory.firstLevel}
                    // handleFirstLevelCategoryClick={this.handleFirstLevelCategoryClick}
                    singleSwapCategory={singleSwapCategory}
                    // firstLevelClicked={this.state.firstLevelClicked}
                  />
                )
              })
            }
            </View>
            : null
          }
          
          <View style={{alignSelf: 'center', marginTop: 50}}>
            <TouchableOpacity 
              style={{
                flexDirection: 'row', 
                borderWidth: 1,
                borderRadius: 30,
                width: 278,
                height: 58,
                marginBottom: 40,
                borderColor: 'black',
                backgroundColor: 'white'
              }}
              onPress={(e) => handleSwapCategoryContinue()}
            >
              <Text 
                style={{
                  fontSize: 14, 
                  fontWeight: 'bold', 
                  lineHeight: 20,
                  flex: 1,
                  textAlign: 'center',
                  marginTop: 18,
                  color: 'black'
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SwapCategorySelection;





{/* <SectionedMultiSelect
          hideTags
          style={styles.swapCategorySelectionBox}
          items={items} 
          // uniqueKey='name'
          uniqueKey="id"
          subKey='children'
          selectText='Select Swap Categories'
          showDropDowns={true}
          readOnlyHeadings={true}
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={(selectedItems) => onSelectedItemsChange("swapCategorySelection", selectedItems)}
          onSelectedItemObjectsChange={(selectedItems) => onSelectedItemObjectsChange("swapCategorySelection", selectedItems)}
          selectedItems={selectedSwapCategories}
          // selectedItems={newSelectedSwapCategories}
          submitButtonText="Submit"
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
              marginTop: -20,
            },
            selectToggle: {
              // backgroundColor: '#CCC',
              backgroundColor: 'white',
              borderWidth: 0.5,
              padding: 20,
              height: 60,
              marginTop: 8,
              width: '100%',
              // alignItems: 'center', 
              // alignSelf: 'center',
              borderRadius: 5,
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
              color: 'white',
              zIndex: 10
            }
          }}
        /> */}