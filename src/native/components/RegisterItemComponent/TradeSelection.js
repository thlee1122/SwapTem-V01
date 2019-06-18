import React                                        from "react";
import { Actions }                                      from 'react-native-router-flux';
import { 
  View, Image, Animated, ScrollView, StatusBar, SafeAreaView, 
  TextInput, KeyboardAvoidingView, Platform,
  TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';  
import {
  Container, Content, List, ListItem, Body, 
  Left, Right, Text, Button, Tabs, Tab, 
  TabHeading, Card, CardItem }                      from 'native-base';
import { Dropdown }                                 from 'react-native-material-dropdown';
import { Switch }                                   from 'react-native-switch';
import styles                                       from '../../styles/RegisterItemStyles';
import { clothingTypes, shoesTypes, bagsTypes,
         accessoriesTypes }                         from '../../data/sampleRegisterItemData';
import InterestedCategorySection                    from './InterestedCategorySection';
import SwapCategorySelection                        from './SwapCategorySelection';

import FeatherIcon                                  from 'react-native-vector-icons/Feather';

class TradeSelection extends React.Component {

  handleEdit = () => {
    const { swapCategorySelectionError, selectedSwapCategories, 
            onSelectedItemsChange, onSelectedItemObjectsChange } = this.props;

    Actions.swapCategorySelection({ 
      selectedSwapCategoriesState: {selectedSwapCategories},
      swapCategorySelectionError: {swapCategorySelectionError},
      selectedSwapCategories: {selectedSwapCategories},
      onSelectedItemsChange: {onSelectedItemsChange},
      onSelectedItemObjectsChange: {onSelectedItemObjectsChange},
    });

    {/* <SwapCategorySelection 
      selectedSwapCategoriesState={selectedSwapCategories}
      swapCategorySelectionError={swapCategorySelectionError}
      selectedSwapCategories={selectedSwapCategories}
      onSelectedItemsChange={onSelectedItemsChange}
      onSelectedItemObjectsChange={onSelectedItemObjectsChange}
    /> */}
  }

  render() {
    const { tradeSelectionError, swapToggle, sellToggle, rentToggle, 
            handleSwitch, handleInputSubmit, 
            // handleEdit, 

            interestedCategories,
            // interestedCategoryEdit, 
            selectedSwapCategoriesState, swapCategorySelectionError,
            selectedSwapCategories, onSelectedItemsChange, onSelectedItemObjectsChange } = this.props;


            // console.log("&&&&&& selectedSwapCategories", selectedSwapCategories);
            // console.log("&&&&&& interestedCategories", interestedCategories);


    const imageFile = require("../../../images/03.png");
    const { width } = Dimensions.get('window');


    return (
      <React.Fragment>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          style={{ color: 'white', zIndex: 10 }}
        />

        <SafeAreaView style={{marginTop: -20, backgroundColor: 'black'}}>
          <View
            style={{backgroundColor: 'black', height: 300}}
          >
            <TouchableOpacity 
              style={{
                paddingLeft: 10,
                paddingTop: 32
                // marginTop: 32
              }} 
              // onPress={() => {handleBackButton("hashTag selection")}}
            >
              <FeatherIcon name="arrow-left" size={30} color={"white"}/>
            </TouchableOpacity>
            
            <View style={{flexDirection: 'row', marginLeft: 16, marginTop: 132, marginRight: 16}}>
              <Image 
                source={imageFile}
                style={{
                  width: 70,
                  height: 50,
                  alignSelf: 'center',
                  marginRight: 20,
                }}
              />
              <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', lineHeight: 30, width: width * 0.68}}>
                Please turn on selections you want for your item
              </Text>
            </View>
          </View>

          <View style={{paddingTop: 31, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16, lineHeight: 24, fontWeight: 'bold'}}>
                Trade selections
              </Text>

              <View style={{marginLeft: 0, marginTop: 37}}>
                <View
                  style={{
                    flex: 1, 
                    flexDirection: 'row', 
                    marginBottom: 32
                  }}
                >
                  <Text
                    style={{
                      flex:1, 
                      // fontWeight: 'bold', 
                      fontSize: 16, 
                      lineHeight: 24
                      // color: "#3578e5"
                    }}
                  >
                    Swap
                  </Text>
                  <Switch
                    value={swapToggle}
                    onValueChange={ (val) => handleSwitch("SwapSwitch", val)}
                    circleSize={25}
                    barHeight={25}
                    circleBorderWidth={1}
                    backgroundActive={'black'}
                    switchWidthMultiplier={2.2}
                    switchLeftPx={1.7}
                    switchRightPx={1.7}
                    // style={styles.tradeSelectionSwitch}
                    style={{
                      right: 10
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 1, 
                    flexDirection: 'row', 
                    marginBottom: 32
                  }}
                >
                  <Text
                    style={{
                      flex:1, 
                      // fontWeight: 'bold', 
                      fontSize: 16, 
                      lineHeight: 24
                      // color: "#3578e5"
                    }}
                  >
                    Sell
                  </Text>
                  <Switch
                    value={sellToggle}
                    onValueChange={ (val) => handleSwitch("SellSwitch", val)}
                    circleSize={25}
                    barHeight={25}
                    circleBorderWidth={1}
                    backgroundActive={'black'}
                    switchWidthMultiplier={2.2}
                    switchLeftPx={1.7}
                    switchRightPx={1.7}
                    style={styles.tradeSelectionSwitch}
                  />
                </View>

                <View
                  style={{
                    flex: 1, 
                    flexDirection: 'row', 
                    marginBottom: 32
                  }}
                >
                  <Text
                    style={{
                      flex:1, 
                      // fontWeight: 'bold', 
                      fontSize: 16, 
                      lineHeight: 24
                      // color: "#3578e5"
                    }}
                  >
                    Rent
                  </Text>
                  <Switch
                    value={rentToggle}
                    onValueChange={ (val) => handleSwitch("RentSwitch", val)}
                    circleSize={25}
                    barHeight={25}
                    circleBorderWidth={1}
                    backgroundActive={'black'}
                    switchWidthMultiplier={2.2}
                    switchLeftPx={1.7}
                    switchRightPx={1.7}
                    style={styles.tradeSelectionSwitch}
                  />
                </View>
              </View>

              {
                swapToggle === true &&
                <InterestedCategorySection 
                  handleEdit={this.handleEdit}
                  interestedCategories={interestedCategories}
                />
              }

              {/* {
                swapToggle === true && interestedCategoryEdit === true &&
                <SwapCategorySelection 
                  selectedSwapCategoriesState={selectedSwapCategories}
                  swapCategorySelectionError={swapCategorySelectionError}
                  selectedSwapCategories={selectedSwapCategories}
                  onSelectedItemsChange={onSelectedItemsChange}
                  onSelectedItemObjectsChange={onSelectedItemObjectsChange}
                />
              } */}
            </View>

            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity 
                // disabled={ this.state.finalHashTags.length === 0 ? true : false }
                disabled={swapToggle === false && sellToggle === false && rentToggle === false ? true : false}
                style={{
                  flexDirection: 'row', 
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 278,
                  height: 58,
                  marginTop: 60,
                  marginBottom: 40,
                  borderColor: swapToggle === false && sellToggle === false && rentToggle === false ? "#CECECE" : "black",
                  backgroundColor: swapToggle === false && sellToggle === false && rentToggle === false ? "#CECECE" : "white",
                }}
                // onPress={ () => handlePageContinueButton("hashTag selection", this.finalHashTags) }
                onPress={(e) => handleInputSubmit("TradeSelectionInput")}
              >
                <Text 
                  style={{
                    fontSize: 14, 
                    fontWeight: 'bold', 
                    lineHeight: 20,
                    flex: 1,
                    textAlign: 'center',
                    marginTop: 18,
                    color: swapToggle === false && sellToggle === false && rentToggle === false ? "white" : "black",
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        {/* <View style={styles.tradeSection}>
          <Text style={styles.tradeSectionTitle}>Trade Selection</Text>
          {
            tradeSelectionError === false ?
              <Text style={styles.tradeSectionSubTitle}>
                Turn on selections you want for your item.
              </Text>
            : null
          }

          {
            tradeSelectionError === true ?
              <Text style={{fontSize: 13, color: 'red', marginTop: 5, marginBottom: 10}}>
                Please select at least 1 trade selection.
              </Text>
            :
              <React.Fragment></React.Fragment>
          }
          
          <View style={styles.tradeSelectionSection}>
            <View style={styles.tradeSingleSelectionSection}>
              <Text style={styles.tradeSingleSelectionSectionText}>Swap</Text>

              <Switch
                value={swapToggle}
                onValueChange={ (val) => handleSwitch("SwapSwitch", val)}
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
                value={sellToggle}
                onValueChange={ (val) => handleSwitch("SellSwitch", val)}
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
                value={rentToggle}
                onValueChange={ (val) => handleSwitch("RentSwitch", val) }
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


          {
            swapToggle === true ?
            <InterestedCategorySection 
              handleEdit={handleEdit}
              interestedCategories={interestedCategories}
            />
            : null
          }

          {
            swapToggle === true && interestedCategoryEdit === true ?
            <SwapCategorySelection 
              selectedSwapCategoriesState={selectedSwapCategories}
              swapCategorySelectionError={swapCategorySelectionError}
              selectedSwapCategories={selectedSwapCategories}
              onSelectedItemsChange={onSelectedItemsChange}
              onSelectedItemObjectsChange={onSelectedItemObjectsChange}
            />
            : null
          }

          <Button 
            style={styles.hashTagePageButton}
            onPress={(e) => handleInputSubmit("TradeSelectionInput")}
            disabled={swapToggle === false && sellToggle === false && rentToggle === false ? true : false}
          >
            <Text style={styles.hashTagePageButtonText}>Next</Text>
          </Button>
        </View> */}
      </React.Fragment>
    );
  }
}

export default TradeSelection;
