import React                                        from "react";
import { View, TextInput }                          from 'react-native';
import { Text, Button }                             from 'native-base';
import SectionedMultiSelect                         from 'react-native-sectioned-multi-select';
import styles                                       from '../../styles/RegisterItemStyles';
import { items }                                    from '../../data/sampleRegisterItemData';

class SwapCategorySelection extends React.Component {
  

  render() {
    const { selectedSwapCategoriesState, swapCategorySelectionError, selectedSwapCategories,
    onSelectedItemsChange, onSelectedItemObjectsChange } = this.props;

    return (
      <React.Fragment>
        <View style={styles.swapCategorySelectionSection}>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>Swap Category</Text>
          <Text
            style={[ styles.swapCategorySubTitle,
                  {display: selectedSwapCategoriesState.length > 5 ? "flex" : "none"}]}
          >
            Please only select up to 5 categories.
          </Text>
          <Text style={[styles.swapCategoryErrorMsg, 
            {fontSize: 16, marginBottom: 10, lineHeight: 22, color: swapCategorySelectionError === true && selectedSwapCategories.length < 1 
            ? "red" : "#00529b"}]}>
            Please select categories that you are willing to SWAP.
          </Text>

          <SectionedMultiSelect
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
                backgroundColor: '#CCC',
                borderWidth: 0.5,
                padding: 20,
                height: 40,
                marginTop: 8,
                width: 350,
                alignItems: 'center', 
                alignSelf: 'center',
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
          />
        </View>
      </React.Fragment>
    );
  }
}

export default SwapCategorySelection;
