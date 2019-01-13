import React                                        from "react";
import { View, TextInput }                          from 'react-native';
import { Text, Button }                             from 'native-base';
import styles                                       from '../../styles/RegisterItemStyles';

class DescriptionSection extends React.Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     descriptionText: ""
  //   };
  // }

  // handleTextChange = (text) => {
  //   this.props.handleTextChange("itemDescription", text);
  //   this.setState({
  //     descriptionText: text
  //   });
  // }

  render() {
    const { descInputFieldColor, itemDescription, handleTextChange, handleTextInputFocus, 
            handleTextInputBlur, numOfDescCharacters, handleInputSubmit} = this.props;

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default DescriptionSection;
