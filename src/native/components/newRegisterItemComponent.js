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
// import HashTagSelectionSection                          from './RegisterItemComponent/HashTagSelectionSection';
import HashTagSelectionPage                             from './RegisterItemComponent/HashTagSelectionPage';
import RegisterItemSubmissionPage                       from './RegisterItemComponent/RegisterItemSubmissionPage';
import NewCategorySelectionPage                         from './RegisterItemComponent/NewCategorySelectionPage';
import { postItem, getMetadata, 
         getItem, detectImage }                       from '../../actions/registerItemActions';

class RegisterItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictureUrl: "",
      hashTagSampleData: "",
      predictions: [],
      itemRegisterStep: 1,
      newMainCategorySelected: false,
      newMainCategory: "",
      newSubCategorySelected: false,
      newSubCategory: "",
      typeSelectionError: false,
      categoryLevelThree: "",
      genderClicked: false,
      sizeError: false,

      hashTags: '',

      tradeSelectionError: false,

      swapToggle: false,
      sellToggle: false,
      rentToggle: false,

      swapCategorySelectionError: false,
      interestedCategoryEdit: false,
      // interestedCategories: ["Books", "Electronics", "Fashion"],
      selectedSwapCategories: [],

      conditionClicked: false,
      conditionSelectionError: false,

      descInputFieldColor: '#EDEDED',
      itemDescription: "",
      numOfDescCharacters: 0,

      itemValueError: false,
      itemValue: "",
      itemValueInputColor: '#EDEDED',
    };
    
    this.registerDataObj = {
      files: [],
      gender: "",
      size: "",
      // categories: {
      //   mainCategory: [],
      //   categoryLevelTwo: [],
      //   categoryLevelThree: []
      // },
      categories: {},
      selectedSwapCategories: [],
    };

    this.categories = {
      mainCategory: [],
      categoryLevelTwo: [],
      categoryLevelThree: []
    };

    this.mainCategories = [];
    this.fashionSubCategories = [];
    this.electronicsSubCategories =[];
    this.homeSubCategories =[];
    this.newMainCategory = "";
    this.newSubCategory = "";

    this.conditionName = "";
  }

  componentWillMount() {
    this.props.getMetadata();
    // this.props.getItem();
  }

  componentDidMount() {
    const { registerItem } = this.props;
    const metadata = get(registerItem, "metadata", {});
    const category = get(metadata, "category", {});
    const mainCategories = get(category, "SubCategory", []);

    this.pickImage();
    // this.handleRecommendCategory();

    this.setState({
      hashTagSampleData: hashTagData.results
    });

    let tempCategory = {
      name: "Main Categories",
      children: []
    };

    let tempFashionSubCategory = {
      name: "Fashion Sub Categories",
      children: []
    };

    let tempElectronicsSubCategory = {
      name: "Electronics Sub Categories",
      children: []
    };

    let tempHomeSubCategory = {
      name: "Home & Kitchen Sub Categories",
      children: []
    };

    mainCategories.map((item, index) => {
      let singleMainCategory = {};
      singleMainCategory.name = item.title;
      singleMainCategory.id = item.id;

      tempCategory.children.push(singleMainCategory);

      if(item.title === "Fashion") {
        item.SubCategory.map((item, index) => {
          let singleFashionSubCategory = {};
          singleFashionSubCategory.name = item.title;
          singleFashionSubCategory.id = item.id;
          singleFashionSubCategory.categoryFilters = item.CategoryFilters;

          tempFashionSubCategory.children.push(singleFashionSubCategory);
        });
      }

      if(item.title === "Electronics") {
        item.SubCategory.map((item, index) => {
          let singleElectronicsSubCategory = {};
          singleElectronicsSubCategory.name = item.title;
          singleElectronicsSubCategory.id = item.id;

          tempElectronicsSubCategory.children.push(singleElectronicsSubCategory);
        });
      } 

      if(item.title === "Home & Kitchen") {
        item.SubCategory.map((item, index) => {
          let singleHomeSubCategory = {};
          singleHomeSubCategory.name = item.title;
          singleHomeSubCategory.id = item.id;

          tempHomeSubCategory.children.push(singleHomeSubCategory);
        });
      }
    });

    this.mainCategories.push(tempCategory);
    this.fashionSubCategories.push(tempFashionSubCategory);
    this.electronicsSubCategories.push(tempElectronicsSubCategory);
    this.homeSubCategories.push(tempHomeSubCategory);
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.registerItem.imageDetection !== nextProps.registerItem.imageDetection) {
      this.setState({
        predictions: nextProps.registerItem.imageDetection
      });
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

  onSelectedItemsChange = (selectionType, selectedItems, predictionMainCategoryId) => {
    if(selectionType === "swapCategorySelection") {
      this.setState({ selectedSwapCategories: selectedItems});
      this.registerDataObj["selectedSwapCategories"] = selectedItems;

    } else if(selectionType === "mainCategorySelection") {
      this.setState({
        newMainCategorySelected: true,
        newMainCategory: selectedItems
      });

      this.newMainCategory = selectedItems;
      this.registerDataObj["categories"].mainCategory = selectedItems;

    } else if(selectionType === "subCategorySelection") {
      this.setState({
        newSubCategorySelected: true,
        newSubCategory: selectedItems
      });

      this.newSubCategory = selectedItems;
      this.registerDataObj["categories"].categoryLevelTwo = selectedItems;
    }

    if(!!this.newMainCategory && !!predictionMainCategoryId && 
        this.newMainCategory[0] === predictionMainCategoryId[0]) {
      this.setState({
        newMainCategorySelected: false
      });
    }
  }

  onSelectedItemObjectsChange = (selectionType, selectedItems) => {
    if(selectionType === "mainCategorySelection") {
      this.categories.mainCategory = selectedItems[0].name;

    } else if(selectionType === "subCategorySelection") {
      this.categories.categoryLevelTwo = selectedItems[0].name;





    // ** once swap category selection page is done you don't need this
    } else if(selectionType === "swapCategorySelection") {
      const categories = ["Books", "Electronics", "Fashion"];
      let temp = [];

      for(let i = 0; i < selectedItems.length; i++) {
        temp.push(selectedItems[i].name);
      }

      this.setState({
        interestedCategories: categories.concat(temp)
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
    }
  }

  handleInputSubmit = (inputType, mainCategory, subCategory) => {
    if(inputType === "categoryInput") {

      //**** Probably not going to need this
      if(this.state.newMainCategorySelected === false) {
        this.registerDataObj["categories"].mainCategory = mainCategory[0];
      } else {
        this.registerDataObj["categories"].mainCategory = this.state.newMainCategory[0];  
      }

      if(this.state.newSubCategorySelected === false) {
        this.registerDataObj["categories"].categoryLevelTwo = subCategory[0];
      } else {
        this.registerDataObj["categories"].categoryLevelTwo = this.state.newSubCategory[0];
      }
      
      if(this.registerDataObj["categories"].mainCategory === "b388d6e7-bae2-40ae-ad6e-b2b6cf2d0bd4") {
        this.setState({
          itemRegisterStep: this.state.itemRegisterStep + 1
        });
      } else {
        this.setState({
          itemRegisterStep: this.state.itemRegisterStep + 2
        });
      }

    } else if(inputType === "fashionTypeInput") {
      console.log("&&&&&&& currentFilterValue", mainCategory);

      this.registerDataObj.categories["finalFilterType"] = mainCategory;

      this.setState({
        itemRegisterStep: 2
      })


    } else if(inputType === "typeGenderSizeInput") {

      //** mainCategory here means current selected size
      this.registerDataObj.size = mainCategory;

      this.setState({
        itemRegisterStep: this.state.itemRegisterStep + 1
      });

    } else if(inputType === "hashTagsInput") {
      const splitted = this.state.hashTags.split(" ");
      const title = splitted.map(item => {
        let newItem = item.substring(1);
        return newItem.charAt(0).toUpperCase() + newItem.slice(1);
      })

      this.registerDataObj["itemTitle"] = title.join(" ");
      this.registerDataObj["hashTags"] = title;

      this.setState({
        // hashTagSubmitted: true,
        itemRegisterStep: this.state.itemRegisterStep + 1
      });






    } else if(inputType === "TradeSelectionInput") {

      //mainCategory is finalSelectedSwapCategoryObj


      this.registerDataObj["selectedSwapCategories"] = mainCategory;

      this.setState({
        // tradeSelectionSubmitted: true,
        itemRegisterStep: this.state.itemRegisterStep + 1
      });





    } else if(inputType === "ConditionSelectionInput") {
      this.setState({
        // conditionSelectionSubmitted: true,
        itemRegisterStep: this.state.itemRegisterStep + 1
      });

    } else if(inputType === "DescriptionSectionInput") {
      this.setState({
        // descriptionSelectionSubmitted: true,
        itemRegisterStep: this.state.itemRegisterStep + 1
      });
    }
  }

  // handleDropDown = (dropDownName, value, id) => {
  //   if(dropDownName === "sizeDropdown") {
  //     this.registerDataObj["size"] = value;
  //     this.setState({
  //       sizeError: false
  //     });

  //   } else if(dropDownName === "fashionTypeDropdown") {
  //     // this.registerDataObj["categories"].categoryLevelThree = [id];
  //     // this.registerDataObj["category"] = id;

  //     // this.setState({
  //     //   categoryLevelThree: value,
  //     //   typeSelectionError: false
  //     // });

  //     this.registerDataObj["categories"].filterType = value;

  //     this.setState({
  //       categoryLevelThree: value
  //     });
  //   }
  // }

  handleRecommendCategoryButton = (inputType, mainCategoryId, mainCategoryName, subCategoryId, subCategoryName) => {
    if(inputType === "mainCategory") {
      this.setState({
        newMainCategorySelected: false
      });

      this.registerDataObj["categories"].mainCategory = mainCategoryId;
      this.registerDataObj["categories"].categoryLevelTwo = subCategoryId;
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

    } else if(inputType === "hashTagPageSelection") {
      if(hashTagClicked === true) {
        let newText = `${text}`;

        this.setState({
          hashTags: this.state.hashTags + " " + newText
        });

      } else if(hashTagClicked === false) {
        let newText = `${text}`;
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




  handleEditContinue = (pageName) => {
    if(pageName === "Swap Category Page") {
      console.log("Continue button has been clicked!!!!!");
    }

    // if(inputType === "interestedCategoryEdit") {
    //   this.setState({
    //     interestedCategoryEdit: !this.state.interestedCategoryEdit
    //   });
    // }
  }



  handleTextInputFocus = (inputType) => {
    if(inputType === "itemDescInput") {
      this.setState({
        descInputFieldColor: "black"
      })
    } else if(inputType === "itemValueInput") {
      this.setState({
        itemValueInputColor: "black"
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

  handleSubmit = (inputType) => {

    // if(inputType === "ValueInput") {

    // }

    // console.log("@@@@ inside handleSubmit function", inputType);
    // console.log("~~~~~~~ this.state.finalSubmitError", this.state.finalSubmitError);

    if(inputType === "ValueInput") {
    // if(this.state.finalSubmitError === false) {
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

  handlePageContinueButton = (pageName, selectedItems) => {
    if(pageName === "category selection") {
      this.registerDataObj["categories"] = selectedItems;

      console.log("11111ggggg selectedItems", selectedItems);
      console.log("22222ggggg this.registerDataObj", this.registerDataObj);

      if(selectedItems.finalMainCategory === "Fashion" 
          // && this.registerDataObj["categories"].finalSubCategory !== "Clothing"
        ) {
        this.setState({
          itemRegisterStep: this.state.itemRegisterStep + 1.5
        });

      // } else if(selectedItems.finalMainCategory === "Fashion" && this.registerDataObj["categories"].finalSubCategory === "Clothing") {
      //   this.setState({
      //     itemRegisterStep: this.state.itemRegisterStep + 1.5
      //   })

      } else {
        this.setState({
          // itemRegisterStep: this.state.itemRegisterStep + 2
          itemRegisterStep: 3
        });
      }

    } else if(pageName === "hashTag selection") {
      this.setState({
        itemRegisterStep: this.state.itemRegisterStep + 1
      });
    }
  }

  handleBackButton = (pageName) => {
    if(pageName === "hashTag selection") {
      //go back to category selection page
      this.setState({
        itemRegisterStep: 1
      });

    } else if(pageName === "trade selection") {
      this.setState({
        itemRegisterStep: 3
      });


    } else if(pageName === "description input") {
      this.setState({
        itemRegisterStep: 5
      });

    } else if(pageName === "value input") {
      this.setState({
        itemRegisterStep: 6
      });

    } else if(pageName === "gender and size input") {
      this.setState({
        itemRegisterStep: 1
      });

    } else if(pageName === "filter type selection") {
      this.setState({
        itemRegisterStep: 1
      })
    }
  }

  render() {
    const { registerItem } = this.props;
    const imageDetection = get(registerItem, "imageDetection", {});
    const metadata = get(registerItem, "metadata", {});
    const category = get(metadata, "category", {});
    const mainCategories = get(category, "SubCategory", []);

    console.log("~~~~~~~", this.props);
    console.log("@@@@@@@ this.registerDataObj", this.registerDataObj);

    return (
      <Container>
        <View style={styles.mainView}>
          <ScrollView
            ref={ref => (this.scrollView = ref)}
            contentContainerStyle={{ paddingVertical: 20 }} 
            alwaysBounceVertical={true}
          >
            {/* Category Level 1 & 2 Selection Page START */}
            {
              this.state.pictureUrl !== undefined &&
              Object.keys(this.state.predictions).length > 0 &&
              this.state.itemRegisterStep === 1 ?

              <NewCategorySelectionPage 
                mainCategories={this.mainCategories}
                fashionSubCategories={this.fashionSubCategories}
                electronicsSubCategories={this.electronicsSubCategories}
                homeSubCategories={this.homeSubCategories}
                predictions={this.state.predictions}
                // onSelectedItemsChange={this.onSelectedItemsChange}
                // onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
                newMainCategory={this.state.newMainCategory}
                newMainCategorySelected={this.state.newMainCategorySelected}
                newSubCategorySelected={this.state.newSubCategorySelected}
                newSubCategory={this.state.newSubCategory}
                // handleInputSubmit={this.handleInputSubmit}
                // handleRecommendCategoryButton={this.handleRecommendCategoryButton}

                handlePageContinueButton={this.handlePageContinueButton}
              />
              : null
            }
            {/* Category Level 1 & 2 Selection Page END*/}

            






            {/* Filter Page (Only for Fashion) START*/}
            {
              this.state.itemRegisterStep === 2.5 ?
              // (this.registerDataObj["categories"].categoryLevelTwo === "4a380c0c-9b9e-459d-b988-b7d9b2720d7d" ||
              // this.registerDataObj["categories"].categoryLevelTwo === "07f12a59-6272-49c5-ad38-ba7623c0cf84" ||
              // this.registerDataObj["categories"].categoryLevelTwo === "6a60e00e-f8e5-4f49-92fb-62d2d1154452" ||
              // this.registerDataObj["categories"].categoryLevelTwo === "ed8f58f9-aed2-449b-b61c-7fb92ea36b8e")  ?

              <FashionTypeSelection 
                typeSelectionError={this.state.typeSelectionError}
                // handleDropDown={this.handleDropDown}
                categories={this.registerDataObj["categories"]}
                fashionSubCategories={this.fashionSubCategories}

                handleBackButton={this.handleBackButton}

                handleInputSubmit={this.handleInputSubmit}
              />
              : null
            }

            {
              this.state.itemRegisterStep === 2 ?
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
                // handleDropDown={this.handleDropDown}
                handleInputSubmit={this.handleInputSubmit}

                handleBackButton={this.handleBackButton}
              />
              : null
            }
            {/* Filter Page (Only for Fashion) END*/}









            {/* HashTag Selection Page START*/}
            {
              this.state.itemRegisterStep === 3 ?
              <HashTagSelectionPage 
                hashTags={this.state.hashTags}
                handleTextChange={this.handleTextChange}
                handleInputSubmit={this.handleInputSubmit}
                handlePageContinueButton={this.handlePageContinueButton}
                handleBackButton={this.handleBackButton}
                // getRecommendedHashTags={this.props.getRecommendedHashTags}
              />
              : null 
            }
            {/* HashTag Selection Page END */}

            {/* Trade Selection Page START */}
            {
              this.state.itemRegisterStep === 4 ?
              <TradeSelection 
                tradeSelectionError={this.state.tradeSelectionError}
                handleInputSubmit={this.handleInputSubmit}
                swapToggle={this.state.swapToggle}
                sellToggle={this.state.sellToggle}
                rentToggle={this.state.rentToggle}
                handleSwitch={this.handleSwitch}
                handleEditContinue={this.handleEditContinue}

                // interestedCategories={this.state.interestedCategories}
                // interestedCategoryEdit={this.state.interestedCategoryEdit}

                selectedSwapCategoriesState={this.state.selectedSwapCategories}

                swapCategorySelectionError={this.state.swapCategorySelectionError}
                
                selectedSwapCategories={this.registerDataObj["selectedSwapCategories"]}
                onSelectedItemsChange={this.onSelectedItemsChange}
                onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}

                handleBackButton={this.handleBackButton}
              />
              : null
            }

            {/* Condition Selection Page START */}
            {
              this.state.itemRegisterStep === 5 ?
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

            {/* Description Page START */}
            {
              this.state.itemRegisterStep === 6 ?

              <DescriptionSection
                descInputFieldColor={this.state.descInputFieldColor}
                itemDescription={this.state.itemDescription}
                handleTextChange={this.handleTextChange}
                handleTextInputFocus={this.handleTextInputFocus}
                handleTextInputBlur={this.handleTextInputBlur}
                numOfDescCharacters={this.state.numOfDescCharacters}
                handleInputSubmit={this.handleInputSubmit}


                handleBackButton={this.handleBackButton}
              />
              : null
            }
            {/* Description Page END */}

            {/* Value Input Page END */}
            {
              this.state.itemRegisterStep === 7 ?
              <ValueInputSection 
                itemValueError={this.state.itemValueError}
                itemValueInputColor={this.state.itemValueInputColor}
                itemValue={this.state.itemValue}
                handleTextChange={this.handleTextChange}
                handleTextInputFocus={this.handleTextInputFocus}
                handleTextInputBlur={this.handleTextInputBlur}
                handleInputSubmit={this.handleInputSubmit}
                handleSubmit={this.handleSubmit}
                handleBackButton={this.handleBackButton}
              />
              : null
            }

            {/* Value Input Page START */}

            {/* Register Item Submission Page START */}
            {
              this.state.itemRegisterStep === 8 ?
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
  detectImage: detectImage,
  // getRecommendedHashTags: getRecommendedHashTags
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterItemComponent);


