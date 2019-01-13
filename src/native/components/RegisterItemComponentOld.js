import React, { Component }                         from 'react';
import PropTypes                                    from 'prop-types';
import { 
  View, Image, Animated, ScrollView, 
  TextInput, KeyboardAvoidingView, Platform, 
  TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';  
import {
  Container, Content, List, ListItem, Body, 
  Left, Right, Text, Button, Tabs, Tab, 
  TabHeading, Card, CardItem }                      from 'native-base';
import { ButtonGroup }                              from 'react-native-elements';
import { Dropdown }                                 from 'react-native-material-dropdown';
import SectionedMultiSelect                         from 'react-native-sectioned-multi-select';
import MentionsTextInput                            from 'react-native-mentions';
import { Switch }                                   from 'react-native-switch';
import FontAwesomeIcon                              from 'react-native-vector-icons/FontAwesome';
import MaterialIcon                                 from 'react-native-vector-icons/MaterialIcons';
import { ImagePicker, Permissions }                 from 'expo';
import styles                                       from '../styles/RegisterItemStyles';
import * as hashTagData                             from '../data/sampleHashTagData.json';
import { items, colleges, shoesSizes, 
         mainCategories, FashionSubCategories,
         ElectronicsSubCategories, HomeSubCategories,
         BooksSubCategories, GamingSubCategories }  from '../data/sampleRegisterItemData';

class RegisterItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictureUrl: "",
      errorMessage: "",
      keyword: "",
      hashTags: "",
      hashTagSampleData: [],
      data: [],
      hashTagSubmitted: false,
      brandName: "",
      brandInputFieldColor: '#EDEDED',
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
      selectedCollageName: [],
      selectedSwapCategories: [],
      sampleSelectedCategories: ["Game Console"],
      categoryEditClicked: false,
      textbookName: "",
      textBookNameError: false,
      courseName: "",
      courseNameError: false,

      categorySubmitted: false,
      mainCategory: [],
      subCategory: [],
    };
    
    this.registerDataObj = {
      itemTitle: "",
      itemPhotoURI: "",
      hashTags: "",
      itemBrand: "",
      itemCondition: "",
      shoesSize: "",
      genderSelection: "",
      itemDescription: "",
      itemValue: 0,
      swapToggle: this.state.swapToggle,
      sellToggle: this.state.sellToggle,
      rentToggle: this.state.rentToggle,
      selectedSwapCategories: [],
      sampleSelectedCategories: ["Game Console",],
      selectedCollageName: [],
      textbookName: "",
      courseName: "",

      categories: {
        mainCategory: [],
        categoryLevelTwo: [],
        categoryLevelThree: []
      }
    };

    this.conditionName = "";
    this.gender = "";
  }

  componentDidMount() {
    this.pickImage();

    this.setState({
      hashTagSampleData: hashTagData.results
    });
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
      this.registerDataObj['itemPhotoURI'] = cameraResult.uri;
    }
  };


  pickImage = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
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
      this.registerDataObj['itemPhotoURI'] = galleryResult.uri;
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
      this.registerDataObj["hashTags"] = this.state.hashTags;

      this.setState({
        hashTagSubmitted: true
      });  
    } else if(inputType === "categoryInput") {
      this.registerDataObj["categories"].mainCategory = this.state.mainCategory;
      this.registerDataObj["categories"].categoryLevelTwo = this.state.subCategory;

      this.setState({
        categorySubmitted: true
      });

      console.log("@@#@#@#@", this.registerDataObj["categories"]);
    }
  }

  handleSelection = (selectionType, value) => {
    if(selectionType === "conditionSelection") {
      this.registerDataObj["itemCondition"] = value;

      if(this.state.conditionClicked === false) {
        this.setState({
          conditionClicked: true
        });

        this.conditionName = value;

      } else if(this.state.conditionClicked === true) {
        this.setState({
          conditionClicked: false
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
        genderClicked: !this.state.genderClicked
      });

      this.registerDataObj["genderSelection"] = value;
      this.gender = value;
    }
  }

  handleTextInputFocus = (inputType) => {
    if(inputType === "brandNameInput") {
      this.setState({
        brandInputFieldColor: '#00529b'
      })
    } else if(inputType === "itemDescInput") {
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
    if(inputType === "brandNameInput") {
      this.setState({
        brandInputFieldColor: '#EDEDED'
      })

    } else if(inputType === "itemDescInput") {
      this.setState({
        descInputFieldColor: "#EDEDED"
      })

      let numOfDescWords = this.state.itemDescription.split(" ").length;
      let descCharLength = this.state.itemDescription.length;

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

  handleTextChange = (inputType, text) => {
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

    } else if(inputType === "brandNameInput") {
      this.setState({
        brandName: text
      });

      this.registerDataObj["itemBrand"] = text;

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
    }
  }

  handleEdit = (inputType) => {
    if(inputType === "categorySelection") {
      // if(this.state.categoryEditClicked === false) {
      //   this.setState({
      //     categoryEditClicked: true
      //   });
      // } else if(this.state.categoryEditClicked === true) {
      //   this.setState({
      //     categoryEditClicked: false
      //   });
      // }

      this.setState({
        categorySubmitted: false
      });

    } else if(inputType === "hashTagSelection") {
      this.setState({
        hashTagSubmitted: false
      });
    }
  }

  handleSave = (inputType) => {
    if(inputType === "categorySelection") {
      if(this.state.categoryEditClicked === true) {
        this.setState({
          categoryEditClicked: false
        })
      }

      this.registerDataObj["sampleSelectedCategories"] = this.state.sampleSelectedCategories;
    }
  }

  handleDropDown = (dropDownName, value) => {
    if(dropDownName === "shoesSizeDropdown") {
      this.registerDataObj["shoesSize"] = value;
    }
  }

  onSuggestionTap = (hashTagValue, hidePanel) => {
    hidePanel();
    const comment = this.state.hashTags.slice(0, - this.state.keyword.length)

    this.setState({
      data: [],
      hashTags: comment + hashTagValue
    })
  }

  callback = (keyword) => {
    const { hashTagSampleData } = this.state;
    const regex = new RegExp(`${keyword.trim()}`, 'i');
    let newValue = hashTagSampleData.filter(hashTag => hashTag.hashTagValue.search(regex) >= 0);
    
    if (this.reqTimer) {
      clearTimeout(this.reqTimer);
    }

    this.reqTimer = setTimeout(() => {
      this.setState({
        keyword: keyword,
        data: [...newValue]
      })
    }, 200);
  }

  onSelectedItemsChange = (selectionType, selectedItems) => {

    if(selectionType === "categorySelection") {
      this.setState({ sampleSelectedCategories: selectedItems });
      this.registerDataObj["sampleSelectedCategories"] = selectedItems;

    } else if(selectionType === "collegeSelection") {
      this.setState({ selectedCollageName: selectedItems });
      this.registerDataObj["selectedCollageName"] = selectedItems;

    } else if(selectionType === "swapCategorySelection") {
      this.setState({ selectedSwapCategories: selectedItems });
      this.registerDataObj["selectedSwapCategories"] = selectedItems;

    } else if(selectionType === "mainCategorySelection") {
      this.setState({ mainCategory: selectedItems });
      this.registerDataObj["categories"].mainCategory = selectedItems;

    } else if(selectionType === "subCategorySelection") {
      this.setState({ subCategory: selectedItems });
      this.registerDataObj["categories"].categoryLevelTwo = selectedItems;
    }
  }

  renderSuggestionsRow({ item }, hidePanel) {
    return (
      <TouchableOpacity 
        key={item.hashTagValue} 
        style={{marginTop: 13}}
        onPress={() => this.onSuggestionTap(item.hashTagValue, hidePanel)}
      >
        <View key={item.hashTagValue}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{left: 15, fontSize: 15}}>{item.hashTagValue}</Text>
            <Text style={{position: 'absolute', right: 15, fontSize: 15}}>{(item.numberOfPosts).toLocaleString('en')} posts</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  handleSubmit = (inputType) => {
    if(inputType === "finalSubmit") {
    }
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { conditionClicked, genderClicked } = this.state;

    console.log(this.state);
    console.log(this.registerDataObj);

    return (
      <Container>
        <View style={styles.mainView}>
            <ScrollView
              ref={ref => (this.scrollView = ref)}
              contentContainerStyle={{ paddingVertical: 20 }} 
              alwaysBounceVertical={true}
            > 
              { this.state.pictureUrl !== undefined && 
                this.state.pictureUrl !== "" && 
                this.state.hashTagSubmitted === true &&
                this.state.categorySubmitted === true ?
                <View style={styles.filterPageContainer}>
                   <Image 
                      source={{ uri: this.state.pictureUrl }} 
                      style={styles.itemMainImage}
                    />
                    <Text style={styles.itemTitle}>
                      {this.registerDataObj["itemTitle"]}
                    </Text>

                    <View style={styles.categorySection}>
                      <Text style={styles.categorySectionTitle}><Text style={{color: 'red'}}>* </Text>CATEGORY</Text>
                      <Text style={styles.selectedCategory}>{ this.registerDataObj["sampleSelectedCategories"].join(", ") }</Text>
                      <Button 
                        style={styles.categoryEditButton}
                        onPress={(e) => this.handleEdit("categorySelection")}
                      >
                        <MaterialIcon name="edit" size={20} color="#00529b" style={{marginTop: -15}}/>
                      </Button>
                    </View>

                    {
                      this.state.categoryEditClicked === true ?
                      <View style={styles.categoryEditSection}>
                        <SectionedMultiSelect
                          hideTags
                          style={styles.categoryEditSelection}
                          items={items} 
                          uniqueKey='name'
                          subKey='children'
                          selectText='Select Categories'
                          showDropDowns={true}
                          readOnlyHeadings={true}
                          single={true}
                          ref={(component) => { this.multiSelect = component }}
                          onSelectedItemsChange={(selectedItems) => this.onSelectedItemsChange("categorySelection", selectedItems)}
                          selectedItems={this.registerDataObj["sampleSelectedCategories"]}
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

                        <Button style={styles.categoryEditSaveButton}
                          onPress={(e) => this.handleSave("categorySelection")}
                        >
                          <Text style={styles.categoryEditButtonText}>
                            Save
                          </Text>
                        </Button>
                      </View>
                      :
                      null
                    }

                    <View style={styles.hashTagSection}>
                      <Text style={styles.hashTagSectionTitle}><Text style={{color: 'red'}}>* </Text>HASHTAGS</Text>
                      <Text style={styles.hashTagSectionSubtitle}>{this.registerDataObj["hashTags"].split(" ").join(", ")}</Text>
                      <Button style={styles.hashTagEditButton}
                        onPress={(e) => this.handleEdit("hashTagSelection")}
                      >
                        <MaterialIcon name="edit" size={20} color="#00529b" style={{marginTop: -15}}/>
                      </Button>
                    </View>

                    {/* Trade Selection Section START */}
                    <View style={styles.tradeSection}>
                      <Text style={styles.tradeSectionTitle}><Text style={{color: 'red'}}>* </Text> TRADE SELECTION</Text>
                      <Text style={styles.tradeSectionSubTitle}>
                        ** Turn on selections you want for your item.
                      </Text>
                      
                      <View style={styles.tradeSelectionSection}>
                        <View style={styles.tradeSingleSelectionSection}>
                          <Text style={styles.tradeSingleSelectionSectionText}>Swap</Text>

                          <Switch
                            value={this.state.swapToggle}
                            onValueChange={ (val) => this.setState({swapToggle: val}) }
                            circleSize={25}
                            barHeight={25}
                            circleBorderWidth={1}
                            backgroundActive={'#3578e5'}
                            switchWidthMultiplier={2.2}
                            switchLeftPx={1.7}
                            switchRightPx={1.7}
                            style={styles.tradeSelectionSwitch}
                          />
                        </View>

                        <View style={styles.tradeSingleSelectionSection}>
                          <Text style={styles.tradeSingleSelectionSectionText}>Sell</Text>

                          <Switch
                            value={this.state.sellToggle}
                            onValueChange={ (val) => this.setState({sellToggle: val}) }
                            circleSize={25}
                            barHeight={25}
                            circleBorderWidth={1}
                            backgroundActive={'#3578e5'}
                            switchWidthMultiplier={2.2}
                            switchLeftPx={1.7}
                            switchRightPx={1.7}
                            style={styles.tradeSelectionSwitch}
                          />
                        </View>

                        <View style={styles.tradeSingleSelectionSection}>
                          <Text style={styles.tradeSingleSelectionSectionText}>Rent</Text>
                          <Switch
                            value={this.state.rentToggle}
                            onValueChange={ (val) => this.setState({rentToggle: val}) }
                            circleSize={25}
                            barHeight={25}
                            circleBorderWidth={1}
                            backgroundActive={'#3578e5'}
                            switchWidthMultiplier={2.2}
                            switchLeftPx={1.7}
                            switchRightPx={1.7}
                            style={styles.tradeSelectionSwitch}
                          />
                        </View>
                      </View>
                    </View>
                    {/* Trade Selection Section END */}

                    {/* Gender & Size Section START */}
                    {
                      this.state.hashTags.includes("#shoes") ?
                        <React.Fragment>
                          <View style={styles.genderSection}>
                            <Text style={{fontWeight: 'bold'}}><Text style={{color: 'red'}}>* </Text>GENDER</Text>
                            <Text style={styles.genderSectionSubtitle}>
                              ** Select Gender for your item.
                            </Text>

                            <View style={styles.genderButtonSection}>
                              <Button
                                style={[ styles.genderSelectionButon, 
                                  {backgroundColor: genderClicked === true && this.gender === "Male" ? "#3578e5" : "white"}]}

                                // style={[styles.button,{ backgroundColor: '#f00'}]}
                                onPress={(e) => this.handleSelection("genderSelection", "Male")}
                              >
                                <Text 
                                  style={[ styles.genderSelectionButtonText,
                                    {color: genderClicked === true && this.gender === "Male" ? "white" : "#3578e5",}
                                    ]}>Male</Text>
                              </Button>

                              <Button
                                style={[ styles.genderSelectionButon, 
                                  {backgroundColor: genderClicked === true && this.gender === "Female" ? "#3578e5" : "white"}]}
                                onPress={(e) => this.handleSelection("genderSelection", "Female")}
                              >
                                <Text 
                                  style={[ styles.genderSelectionButtonText,
                                    {color: genderClicked === true && this.gender === "Female" ? "white" : "#3578e5"}
                                    ]}>Female</Text>
                              </Button>
                            </View>
                          </View>

                          <View style={styles.sizeSection}>
                            <Text style={{fontWeight: 'bold'}}><Text style={{color: 'red'}}>* </Text>SIZE</Text>
                            <Text style={styles.sizeSectionSubTitle}>
                              ** Select Size for your item.
                            </Text>
                            <Dropdown
                              label={"Please select size"}
                              labelFontSize={13}
                              labelHeight={10}
                              labelPadding={1}
                              baseColor="black"
                              selectedItemColor="#3578e5"
                              data={shoesSizes}
                              dropdownPosition={4.2}
                              textColor="#3578e5"
                              containerStyle={styles.selectDropdown}
                              dropdownOffset={{top: 0, left: 0 }}
                              rippleInsets={{top:0, bottom: 0}}
                              onChangeText={(value)=>{this.handleDropDown("shoesSizeDropdown", value)}}
                            />
                          </View>
                        </React.Fragment>
                      :
                      null
                    }
                    {/* Gender & Size Section END */}

                    {/* School, TextBook Name, Course START*/}
                    {
                      this.state.hashTags.includes("#textbooks") ?
                      <React.Fragment>
                        <View style={styles.collegeSection}>
                          <Text style={{fontWeight: 'bold'}}><Text style={{color: 'red'}}>* </Text>COLLEGE NAME</Text>
                          <Text style={styles.collegeSectionSubTitle}>
                            ** Select name of your current college you are attending.
                          </Text>

                          <SectionedMultiSelect
                            hideTags
                            style={styles.collegeSelectionBox}
                            items={colleges} 
                            uniqueKey='name'
                            subKey='children'
                            selectText='Select Your College'
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            single={true}
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={(selectedItems) => this.onSelectedItemsChange("collegeSelection", selectedItems)}
                            selectedItems={this.registerDataObj["selectedCollageName"]}
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

                        <View style={styles.textBookSection}>
                          <Text style={{fontWeight: 'bold'}}><Text style={{color: 'red'}}>* </Text>TEXTBOOK NAME</Text>
                          {
                            this.state.textBookNameError === true ?
                              <Text style={styles.textBookSectionSubTitle}>
                                Please input name for your textbook.
                              </Text>
                            :
                              <React.Fragment></React.Fragment>
                          }

                          <TextInput
                            style={[ styles.textBookSectionInputbox,
                                  {borderBottomColor: this.state.textbookNameInputColor}]}
                            ref="textbookNameInput"
                            paddingLeft={10}
                            placeholder="Ex. Introductory Business Statistics"
                            value={this.state.textbookName}
                            onChangeText={(text) => this.handleTextChange("textbookNameInput", text)}
                            onFocus={(e) => this.handleTextInputFocus("textbookNameInput")}
                            onBlur={(e) => this.handleTextInputBlur("textbookNameInput")}
                          >
                          </TextInput>
                        </View>

                        <View style={styles.courseNameSection}>
                          <Text style={{fontWeight: 'bold'}}><Text style={{color: 'grey'}}>* </Text>COURSE NAME</Text>
                          {
                            this.state.courseNameError === true ?
                              <Text style={styles.courseNameSectionErrorMsg}>
                                Please input course name for your textbook.
                              </Text>
                            :
                              <React.Fragment></React.Fragment>
                          }
                          <TextInput
                            style={[ styles.textBookSectionInputbox,
                                  {borderBottomColor: this.state.courseNameInputColor}]}
                            ref="courseNameInput"
                            paddingLeft={10}
                            placeholder="Ex. Computer Science I"
                            value={this.state.courseName}
                            onChangeText={(text) => this.handleTextChange("courseNameInput", text)}
                            onFocus={(e) => this.handleTextInputFocus("courseNameInput")}
                            onBlur={(e) => this.handleTextInputBlur("courseNameInput")}
                          >
                          </TextInput>

                        </View>
                      </React.Fragment>
                      :
                      null
                    }
                    {/* School, TextBook Name, Course END*/}
                    
                    <View style={styles.brandSection}>
                      <Text style={{fontWeight: 'bold'}}><Text style={{color: 'grey'}}>* </Text>BRAND</Text>
                      <TextInput
                        style={[ styles.brandSectionTextInput,
                                  {borderBottomColor: this.state.brandInputFieldColor}]}
                        ref="brandNameInput"
                        paddingLeft={10}
                        placeholder="Ex. Nintendo"
                        value={this.state.brandName}
                        onChangeText={(text) => this.handleTextChange("brandNameInput", text)}
                        onFocus={(e) => this.handleTextInputFocus("brandNameInput")}
                        onBlur={(e) => this.handleTextInputBlur("brandNameInput")}
                      >
                      </TextInput>
                    </View>

                    <View style={styles.conditionSection}>
                      <Text style={{fontWeight: 'bold'}}><Text style={{color: 'red'}}>* </Text>CONDITION</Text>
                      <ScrollView
                        showsHorizontalScrollIndicator={true}
                        horizontal={true}
                      >
                        <View style={styles.conditionButtonSection}>
                          <Button
                            style={[ styles.conditionButton,
                                  {backgroundColor: conditionClicked === true && this.conditionName === "New" ? "#3578e5" : "white",}]}
                            onPress={(e) => this.handleSelection("conditionSelection", "New")}
                          > 
                            <View style={styles.conditionCardView}>
                              <Text style={{
                                textAlign: 'center', 
                                color: conditionClicked === true && this.conditionName === "New" ? "white" : "#3578e5",
                              }}>New</Text>
                              <Text 
                                style={[ styles.conditionButtonText,
                                  {color: conditionClicked === true && this.conditionName === "New" ? "white" : "#3578e5",}]}>
                                New with tags {"\n"}
                                (NWT). Unopened {"\n"}
                                package. Unused.
                              </Text>
                            </View>
                          </Button>

                          <Button
                            style={[ styles.conditionButton,
                                  {marginLeft: 10, backgroundColor: conditionClicked === true && this.conditionName === "Like New" ? "#3578e5" : "white"}]}
                            onPress={(e) => this.handleSelection("conditionSelection", "Like New")} 
                          > 
                            <View style={styles.conditionCardView}>
                              <Text style={{
                                textAlign: 'center', 
                                color: conditionClicked === true && this.conditionName === "Like New" ? "white" : "#3578e5",
                              }}>Like New</Text>
                              <Text 
                                style={[ styles.conditionButtonText,
                                  {color: conditionClicked === true && this.conditionName === "Like New" ? "white" : "#3578e5"}]}>
                                New without tags {"\n"}
                                (NWOT). No signs {"\n"}
                                of wear. Unused.
                              </Text>
                            </View>
                          </Button>

                          <Button
                            style={[ styles.conditionButton,
                                  {marginLeft: 10, backgroundColor: conditionClicked === true && this.conditionName === "Good" ? "#3578e5" : "white"}]}
                            onPress={(e) => this.handleSelection("conditionSelection", "Good")} 
                          > 
                            <View style={styles.conditionCardView}>
                              <Text style={{
                                textAlign: 'center', 
                                color: conditionClicked === true && this.conditionName === "Good" ? "white" : "#3578e5",
                              }}>Good</Text>
                              <Text 
                                style={[ styles.conditionButtonText,
                                  {color: conditionClicked === true && this.conditionName === "Good" ? "white" : "#3578e5"}]}>
                                Gently used One/ {"\n"}
                                few minor flaws. {"\n"}
                                Functional.
                              </Text>
                            </View>
                          </Button>

                          <Button
                            style={[ styles.conditionButton,
                                  {marginLeft: 10, backgroundColor: conditionClicked === true && this.conditionName === "Fair" ? "#3578e5" : "white"}]}
                            onPress={(e) => this.handleSelection("conditionSelection", "Fair")} 
                          > 
                            <View style={styles.conditionCardView}>
                              <Text style={{
                                textAlign: 'center', 
                                color: conditionClicked === true && this.conditionName === "Fair" ? "white" : "#3578e5",
                              }}>Fair</Text>
                              <Text 
                                style={[ styles.conditionButtonText,
                                  {color: conditionClicked === true && this.conditionName === "Fair" ? "white" : "#3578e5"}]}>
                                Used, functional, {"\n"}
                                multiple flaws / {"\n"}
                                defects
                              </Text>
                            </View>
                          </Button>

                          <Button 
                            style={[ styles.conditionButton,
                                  {marginLeft: 10, backgroundColor: conditionClicked === true && this.conditionName === "Poor" ? "#3578e5" : "white"}]}
                            onPress={(e) => this.handleSelection("conditionSelection", "Poor")} 
                          > 
                            <View style={styles.conditionCardView}>
                              <Text style={{
                                textAlign: 'center', 
                                color: conditionClicked === true && this.conditionName === "Poor" ? "white" : "#3578e5",
                              }}> Poor </Text>
                              <Text 
                                style={[ styles.conditionButtonText,
                                  {color: conditionClicked === true && this.conditionName === "Poor" ? "white" : "#3578e5"}]}>
                                Major flaws, may {"\n"}
                                be damaged, {"\n"}
                                for parts
                              </Text>
                            </View>
                          </Button>
                        </View>
                      </ScrollView>
                    </View>

                    <View style={styles.descriptionSection}>
                      <Text style={{fontWeight: 'bold'}}><Text style={{color: 'grey'}}>* </Text>Describe your item (5+ words)</Text>
                      <TextInput
                        style={[ styles.descriptionInputBox,
                                  {borderColor: this.state.descInputFieldColor}]}
                        multiline={true}
                        autoCorrect={false}
                        paddingLeft={10}
                        placeholder="Ex. Very clean and barely used item!"
                        value={this.state.itemDescription}
                        onChangeText={(text) => this.handleTextChange("itemDescInput", text)}
                        onFocus={(e) => this.handleTextInputFocus("itemDescInput")}
                        onBlur={(e) => this.handleTextInputBlur("itemDescInput")}
                      >
                      </TextInput>
                      <Text style={{fontSize: 15, textAlign: 'right', marginTop: 5}}>{this.state.numOfDescCharacters} / 1000</Text>
                    </View>


                    {/* Swap Categories Selection */}
                    {
                      this.state.swapToggle === true ?
                        <View style={styles.swapCategorySelectionSection}>
                          <Text style={{fontWeight: 'bold'}}><Text style={{color: 'red'}}>* </Text>SWAP CATEGORY</Text>
                          <Text
                            style={[ styles.swapCategorySubTitle,
                                  {display: this.state.selectedSwapCategories.length > 5 ? "flex" : "none"}]}
                          >
                            Please only select up to 5 categories.
                          </Text>
                          <Text style={styles.swapCategoryErrorMsg}>
                            ** Please select categories that you are willing to SWAP.
                          </Text>

                          <SectionedMultiSelect
                            hideTags
                            style={styles.swapCategorySelectionBox}
                            items={items} 
                            uniqueKey='name'
                            subKey='children'
                            selectText='Select Swap Categories'
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={(selectedItems) => this.onSelectedItemsChange("swapCategorySelection", selectedItems)}
                            selectedItems={this.registerDataObj["selectedSwapCategories"]}
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
                      :
                        <React.Fragment></React.Fragment>
                    }
                    {/* Swap Categories Selection */}

                    <View style={styles.valueSection}>
                      <Text style={{fontWeight: 'bold'}}><Text style={{color: 'red'}}>* </Text>SET VALUE</Text>
                      <Text style={styles.valueSectionSubTitle}>
                        ** Based on the information provided, RECOMMENDED VALUE is $20.00
                      </Text>

                      {
                        this.state.itemValueError === true ?
                          <Text style={styles.valueSectionErrorMsg}>
                            Please enter value for your item
                          </Text>
                        :
                          <React.Fragment></React.Fragment>
                      }

                      <TextInput
                        style={[ styles.valueSectionTextInput,
                                  {borderBottomColor: this.state.itemValueInputColor}]}
                        ref="itemValueInput"
                        paddingLeft={10}
                        value={this.state.itemValue}
                        onChangeText={(text) => this.handleTextChange("itemValueInput", text)}
                        onFocus={(e) => this.handleTextInputFocus("itemValueInput")}
                        onBlur={(e) => this.handleTextInputBlur("itemValueInput")}
                      />
                    </View>

                    <View style={styles.submitButtonSection}>
                      <Button 
                        style={styles.submitButton}
                        onPress={(e) => this.handleSubmit("finalSubmit")}
                      >
                        <Text style={styles.submitButtonText}>
                          Submit
                        </Text>
                      </Button>
                    </View>
                </View>
                :
                <React.Fragment></React.Fragment>
              }

              { 
                this.state.pictureUrl !== undefined && this.state.pictureUrl !== "" && this.state.hashTagSubmitted === false ?
                <View style={styles.hashTagPage}>
                  <Text style={styles.hashTagPageTitle}>Please Select Hashtags.</Text>
                  <Text style={styles.hashTagPageSubTitle}>
                    These hashtags will be used for categories as well as for the title.
                  </Text>
                  
                  <View style={styles.hashTagPageContent}>
                    <MentionsTextInput
                      textInputStyle={{ 
                        borderColor: '#E3E1E1', 
                        borderWidth: 1, 
                        padding: 5, 
                        fontSize: 15, 
                        marginBottom: 10, 
                        paddingLeft: 15, 
                        paddingTop: 10, 
                        width: 330,
                        alignSelf: 'center'
                      }}
                      suggestionsPanelStyle={{ backgroundColor: '#FBFBFB', borderWidth: 1, borderColor: "#E3E1E1", width: 330, alignSelf: 'center'}}
                      loadingComponent={() => <View style={{ flex: 1, width, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>}
                      textInputMinHeight={40}
                      textInputMaxHeight={80}
                      trigger={'#'}
                      triggerLocation={'new-word-only'}
                      value={this.state.hashTags}
                      onChangeText={(val) => { this.setState({ hashTags: val }) }}
                      triggerCallback={this.callback.bind(this)}
                      renderSuggestionsRow={this.renderSuggestionsRow.bind(this)}
                      suggestionsData={this.state.data}
                      keyExtractor={(item, index) => item.UserName}
                      suggestionRowHeight={40}
                      horizontal={false}
                      MaxVisibleRowCount={2.6}
                      placeholder="Type # tags"
                    />
                    <Button 
                      style={styles.hashTagePageButton}
                      onPress={(e) => this.handleInputSubmit("hashTagsInput")}
                      disabled={this.state.hashTags !== "" && this.state.hashTags.length > 2 ? false : true}
                    >
                      <Text style={styles.hashTagePageButtonText}>Submit</Text>
                    </Button>
                  </View>
                  
                </View>
                :
                <React.Fragment></React.Fragment>
              }

              {
                this.state.pictureUrl !== undefined && 
                this.state.pictureUrl !== "" && 
                this.state.hashTagSubmitted === true ?

                <View style={styles.hashTagPage}>
                  <Text style={styles.hashTagPageTitle}>Please Select Categories.</Text>

                  <View style={[styles.hashTagPageContent, {flexDirection: 'column'}]}>
                    
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.categoryPageSubTitle}>
                        Please select main category for your item.
                      </Text>
                      <SectionedMultiSelect
                        hideTags
                        style={styles.categoryEditSelection}
                        items={mainCategories} 
                        uniqueKey="name"
                        subKey='children'
                        selectText='Select Main Category'
                        showDropDowns={true}
                        readOnlyHeadings={true}
                        expandDropDowns={true}
                        single={true}
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={(selectedItems) => this.onSelectedItemsChange("mainCategorySelection", selectedItems)}
                        selectedItems={this.state.mainCategory}
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
                      this.state.mainCategory.length !== 0 ?
                      <View style={{flexDirection: 'column'}}>
                        <Text style={styles.categoryPageSubTitle}>
                          Please select sub category for 
                          <Text style={{fontWeight: 'bold'}}> {this.state.mainCategory}.</Text>
                        </Text>

                        <SectionedMultiSelect
                          hideTags
                          style={styles.categoryEditSelection}
                          items={
                            this.state.mainCategory.indexOf("Fashion") !== -1 ? FashionSubCategories
                            : this.state.mainCategory.indexOf("Electronics") !== -1 ? ElectronicsSubCategories
                            : this.state.mainCategory.indexOf("Books") !== -1 ? BooksSubCategories
                            : this.state.mainCategory.indexOf("Home") !== -1 ? HomeSubCategories
                            : this.state.mainCategory.indexOf("Gaming") !== -1 ? GamingSubCategories
                            : null
                          } 
                          uniqueKey="name"
                          subKey='children'
                          selectText='Select Sub Category'
                          showDropDowns={true}
                          expandDropDowns={true}
                          readOnlyHeadings={true}
                          single={true}
                          ref={(component) => { this.multiSelect = component }}
                          onSelectedItemsChange={(selectedItems) => this.onSelectedItemsChange("subCategorySelection", selectedItems)}
                          selectedItems={this.state.subCategory}
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

                    <Button 
                      style={styles.hashTagePageButton}
                      onPress={(e) => this.handleInputSubmit("categoryInput")}
                      disabled={this.state.mainCategory.length !== 0 && this.state.subCategory.length !== 0 ? false : true}
                    >
                      <Text style={styles.hashTagePageButtonText}>Submit</Text>
                    </Button>
                  </View>
                </View>
                :
                <React.Fragment></React.Fragment>
              }
            </ScrollView>
        </View>
      </Container>
    );
  }
}

export default RegisterItemComponent;







