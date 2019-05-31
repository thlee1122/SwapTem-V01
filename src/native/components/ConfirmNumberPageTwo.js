import React, { Component }                               from 'react';
import { View, TouchableOpacity, ScrollView, 
         SafeAreaView, Dimensions, TextInput }                       from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import MaterialCommunityIcons                       from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons      from 'react-native-vector-icons/Ionicons';

class ConfirmNumberPageTwo extends Component {
  constructor(props) {
    super(props);
    this.selectedSelections = [];

    this.state = { 
      selectedSelections: []
    };
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const verificationNumbers = [];

    for(let i=0; i<=3; i++){
      verificationNumbers.push(
        <TextInput
          key={i}
          keyboardType="number-pad"
          // editable={false}
          style={{
            height: 92, 
            borderColor: '#A3A3A2', 
            borderWidth: 1,
            borderRadius: 20,
            // borderBottomWidth: 1,
            // borderBottomColor: '#ECEBEB',
            width: 63,
            // margin: 5,
            // marginRight: 30,
            // alignSelf: 'center',
            paddingLeft: 20,
            fontSize: 30
          }}
          // placeholder="+1"
          // onChangeText={(text) => this.setState({text})}
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

export default ConfirmNumberPageTwo;

