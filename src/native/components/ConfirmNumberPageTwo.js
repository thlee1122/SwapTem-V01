import React, { Component }                               from 'react';
import { View, TouchableOpacity, ScrollView, 
         SafeAreaView, Dimensions, TextInput }                       from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import Ionicons      from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-one-time-password-5b1e8.cloudfunctions.net';

class ConfirmNumberPageTwo extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      verificationNumOne: '',
      verificationNumTwo: '',
      verificationNumThree: '',
      verificationNumFour: '',
      error: '',
      disableButton: true,
      resendClicked: false,
    };

    this.newFormattedPhoneNum = '';
    this.verificationNumOne = '';
    this.verificationNumTwo = '';
    this.verificationNumThree = '';
    this.verificationNumFour = '';


    this.verificationNumBox = [
      {refName: "textInputOne"}, 
      {refName: "textInputTwo"}, 
      {refName: "textInputThree"}, 
      {refName: "textInputFour"}, 
    ];
  }

  componentWillMount() {
    const { userPhoneNumber } = this.props;

    this.newFormattedPhoneNum = `(${userPhoneNumber.substring(0,3)}) ${userPhoneNumber.substring(3,6)} - ${userPhoneNumber.substring(6)}`;
  }

  handleTextChange = (num, i, textInputRefName) => {
    const thisRef = this;

    if(i === 0) {
      this.setState({ verificationNumOne: num });
      this.verificationNumOne = num;

    } else if(i === 1) {
      this.setState({ verificationNumTwo: num });
      this.verificationNumTwo = num;

    } else if(i === 2) {
      this.setState({ verificationNumThree: num });
      this.verificationNumThree = num;

    } else if(i === 3) {
      this.setState({ verificationNumFour: num });
      this.verificationNumFour = num;
    }

    //** Need to fix to focus the next verification num box
    // if(this.verificationNumOne !== '') {
    //   const tempTextInputRefName = 'textInputOne';
    //   this.textInputRefName.focus();
    // }

    if(this.verificationNumOne !== '' && this.verificationNumTwo !== '' &&
       this.verificationNumThree !== '' && this.verificationNumFour !== '') {
      this.setState({ disableButton: false });

    } else {
      this.setState({ disableButton: true });
    }
  }

  handleSubmit = async () => {
    const { userPhoneNumber } = this.props; 
    const finalVerificationNum = parseInt(this.state.verificationNumOne + this.state.verificationNumTwo + this.state.verificationNumThree + this.state.verificationNumFour);

    this.setState({ error: '' });

    try {
      let response = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
        phone: userPhoneNumber,
        code: finalVerificationNum
      });

      firebase.auth().signInWithCustomToken(response.data.token);

    } catch(err) {
      this.setState({ error: 'You inputted wrong verification code' });
    }

    if(this.state.error === '') {
      Actions.signUpPage();
    }
  }

  handleTextInputKeyPress = (e, i) => {
    if(e.nativeEvent.key === 'Backspace') {
      if(i === 0) {
        this.setState({ verificationNumOne: '' });

      } else if(i === 1) {
        this.setState({ verificationNumTwo: '' });

      } else if(i === 2) {
        this.setState({ verificationNumThree: '' });

      } else if(i === 3) {
        this.setState({ verificationNumFour: '' });
      }
    }
  }

  handleResend = async () => {
    const { userPhoneNumber } = this.props;

    this.setState({ resendClicked: true });

    try {
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: userPhoneNumber })

    } catch(err) {
      this.setState({ error: err });
    }
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const verificationNumbers = [];

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <SafeAreaView>
            <View style={{flexDirection: 'column', width: width * 0.6, alignSelf: 'center', marginTop: 32}}>
              <Text style={{fontSize: 16, lineHeight: 24, textAlign: 'center'}}>
                We sent you a code to verify your phone number.
              </Text>
            </View>

            <View style={{marginTop: 20, marginLeft: 16, marginRight: 16}}>
              <Text style={{fontSize: 16, lineHeight: 24, textAlign: 'center', fontWeight: 'bold'}}>
                {`Sent to ${this.newFormattedPhoneNum}`}
              </Text>

              {
                this.state.error !== '' &&
                <Text style={{fontSize: 16, lineHeight: 24, color: 'red', textAlign: 'center', marginTop: 20 }}>
                  {this.state.error}
                </Text>
              }

              <View 
                style={{
                  flexDirection: 'row',
                  justifyContent: "space-between",
                  flex: 1,
                  marginTop: height * 0.04
                }}
              > 
                {
                  this.verificationNumBox.map((item, index) => {
                    const textInputRefName = item.refName;

                    return (
                      <TextInput
                        ref={(input) => { this.textInputRefName = input; }}
                        key={index}
                        keyboardType="number-pad"
                        maxLength={1}
                        style={{
                          height: 92, 
                          borderColor: '#A3A3A2', 
                          borderWidth: 1,
                          borderRadius: 20,
                          width: 63,
                          paddingLeft: 20,
                          fontSize: 30
                        }}
                        onChangeText={(num) => this.handleTextChange(num, index, textInputRefName)}
                        onKeyPress={(e) => this.handleTextInputKeyPress(e, index)}
                      />
                    );
                  })
                }
              </View>
            </View>

            {
              this.state.resendClicked === true &&
              <Text style={{fontSize: 16, fontWeight: 'bold', lineHeight: 24, textAlign: 'center', marginTop: 32}}>
                New code has been sent to your phone number.
              </Text>
            }

            <View 
              style={{
                flexDirection: 'row', 
                marginLeft: 24, 
                marginRight: 24, 
                marginTop: 40, 
                width: width * 0.65,
                alignSelf: 'center'
              }}
            >
              <Text style={{fontSize: 14, color: "rgba(0, 0, 0, 0.87)", lineHeight: 20}}>
                I didn't receive a code!
              </Text>

              <TouchableOpacity 
                style={{flexDirection: 'row', position: 'absolute', right: 0}}
                onPress={this.handleResend}
              >
                <Ionicons 
                  name="ios-arrow-forward" 
                  size={20} 
                  color="#A3A3A2" 
                  style={{marginRight: 10}}
                />

                <Text style={{fontSize: 14, fontWeight: 'bold', lineHeight: 20}}>
                  Resend
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity 
                style={{
                  flexDirection: 'row', 
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 278,
                  height: 58,
                  marginTop: 80,
                  backgroundColor: this.state.disableButton === true ? "#CECECE" : 'white',
                  borderColor: this.state.disableButton === true ? "#CECECE" : 'black'
                }}
                disabled={this.state.disableButton}
                onPress={this.handleSubmit}
              >
                <Text 
                  style={{
                    fontSize: 14, 
                    fontWeight: 'bold', 
                    lineHeight: 20,
                    flex: 1,
                    textAlign: 'center',
                    marginTop: 18,
                    color: this.state.disableButton === true ? 'white' : 'black'
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

export default ConfirmNumberPageTwo;

