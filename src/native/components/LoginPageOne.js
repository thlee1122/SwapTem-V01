import React, { Component }                               from 'react';
import { View, TouchableOpacity, ScrollView, 
         SafeAreaView, Dimensions }                       from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import MaterialCommunityIcons                       from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons      from 'react-native-vector-icons/Ionicons';

class LoginPageOne extends Component {
  render() {
    const { height, width } = Dimensions.get('window');


    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <SafeAreaView>
            <View 
              style={{
                width: 156,
                height: 156,
                backgroundColor: 'black',
                alignSelf: 'center',
                marginTop: height * 0.13
              }}
            >
              <Text 
                style={{
                  fontSize: 24, 
                  color: 'white', 
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: 60
                }}
              >
                Logo
              </Text>
            </View>

            <View 
              style={{
                flexDirection: 'column', 
                marginTop: height * 0.1, 
              }}
            >
              <TouchableOpacity 
                style={{
                  borderRadius: 30, 
                  borderWidth: 1, 
                  borderColor: 'black',
                  width: width * 0.9, 
                  height: 58,
                  alignSelf: 'center',
                  flexDirection: 'row'
                }}
                onPress={ () => { Actions.loginPageTwo() }}
              >
                <MaterialCommunityIcons 
                  name="email-outline" 
                  size={24} 
                  color="black" 
                  style={{marginLeft: 24, marginRight: 20, marginTop: 16}}
                />
                <Text 
                  style={{
                    fontSize: 16, 
                    lineHeight: 16, 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 20
                  }}
                >
                  Continue with email
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={{
                  borderRadius: 30, 
                  borderWidth: 1, 
                  borderColor: 'black',
                  width: width * 0.9, 
                  height: 58,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginTop: 24
                }}
              >
                <MaterialCommunityIcons 
                  name="facebook" 
                  size={24} 
                  color="black" 
                  style={{marginLeft: 24, marginRight: 20, marginTop: 16}}
                />
                <Text 
                  style={{
                    fontSize: 16, 
                    lineHeight: 16, 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 20
                  }}
                >
                  Continue with Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={{
                  borderRadius: 30, 
                  borderWidth: 1, 
                  borderColor: 'black',
                  width: width * 0.9, 
                  height: 58,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginTop: 24
                }}
              >
                <MaterialCommunityIcons 
                  name="google" 
                  size={24} 
                  color="black" 
                  style={{marginLeft: 24, marginRight: 20, marginTop: 16}}
                />
                <Text 
                  style={{
                    fontSize: 16, 
                    lineHeight: 16, 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 20
                  }}
                >
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginLeft: 24, marginRight: 24, marginTop: height * 0.1}}>
              <Text style={{fontSize: 14, color: "rgba(0, 0, 0, 0.87)", lineHeight: 20}}>
                Don't have an account yet?
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
                  Sign Up Now
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={{marginTop: 32, alignSelf: 'center'}}
              onPress={ () => { Actions.interestPage() }}
            >
              <Text>
                Skip
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

export default LoginPageOne;

