import React                                        from "react";
import { View, TextInput }                          from 'react-native';
import { Text, Button }                             from 'native-base';
import styles                                       from '../../styles/RegisterItemStyles';

class BrandSelection extends React.Component {

  render() {
    const { brandInputFieldColor, brandName, handleTextChange, 
            handleTextInputFocus, handleTextInputBlur } = this.props;

    return (
      <React.Fragment>
        <View style={styles.brandSection}>
          <Text style={{fontWeight: 'bold'}}><Text style={{color: 'grey'}}>* </Text>BRAND</Text>
          <TextInput
            style={[ styles.brandSectionTextInput,
                      {borderBottomColor: brandInputFieldColor}]}
            ref="brandNameInput"
            paddingLeft={10}
            placeholder="Ex. Nintendo"
            value={brandName}
            onChangeText={(text) => handleTextChange("brandNameInput", text)}
            onFocus={(e) => handleTextInputFocus("brandNameInput")}
            onBlur={(e) => handleTextInputBlur("brandNameInput")}
          >
          </TextInput>
        </View>
      </React.Fragment>
    );
  }
}

export default BrandSelection;
