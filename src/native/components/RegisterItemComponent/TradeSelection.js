import React                                        from "react";
import { Actions }                                      from 'react-native-router-flux';
import { View, Image, StatusBar, SafeAreaView, 
         TouchableOpacity, Dimensions } from 'react-native';  
import { Text, Button }                      from 'native-base';
import { Dropdown }                                 from 'react-native-material-dropdown';
import { Switch }                                   from 'react-native-switch';
import styles                                       from '../../styles/RegisterItemStyles';
import { clothingTypes, shoesTypes, bagsTypes,
         accessoriesTypes }                         from '../../data/sampleRegisterItemData';
import InterestedCategorySection                    from './InterestedCategorySection';
import SwapCategorySelection                        from './SwapCategorySelection';
import FeatherIcon                                  from 'react-native-vector-icons/Feather';

class TradeSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editButtonClicked: false,
      interestedCategories: ["Books", "Electronics", "Fashion"],
      selectedSwapCategories: []
    };

    this.finalSelectedSwapCategoryObj = {};
  }

  handleEdit = () => {
    this.setState({
      editButtonClicked: true
    });
  }

  handleSwapCategoryContinue = (finalSelectedSwapCategoryObj, swapCategoriesState) => {
    this.setState({
      editButtonClicked: false,
      selectedSwapCategories: swapCategoriesState
    });

    this.finalSelectedSwapCategoryObj = finalSelectedSwapCategoryObj;
  }

  render() {
    const { tradeSelectionError, swapToggle, sellToggle, rentToggle, handleSwitch, 
            handleInputSubmit, selectedSwapCategoriesState, swapCategorySelectionError,
            selectedSwapCategories, onSelectedItemsChange, onSelectedItemObjectsChange,
            handleBackButton } = this.props;

    const imageFile = require("../../../images/04.png");
    const { width } = Dimensions.get('window');

    return (
      <React.Fragment>
        <StatusBar
          barStyle={this.state.editButtonClicked === false ? "light-content" : "dark-content"}
          translucent={true}
          style={{ color: 'white', zIndex: 10 }}
        />

        {
          this.state.editButtonClicked === false ?
          <SafeAreaView style={{marginTop: -20, backgroundColor: 'black'}}>
            <View
              style={{backgroundColor: 'black', height: 300}}
            >
              <TouchableOpacity 
                style={{
                  paddingLeft: 10,
                  paddingTop: 32
                }} 
                onPress={() => {handleBackButton("trade selection")}}
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
                        fontSize: 16, 
                        lineHeight: 24
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
                        fontSize: 16, 
                        lineHeight: 24
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
                        fontSize: 16, 
                        lineHeight: 24
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
                    interestedCategories={this.state.interestedCategories}
                    selectedSwapCategories={this.state.selectedSwapCategories}
                  />
                }
              </View>

              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity 
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
                  onPress={(e) => handleInputSubmit("TradeSelectionInput", this.finalSelectedSwapCategoryObj)}
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
          :
          <SwapCategorySelection 
            selectedSwapCategoriesState={selectedSwapCategories}
            swapCategorySelectionError={swapCategorySelectionError}
            selectedSwapCategories={selectedSwapCategories}
            onSelectedItemsChange={onSelectedItemsChange}
            onSelectedItemObjectsChange={onSelectedItemObjectsChange}
            handleSwapCategoryContinue={this.handleSwapCategoryContinue}
          />
        }  
      </React.Fragment>
    );
  }
}

export default TradeSelection;

