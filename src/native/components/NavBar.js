import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity, Dimensions, SafeAreaView }                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import MaterialIcon                                                 from 'react-native-vector-icons/MaterialIcons';

import Ionicons                                                     from 'react-native-vector-icons/Ionicons';
// import { connect }                                     from 'react-redux';


class NavBar extends Component {


  render() {

    const { height, width } = Dimensions.get('window');

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{paddingLeft: 10, paddingRight: 10}}>
          <View 
            style={{
            flex: 1, 
            flexDirection: 'row',
          }}>
            <TouchableOpacity 
              style={{position: 'absolute', left: 0, marginLeft: 5, zIndex:10}}
              onPress={()=> this.openDrawer()}
            >
              <MaterialIcon size={24} name="menu" />
            </TouchableOpacity>
            <Text 
              style={{
                fontWeight: '500', 
                textAlign: 'center', 
                fontSize: 20, 
                lineHeight: 24,
                flex: 1
              }}
            >
              SwapTem
            </Text>
            
            <View style={{flexDirection: 'row', position: 'absolute', right: 0, marginRight: 5}}>
              <Ionicons size={24} name="ios-options" style={{marginRight: 24}}/>

              <Ionicons size={24} name="ios-search" />

            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default NavBar;

