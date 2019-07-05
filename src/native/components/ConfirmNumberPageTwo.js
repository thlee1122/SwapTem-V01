import React, { Component }                               from 'react';
import { View, TouchableOpacity, ScrollView, 
         SafeAreaView, Dimensions, TextInput }                       from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import MaterialCommunityIcons                       from 'react-native-vector-icons/MaterialCommunityIcons';
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
    };
  }

  handleTextChange = (num, i) => {
    if(i === 0) {
      this.setState({
        verificationNumOne: num
      });

    } else if(i === 1) {
      this.setState({
        verificationNumTwo: num
      });

    } else if(i === 2) {
      this.setState({
        verificationNumThree: num
      });

    } else if(i === 3) {
      this.setState({
        verificationNumFour: num
      });
    }
  }

  handleSubmit = async () => {
    const { userPhoneNumber } = this.props; 
    const finalVerificationNum = parseInt(this.state.verificationNumOne + this.state.verificationNumTwo + this.state.verificationNumThree + this.state.verificationNumFour);

    this.setState({
      error: ''
    });

    try {
      let response = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
        phone: userPhoneNumber,
        code: finalVerificationNum
      });

      console.log("#@#@#@#@#@# response", response);

      // let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
      //   phone: userPhoneNumber,
      //   code: finalVerificationNum
      // });

      firebase.auth().signInWithCustomToken(response.data.token);

    } catch(err) {
      console.log("@#@#@#@ got an error", err);

      this.setState({ error: 'You inputted wrong verification code' });
    }

    if(this.state.error === '') {
      console.log("5555 submission successful");
    }
  }

  handleTextInputKeyPress = (e, i) => {
    if(e.nativeEvent.key === 'Backspace') {
      if(i === 0) {
        this.setState({
          verificationNumOne: ''
        });

      } else if(i === 1) {
        this.setState({
          verificationNumTwo: ''
        });

      } else if(i === 2) {
        this.setState({
          verificationNumThree: ''
        });

      } else if(i === 3) {
        this.setState({
          verificationNumFour: ''
        });
      }
    }
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const verificationNumbers = [];

    console.log("@#@#@#@ this.state", this.state);

    for(let i=0; i<=3; i++){
      verificationNumbers.push(
        <TextInput
          key={i}
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
          onChangeText={(num) => this.handleTextChange(num, i)}
          onKeyPress={(e) => this.handleTextInputKeyPress(e, i)}
        />
      );  
    }

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <SafeAreaView>
            <View style={{flexDirection: 'column', width: width * 0.6, alignSelf: 'center', marginTop: 32}}>
              <Text style={{fontSize: 16, lineHeight: 24, textAlign: 'center'}}>
                We sent you a code to verify your phone number.
              </Text>
            </View>

            <View style={{marginTop: height * 0.07, marginLeft: 16, marginRight: 16}}>
              <Text style={{fontSize: 16, lineHeight: 24, textAlign: 'center'}}>
                Sent to (XXX) XXX - XXXX
              </Text>

              {
                this.state.error !== '' &&
                <Text style={{fontSize: 16, color: 'red'  }}>
                  {this.state.error}
                </Text>
              }

              <View 
                style={{
                  flexDirection: 'row',
                  justifyContent: "space-between",
                  flex: 1,
                  marginTop: height * 0.04
                  // alignSelf: "stretch"
                }}
              > 
                {verificationNumbers}
              </View>
            </View>

            <View 
              style={{
                flexDirection: 'row', 
                marginLeft: 24, 
                marginRight: 24, 
                marginTop: height * 0.1, 
                width: width * 0.65,
                alignSelf: 'center'
              }}
            >
              <Text style={{fontSize: 14, color: "rgba(0, 0, 0, 0.87)", lineHeight: 20}}>
                I didn't receive a code!
              </Text>

              <TouchableOpacity 
                style={{flexDirection: 'row', position: 'absolute', right: 0}}
                onPress={ () => { Actions.confirmNumberPageOne() }}
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

            <TouchableOpacity 
              style={{marginTop: 32, alignSelf: 'center'}}
              // onPress={ () => { Actions.signUpPage() }}
              onPress={this.handleSubmit}
            >
              <Text>
                Continue
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

export default ConfirmNumberPageTwo;

