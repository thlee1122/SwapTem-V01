import React, { Component }                               from 'react';
import { View, TouchableOpacity, ScrollView, 
         SafeAreaView, Dimensions }                       from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import Ionicons      from 'react-native-vector-icons/Ionicons';

class TermsPage extends Component {
  render() {
    const { height, width } = Dimensions.get('window');

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <SafeAreaView style={{height: height * 0.75}}>
            <View style={{flexDirection: 'column', marginTop: 32, marginBottom: 64}}>
              <Text style={{paddingLeft: 37, paddingRight: 37, fontSize: 14, lineHeight: 22}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid turpius quam sapientis 
                vitam ex insipientium sermone pendere? Quae diligentissime contra Aristonem 
                dicuntur a Chryippo.
              </Text>

              <Text style={{marginTop: 24, paddingLeft: 37, paddingRight: 37, fontSize: 14, lineHeight: 22}}>
                Quantum Aristoxeni ingenium consumptum videmus in musicis? Sed vos squalidius, illorum vides quam niteat oratio. 
                Duo Reges: constructio interrete. Varietates autem iniurasque fortunae facile veteres philosophorum 
                praeceptis instituta vita superabat.
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity 
                style={{flexDirection: 'row', position: 'absolute', left: 37, height: 30}}
                // onPress={ () => { Actions.confirmNumberPageOne() }}
              >
                <Ionicons 
                  name="ios-arrow-forward" 
                  size={20} 
                  color="#A3A3A2" 
                  style={{marginRight: 10}}
                />

                <Text style={{fontSize: 14, fontWeight: 'bold', lineHeight: 20}}>
                  Terms of Service
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={{flexDirection: 'row', position: 'absolute', right: 37, height: 30}}
                // onPress={ () => { Actions.confirmNumberPageOne() }}
              >
                <Ionicons 
                  name="ios-arrow-forward" 
                  size={20} 
                  color="#A3A3A2" 
                  style={{marginRight: 10}}
                />

                <Text style={{fontSize: 14, fontWeight: 'bold', lineHeight: 20}}>
                  See Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{alignSelf: 'center', position: 'absolute', bottom: 0}}>
              <Text style={{color: '#A3A3A2', fontSize: 12, lineHeight: 16, marginBottom: 16}}>
                By continuing you accept SwapTem's Terms of Service
              </Text>

              <TouchableOpacity 
                style={{
                  flexDirection: 'row', 
                  
                  // right: 0,
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 278,
                  height: 58,
                  alignSelf: 'center'
                  // marginTop: 100
                }}
                onPress={ () => { Actions.home() }}
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

export default TermsPage;

