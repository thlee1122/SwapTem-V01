import React                                              from "react";
import { View, TextInput, TouchableOpacity }              from 'react-native';
import { Text, Button }                                   from 'native-base';
import SectionedMultiSelect                               from 'react-native-sectioned-multi-select';
import FeatherIcon                                        from 'react-native-vector-icons/Feather';
import MaterialIcon                                       from 'react-native-vector-icons/MaterialIcons';
import styles                                             from '../../styles/RegisterItemStyles';
import { mainCategories, FashionSubCategories,
         ElectronicsSubCategories, BooksSubCategories, 
         HomeSubCategories, GamingSubCategories }         from '../../data/sampleRegisterItemData';

class CategorySelectionPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showCategoryDropdowns: false
    };
  }

  handleEdit = (inputType) => {
    if(inputType === "categorySelection") {
      this.setState({
        showCategoryDropdowns: !this.state.showCategoryDropdowns
      });
    }
  }

  render() {
    const { onSelectedItemsChange, mainCategory, handleInputSubmit, subCategory, 
            onSelectedItemObjectsChange, handleRecommendCategoryButton,
            mainCategoryButtonClicked, subCategoryLv1ButtonClicked, recommendedCategory
          } = this.props;

    console.log("@@@@", this.state);    

    return (
      <React.Fragment>
        <View style={{
          marginTop: 100,
          width: 330, 
          alignSelf: 'center'
        }}>
          <Text style={styles.hashTagPageTitle}>Please Select Categories.</Text>
          <Text style={{color: '#00529b', fontWeight: 'bold', marginBottom: 5}}>Recommended Category:</Text>
          <Text style={{color: '#00529b', fontStyle: 'italic'}}>** Click below pills to use Recommended Category</Text>
          
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', marginTop: 20, width: 300}}>
            <TouchableOpacity 
              style={{
                borderWidth: 1, 
                borderColor: "#00529b", 
                paddingTop: 8, 
                paddingBottom: 8, 
                paddingRight: 15, 
                paddingLeft: 15,
                borderRadius: 5,
                backgroundColor: mainCategoryButtonClicked === false ? "white" : "#00529b",

              }}
              onPress={(e) => handleRecommendCategoryButton(
                "mainCategory", recommendedCategory.mainCategory.id, recommendedCategory.subCategoryLevel1.id,
                recommendedCategory.mainCategory.name, recommendedCategory.subCategoryLevel1.name )}
            >
              <Text 
                style={{
                  color: mainCategoryButtonClicked === false ? "#00529b" : "white",
                  fontWeight: 'bold'
                }}>
                {recommendedCategory.mainCategory.name}
              </Text>
            </TouchableOpacity>

            {
              Object.keys(recommendedCategory.subCategoryLevel1).length !== 0 ?
              <React.Fragment>
                <FeatherIcon name="arrow-right" size={25} color="#00529b" style={{marginLeft: 10, marginRight: 10, paddingTop: 5}}/>
                <TouchableOpacity
                  style={{
                    borderWidth: 1, 
                    borderColor: "#00529b", 
                    paddingTop: 8, 
                    paddingBottom: 8, 
                    paddingRight: 15, 
                    paddingLeft: 15,
                    borderRadius: 5,
                    backgroundColor: subCategoryLv1ButtonClicked === false ? "white" : "#00529b",
                  }}
                  onPress={(e) => handleRecommendCategoryButton(
                    "subCategoryLevel1", recommendedCategory.mainCategory.id, recommendedCategory.subCategoryLevel1.id,
                    recommendedCategory.mainCategory.name, recommendedCategory.subCategoryLevel1.name )}
                >
                  <Text 
                    style={{
                      color: subCategoryLv1ButtonClicked === false ? "#00529b" : "white",
                      fontWeight: 'bold'
                    }}
                  >
                    {recommendedCategory.subCategoryLevel1.name}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
              : null
            }
            </View>

            <Button
              style={{
                width: 40, 
                height: 40, 
                backgroundColor: 'white', 
                marginLeft: 5,
                // left: '22%',
                right: 0,
                marginTop: 16
              }}
              onPress={(e) => this.handleEdit("categorySelection")}
            >
              <MaterialIcon name="edit" size={25} color="#00529b" />
            </Button>
          </View>
          
          {
            this.state.showCategoryDropdowns === true ?
            <View style={[styles.hashTagPageContent, {flexDirection: 'column'}]}> 
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.categoryPageSubTitle}>
                  Please select main category for your item.
                </Text>
                <SectionedMultiSelect
                  hideTags
                  style={styles.categoryEditSelection}
                  items={mainCategories} 
                  // uniqueKey="name"
                  uniqueKey="id"
                  subKey='children'
                  selectText='Select Main Category'
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  expandDropDowns={true}
                  single={true}
                  ref={(component) => { this.multiSelect = component }}
                  onSelectedItemsChange={(selectedItems) => onSelectedItemsChange("mainCategorySelection", selectedItems)}
                  onSelectedItemObjectsChange={(selectedItems) => onSelectedItemObjectsChange("mainCategorySelection", selectedItems)}
                  selectedItems={mainCategory}
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
                      marginTop: -20
                    },
                    selectToggle: {
                      backgroundColor: '#CCC',
                      borderWidth: 0.5,
                      padding: 20,
                      height: 40,
                      width: 320,
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

              {
                mainCategory.length !== 0 ?
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.categoryPageSubTitle}>
                    Please select sub category for  
                    <Text style={{fontWeight: 'bold'}}> 
                      &nbsp;
                      {
                        mainCategory.indexOf(0) !== -1 ? "Fashion"
                        : mainCategory.indexOf(1) !== -1 ? "Electronics"
                        : mainCategory.indexOf(2) !== -1 ? "Books"
                        : mainCategory.indexOf(4) !== -1 ? "Home"
                        : mainCategory.indexOf(3) !== -1 ? "Gaming"
                        : null
                      }.
                    </Text>
                  </Text>

                  <SectionedMultiSelect
                    hideTags
                    style={styles.categoryEditSelection}
                    items={
                      mainCategory.indexOf(0) !== -1 ? FashionSubCategories
                      : mainCategory.indexOf(1) !== -1 ? ElectronicsSubCategories
                      : mainCategory.indexOf(2) !== -1 ? BooksSubCategories
                      : mainCategory.indexOf(4) !== -1 ? HomeSubCategories
                      : mainCategory.indexOf(3) !== -1 ? GamingSubCategories
                      : null
                    } 
                    // uniqueKey="name"
                    uniqueKey="id"
                    subKey='children'
                    selectText='Select Sub Category'
                    showDropDowns={true}
                    expandDropDowns={true}
                    readOnlyHeadings={true}
                    single={true}
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={(selectedItems) => onSelectedItemsChange("subCategorySelection", selectedItems)}
                    onSelectedItemObjectsChange={(selectedItems) => onSelectedItemObjectsChange("subCategorySelection", selectedItems)}
                    selectedItems={subCategory}
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
                        marginTop: -20
                      },
                      selectToggle: {
                        backgroundColor: '#CCC',
                        borderWidth: 0.5,
                        padding: 20,
                        height: 40,
                        width: 320,
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
                :
                null
              }
            </View>
            : null
          }

          <Button 
            style={[styles.hashTagePageButton, {marginTop: 30}]}
            onPress={(e) => handleInputSubmit("categoryInput")}
            disabled={mainCategory.length !== 0 && subCategory.length !== 0 ? false : true}
          >
            <Text style={styles.hashTagePageButtonText}>Next</Text>
          </Button>

        </View>
      </React.Fragment>
    );
  }
}

export default CategorySelectionPage;
