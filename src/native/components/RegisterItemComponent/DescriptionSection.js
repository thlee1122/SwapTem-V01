import React                                        from "react";
import { View, TextInput, StatusBar, Dimensions,
         TouchableOpacity, Image, SafeAreaView }                          from 'react-native';
import { Text, Button }                             from 'native-base';
import styles                                       from '../../styles/RegisterItemStyles';
import FeatherIcon                                  from 'react-native-vector-icons/Feather';

class DescriptionSection extends React.Component {
  render() {
    const { descInputFieldColor, itemDescription, handleTextChange, handleTextInputFocus, 
            handleTextInputBlur, numOfDescCharacters, handleInputSubmit} = this.props;


    const imageFile = require("../../../images/04.png");
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
              }} 
              onPress={() => {handleBackButton("description input")}}
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
                Descriptions (Optional)
              </Text>
            </View>
          </View>

          <View style={{paddingTop: 31, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16, lineHeight: 24, fontWeight: 'bold'}}>
                Please describe your item (5+ words).
              </Text>

              <TextInput
                style={{
                  width: '100%',
                  color: "black", 
                  fontWeight: 'bold',
                  fontSize: 15,
                  lineHeight: 20,
                  borderWidth: 2,
                  height: 120,
                  marginTop: 10,
                  paddingRight: 10,
                  borderColor: descInputFieldColor,
                  marginTop: 32
                }}
                multiline={true}
                autoCorrect={false}
                paddingLeft={10}
                placeholder="Ex. Very clean and barely used item!"
                value={itemDescription}
                onChangeText={(text) => handleTextChange("itemDescInput", text)}
                // onChangeText={(text) => this.handleTextChange(text)}
                onFocus={(e) => handleTextInputFocus("itemDescInput")}
                onBlur={(e) => handleTextInputBlur("itemDescInput")}
              >
              </TextInput>
              <Text style={{fontSize: 15, textAlign: 'right', marginTop: 10}}>{numOfDescCharacters} / 1000</Text>

              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity 
                  // disabled={swapToggle === false && sellToggle === false && rentToggle === false ? true : false}
                  style={{
                    flexDirection: 'row', 
                    borderWidth: 1,
                    borderRadius: 30,
                    width: 278,
                    height: 58,
                    marginTop: 60,
                    marginBottom: 40,
                    borderColor: "black",
                    backgroundColor: "white",
                  }}
                  onPress={(e) => handleInputSubmit("DescriptionSectionInput")}
                  // onPress={(e) => handleInputSubmit("TradeSelectionInput", this.finalSelectedSwapCategoryObj)}
                >
                  <Text 
                    style={{
                      fontSize: 14, 
                      fontWeight: 'bold', 
                      lineHeight: 20,
                      flex: 1,
                      textAlign: 'center',
                      marginTop: 18,
                      color: "black",
                    }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </SafeAreaView>
      </React.Fragment>



    );
  }
}

export default DescriptionSection;


{/*<React.Fragment>
        <View style={styles.descriptionSection}>
          <Text style={{fontWeight: 'bold', fontSize: 25, marginBottom: 10}}>Description (Optional)</Text>
          <Text style={styles.tradeSectionSubTitle}>
            Please describe your item (5+ words).
          </Text>
          <TextInput
            style={[ styles.descriptionInputBox,
                      {borderColor: descInputFieldColor, marginTop: 10}]}
            multiline={true}
            autoCorrect={false}
            paddingLeft={10}
            placeholder="Ex. Very clean and barely used item!"
            value={itemDescription}
            onChangeText={(text) => handleTextChange("itemDescInput", text)}
            // onChangeText={(text) => this.handleTextChange(text)}
            onFocus={(e) => handleTextInputFocus("itemDescInput")}
            onBlur={(e) => handleTextInputBlur("itemDescInput")}
          >
          </TextInput>
          <Text style={{fontSize: 15, textAlign: 'right', marginTop: 5}}>{numOfDescCharacters} / 1000</Text>

          <Button 
            style={[styles.hashTagePageButton, {marginTop: 30}]}
            onPress={(e) => handleInputSubmit("DescriptionSectionInput")}
          >
            <Text style={styles.hashTagePageButtonText}>Next</Text>
          </Button>
        </View>
      </React.Fragment> */}