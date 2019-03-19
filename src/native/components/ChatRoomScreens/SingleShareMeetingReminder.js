import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                                  from 'react-native-router-flux';
// import { Permissions, Contacts }                                           from 'expo';

import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { connect }                                     from 'react-redux';


class SingleShareMeetingReminder extends Component {
  
  render() {
    

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <View>
            <Text>
              
            </Text>
            <Text>
              Sample Single Share Meeting Reminder Page
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default SingleShareMeetingReminder;

