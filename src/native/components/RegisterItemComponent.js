import React, { Component }                             from 'react';
import get                                              from 'lodash.get';
import { connect }                                      from 'react-redux';
import { Actions }                                      from 'react-native-router-flux';
import { View, Image, ScrollView, TouchableOpacity, 
         Dimensions, ActivityIndicator }                from 'react-native';  
import { Container, Text, Button}                       from 'native-base';
import MentionsTextInput                                from 'react-native-mentions';
import { ImagePicker, Permissions }                     from 'expo';
import MaterialIcon                                     from 'react-native-vector-icons/MaterialIcons';
import styles                                           from '../styles/RegisterItemStyles';
import { items, colleges, shoesSizes, 
         mainCategories, FashionSubCategories,
         ElectronicsSubCategories, HomeSubCategories,
         BooksSubCategories, GamingSubCategories,
         clothingTypes, shoesTypes, bagsTypes,
         accessoriesTypes, topSizes, pantSizes }        from '../data/sampleRegisterItemData';
import * as hashTagData                                 from '../data/sampleHashTagData.json';         

import FashionTypeSelection                             from './RegisterItemComponent/FashionTypeSelection';
import TradeSelection                                   from './RegisterItemComponent/TradeSelection';
import GenderSizeSection                                from './RegisterItemComponent/GenderSizeSection';
import TextbookSelectionSection                         from './RegisterItemComponent/TextbookSelectionSection';
import CategorySelection                                from './RegisterItemComponent/CategorySelection';
import ConditionSelection                               from './RegisterItemComponent/ConditionSelection';
import DescriptionSection                               from './RegisterItemComponent/DescriptionSection';
import SwapCategorySelection                            from './RegisterItemComponent/SwapCategorySelection';
import ValueInputSection                                from './RegisterItemComponent/ValueInputSection';
import CategorySelectionPage                            from './RegisterItemComponent/CategorySelectionPage';
import HashTagSelectionSection                          from './RegisterItemComponent/HashTagSelectionSection';
import HashTagSelectionPage                             from './RegisterItemComponent/HashTagSelectionPage';
import RegisterItemSubmissionPage                       from './RegisterItemComponent/RegisterItemSubmissionPage';
import { postItem, getMetadata, 
         getItem, detectImage }                         from '../../actions/registerItemActions';

class RegisterItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictureUrl: "",
      errorMessage: "",
      hashTags: '',
      keyword: '',
      hashTagSampleData: [],
      data: [],
      hashTagSubmitted: false,
      descInputFieldColor: '#EDEDED',
      itemValueInputColor: '#EDEDED',
      textbookNameInputColor: '#EDEDED',
      courseNameInputColor: '#EDEDED',
      conditionClicked: false,
      genderClicked: false,
      itemDescription: "",
      numOfDescCharacters: 0,
      itemValueError: false,
      itemValue: "",
      swapToggle: false,
      sellToggle: false,
      rentToggle: false,
      selectedItems: [],
      collegeName: [],
      selectedSwapCategories: [],
      categoryEditClicked: false,
      textbookName: "",
      textBookNameError: false,
      courseName: "",
      courseNameError: false,
      collegeNameError: false,
      categorySubmitted: false,
      mainCategory: [],
      subCategory: [],
      categoryLevelThree: "",
      finalSubmitButtonDisable: true,
      finalSubmitError: false,
      conditionSelectionError: false,
      tradeSelectionError: false,
      swapCategorySelectionError: false,
      interestedCategoryEdit: false,
      interestedCategories: ["Books", "Electronics", "Fashion"],
      mainCategoryButtonClicked: false,
      subCategoryLv1ButtonClicked: false,
      subCategoryLv2ButtonClicked: false,
      predictions: {},

      tradeSelectionSubmitted: false,
      conditionSelectionSubmitted: false,
      descriptionSelectionSubmitted: false,
      valueInputSectionSubmitted: false,
      typeSizeGenderSubmitted: false,
      textbookSelectionSubmitted: false,
      itemRegisterStep: 1,

      finalSubmission: false
    };
    
    this.registerDataObj = {
      itemTitle: "",
      itemPhotoURI: "",
      files: [],
      hashTags: "",
      itemCondition: "",
      size: "",
      gender: "",
      itemDescription: "",
      itemValue: 0,
      swapToggle: this.state.swapToggle,
      sellToggle: this.state.sellToggle,
      rentToggle: this.state.rentToggle,
      selectedSwapCategories: [],
      collegeName: [],
      textbookName: "",
      courseName: "",
      categories: {
        mainCategory: [],
        categoryLevelTwo: [],
        categoryLevelThree: []
      }
    };

    this.conditionName= "";
    this.gender = "";

    this.categories = {
      mainCategory: [],
      categoryLevelTwo: [],
      categoryLevelThree: []
    };

    this.swapCategories = [];
    this.interestedCategories = ["Books", "Electronics", "Fashion"]

    this.mainCategoryButtonClicked = false;
    this.subCategoryLv1ButtonClicked = false;
    this.subCategoryLv2ButtonClicked = false;
    this.recommendedCategoryIdx = 0;

    this.recommendedCategory = {
      mainCategory: {name: 'Books', id: 2},
      subCategoryLevel1: {name: 'Textbooks', id: 0},
      subCategoryLevel2: ""
    };
  }

  componentDidMount() {
    this.pickImage();

    this.handleRecommendCategory();

    this.setState({
      hashTagSampleData: hashTagData.results
    });

    this.props.getMetadata();    
    this.props.getItem();
  }

  componentWillReceiveProps = (nextProps) => {
    console.log("&&&& this.props", this.props);
    console.log("&&&& nextProps", nextProps);

    if(this.props.registerItem.imageDetection !== nextProps.registerItem.imageDetection) {
      console.log("@#$^$&U%&%^$%#$@#!$#%$^%&%^#%@$!#");

      this.setState({
        predictions: nextProps.registerItem.imageDetection
      });
    }
  }

  handleRecommendCategory = () => {
    const mainCategory = this.recommendedCategory.mainCategory;
    const subCategoryLevel1 = this.recommendedCategory.subCategoryLevel1;

    if( Object.keys(this.recommendedCategory).length !== 0 && 
        (Object.keys(mainCategory).length !== 0 && Object.keys(subCategoryLevel1).length === 0)) {

      this.setState({
        mainCategory: [this.recommendedCategory.mainCategory.id],
        mainCategoryButtonClicked: !this.state.mainCategoryButtonClicked
      });

    } else if( Object.keys(this.recommendedCategory).length !== 0 && 
      (Object.keys(mainCategory).length !== 0 && Object.keys(subCategoryLevel1).length !== 0)) {

      this.setState({
        mainCategory: [this.recommendedCategory.mainCategory.id],
        subCategory: [this.recommendedCategory.subCategoryLevel1.id],
        subCategoryLv1ButtonClicked: !this.state.subCategoryLv1ButtonClicked,
        mainCategoryButtonClicked: !this.state.mainCategoryButtonClicked
      })
    }
  }

  takePhoto = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    
    if(status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access camera roll was denied',
      });
    }

    let cameraResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (!cameraResult.cancelled ) {
      this.setState({ pictureUrl: cameraResult.uri });
      this.registerDataObj['files'].push(cameraResult.uri);
    }
  };


  pickImage = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let bodyFormData = new FormData();

    if(status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access camera roll was denied',
      });
    }

    let galleryResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (!galleryResult.cancelled) {
      this.setState({ pictureUrl: galleryResult.uri });
      this.registerDataObj['files'].push(galleryResult.uri);

      bodyFormData.append('file', {
        uri: galleryResult.uri,
        type: 'image/jpeg',
        name: 'teste'
      });
    }

    if(this.registerDataObj['files'].length !== 0) {      
      this.props.detectImage(bodyFormData);
    }
  };

  handleInputSubmit = (inputType) => {
    if(inputType === "hashTagsInput") {
      const splitted = this.state.hashTags.split(" ");
      const title = splitted.map(item => {
        let newItem = item.substring(1);
        return newItem.charAt(0).toUpperCase() + newItem.slice(1);
      })

      this.registerDataObj["itemTitle"] = title.join(" ");
      this.registerDataObj["hashTags"] = title;

      this.setState({
        hashTagSubmitted: true,
        itemRegisterStep: this.state.itemRegisterStep + 1
      });

    } else if(inputType === "categoryInput") {
      this.registerDataObj["categories"].mainCategory = this.state.mainCategory;
      this.registerDataObj["categories"].categoryLevelTwo = this.state.subCategory;

      if(this.registerDataObj["categories"].mainCategory.indexOf(0) !== -1) {
        this.setState({
          itemRegisterStep: this.state.itemRegisterStep + 1
        });

      } else if(this.registerDataObj["categories"].mainCategory.indexOf(2) !== -1 && 
        this.registerDataObj["categories"].categoryLevelTwo.indexOf(0) !== -1) {
        this.setState({
          itemRegisterStep: this.state.itemRegisterStep + 2
        });

      } else {
        this.setState({
          itemRegisterStep: this.state.itemRegisterStep + 3
        });
      }

      this.setState({
        categorySubmitted: true
      });

    } else if(inputType === "TradeSelectionInput") {
      this.setState({
        tradeSelectionSubmitted: true,
        itemRegisterStep: this.state.itemRegisterStep + 1
      });

    } else if(inputType === "ConditionSelectionInput") {
      this.setState({
        conditionSelectionSubmitted: true,
        itemRegisterStep: this.state.itemRegisterStep + 1
      });

    } else if(inputType === "DescriptionSectionInput") {
      this.setState({
        descriptionSelectionSubmitted: true,
        itemRegisterStep: this.state.itemRegisterStep + 1
      });

    } else if(inputType === "ValueInput") {
      this.setState({
        valueInputSectionSubmitted: true,

        //********
        // itemRegisterStep: this.state.itemRegisterStep + 1
      });

      const finalRegisterItemData = Object.assign({}, this.registerDataObj);
      finalRegisterItemData.hashTags = finalRegisterItemData.hashTags.filter(hashTag => hashTag !== "");

      console.log("inside the ValueInput 1111", finalRegisterItemData);
      console.log("inside the ValueInput", this.registerDataObj);

    } else if(inputType === "typeGenderSizeInput") {
      this.setState({
        typeSizeGenderSubmitted: true,
        itemRegisterStep: this.state.itemRegisterStep + 2
      });

    } else if(inputType === "textbookCollegeCourseInput") {
      this.setState({
        textbookSelectionSubmitted: true,
        itemRegisterStep: this.state.itemRegisterStep + 1
      });
    }
  }

  handleSelection = (selectionType, value) => {
    if(selectionType === "conditionSelection") {
      this.registerDataObj["itemCondition"] = value;

      if(this.state.conditionClicked === false) {
        this.setState({
          conditionClicked: true,
          conditionSelectionError: false
        });

        this.conditionName = value;

      } else if(this.state.conditionClicked === true) {
        this.setState({
          conditionClicked: false,
        });

        this.conditionName = value;

      } else {
        this.setState({
          conditionClicked: false
        });

        this.conditionName = "";
      }

    } else if(selectionType === "genderSelection") {
      this.setState({
        genderClicked: !this.state.genderClicked,
        genderError: false
      });

      this.registerDataObj["gender"] = value;
      this.gender = value;
    }
  }

  handleTextInputFocus = (inputType) => {
    if(inputType === "itemDescInput") {
      this.setState({
        descInputFieldColor: "#00529b"
      })
    } else if(inputType === "itemValueInput") {
      this.setState({
        itemValueInputColor: "#00529b"
      })
    } else if(inputType === "textbookNameInput") {
      this.setState({
        textbookNameInputColor: "#00529b"
      })
    } else if(inputType === "courseNameInput") {
      this.setState({
        courseNameInputColor: "#00529b"
      })
    }
  }

  handleTextInputBlur = (inputType) => {
    if(inputType === "itemDescInput") {
      this.setState({
        descInputFieldColor: "#EDEDED"
      })

    } else if(inputType === "itemValueInput") {
      this.setState({
        itemValueInputColor: "#EDEDED"
      });

      if(this.state.itemValue === "") {
        this.setState({
          itemValueError: true
        })
      } else {
        this.setState({
          itemValueError: false
        })
      }

    } else if(inputType === "textbookNameInput") {
      this.setState({
        textbookNameInputColor: "#EDEDED"
      });

      if(this.state.textbookName === "") {
        this.setState({
          textBookNameError: true
        })
      } else {
        this.setState({
          textBookNameError: false
        })
      }

    } else if(inputType === "courseNameInput") {
      this.setState({
        courseNameInputColor: "#EDEDED"
      })

      if(this.state.courseName === "") {
        this.setState({
          courseNameError: true
        })
      } else {
        this.setState({
          courseNameError: false
        })
      }
    }
  }

  handleTextChange = (inputType, text, hashTagClicked, suggestionTabClicked) => {
    if(inputType === "itemDescInput") {
      let textLength = text.length;

      this.setState({
        numOfDescCharacters: textLength,
        itemDescription: text
      })

      this.registerDataObj["itemDescription"] = text

    } else if(inputType === "itemValueInput") {
      this.setState({
        itemValue: text
      });

      this.registerDataObj["itemValue"] = Number(text);

    } else if(inputType === "textbookNameInput") {
      this.setState({
        textbookName: text
      });

      this.registerDataObj["textbookName"] = text;

    } else if(inputType === "courseNameInput") {
      this.setState({
        courseName: text
      });

      this.registerDataObj["courseName"] = text;

    } else if(inputType === "hashTagPageSelection") {
      if(hashTagClicked === true) {
        let newText = `#${text}`;

        this.setState({
          hashTags: this.state.hashTags + " " + newText
        });

      } else if(hashTagClicked === false) {
        let newText = `#${text}`;
        let hashTagArray = this.state.hashTags.split(" ");
        let newHashTagArray = hashTagArray.filter(hashTag => hashTag !== newText);
        let newHashTag = newHashTagArray.join(" ");

        this.setState({
          hashTags: newHashTag
        });

      } else if(suggestionTabClicked === true) {
        let temp = (this.state.hashTags).split(" ");
        let newHashTag = (temp.slice(0, temp.length-1)).join(" ");
        let textArray = text.split(" ");
        let lastText = textArray[textArray.length-1];

        this.setState({
          hashTags: newHashTag + " " + lastText
        });

      } else {
        this.setState({
          hashTags: text
        });
      }
    }
  }

  handleEdit = (inputType) => {
    if(inputType === "categorySelection") {
      this.setState({
        categorySubmitted: false
      });

    } else if(inputType === "hashTagSelection") {
      this.setState({
        hashTagSubmitted: false
      });
    } else if(inputType === "interestedCategoryEdit") {
      this.setState({
        interestedCategoryEdit: !this.state.interestedCategoryEdit
      });
    }
  }

  handleDropDown = (dropDownName, value, id) => {
    if(dropDownName === "sizeDropdown") {
      this.registerDataObj["size"] = value;
      this.setState({
        sizeError: false
      });

    } else if(dropDownName === "fashionTypeDropdown") {
      this.registerDataObj["categories"].categoryLevelThree = [id];
      this.registerDataObj["category"] = id;

      this.setState({
        categoryLevelThree: value,
        typeSelectionError: false
      });
    }
  }

  onSelectedItemsChange = (selectionType, selectedItems) => {
    if(selectionType === "collegeSelection") {
      this.setState({ 
        collegeName: selectedItems,
        collegeNameError: false
      });
      this.registerDataObj["collegeName"] = selectedItems;

    } else if(selectionType === "swapCategorySelection") {
      this.setState({ selectedSwapCategories: selectedItems});
      this.registerDataObj["selectedSwapCategories"] = selectedItems;

    } else if(selectionType === "mainCategorySelection") {
      this.setState({ mainCategory: selectedItems });
      this.registerDataObj["categories"].mainCategory = selectedItems;

    } else if(selectionType === "subCategorySelection") {
      this.setState({ subCategory: selectedItems });
      this.registerDataObj["categories"].categoryLevelTwo = selectedItems;
      this.registerDataObj.category = selectedItems[0];
    }
  }

  onSelectedItemObjectsChange = (selectionType, selectedItems) => {
    if(selectionType === "mainCategorySelection") {
      this.categories.mainCategory = selectedItems[0].name;

    } else if(selectionType === "subCategorySelection") {
      this.categories.categoryLevelTwo = selectedItems[0].name;

    } else if(selectionType === "swapCategorySelection") {
      const categories = ["Books", "Electronics", "Fashion"];
      let temp = [];

      for(let i = 0; i < selectedItems.length; i++) {
        temp.push(selectedItems[i].name);
      }

      this.setState({
        interestedCategories: categories.concat(temp)
      });
    }
  }

  handleSubmit = (inputType) => {

    // if(inputType === "ValueInput") {

    // }


    if(this.state.finalSubmitError === false) {
      debugger;
      //call POST action     
      const finalRegisterItemData = Object.assign({}, this.registerDataObj);
      delete finalRegisterItemData.categories;
      
      console.log("222222222", finalRegisterItemData);

      this.props.postItem(finalRegisterItemData);

      // Actions.registerItemSubmission({ User: User })
      // Actions.registerItemSubmission();

      this.setState({
        itemRegisterStep: this.state.itemRegisterStep + 1,
        valueInputSectionSubmitted: true,
        finalSubmission: true
      });
    }
  }

  handleSwitch = (switchType, value) => {
    if(switchType === "SwapSwitch") {
      this.setState({
        swapToggle: !this.state.swapToggle,
        tradeSelectionError: false
      });
      this.registerDataObj["swapToggle"] = !this.registerDataObj["swapToggle"];

    } else if(switchType === "SellSwitch") {
      this.setState({
        sellToggle: !this.state.sellToggle,
        tradeSelectionError: false
      });
      this.registerDataObj["sellToggle"] = !this.registerDataObj["sellToggle"];

    } else if(switchType === "RentSwitch") {
      this.setState({
        rentToggle: !this.state.rentToggle,
        tradeSelectionError: false
      });
      this.registerDataObj["rentToggle"] = !this.registerDataObj["rentToggle"];
    }
  }

  handleRecommendCategoryButton = (inputType, mainCategoryId, subCategoryLv1Id, mainCategoryName, subCategoryLv1Name) => {
    if(this.recommendedCategoryIdx === 0) {
      if(inputType === "mainCategory") {
        this.setState({
          subCategoryLv1ButtonClicked: false,

          mainCategory: [mainCategoryId],
          subCategory: []
        });

        this.categories.mainCategory = [mainCategoryName];
        this.categories.categoryLevelTwo = [];

        this.recommendedCategoryIdx = this.recommendedCategoryIdx + 1;

      } else if(inputType === "subCategoryLevel1") {
        this.setState({
          mainCategoryButtonClicked: false,
          subCategoryLv1ButtonClicked: false,

          mainCategory: [],
          subCategory: []
        });

        this.categories.mainCategory = [];
        this.categories.categoryLevelTwo = [];        

        this.recommendedCategoryIdx = this.recommendedCategoryIdx + 1;
      }

    } else if(this.recommendedCategoryIdx > 0) {

      if(inputType === "mainCategory") {
        this.setState({
          mainCategoryButtonClicked: !this.state.mainCategoryButtonClicked
        });

        if(this.state.mainCategory.length !== 0 && this.state.subCategory.length === 0) {
          this.setState({
            mainCategory: []
          })

          this.categories.mainCategory = [];

        } else if(this.state.mainCategory.length === 0 && this.state.subCategory.length === 0) {
          this.setState({
            mainCategory: [mainCategoryId],
          })

          this.categories.mainCategory = [mainCategoryName];
        }

        if(this.state.mainCategoryButtonClicked === true && this.state.subCategoryLv1ButtonClicked === true) {
          this.setState({
            mainCategoryButtonClicked: true,
            subCategoryLv1ButtonClicked: false,

            mainCategory: [mainCategoryId],
            subCategory: []
          });

          this.categories.mainCategory = [mainCategoryName];
          this.categories.categoryLevelTwo = [];
        }

      } else if(inputType === "subCategoryLevel1") {

        this.setState({
          mainCategoryButtonClicked: !this.state.mainCategoryButtonClicked,
          subCategoryLv1ButtonClicked: !this.state.subCategoryLv1ButtonClicked
        });

        if(this.state.mainCategoryButtonClicked === true && this.state.subCategoryLv1ButtonClicked === false) {
          this.setState({
            mainCategoryButtonClicked: true,
            subCategoryLv1ButtonClicked: true
          });

          if(this.state.subCategory.length === 0) {
            this.setState({
              subCategory: [subCategoryLv1Id]
            });

            this.categories.categoryLevelTwo = [subCategoryLv1Name];
          }
        }

        if(this.state.mainCategory.length !== 0 && this.state.subCategory.length !== 0) {
          this.setState({
            mainCategory: [],
            subCategory: []
          });

          this.categories.mainCategory = [];
          this.categories.categoryLevelTwo = [];

        } else if(this.state.mainCategory.length === 0 && this.state.subCategory.length === 0) {
          this.setState({
            mainCategory: [mainCategoryId],
            subCategory: [subCategoryLv1Id]
          });

          this.categories.mainCategory = [mainCategoryName];
          this.categories.categoryLevelTwo = [subCategoryLv1Name];
        }
      }
    }
  }


  render() {
    const { conditionClicked, genderClicked } = this.state;
    const { width } = Dimensions.get('window');
    const { registerItem } = this.props;
    const imageDetection = get(registerItem, "imageDetection", {});
    const predictions = get(imageDetection, "predictions", []);

    console.log("~~~~~~~", this.props);
    // console.log(this.state);
    // console.log(this.registerDataObj);

    console.log("!!!! imageDetection", imageDetection);

    return (
      <Container>
        <View style={styles.mainView}>
            <ScrollView
              ref={ref => (this.scrollView = ref)}
              contentContainerStyle={{ paddingVertical: 20 }} 
              alwaysBounceVertical={true}
            > 

              {/* HashTag Selection Page START */}
              {
                this.state.pictureUrl !== undefined && 
                this.state.pictureUrl !== "" && 
                this.state.hashTagSubmitted === false &&
                this.state.itemRegisterStep === 1 ?
                <HashTagSelectionPage 
                  hashTags={this.state.hashTags}
                  handleTextChange={this.handleTextChange}
                  handleInputSubmit={this.handleInputSubmit}
                  predictions={this.state.predictions}
                />
                : null
              }
              {/* HashTag Selection Page END */}

              {/* Category Level 1 & 2 Selection Page START */}
              {
                this.state.pictureUrl !== undefined && 
                this.state.pictureUrl !== "" && 
                this.state.hashTagSubmitted === true && 
                this.state.categorySubmitted === false && 
                this.state.itemRegisterStep === 2 ?

                <CategorySelectionPage 
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  mainCategory={this.state.mainCategory}
                  handleInputSubmit={this.handleInputSubmit}
                  subCategory={this.state.subCategory}
                  onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
                  handleRecommendCategoryButton={this.handleRecommendCategoryButton}
                  mainCategoryButtonClicked={this.state.mainCategoryButtonClicked}
                  subCategoryLv1ButtonClicked={this.state.subCategoryLv1ButtonClicked}
                  recommendedCategory={this.recommendedCategory}
                />
                : null
              }
              {/* Category Level 1 & 2 Selection Page END */}

              {/* Fashion Type (3rd Sub Category) Selection START */}
              {
                this.state.pictureUrl !== undefined &&
                this.state.pictureUrl !== "" &&
                this.state.hashTagSubmitted === true &&
                this.state.categorySubmitted === true &&
                this.registerDataObj.categories.mainCategory.indexOf(0) !== -1 &&
                this.state.typeSizeGenderSubmitted === false &&
                this.state.itemRegisterStep === 3 &&
                this.state.tradeSelectionSubmitted === false ?

                <FashionTypeSelection 
                  typeSelectionError={this.state.typeSelectionError}
                  handleDropDown={this.handleDropDown}
                  categories={this.registerDataObj["categories"]}
                />
                : null
              }
              {/* Fashion Type (3rd Sub Category) Selection END */}

              {/* Gender & Size Section START */}
              {
                this.state.pictureUrl !== undefined &&
                this.state.pictureUrl !== "" &&
                this.state.hashTagSubmitted === true &&
                this.state.categorySubmitted === true &&
                this.registerDataObj.categories.mainCategory.indexOf(0) !== -1 &&
                this.state.typeSizeGenderSubmitted === false &&
                this.state.itemRegisterStep === 3 &&
                this.state.tradeSelectionSubmitted === false ?

                <GenderSizeSection 
                  genderError={this.state.genderError}
                  categoryLevelThree={this.state.categoryLevelThree}
                  gender={this.registerDataObj["gender"]}
                  size={this.registerDataObj["size"]}
                  type={this.registerDataObj["categories"].categoryLevelThree}
                  genderClicked={this.state.genderClicked}
                  handleSelection={this.handleSelection}
                  categories={this.registerDataObj["categories"]}
                  sizeError={this.state.sizeError}
                  handleDropDown={this.handleDropDown}
                  handleInputSubmit={this.handleInputSubmit}
                />
                : null
              }
              {/* Gender & Size Section END */}

              {/* College Name, Course Name & Textbook Title Section START */}
              {
                this.state.pictureUrl !== undefined &&
                this.state.pictureUrl !== "" &&
                this.state.hashTagSubmitted === true &&
                this.state.categorySubmitted === true &&
                this.registerDataObj.categories.mainCategory.indexOf(2) !== -1 &&
                this.registerDataObj.categories.categoryLevelTwo.indexOf(0) !== -1 &&
                this.state.textbookSelectionSubmitted === false &&
                this.state.itemRegisterStep === 4 &&
                this.state.tradeSelectionSubmitted === false ?

                <TextbookSelectionSection 
                  textBookNameError={this.state.textBookNameError}
                  textbookNameInputColor={this.state.textbookNameInputColor}
                  textbookName={this.state.textbookName}
                  handleTextChange={this.handleTextChange}
                  handleTextInputFocus={this.handleTextInputFocus}
                  handleTextInputBlur={this.handleTextInputBlur}
                  courseNameError={this.state.courseNameError}
                  courseName={this.state.courseName}
                  courseNameInputColor={this.state.courseNameInputColor}
                  collegeNameError={this.state.collegeNameError}
                  collegeName={this.registerDataObj["collegeName"]}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  handleInputSubmit={this.handleInputSubmit}
                />
                : null
              }

              {/* College Name, Course Name & Textbook Title Section END */}

              {/* Trade Selection Page START */}
              {
                this.state.pictureUrl !== undefined && 
                this.state.pictureUrl !== "" && 
                this.state.hashTagSubmitted === true &&
                this.state.categorySubmitted === true &&
                this.state.itemRegisterStep === 5 &&
                this.state.tradeSelectionSubmitted === false ?

                <TradeSelection 
                  tradeSelectionError={this.state.tradeSelectionError}
                  handleInputSubmit={this.handleInputSubmit}
                  swapToggle={this.state.swapToggle}
                  sellToggle={this.state.sellToggle}
                  rentToggle={this.state.rentToggle}
                  handleSwitch={this.handleSwitch}
                  handleEdit={this.handleEdit}
                  interestedCategories={this.state.interestedCategories}
                  interestedCategoryEdit={this.state.interestedCategoryEdit}
                  selectedSwapCategoriesState={this.state.selectedSwapCategories}
                  swapCategorySelectionError={this.state.swapCategorySelectionError}
                  selectedSwapCategories={this.registerDataObj["selectedSwapCategories"]}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
                />
                : null
              }
              {/* Trade Selection Page END */}           

              {/* Condition Selection Page START */}
              {
                this.state.pictureUrl !== undefined && 
                this.state.pictureUrl !== "" && 
                this.state.hashTagSubmitted === true &&
                this.state.categorySubmitted === true && 
                this.state.tradeSelectionSubmitted === true &&
                this.state.itemRegisterStep === 6 &&
                this.state.conditionSelectionSubmitted === false ?

                <ConditionSelection 
                  conditionSelectionError={this.state.conditionSelectionError}
                  conditionName={this.conditionName}
                  handleSelection={this.handleSelection}
                  conditionClicked={this.state.conditionClicked}
                  handleInputSubmit={this.handleInputSubmit}
                />

                : null
              }
              {/* Condition Selection Page END */}

              {/* Description Selection Page START */}
              {
                this.state.pictureUrl !== undefined && 
                this.state.pictureUrl !== "" && 
                this.state.hashTagSubmitted === true &&
                this.state.categorySubmitted === true && 
                this.state.tradeSelectionSubmitted === true &&
                this.state.conditionSelectionSubmitted === true &&
                this.state.itemRegisterStep === 7 &&
                this.state.descriptionSelectionSubmitted === false ?

                <DescriptionSection
                  descInputFieldColor={this.state.descInputFieldColor}
                  itemDescription={this.state.itemDescription}
                  handleTextChange={this.handleTextChange}
                  handleTextInputFocus={this.handleTextInputFocus}
                  handleTextInputBlur={this.handleTextInputBlur}
                  numOfDescCharacters={this.state.numOfDescCharacters}
                  handleInputSubmit={this.handleInputSubmit}
                />
                : null
              }
              {/* Description Selection Page END */}

              {/* Value Input Section START */}
              {
                this.state.pictureUrl !== undefined && 
                this.state.pictureUrl !== "" && 
                this.state.hashTagSubmitted === true &&
                this.state.categorySubmitted === true && 
                this.state.tradeSelectionSubmitted === true &&
                this.state.conditionSelectionSubmitted === true && 
                this.state.descriptionSelectionSubmitted === true &&
                this.state.itemRegisterStep === 8 &&
                this.state.valueInputSectionSubmitted === false ?

                <ValueInputSection 
                  itemValueError={this.state.itemValueError}
                  itemValueInputColor={this.state.itemValueInputColor}
                  itemValue={this.state.itemValue}
                  handleTextChange={this.handleTextChange}
                  handleTextInputFocus={this.handleTextInputFocus}
                  handleTextInputBlur={this.handleTextInputBlur}
                  handleInputSubmit={this.handleInputSubmit}
                  handleSubmit={this.handleSubmit}
                />
                : null
              }
              {/* Value Input Section END */}

              {/* Register Item Submission Page START */}
              {
                this.state.pictureUrl !== undefined && 
                this.state.pictureUrl !== "" && 
                this.state.hashTagSubmitted === true &&
                this.state.categorySubmitted === true && 
                this.state.tradeSelectionSubmitted === true &&
                this.state.conditionSelectionSubmitted === true && 
                this.state.descriptionSelectionSubmitted === true &&
                this.state.itemRegisterStep === 9 &&
                this.state.valueInputSectionSubmitted === true &&
                this.state.finalSubmission === true ?

                <RegisterItemSubmissionPage 
                  registerDataObj={this.registerDataObj}
                />

                : null
              }

              {/* Register Item Submission Page END */}
            </ScrollView>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  registerItem: state.registerItem || {},
});

const mapDispatchToProps = {
  postItem: postItem,
  getMetadata: getMetadata,
  getItem: getItem,
  detectImage: detectImage
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterItemComponent);


