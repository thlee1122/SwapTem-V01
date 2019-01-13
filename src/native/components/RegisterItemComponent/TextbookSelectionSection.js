import React                                        from "react";
import { View, TextInput }                                     from 'react-native';
import { Text, Button }                             from 'native-base';
import { Dropdown }                                 from 'react-native-material-dropdown';
import SectionedMultiSelect                         from 'react-native-sectioned-multi-select';
import { Switch }                                   from 'react-native-switch';
import styles                                       from '../../styles/RegisterItemStyles';
import { topSizes, pantSizes, shoesSizes,
          colleges }          from '../../data/sampleRegisterItemData';

class TextbookSelectionSection extends React.Component {

  render() {
    const { textBookNameError, textbookNameInputColor, textbookName, handleTextChange,
      handleTextInputFocus, handleTextInputBlur, courseNameError, courseName, courseNameInputColor,
      collegeNameError, collegeName, onSelectedItemsChange, handleInputSubmit
    } = this.props;

    return (
      <React.Fragment>
        <View style={styles.textBookSection}>
          <Text style={{fontWeight: 'bold', fontSize: 22, marginBottom: 10}}>Textbook Title <Text style={{fontSize:20}}>(Optional)</Text></Text>
          {
            textBookNameError === true ?
              <Text style={styles.textBookSectionSubTitle}>
                Please input name for your textbook.
              </Text>
            :
              <React.Fragment></React.Fragment>
          }

          <TextInput
            style={[ styles.textBookSectionInputbox,
                  {borderBottomColor: textbookNameInputColor}]}
            ref="textbookNameInput"
            paddingLeft={10}
            placeholder="Ex. Introductory Business Statistics"
            value={textbookName}
            onChangeText={(text) => handleTextChange("textbookNameInput", text)}
            onFocus={(e) => handleTextInputFocus("textbookNameInput")}
            onBlur={(e) => handleTextInputBlur("textbookNameInput")}
          >
          </TextInput>
        </View>

        <View style={[styles.courseNameSection, {marginTop: 25}]}>
          <Text style={{fontWeight: 'bold', fontSize: 22, marginBottom: 10}}>Course Name <Text style={{fontSize:20}}>(Optional)</Text></Text>
          <Text style={[styles.collegeSectionSubTitle, {fontSize: 16, lineHeight: 22, color: '#00529b'}]}>
            Input name of the course for the corresponding textbook.
          </Text>
          {
            courseNameError === true ?
              <Text style={styles.courseNameSectionErrorMsg}>
                Please input course name for your textbook.
              </Text>
            :
              <React.Fragment></React.Fragment>
          }
          <TextInput
            style={[ styles.textBookSectionInputbox,
                  {borderBottomColor: courseNameInputColor}]}
            ref="courseNameInput"
            paddingLeft={10}
            placeholder="Ex. Computer Science I"
            value={courseName}
            onChangeText={(text) => handleTextChange("courseNameInput", text)}
            onFocus={(e) => handleTextInputFocus("courseNameInput")}
            onBlur={(e) => handleTextInputBlur("courseNameInput")}
          >
          </TextInput>

        </View>

        <View style={[styles.collegeSection, {marginTop: 25}]}>
          <Text style={{fontWeight: 'bold', fontSize: 22, marginBottom: 10}}>College Name <Text style={{fontSize:20}}>(Optional)</Text></Text>
          <Text style={[styles.collegeSectionSubTitle, {fontSize: 16, lineHeight: 22, color: collegeNameError === false ? '#00529b' : "red"}]}>
            Select name of your current college you are attending.
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
            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange("collegeSelection", selectedItems)}
            selectedItems={collegeName}
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

        <Button 
          style={[styles.hashTagePageButton, {marginTop: 30}]}
          onPress={(e) => handleInputSubmit("textbookCollegeCourseInput")}
          // disabled={gender !== "" && size !== "" && type.length !== 0 && genderClicked === true ? false : true}
          // disabled={courseName !== "" && textbookName !== "" && collegeName.length !== 0 ? false : true}
        >
          <Text style={styles.hashTagePageButtonText}>Next</Text>
        </Button>
      </React.Fragment>
    );
  }
}

export default TextbookSelectionSection;
