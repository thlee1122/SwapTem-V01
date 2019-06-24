import React                                                from "react";
import { View, TextInput, Text, SafeAreaView, StatusBar,
         TouchableOpacity, Image, Dimensions }              from 'react-native';
import FeatherIcon                                          from 'react-native-vector-icons/Feather';
import styles                                       from '../../styles/RegisterItemStyles';

class TextbookSelectionSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textBookName: "",
      textbookInputBorderColor: '#ECEBEB',
      courseName: "",
      courseInputBorderColor: '#ECEBEB',
      collegeName: "",
      collegeInputBorderColor: '#ECEBEB'
    };
  }

  handleTextChange = (inputBoxName, text) => {
    if(inputBoxName === "textbook name") {
      this.setState({
        textBookName: text
      });

    } else if(inputBoxName === "course name") {
      this.setState({
        courseName: text
      });

    } else if(inputBoxName === "college name") {
      this.setState({
        collegeName: text
      });
    }
  }

  handleTextInputFocus = (inputBoxName, action) => {
    if(inputBoxName === "textbook name") {
      if(action === "Focus") {
        this.setState({
          textbookInputBorderColor: 'black'
        });

      } else if(action === "Blur") {
        this.setState({
          textbookInputBorderColor: '#ECEBEB'
        });
      }

    } else if(inputBoxName === "course name") {
      if(action === "Focus") {
        this.setState({
          courseInputBorderColor: 'black'
        });

      } else if(action === "Blur") {
        this.setState({
          courseInputBorderColor: '#ECEBEB'
        });
      }

    } else if(inputBoxName === "college name") {
      if(action === "Focus") {
        this.setState({
          collegeInputBorderColor: 'black'
        });

      } else if(action === "Blur") {
        this.setState({
          collegeInputBorderColor: '#ECEBEB'
        });
      }
    } 
  }

  handleContinueButton = () => {
    const { handleInputSubmit } = this.props;

    const finalTextbookObj = {
      textBookName: this.state.textBookName,
      courseName: this.state.courseName,
      collegeName: this.state.collegeName
    };

    handleInputSubmit("textbook selection", finalTextbookObj);
  }

  render() {
    const { handleInputSubmit, handleBackButton } = this.props;
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
              style={{ paddingLeft: 10, paddingTop: 32 }} 
              onPress={() => {handleBackButton("textbook selection")}}
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
              <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', lineHeight: 30, width: width * 0.68, paddingTop: 10}}>
                Textbook Info Input (Optional)
              </Text>
            </View>
          </View>

          <View style={{paddingTop: 31, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'column'}}>
              <View>
                <Text style={{fontSize: 14, lineHeight: 16, color: '#A3A3A2'}}>
                  {`Please input `}
                  <Text style={{fontSize: 14, lineHeight: 16, fontWeight: 'bold', color: 'black'}}>
                    textbook name.
                  </Text>
                </Text>

                <TextInput
                  style={[ styles.textBookSectionInputbox, {borderBottomColor: this.state.textbookInputBorderColor}]}
                  ref="textbookNameInput"
                  paddingLeft={10}
                  placeholder="Ex. Java Programming Basic"
                  value={this.state.textBookName}
                  onChangeText={(text) => this.handleTextChange("textbook name", text)}
                  onFocus={(e) => this.handleTextInputFocus("textbook name", "Focus")}
                  onBlur={(e) => this.handleTextInputFocus("textbook name", "Blur")}
                />
              </View>

              <View style={{marginTop: 48}}>
                <Text style={{fontSize: 14, lineHeight: 16, color: '#A3A3A2'}}>
                  Please input 
                  <Text style={{fontSize: 14, lineHeight: 16, fontWeight: 'bold', color: 'black'}}>
                    {` course name `}
                  </Text>
                  for this textbook.
                </Text>

                <TextInput
                  style={[ styles.textBookSectionInputbox, {borderBottomColor: this.state.courseInputBorderColor}]}
                  ref="courseNameInput"
                  paddingLeft={10}
                  placeholder="Ex. Computer Science I"
                  value={this.state.courseName}
                  onChangeText={(text) => this.handleTextChange("course name", text)}
                  onFocus={(e) => this.handleTextInputFocus("course name", "Focus")}
                  onBlur={(e) => this.handleTextInputFocus("course name", "Blur")}
                />
              </View>

              <View style={{marginTop: 48}}>
                <Text style={{fontSize: 14, lineHeight: 16, color: '#A3A3A2'}}>
                  {`Please input `}
                  <Text style={{fontSize: 14, lineHeight: 16, fontWeight: 'bold', color: 'black'}}>
                    college / university name.
                  </Text>
                </Text>

                <TextInput
                  style={[ styles.textBookSectionInputbox, {borderBottomColor: this.state.collegeInputBorderColor}]}
                  ref="collegeNameInput"
                  paddingLeft={10}
                  placeholder="New York University"
                  value={this.state.collegeName}
                  onChangeText={(text) => this.handleTextChange("college name", text)}
                  onFocus={(e) => this.handleTextInputFocus("college name", "Focus")}
                  onBlur={(e) => this.handleTextInputFocus("college name", "Blur")}
                />
              </View>
            </View>

            <View style={{alignSelf: 'center', marginTop: 50}}>
              <TouchableOpacity 
                style={{
                  flexDirection: 'row', 
                  borderWidth: 1,
                  borderRadius: 15,
                  width: 278,
                  height: 58,
                  marginBottom: 40,
                  borderColor: "black",
                  backgroundColor: "white"
                }}
                onPress={(e) => this.handleContinueButton()}
              >
                <Text 
                  style={{
                    fontSize: 14, 
                    fontWeight: 'bold', 
                    lineHeight: 20,
                    flex: 1,
                    textAlign: 'center',
                    marginTop: 18,
                    color: "black"
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

export default TextbookSelectionSection;
