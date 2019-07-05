import React, { Component }                               from 'react';
import { View, TouchableOpacity, 
         SafeAreaView, Dimensions, TextInput }                       from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-5b1e8.cloudfunctions.net';

class ConfirmNumberPageOne extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      phone: '',
      error: ''
    };
  }

  handleSubmit = async () => {
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })

    } catch(err) {
      this.setState({ error: err });
    }

    if(this.state.error === "") {
      Actions.confirmNumberPageTwo({ 
        userPhoneNumber: this.state.phone 
      });
    }
  }

  render() {
    const { height, width } = Dimensions.get('window');

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <SafeAreaView>
            <View style={{flexDirection: 'column', width: width * 0.9, alignSelf: 'center', marginTop: 32}}>
              <Text style={{fontSize: 16, lineHeight: 24, textAlign: 'center'}}>
                Please take a moment to verify your phone number.
              </Text>
              <Text style={{fontSize: 16, lineHeight: 24, marginTop: 5, textAlign: 'center'}}>
                This helps us confirm your identity and secure your account.
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginLeft: 16, marginRight: 16, marginTop: 64}}>
              <TextInput
                editable={false}
                style={{
                  height: 56, 
                  borderColor: 'black', 
                  borderBottomWidth: 1,
                  borderBottomColor: '#ECEBEB',
                  width: width * 0.16,
                  margin: 5,
                  marginRight: 30,
                  alignSelf: 'center',
                  fontSize: 16
                }}
                placeholder="+1"
              />

              <TextInput
                style={{
                  height: 56, 
                  borderColor: 'black', 
                  borderBottomWidth: 1,
                  borderBottomColor: '#ECEBEB',
                  flex: 1,
                  margin: 5,
                  marginRight: 10,
                  alignSelf: 'center',
                  fontSize: 16
                }}
                maxLength={10}
                keyboardType="phone-pad"
                placeholder="(XXX) XXX-XXXX"
                value={this.state.phone}
                onChangeText={(text) => this.setState({phone: text})}
              />
            </View>

            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity 
                style={{
                  flexDirection: 'row', 
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 278,
                  height: 58,
                  marginTop: 150
                }}
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

export default ConfirmNumberPageOne;

