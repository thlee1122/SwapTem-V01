import React                                        from "react";
import { View, TextInput, StatusBar, Dimensions, Button,
         SafeAreaView, TouchableOpacity, Text, Image }                          from 'react-native';
import styles                                       from '../../styles/RegisterItemStyles';
import FeatherIcon                                  from 'react-native-vector-icons/Feather';

class ValueInputSection extends React.Component {
  handleSubmit = (inputType) => {
    const { handleInputSubmit, handleSubmit } = this.props;
    handleInputSubmit(inputType);
    handleSubmit(inputType);
  }

  render() {
    const { itemValueInputColor, itemValue, handleTextChange, handleTextInputFocus, 
            handleTextInputBlur, handleInputSubmit, handleSubmit, handleBackButton } = this.props;
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
          <View style={{backgroundColor: 'black', height: 300}}>
            <TouchableOpacity 
              style={{ paddingLeft: 10, paddingTop: 32}} 
              onPress={() => {handleBackButton("value input")}}
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
              <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', lineHeight: 30, width: width * 0.68, marginTop: 10}}>
                Set Price
              </Text>
            </View>
          </View>

          <View style={{paddingTop: 31, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{
                color: "black", 
                fontSize: 16,
                marginTop: 5,
                lineHeight: 30
              }}>
                Based on the information provided, <Text style={{fontWeight: 'bold', color: "black"}}>RECOMMENDED VALUE</Text> is <Text style={{fontWeight: 'bold', color: "black"}}>$20.00.</Text>
              </Text>

              <TextInput
                style={{
                  width: '100%',
                  height: 56, 
                  color: "black", 
                  fontWeight: 'bold',
                  fontSize: 15,
                  borderBottomWidth: 2,
                  marginTop: 32,
                  borderBottomColor: itemValueInputColor
                }}
                ref="itemValueInput"
                paddingLeft={10}
                placeholder="Please input price for your item. Ex. 20.00"
                value={itemValue}
                keyboardType='numeric'
                onChangeText={(text) => handleTextChange("itemValueInput", text)}
                onFocus={(e) => handleTextInputFocus("itemValueInput")}
                onBlur={(e) => handleTextInputBlur("itemValueInput")}
              />

              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity 
                  disabled={itemValue === "" ? true : false}
                  style={{
                    flexDirection: 'row', 
                    borderWidth: 1,
                    borderRadius: 30,
                    width: 278,
                    height: 58,
                    marginTop: 60,
                    marginBottom: 40,
                    borderColor: itemValue === "" ? "#CECECE" : "black",
                    backgroundColor: itemValue === "" ? "#CECECE" : "white",
                  }}
                  onPress={(e) => this.handleSubmit("ValueInput")}
                >
                  <Text 
                    style={{
                      fontSize: 14, 
                      fontWeight: 'bold', 
                      lineHeight: 20,
                      flex: 1,
                      textAlign: 'center',
                      marginTop: 18,
                      color: itemValue === "" ? "white" : "black",
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

export default ValueInputSection;
