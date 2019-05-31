import React, { Component }                               from 'react';
import { View, TouchableOpacity, ScrollView, 
         SafeAreaView, Dimensions, TextInput }                       from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import MaterialCommunityIcons                       from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons      from 'react-native-vector-icons/Ionicons';

class ConfirmNumberPageOne extends Component {
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
                // onChangeText={(text) => this.setState({text})}
              />

              <TextInput
                // editable={false}
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
                keyboardType="phone-pad"
                placeholder="(XXX) XXX-XXXX"
                // onChangeText={(text) => this.setState({text})}
              />
            </View>

            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity 
                style={{
                  flexDirection: 'row', 
                  
                  // right: 0,
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 278,
                  height: 58,
                  marginTop: 150
                }}
                onPress={ () => { Actions.confirmNumberPageTwo() }}
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

