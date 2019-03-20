import React                                              from "react";
import get                                                from 'lodash.get';
import { View, TextInput, TouchableOpacity }              from 'react-native';
import { Text, Button }                                   from 'native-base';
import SectionedMultiSelect                               from 'react-native-sectioned-multi-select';
import FeatherIcon                                        from 'react-native-vector-icons/Feather';
import MaterialIcon                                       from 'react-native-vector-icons/MaterialIcons';
import styles                                             from '../../styles/RegisterItemStyles';
import { mainCategories, FashionSubCategories,
         ElectronicsSubCategories, BooksSubCategories, 
         HomeSubCategories, GamingSubCategories }         from '../../data/sampleRegisterItemData';

class NewCategorySelectionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCategoryDropdowns: false
    };

    this.predictionMainCategoryName = "";
    this.predictionSubCategoryName = "";
    this.predictionMainCategoryId = "";
    this.predictionSubCategoryId = "";
    this.newMainCategorySelected = false;
    this.predictionTag = "";
  }

  componentWillMount() {
    const { predictions, mainCategories, fashionSubCategories, electronicsSubCategories, 
            homeSubCategories, } = this.props;
    const result = get(predictions, "result", []);
    const predictionCategory = get(result[0], "category", {});
    const predictionTag = get(result[0], "tag", "");
    const parentId = get(predictionCategory, "ParentId", "");
    const subId = get(predictionCategory, "id", "");
    const tempMainCategories = mainCategories[0].children;
    const tempFashionSubCategories = fashionSubCategories[0].children;
    const tempElectronicsSubCategories = electronicsSubCategories[0].children;
    const tempHomeSubCategories = homeSubCategories[0].children;

    console.log("@@@@@@ predictions", predictions);
    console.log("@@@@@@ predictionCategory", predictionCategory);
    console.log("@@@@@@ predictionTag", predictionTag);
    console.log("@@@@@@ parentId", parentId);
    console.log("@@@@@@ subId", subId);
    console.log("@@@@@ tempMainCategories", tempMainCategories);

    this.predictionMainCategoryId = [parentId];
    this.predictionSubCategoryId = [subId];
    this.predictionTag = predictionTag;

    tempMainCategories.map((item, index) => {
      if(item.id === parentId) {
        this.predictionMainCategoryName = item.name;
      }
    });

    if(this.predictionMainCategoryName === "Fashion") {
      tempFashionSubCategories.map((item, index) => {
        if(item.id === subId) {
          this.predictionSubCategoryName = item.name;
        }
      });

    } else if(this.predictionMainCategoryName === "Electronics") {
      tempElectronicsSubCategories.map((item, index) => {
        if(item.id === subId) {
          this.predictionSubCategoryName = item.name;
        }
      });

    } else if(this.predictionMainCategoryName === "Home & Kitchen") {
      tempHomeSubCategories.map((item, index) => {
        if(item.id === subId) {
          this.predictionSubCategoryName = item.name;
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newMainCategorySelected !== this.props.newMainCategorySelected) {
      this.newMainCategorySelected = nextProps.newMainCategorySelected;
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
    const { mainCategories, fashionSubCategories, electronicsSubCategories, homeSubCategories, 
            predictions, onSelectedItemsChange, onSelectedItemObjectsChange,
            newMainCategorySelected, newMainCategory, newSubCategorySelected, 
            newSubCategory, handleInputSubmit, handleRecommendCategoryButton } = this.props;

    return (
      <React.Fragment>
        <View style={{
          marginTop: 100,
          width: 330, 
          alignSelf: 'center'
        }}>
          <Text style={styles.hashTagPageTitle}>Please Select Categories.</Text>

          {
            this.predictionTag !== "" ?
            <Text style={{color: '#00529b', marginBottom: 10, fontWeight: '500'}}>
              {`You have uploaded `}
              <Text style={{color: '#00529b', fontWeight: 'bold'}}>
                {this.predictionTag.toUpperCase()}
              </Text>.
            </Text>
            : null
          }

          <Text style={{color: '#00529b', fontWeight: '500', marginBottom: 5}}>
            {`Here are `}
            <Text style={{color: '#00529b', fontWeight: 'bold'}}>
              Recommended Categories
            </Text>:
          </Text>
          
          {
            this.newMainCategorySelected === true ?
            <Text style={{color: '#00529b', fontStyle: 'italic'}}>** Click below pills to use Recommended Category</Text>
            : null
          }
          
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
                backgroundColor: this.newMainCategorySelected === true ? "white" : "#00529b"
              }}
              onPress={(e) => handleRecommendCategoryButton(
                "mainCategory", this.predictionMainCategoryId, this.predictionMainCategoryName, this.predictionSubCategoryId, this.predictionSubCategoryName )}
            >
              <Text 
                style={{
                  color: this.newMainCategorySelected === true ? "#00529b" : "white",
                  fontWeight: 'bold'
                }}>
                {this.predictionMainCategoryName}
              </Text>
            </TouchableOpacity>

            {
              this.predictionSubCategoryName !== "" ?
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
                    backgroundColor: this.newMainCategorySelected === true ? "white" : "#00529b"
                  }}
                  disabled={true}
                >
                  <Text 
                    style={{
                      color: this.newMainCategorySelected === true ? "#00529b" : "white",
                      fontWeight: 'bold'
                    }}
                  >
                    {this.predictionSubCategoryName}
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
                  uniqueKey="id"
                  subKey='children'
                  selectText='Select Main Category'
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  expandDropDowns={true}
                  single={true}
                  ref={(component) => { this.multiSelect = component }}
                  onSelectedItemsChange={(selectedItems) => onSelectedItemsChange("mainCategorySelection", selectedItems, this.predictionMainCategoryId)}
                  onSelectedItemObjectsChange={(selectedItems) => onSelectedItemObjectsChange("mainCategorySelection", selectedItems)}
                  selectedItems={ newMainCategorySelected === false ? this.predictionMainCategoryId : newMainCategory }
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
                (newMainCategorySelected === false && this.predictionMainCategoryName === "Fashion") ||
                (newMainCategorySelected === false && this.predictionMainCategoryName === "Home & Kitchen") ||
                (newMainCategorySelected === false && this.predictionMainCategoryName === "Electronics") ||
                (newMainCategorySelected === true && newMainCategory[0] === "b388d6e7-bae2-40ae-ad6e-b2b6cf2d0bd4") ||
                (newMainCategorySelected === true && newMainCategory[0] === "dde53005-5075-4efa-89d8-eb8b51fd6a1b") ||
                (newMainCategorySelected === true && newMainCategory[0] === "52d86cdb-13a4-40a0-8936-e33ee07be5e9") ?
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.categoryPageSubTitle}>
                    Please select sub category for  
                    
                    {
                      newMainCategorySelected === false ?
                      <Text style={{fontWeight: 'bold'}}> 
                        &nbsp;
                        {
                          this.predictionMainCategoryName === "Fashion" ? "Fashion"
                          : this.predictionMainCategoryName === "Electronics" ? "Electronics"
                          : this.predictionMainCategoryName === "Home & Kitchen" ? "Home & Kitchen"
                          : null
                        }.
                      </Text>
                      :
                      <Text style={{fontWeight: 'bold'}}> 
                        &nbsp;
                        {
                          newMainCategory[0] === "b388d6e7-bae2-40ae-ad6e-b2b6cf2d0bd4" ? "Fashion"
                          : newMainCategory[0] === "dde53005-5075-4efa-89d8-eb8b51fd6a1b" ? "Electronics"
                          : newMainCategory[0] === "52d86cdb-13a4-40a0-8936-e33ee07be5e9" ? "Home & Kitchen"
                          : null
                        }.
                      </Text>
                    }
                  </Text>

                  <SectionedMultiSelect
                    hideTags
                    style={styles.categoryEditSelection}
                    items={
                      this.predictionMainCategoryName === "Fashion" && newMainCategorySelected === false ? fashionSubCategories
                      : this.predictionMainCategoryName === "Electronics" && newMainCategorySelected === false ? electronicsSubCategories
                      : this.predictionMainCategoryName === "Home & Kitchen" && newMainCategorySelected === false ? homeSubCategories
                      : newMainCategorySelected === true && newMainCategory[0] === "b388d6e7-bae2-40ae-ad6e-b2b6cf2d0bd4" ? fashionSubCategories
                      : newMainCategorySelected === true && newMainCategory[0] === "dde53005-5075-4efa-89d8-eb8b51fd6a1b" ? electronicsSubCategories
                      : newMainCategorySelected === true && newMainCategory[0] === "52d86cdb-13a4-40a0-8936-e33ee07be5e9" ? homeSubCategories
                      : null
                    }
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
                    selectedItems={ newSubCategorySelected === false ? this.predictionSubCategoryId : newSubCategory }
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
                : null
              }
            </View>
            : null
          }

          <Button 
            style={[styles.hashTagePageButton, {marginTop: 30}]}
            onPress={(e) => handleInputSubmit("categoryInput", this.predictionMainCategoryId, this.predictionSubCategoryId)}
            disabled={this.predictionMainCategoryName === "" && newMainCategory.length > 0 && newSubCategory.length > 0}
          >
            <Text style={styles.hashTagePageButtonText}>Next</Text>
          </Button>
        </View>
      </React.Fragment>
    );
  }
}

export default NewCategorySelectionPage;
