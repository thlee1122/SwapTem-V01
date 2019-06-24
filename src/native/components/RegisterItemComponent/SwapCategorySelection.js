import React                                        from "react";
import { Actions }                                      from 'react-native-router-flux';
import { View, TouchableOpacity, Text,
         StatusBar, SafeAreaView }                          from 'react-native';
import styles                                       from '../../styles/RegisterItemStyles';
import SingleSwapFirstLevelCategory       from './SingleSwapFirstLevelCategory';
import FeatherIcon                                  from 'react-native-vector-icons/Feather';

class SwapCategorySelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSwapCategories: [],
      dropDownSectionClicked: false,
      selectedSwapCategoryObj: {
        Fashion: [],
        Electronics: [],
        Books: []
      },
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
        firstLevel: "Books",
        secondLevel: ["Textbooks", "Fiction Books", "Magazine", "Novels",]
      }
    ];

    this.finalSelectedSwapCategoryObj = {
      Fashion: [],
      Electronics: [],
      Books: []
    }
  }

  addSwapCategory = (firstLevelCategory, singleSecondLevelCategory) => {
    let tempState = this.state.selectedSwapCategories;
    tempState.push(singleSecondLevelCategory);

    this.setState({
      selectedSwapCategories: [...tempState]
    });

    if(firstLevelCategory === "Fashion") {
      this.finalSelectedSwapCategoryObj["Fashion"].push(singleSecondLevelCategory);

      const tempState = this.state.selectedSwapCategoryObj["Fashion"];
      tempState.push(singleSecondLevelCategory);

      const tempObj = {
        Fashion: [...tempState],
        Electronics: [...this.state.selectedSwapCategoryObj["Electronics"]],
        Books: [...this.state.selectedSwapCategoryObj["Books"]]
      }

     this.setState({
        selectedSwapCategoryObj: tempObj
     });

    } else if(firstLevelCategory === "Electronics") {
      this.finalSelectedSwapCategoryObj["Electronics"].push(singleSecondLevelCategory);

      const tempState = this.state.selectedSwapCategoryObj["Electronics"];
      tempState.push(singleSecondLevelCategory);

      const tempObj = {
        Fashion: [...this.state.selectedSwapCategoryObj["Fashion"]],
        Electronics: [...tempState],
        Books: [...this.state.selectedSwapCategoryObj["Books"]]
      }

     this.setState({
        selectedSwapCategoryObj: tempObj
     });

    } else if(firstLevelCategory === "Books") {
      this.finalSelectedSwapCategoryObj["Books"].push(singleSecondLevelCategory);

      const tempState = this.state.selectedSwapCategoryObj["Books"];
      tempState.push(singleSecondLevelCategory);

      const tempObj = {
        Fashion: [...this.state.selectedSwapCategoryObj["Fashion"]],
        Electronics: [...this.state.selectedSwapCategoryObj["Electronics"]],
        Books: [...tempState]
      }

     this.setState({
        selectedSwapCategoryObj: tempObj
     });
    }
  }

  removeSwapCategory = (firstLevelCategory, singleSecondLevelCategory) => {
    let tempState = this.state.selectedSwapCategories;

    tempState = tempState.filter((singleTempState) => {
      return (
        singleTempState !== singleSecondLevelCategory
      );
    });

    this.setState({
      selectedSwapCategories: [...tempState]
    });

    if(firstLevelCategory === "Fashion") {
      this.finalSelectedSwapCategoryObj["Fashion"] = this.finalSelectedSwapCategoryObj["Fashion"].filter((selectedSwapCategory) => {
        return selectedSwapCategory !== singleSecondLevelCategory
      });

      let tempState = this.state.selectedSwapCategoryObj["Fashion"];
      tempState = tempState.filter((singleTempState) => {
        return (
          singleTempState !== singleSecondLevelCategory
        );
      });

      const tempObj = {
        Fashion: [...tempState],
        Electronics: [...this.state.selectedSwapCategoryObj["Electronics"]],
        Books: [...this.state.selectedSwapCategoryObj["Books"]]
      }

      this.setState({
        selectedSwapCategoryObj: tempObj
      });

    } else if(firstLevelCategory === "Electronics") {
      this.finalSelectedSwapCategoryObj["Electronics"] = this.finalSelectedSwapCategoryObj["Electronics"].filter((selectedSwapCategory) => {
        return selectedSwapCategory !== singleSecondLevelCategory
      });

      let tempState = this.state.selectedSwapCategoryObj["Electronics"];
      tempState = tempState.filter((singleTempState) => {
        return (
          singleTempState !== singleSecondLevelCategory
        );
      });

      const tempObj = {
        Fashion: [...this.state.selectedSwapCategoryObj["Fashion"]],
        Electronics: [...tempState],
        Books: [...this.state.selectedSwapCategoryObj["Books"]]
      }

      this.setState({
        selectedSwapCategoryObj: tempObj
      });

    } else if(firstLevelCategory === "Books") {
      this.finalSelectedSwapCategoryObj["Books"] = this.finalSelectedSwapCategoryObj["Books"].filter((selectedSwapCategory) => {
        return selectedSwapCategory !== singleSecondLevelCategory
      });

      let tempState = this.state.selectedSwapCategoryObj["Books"];
      tempState = tempState.filter((singleTempState) => {
        return (
          singleTempState !== singleSecondLevelCategory
        );
      });

      const tempObj = {
        Fashion: [...this.state.selectedSwapCategoryObj["Fashion"]],
        Electronics: [...this.state.selectedSwapCategoryObj["Electronics"]],
        Books: [...tempState]
      }

      this.setState({
        selectedSwapCategoryObj: tempObj
      });
    }
  }

  handleDropdown = () => {
    this.setState({
      dropDownSectionClicked: !this.state.dropDownSectionClicked
    });
  }

  render() {
    const { selectedSwapCategoriesState, swapCategorySelectionError, selectedSwapCategories,
    onSelectedItemsChange, onSelectedItemObjectsChange, handleSwapCategoryContinue, handleBackButton} = this.props;
    newSelectedSwapCategories = [22, 23];

    return (
      <SafeAreaView style={{marginTop: -20, backgroundColor: 'white'}}>
        <View style={styles.swapCategorySelectionSection}>

          <TouchableOpacity 
            style={{
              // paddingLeft: 10,
              paddingTop: 0,
              marginBottom: 56
            }} 
            onPress={() => {handleBackButton()}}
          >
            <FeatherIcon name="arrow-left" size={30} color={"black"}/>
          </TouchableOpacity>


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
            this.state.dropDownSectionClicked === true &&
            <View style={{marginTop: 40}}>
            {
              this.sampleSwapCategories.map((singleSwapCategory, index) => {
                return (
                  <SingleSwapFirstLevelCategory
                    key={index}
                    firstLevelCategory={singleSwapCategory.firstLevel}
                    singleSwapCategory={singleSwapCategory}
                    addSwapCategory={this.addSwapCategory}
                    removeSwapCategory={this.removeSwapCategory}
                    selectedSwapCategoryObj={this.state.selectedSwapCategoryObj}
                  />
                )
              })
            }
            </View>
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
                borderColor: this.state.selectedSwapCategories.length === 0 ? "#CECECE" : 'black',
                backgroundColor: this.state.selectedSwapCategories.length === 0 ? "#CECECE" :'white'
              }}
              disabled={this.state.selectedSwapCategories.length === 0 ? true : false}
              onPress={(e) => handleSwapCategoryContinue(this.finalSelectedSwapCategoryObj, this.state.selectedSwapCategories)}
            >
              <Text 
                style={{
                  fontSize: 14, 
                  fontWeight: 'bold', 
                  lineHeight: 20,
                  flex: 1,
                  textAlign: 'center',
                  marginTop: 18,
                  color: this.state.selectedSwapCategories.length === 0 ? "white" : 'black'
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