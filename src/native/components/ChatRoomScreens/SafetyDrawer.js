import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                                  from 'react-native-router-flux';

import { MaterialIcons, Ionicons } from '@expo/vector-icons';
// import { connect }                                     from 'react-redux';


class SafetyDrawer extends Component {

  handleShareMyMeetingButton = () => {
    const { closeSafetyDrawer } = this.props;

    closeSafetyDrawer();
    Actions.shareMyMeetingPage();
  }

  render() {
    const { closeSafetyDrawer, trustedContactSubmitted } = this.props;

    return (
      <Container>
        <Content style={{backgroundColor: 'transparent' }}>
          <TouchableOpacity onPress={()=> closeSafetyDrawer()} activeOpacity={1}>
            <View 
              style={{
                flexDirection: 'column', 
                backgroundColor: 'white', 
                shadowColor: '#000000', 
                shadowOpacity: 2, 
                shadowRadius: 3,
                shadowOffset: {
                  height: 1,
                  width: 1
                },
                // marginTop: 40
              }}>

              {
                trustedContactSubmitted === false ?
                <TouchableOpacity 
                  style={{marginLeft: 10, marginRight: 10}}
                  onPress={() => this.handleShareMyMeetingButton()}
                >
                  <View style={{flexDirection: 'row'}}>
                    <MaterialIcons name="location-on" size={32} color="#959595" style={{alignSelf: 'center'}}/>

                    <View style={{flexDirection: 'column'}}>
                      <Text style={{fontSize: 20, letterSpacing: 1, margin: 10, fontWeight: 'bold'}}>
                        Share My Meeting
                      </Text>

                      <Text 
                        style={{
                          fontSize: 16, 
                          letterSpacing: 1, 
                          marginLeft: 10, 
                          marginRight: 10, 
                          width: "55%",
                          lineHeight: 22,
                          color: "#676666"
                        }}
                      >
                        Let family and friends see your location and meeting status.
                      </Text>
                    </View>

                    <Ionicons 
                      name="ios-arrow-forward" 
                      size={32} 
                      color="#959595" 
                      style={{alignSelf: 'center', position: 'absolute', right: 10}}
                    />
                  </View>
                </TouchableOpacity>
                : null
              }

              <TouchableOpacity style={{marginLeft: 10, marginRight: 10, marginTop: 15, marginBottom: 15}}>
                <View style={{flexDirection: 'row'}}>
                  <MaterialIcons name="add-alert" size={32} color="#959595" style={{alignSelf: 'center'}}/>

                  <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 20, letterSpacing: 1, margin: 10, fontWeight: 'bold'}}>
                      911 Assistance
                    </Text>

                    <Text 
                      style={{
                        fontSize: 16, 
                        letterSpacing: 1, 
                        marginLeft: 10, 
                        marginRight: 10, 
                        width: "55%",
                        lineHeight: 22,
                        color: "#676666"
                      }}
                    >
                      Call 911 and get location and meeting information to share with authorities.
                    </Text>
                  </View>

                  <Ionicons 
                    name="ios-arrow-forward" 
                    size={32} 
                    color="#959595" 
                    style={{alignSelf: 'center', position: 'absolute', right: 10}}
                  />
                </View>
              </TouchableOpacity>

            </View>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default SafetyDrawer;

