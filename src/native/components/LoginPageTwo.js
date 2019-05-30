import React, { Component }                               from 'react';
import { View, TouchableOpacity, ScrollView, 
         SafeAreaView, Dimensions, TextInput }                       from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import MaterialCommunityIcons                       from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons      from 'react-native-vector-icons/Ionicons';

class LoginPageTwo extends Component {
  constructor(props) {
    super(props);
    this.selectedSelections = [];

    this.state = { 
      selectedSelections: []
    };
  }

  render() {
    const { height, width } = Dimensions.get('window');

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <SafeAreaView>
            <ScrollView>
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

              <View style={{flexDirection: 'column', marginTop: height * 0.05}}>
                <TextInput
                  style={{
                    height: 56, 
                    borderColor: 'gray', 
                    borderBottomWidth: 1,
                    borderBottomColor: '#ECEBEB',
                    width: width * 0.9,
                    margin: 5,
                    marginRight: 10,
                    alignSelf: 'center',
                    fontSize: 16
                  }}
                  placeholder="Username"
                  // onChangeText={(text) => this.setState({text})}
                />

                <TextInput
                  style={{
                    height: 56, 
                    borderColor: 'gray', 
                    borderBottomWidth: 1,
                    borderBottomColor: '#ECEBEB',
                    width: width * 0.9,
                    margin: 5,
                    marginRight: 10,
                    alignSelf: 'center',
                    fontSize: 16,
                    marginTop: 32
                  }}
                  placeholder="Password"
                  // onChangeText={(text) => this.setState({text})}
                />
              </View>

              <View style={{flexDirection: 'row', marginLeft: 24, marginRight: 24, marginTop: height * 0.05}}>
                <TouchableOpacity>
                  <Text style={{fontSize: 14, color: "black", fontWeight: 'bold', lineHeight: 20}}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{
                    flexDirection: 'row', 
                    position: 'absolute', 
                    right: 0,
                    borderWidth: 1,
                    borderRadius: 30,
                    width: 123,
                    height: 48,
                    marginTop: -15
                  }}
                >
                  <Text 
                    style={{
                      fontSize: 14, 
                      fontWeight: 'bold', 
                      lineHeight: 20,
                      flex: 1,
                      textAlign: 'center',
                      marginTop: 13,
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', marginTop: 65, marginLeft: 24, marginRight: 24}}>
                <TouchableOpacity style={{width: 135, height: 58, borderWidth: 1, borderRadius: 30}}>
                  <MaterialCommunityIcons 
                    name="facebook" 
                    size={32} 
                    color="black" 
                    style={{alignSelf: 'center', marginTop: 13}}
                  />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{
                    width: 135, 
                    height: 58, 
                    borderWidth: 1, 
                    borderRadius: 30,
                    position: 'absolute',
                    right: 0
                  }}
                >
                  <MaterialCommunityIcons 
                    name="google" 
                    size={32} 
                    color="black" 
                    style={{alignSelf: 'center', marginTop: 13}}
                  />
                </TouchableOpacity>

              </View>

              <View style={{flexDirection: 'row', marginLeft: 24, marginRight: 24, marginTop: height * 0.05}}>
                <Text style={{fontSize: 14, color: "rgba(0, 0, 0, 0.87)", lineHeight: 20}}>
                  Don't have an account yet?
                </Text>

                <TouchableOpacity style={{flexDirection: 'row', position: 'absolute', right: 0}}>
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
            </ScrollView>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

export default LoginPageTwo;

