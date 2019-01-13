import React, { Component } from 'react';
import get                                              from 'lodash.get';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons      from 'react-native-vector-icons/Ionicons';
import EntypoIcon   from 'react-native-vector-icons/Entypo';

class AccountSettings extends Component {
  render() {
    const settingCategory = 
      [ { name: "Notifications", 
          iconType: "Ionicons", 
          iconName: "md-notifications" }, 
        // { name: "Credits & Coupons", 
        //   iconType: "Ionicons", 
        //   iconName: "ios-pricetags" }, 
        { name: "Invite Friends", 
          iconType: "MaterialIcon", 
          iconName: "card-giftcard" }, 
        { name: "Payment", 
          iconType: "MaterialIcon", 
          iconName: "payment" }, 
        { name: "Security", 
          iconType: "MaterialIcon", 
          iconName: "security" },
        { name: "Legal", 
          iconType: "Ionicons", 
          iconName: "ios-glasses" },
        { name: "How to use the app", 
          iconType: "Ionicons", 
          iconName: "ios-document" },
        // { name: "Get Help", 
        //   iconType: 'Ionicons', 
        //   iconName: "ios-help-circle" },
        { name: "Rate Us", 
          iconType: "MaterialIcon", 
          iconName: "stars" },
        { name: "Send Feedback", 
          iconType: "Ionicons", 
          iconName: "ios-send" },
        { name: "Logout", 
          iconType: "Entypo", 
          iconName: "log-out" }
      ];

    const { userInfo } = this.props;
    const name = get(userInfo, "name", "");

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <List>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{marginLeft: 20, marginTop: 25}}>
                <Text style={{fontWeight: 'bold', fontSize: 25}}>{name}</Text>
                <TouchableOpacity onPress={Actions.profileHome}>
                  <Text style={{color: "#00529b", marginTop: 10}}>View your account</Text>
                </TouchableOpacity>
              </View>

              <View 
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1, 
                  width: 60, 
                  height: 60, 
                  backgroundColor:'#959595',
                  borderRadius: 50,                  
                  position: 'absolute',
                  right: 20,
                  marginTop: 25
                }}
              />
            </View>

            <View style={{
              display: 'flex', 
              flex: 1, 
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              justifyContent: 'space-between', 
              marginTop: 80, 
              marginLeft: 20, 
              marginRight: 20}}>

              {
                Object.keys(settingCategory).map((key, index) => {
                  let category = settingCategory[key];
                  let categoryName = category.name;
                  let iconType = category.iconType;
                  let iconName = category.iconName;
                  
                  return (
                    <TouchableOpacity key={index} style={{alignItems: 'center', marginBottom: 20}}>
                      {
                        iconType === "MaterialIcon" ?
                          <MaterialIcon name={iconName} size={40}/>
                        : iconType === "Ionicons" ?
                          <Ionicons name={iconName} size={40}/>
                        : iconType === "Entypo" ?
                          <EntypoIcon name={iconName} size={40}/>
                        : <React.Fragment></React.Fragment>
                      }
                      <Text 
                        style={{
                          fontSize: 15, 
                          marginTop: 15, 
                          fontWeight: 'bold',
                          width: 100,
                          textAlign: 'center',
                          marginBottom: 10
                        }}
                      >
                        {categoryName}
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </List>
        </Content>
      </Container>
    );
  }
};

export default AccountSettings;