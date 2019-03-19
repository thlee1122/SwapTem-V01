import React                                        from "react";
import { View, TextInput }                          from 'react-native';
import { Text, Button }                             from 'native-base';
import styles                                       from '../../styles/RegisterItemStyles';

class ValueInputSection extends React.Component {

  handleSubmit = (inputType) => {
    const { handleInputSubmit, handleSubmit } = this.props;

    handleInputSubmit(inputType);
    handleSubmit(inputType);
  }

  render() {
    const { itemValueError, itemValueInputColor, itemValue, handleTextChange,
            handleTextInputFocus, handleTextInputBlur, handleInputSubmit, handleSubmit} = this.props;

    return (
      <React.Fragment>
        <View style={styles.valueSection}>
          <Text style={{fontWeight: 'bold', fontSize: 25, marginBottom: 10}}>SET VALUE</Text>
          <Text style={styles.valueSectionSubTitle}>
            Based on the information provided, <Text style={{fontWeight: 'bold', color: "#00529b"}}>RECOMMENDED VALUE</Text> is <Text style={{fontWeight: 'bold', color: "#00529b"}}>$20.00.</Text>
          </Text>

          {
            itemValueError === true ?
              <Text style={styles.valueSectionErrorMsg}>
                Please enter value for your item
              </Text>
            :
              <React.Fragment></React.Fragment>
          }

          <TextInput
            style={[ styles.valueSectionTextInput,
                      {borderBottomColor: itemValueInputColor}]}
            ref="itemValueInput"
            paddingLeft={10}
            placeholder="Please input value for your item. Ex. 20.00"
            value={itemValue}
            keyboardType='numeric'
            onChangeText={(text) => handleTextChange("itemValueInput", text)}
            onFocus={(e) => handleTextInputFocus("itemValueInput")}
            onBlur={(e) => handleTextInputBlur("itemValueInput")}
          />

          <Button 
            style={[styles.hashTagePageButton, {marginTop: 30}]}
            onPress={(e) => this.handleSubmit("ValueInput")}
            disabled={itemValue !== "" ? false : true}
          >
            <Text style={styles.hashTagePageButtonText}>Submit</Text>
          </Button>
        </View>
      </React.Fragment>
    );
  }
}

export default ValueInputSection;
