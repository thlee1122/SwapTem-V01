import React, { Component }                               from 'react';
import { View, TouchableOpacity, ScrollView, 
         SafeAreaView, Dimensions, TextInput }                       from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import { Hoshi }                                               from 'react-native-textinput-effects';

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      selectedSelections: []
    };
  }

  render() {
    const { height, width } = Dimensions.get('window');
   
    return (
      <Content style={{backgroundColor: 'white'}}>
        <SafeAreaView style={{height: height * 0.68}}>
          <View style={{flexDirection: 'column', marginLeft: 16, marginRight: 16, justifyContent: "space-between", flex: 1}}>
            <Hoshi
              label={'First Name'}
              // editable={false}
              borderColor={'black'}
              inputPadding={0}
              borderHeight={3}
              backgroundColor={'white'}
              autoCapitalize={'none'}
              autoCorrect={false}
              labelStyle={{
                color: "#A3A3A2"
              }}
              inputStyle={{
                position: "relative",
                marginTop: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#A3A3A2",
                color: 'black'
              }}
              style={{
                position: "relative",
                marginTop: 25,
              }}
            />

            <Hoshi
              label={'Last Name'}
              // editable={false}
              borderColor={'black'}
              inputPadding={0}
              borderHeight={3}
              backgroundColor={'white'}
              autoCapitalize={'none'}
              autoCorrect={false}
              labelStyle={{
                color: "#A3A3A2"
              }}
              inputStyle={{
                position: "relative",
                marginTop: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#A3A3A2",
                color: 'black'
              }}
              style={{
                position: "relative",
                marginTop: 25,
              }}
            />

            <Hoshi
              label={'Email'}
              // editable={false}
              borderColor={'black'}
              inputPadding={0}
              borderHeight={3}
              backgroundColor={'white'}
              autoCapitalize={'none'}
              autoCorrect={false}
              labelStyle={{
                color: "#A3A3A2"
              }}
              inputStyle={{
                position: "relative",
                marginTop: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#A3A3A2",
                color: 'black'
              }}
              style={{
                position: "relative",
                marginTop: 25,
              }}
            />

            <Hoshi
              label={'Password'}
              // editable={false}
              borderColor={'black'}
              inputPadding={0}
              borderHeight={3}
              backgroundColor={'white'}
              autoCapitalize={'none'}
              autoCorrect={false}
              labelStyle={{
                color: "#A3A3A2"
              }}
              inputStyle={{
                position: "relative",
                marginTop: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#A3A3A2",
                color: 'black'
              }}
              style={{
                position: "relative",
                marginTop: 25,
              }}
            />

            <Hoshi
              label={'Confirm Password'}
              // editable={false}
              borderColor={'black'}
              inputPadding={0}
              borderHeight={3}
              backgroundColor={'white'}
              autoCapitalize={'none'}
              autoCorrect={false}
              labelStyle={{
                color: "#A3A3A2"
              }}
              inputStyle={{
                position: "relative",
                marginTop: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#A3A3A2",
                color: 'black'
              }}
              style={{
                position: "relative",
                marginTop: 25,
              }}
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
                marginTop: 100
              }}
              // onPress={ () => { Actions.confirmNumberPageTwo() }}
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
    );
  }
}

export default SignUpPage;

