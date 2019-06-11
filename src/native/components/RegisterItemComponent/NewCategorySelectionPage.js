import React                                              from "react";
import get                                                from 'lodash.get';
import { Actions }                                        from 'react-native-router-flux';
import { View, TextInput, TouchableOpacity, 
         SafeAreaView, Dimensions, Image, StatusBar }              from 'react-native';
import { Text, Button }                                   from 'native-base';
import SectionedMultiSelect                               from 'react-native-sectioned-multi-select';
import FeatherIcon                                        from 'react-native-vector-icons/Feather';
import MaterialIcon                                       from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons                       from 'react-native-vector-icons/MaterialCommunityIcons';


import styles                                             from '../../styles/RegisterItemStyles';
import { mainCategoriesData, FashionSubCategories,
         ElectronicsSubCategories, BooksSubCategories, 
         HomeSubCategories, GamingSubCategories }         from '../../data/sampleRegisterItemData';

class NewCategorySelectionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCategoryDropdowns: false,

      selectedMainCategory: "",

      selectedSubCategory: ""
    };

    this.predictionMainCategoryName = "";
    this.predictionSubCategoryName = "";
    this.predictionMainCategoryId = "";
    this.predictionSubCategoryId = "";
    this.newMainCategorySelected = false;
    this.predictionTag = "";

    this.tempMainCategories = [];

    this.tempSubCategories = [];
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

    // console.log("@@@@@@ predictions", predictions);
    // console.log("@@@@@@ predictionCategory", predictionCategory);
    // console.log("@@@@@@ predictionTag", predictionTag);
    // console.log("@@@@@@ parentId", parentId);
    // console.log("@@@@@@ subId", subId);
    // console.log("@@@@@ tempMainCategories", tempMainCategories);

    this.predictionMainCategoryId = [parentId];
    this.predictionSubCategoryId = [subId];
    this.predictionTag = predictionTag;

    this.tempMainCategories = tempMainCategories.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 


    // this.tempSubCategories = this.predictionMainCategoryName === "Fashion" ? FashionSubCategories 
    // : this.predictionMainCategoryName === "Electronics" ? ElectronicsSubCategories
    // : this.predictionMainCategoryName === "Home & Kitchen" ? HomeSubCategories
    // : null;

    // console.log("7777777 this.predictionMainCategoryName", this.predictionMainCategoryName);  

    tempMainCategories.map((item, index) => {
      if(item.id === parentId) {
        this.predictionMainCategoryName = item.name;

        this.setState({
          selectedMainCategory: item.name
        });
      }
    });

    this.tempSubCategories = this.predictionMainCategoryName === "Fashion" ? FashionSubCategories 
    : this.predictionMainCategoryName === "Electronics" ? ElectronicsSubCategories
    : this.predictionMainCategoryName === "Home & Kitchen" ? HomeSubCategories
    : null;

    console.log("7777777 this.predictionMainCategoryName", this.predictionMainCategoryName);

    if(this.predictionMainCategoryName === "Fashion") {
      tempFashionSubCategories.map((item, index) => {
        if(item.id === subId) {
          this.predictionSubCategoryName = item.name;

          this.setState({
            selectedSubCategory: this.predictionSubCategoryName
          });
        }
      });

    } else if(this.predictionMainCategoryName === "Electronics") {
      tempElectronicsSubCategories.map((item, index) => {
        if(item.id === subId) {
          this.predictionSubCategoryName = item.name;

          this.setState({
            selectedSubCategory: this.predictionSubCategoryName
          });
        }
      });

    } else if(this.predictionMainCategoryName === "Home & Kitchen") {
      tempHomeSubCategories.map((item, index) => {
        if(item.id === subId) {
          this.predictionSubCategoryName = item.name;

          this.setState({
            selectedSubCategory: this.predictionSubCategoryName
          });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newMainCategorySelected !== this.props.newMainCategorySelected) {
      this.newMainCategorySelected = nextProps.newMainCategorySelected;
    };
  }

  // handleEdit = (inputType) => {
  //   if(inputType === "categorySelection") {
  //     this.setState({
  //       showCategoryDropdowns: !this.state.showCategoryDropdowns
  //     });
  //   }
  // }

  handleMainCategoryContinue = (mainCategory) => {
    console.log("@#@#@#@ mainCategory", mainCategory);

    console.log("555555 this.predictionMainCategoryName", this.predictionMainCategoryName);

    this.setState({
      selectedMainCategory: mainCategory
    });

    if(mainCategory !== this.predictionMainCategoryName) {
      this.setState({
        selectedSubCategory: 'Please select sub category'
      })
    }
  }

  render() {
    const { mainCategories, fashionSubCategories, electronicsSubCategories, homeSubCategories, 
            predictions, onSelectedItemsChange, onSelectedItemObjectsChange,
            newMainCategorySelected, newMainCategory, newSubCategorySelected, 
            newSubCategory, handleInputSubmit, handleRecommendCategoryButton } = this.props;

    // const tempMainCategories = mainCategories[0].children;



    const { height, width } = Dimensions.get('window');

    // StatusBar.setBackgroundColor('red', true);

    const imageFile = require("../../../images/02.png")

    // console.log("~~~~~ this.state.selectedMainCategory", this.state.selectedMainCategory);
    // console.log("666666 fashionSubCategories", fashionSubCategories);

    // console.log("111111 mainCategoriesData", mainCategoriesData);
    // console.log("222222 this.tempMainCategories", this.tempMainCategories);

    return (
      <React.Fragment>
      <StatusBar
        // backgroundColor="blue"
        barStyle="light-content"
        translucent={true}
        style={{
          color: 'white',
          zIndex: 10
        }}
      />
      <SafeAreaView style={{marginTop: -20, backgroundColor: 'black'}}>
        <View
          style={{backgroundColor: 'black', height: 300}}
        >
          <View style={{flexDirection: 'row', marginLeft: 16, marginTop: 180, marginRight: 16}}>
            <Image 
              source={imageFile}
              style={{
                width: 70,
                height: 50,
                alignSelf: 'center',
                marginRight: 20,
                // borderWidth: 1,
                // borderColor: 'white',
                // padding: 10,
              }}
            />
            <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', lineHeight: 26, width: 260}}>
              Please select your categories
            </Text>
          </View>
        </View>

        <View style={{paddingTop: 31, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 16, lineHeight: 24}}>
              {`You have uploaded `}
              <Text style={{fontWeight: 'bold', fontSize: 16, lineHeight: 24}}>
                {`${this.predictionTag}.`}
              </Text>
            </Text>

            <Text style={{fontSize: 16, lineHeight: 24}}>
              Here are recommended categories.
            </Text>
          </View>

          <View style={{marginTop: 58}}>
            <View>
              <Text style={{fontSize: 12, color: "#A3A3A2", lineHeight: 16}}>
                Main Category
              </Text>

              <TouchableOpacity 
                style={{
                  borderBottomWidth: 1, 
                  borderBottomColor: "#A3A3A2", 
                  height: 56, 
                  width: '100%',
                  flexDirection: 'row'
                }}

                onPress={ () => { Actions.mainCategorySelection({ 
                  mainCategoriesData: this.tempMainCategories, 
                  selectedMainCategory: this.state.selectedMainCategory,
                  handleMainCategoryContinue: this.handleMainCategoryContinue
                  // locationCoordinates: locationCoordinates 
                }) }}
              >
                <Text style={{fontSize: 16, lineHeight: 24, paddingTop: 14}}>
                  {/* {this.predictionMainCategoryName} */}
                  {this.state.selectedMainCategory}
                </Text>

                <MaterialCommunityIcons 
                  name="arrow-right" 
                  size={30} 
                  color="black"
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginTop: 12
                  }}
                />
              </TouchableOpacity>
            </View>


            <View style={{marginTop: 33}}>
              <Text style={{fontSize: 12, color: "#A3A3A2", lineHeight: 16}}>
                Sub Category
              </Text>

              <TouchableOpacity 
                style={{
                  borderBottomWidth: 1, 
                  borderBottomColor: "#A3A3A2", 
                  height: 56, 
                  width: '100%',
                  flexDirection: 'row'
                }}

                onPress={ () => { Actions.subCategorySelection({ 
                  subCategoriesData: this.tempSubCategories,
                  selectedMainCategory: this.state.selectedMainCategory,
                  selectedSubCategory: this.state.selectedSubCategory
                  // subCategoriesData: fashionSubCategories,
                    // this.state.selectedMainCategory === "Fashion" ? fashionSubCategories
                    // : this.state.selectedMainCategory === "Electronics" ? electronicsSubCategories
                    // : this.state.selectedMainCategory === "Home & Kitchen" ? homeSubCategories
                    // : null,
                  // mainCategoriesData: this.tempMainCategories, 
                  // selectedMainCategory: this.state.selectedMainCategory,

                  // handleMainCategoryContinue: this.handleMainCategoryContinue

                  // locationCoordinates: locationCoordinates 
                }) }}
              >
                <Text style={{fontSize: 16, lineHeight: 24, paddingTop: 14}}>
                  {this.state.selectedSubCategory}
                </Text>

                <MaterialCommunityIcons 
                  name="arrow-right" 
                  size={30} 
                  color="black"
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginTop: 12
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity 
              style={{
                flexDirection: 'row', 
                
                // right: 0,
                borderWidth: 1,
                borderRadius: 30,
                width: 278,
                height: 58,
                marginTop: 50
              }}
              // onPress={ () => { Actions.mainCategorySelection({ 
              //   mainCategoryData: mainCategories, 
              //   selectedMainCategory: this.state.selectedMainCategory
              //   // locationCoordinates: locationCoordinates 
              // }) }}
            >
              <Text 
                style={{
                  fontSize: 14, 
                  fontWeight: 'bold', 
                  lineHeight: 20,
                  flex: 1,
                  textAlign: 'center',
                  marginTop: 18,
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        







        {/* <View style={{
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
        </View> */}
      </SafeAreaView>
      </React.Fragment>
    );
  }
}

export default NewCategorySelectionPage;
