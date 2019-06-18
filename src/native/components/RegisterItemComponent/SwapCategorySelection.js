import React                                        from "react";
import { Actions }                                      from 'react-native-router-flux';
import { View, TextInput, TouchableOpacity }                          from 'react-native';
import { Text, Button, Container }                             from 'native-base';
// import SectionedMultiSelect                         from 'react-native-sectioned-multi-select';
import styles                                       from '../../styles/RegisterItemStyles';
import { items }                                    from '../../data/sampleRegisterItemData';

class SwapCategorySelection extends React.Component {
  

  render() {
    const { selectedSwapCategoriesState, swapCategorySelectionError, selectedSwapCategories,
    onSelectedItemsChange, onSelectedItemObjectsChange } = this.props;

    newSelectedSwapCategories = [22, 23];

    return (
      <Container style={{backgroundColor: 'white'}}>
      <View style={styles.swapCategorySelectionSection}>
        <Text style={{fontWeight: 'bold', fontSize: 32, marginBottom: 56, textAlign: 'center'}}>
          Select Swap Categories
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
            // flexDirection: 'row', 
            borderWidth: 1,
            borderRadius: 10,
            width: '100%',
            height: 60,
            marginTop: 20,
            marginBottom: 20,
            borderColor: "#A3A3A2",
            backgroundColor: 'white'
          }}
        >
          <Text
            style={{
              fontSize: 14, 
              fontWeight: 'bold', 
              lineHeight: 20,
              flex: 1,
              // textAlign: 'center',
              marginTop: 18,
              color: "#A3A3A2",
              paddingLeft: 16
            }}
          >
            Select swap categories
          </Text>
        </TouchableOpacity>


        
        <View style={{alignSelf: 'center', marginTop: 50}}>
          <TouchableOpacity 
            // disabled={ this.state.finalHashTags.length === 0 ? true : false }
            // disabled={swapToggle === false && sellToggle === false && rentToggle === false ? true : false}
            style={{
              flexDirection: 'row', 
              borderWidth: 1,
              borderRadius: 30,
              width: 278,
              height: 58,
              // marginTop: 60,
              marginBottom: 40,
              borderColor: 'black',
              backgroundColor: 'white'
              // borderColor: swapToggle === false && sellToggle === false && rentToggle === false ? "#CECECE" : "black",
              // backgroundColor: swapToggle === false && sellToggle === false && rentToggle === false ? "#CECECE" : "white",
            }}
            // onPress={ () => handlePageContinueButton("hashTag selection", this.finalHashTags) }
            // onPress={(e) => handleInputSubmit("TradeSelectionInput")}
            // onPress={(e) => Actions.tradeSelection()}
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
                // color: swapToggle === false && sellToggle === false && rentToggle === false ? "white" : "black",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>

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
      </View>
      </Container>
    );
  }
}

export default SwapCategorySelection;
