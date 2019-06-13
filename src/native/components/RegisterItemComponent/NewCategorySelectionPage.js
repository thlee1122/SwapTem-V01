import React                                              from "react";
import get                                                from 'lodash.get';
import { Actions }                                        from 'react-native-router-flux';
import { View, TextInput, TouchableOpacity, 
         SafeAreaView, Dimensions, Image, StatusBar }     from 'react-native';
import { Text, Button }                                   from 'native-base';
import SectionedMultiSelect                               from 'react-native-sectioned-multi-select';
import FeatherIcon                                        from 'react-native-vector-icons/Feather';
import MaterialIcon                                       from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons                             from 'react-native-vector-icons/MaterialCommunityIcons';
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

    this.predictionMainCategoryId = [parentId];
    this.predictionSubCategoryId = [subId];
    this.predictionTag = predictionTag;
    this.tempMainCategories = tempMainCategories.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));  

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

  handleCategoryContinue = (type, category) => {
    if(type === "main catogory continue button") {
      this.setState({
        selectedMainCategory: category
      });

      if(category !== this.predictionMainCategoryName) {
        this.setState({
          selectedSubCategory: 'Please select sub category'
        })
      }

    } else if(type === "sub category continue button") {
      this.setState({
        selectedSubCategory: category
      })
    }
  }

  render() {
    const { mainCategories, fashionSubCategories, electronicsSubCategories, homeSubCategories, 
            predictions, onSelectedItemsChange, onSelectedItemObjectsChange,
            newMainCategorySelected, newMainCategory, newSubCategorySelected, 
            newSubCategory, handleInputSubmit, handleRecommendCategoryButton } = this.props;

    const { height, width } = Dimensions.get('window');
    const imageFile = require("../../../images/02.png");

    this.tempSubCategories = this.state.selectedMainCategory === "Fashion" ? FashionSubCategories 
    : this.state.selectedMainCategory === "Electronics" ? ElectronicsSubCategories
    : this.state.selectedMainCategory === "Home & Kitchen" ? HomeSubCategories
    : null;

    return (
      <React.Fragment>
      <StatusBar
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
                  handleCategoryContinue: this.handleCategoryContinue
                }) }}
              >
                <Text style={{fontSize: 16, lineHeight: 24, paddingTop: 14}}>
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
                  selectedSubCategory: this.state.selectedSubCategory,
                  handleCategoryContinue: this.handleCategoryContinue
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
                borderWidth: 1,
                borderRadius: 30,
                width: 278,
                height: 58,
                marginTop: 50
              }}
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
      </SafeAreaView>
      </React.Fragment>
    );
  }
}

export default NewCategorySelectionPage;
