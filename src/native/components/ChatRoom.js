import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';
import MaterialIcon                                 from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons                       from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
// import { connect } from 'react-redux';


const chatRecommendationPills = [
  "Is the price negotiable?", 
  "I'm interested!",
  "How much is it?",
  "Where can we meet?",
  "I'm not interested"
];


class ChatRoom extends Component {

  constructor(props) {
    super(props);

    this.state = {
      chatTexts: [],
      text: ""
    }
  }

  displayChats = (inboxItem) => {
    const chats = inboxItem.chats;

    return (
      Object.keys(chats).map((key, index) => {
        console.log(chats[key]);
        console.log("!!!!", chats[key].you);
        console.log("@@#@#@#@", key, index);

        return (

          <React.Fragment key={key}>

          {
            chats[key].otherUser !== "" && chats[key].otherUser !== undefined ?
            <View 
              key={`key-${chats[key].otherUser.text}`} 
              style={{marginTop: 10, marginLeft: 10, marginRight: 10}}
            >
              <View style={{flexDirection: 'row'}}>
                <View 
                  style={{
                    // borderWidth: 1,
                    borderRadius: 50,
                    width: 45, 
                    height: 45,
                    backgroundColor: '#959595',
                    marginRight: 10
                  }}
                />

                <View style={{
                  backgroundColor: '#F4F4F4', 
                  paddingLeft: 12, 
                  paddingRight: 12, 
                  paddingTop: 5, 
                  paddingBottom: 5, 
                  borderRadius: 10,
                  flexDirection: 'column'
                }}>
                  <Text style={{fontSize: 16, lineHeight: 22}}>
                    {chats[key].otherUser.text}
                  </Text>

                  {
                    chats[key].otherUser.location !== undefined ?
                    <View style={{flexDirection: 'row', marginTop: 5, marginLeft: -2, marginBottom: 5}}>
                      <MaterialIcon name="location-on" size={15} color="#00529b"/>
                      <Text style={{marginLeft: 5, fontSize: 13, color: "#959595"}}>
                        {chats[key].otherUser.location}
                      </Text>
                    </View>
                    : null
                  }

                  {
                    chats[key].otherUser.receivedTime !== undefined ?
                    <Text style={{marginTop: 5, marginBottom: 5, fontSize: 13, color: "#959595"}}>
                      {chats[key].otherUser.receivedTime}
                    </Text>
                    : null
                  }
                </View>
              </View>
            </View>
            :
            null
          }

            {
              chats[key].you !== "" && chats[key].you !== undefined ?

              <View 
                key={`key-${chats[key].you.text}`}
                style={{
                  marginTop: 10, 
                  marginLeft: 10, 
                  marginRight: 10,
                  backgroundColor: '#F4F4F4',
                  borderRadius: 10,
                  paddingLeft: 12, 
                  paddingRight: 12, 
                  paddingTop: 5, 
                  paddingBottom: 5,
                  flexDirection: 'row',
                  maxWidth: 220,
                  minHeight: 35, 
                  marginLeft: '40%',
                  flexDirection: 'column'
                }}
              >
                <Text style={{fontSize: 16, lineHeight: 22, flex: 1, textAlign: 'center', lineHeight: 22}}>
                  {chats[key].you.text}
                </Text>

                {
                  chats[key].you.receivedTime !== undefined ?
                  <Text style={{marginTop: 5, marginBottom: 5, fontSize: 13, color: "#959595", flex: 1, textAlign: 'right'}}>
                    {chats[key].you.receivedTime}
                  </Text>
                  : null
                }
              </View>

              :
              null
            }
          </React.Fragment>
        )
      })
    );
  }

  handleRecommendationPill = (item) => {
    console.log(item);

    this.setState({
      text: item
    });

    this.state.chatTexts.push(item);
  }

  render() {
    const { inboxItem } = this.props;
    const { productName, productValue } = inboxItem;

    console.log("This is inside Chatroom", inboxItem);

    return (
      <Container>
        <Content style={{backgroundColor: 'white', flex:1}}>
          <View style={{backgroundColor: '#F4F4F4', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
            <View style={{flexDirection: "row"}}>
              <View 
                style={{ 
                  width: 40, 
                  height: 40, 
                  backgroundColor:'#959595',
                  borderRadius: 5,
                  marginRight: 10 }}
              />

              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', marginBottom: 5}}>
                  {productName}
                </Text>

                <Text style={{fontSize: 13, color: '#959595'}}>
                  {`$${(productValue).toFixed(2)} USD`}
                </Text>
              </View>
            </View>
          </View>

          <ScrollView style={{height: 480}}>
            { this.displayChats(inboxItem) }

            {
              
            }

            {
              this.state.text !== "" ?
              <View 
                style={{
                  marginTop: 10, 
                  marginLeft: 10, 
                  marginRight: 10,
                  backgroundColor: '#F4F4F4',
                  borderRadius: 10,
                  paddingLeft: 12, 
                  paddingRight: 12, 
                  paddingTop: 5, 
                  paddingBottom: 5,
                  flexDirection: 'row',
                  maxWidth: 180,
                  minHeight: 35, 
                  marginLeft: '50%',
                  flexDirection: 'column'
                }}
              >
                <Text style={{fontSize: 16, lineHeight: 22, flex: 1, textAlign: 'center', lineHeight: 22}}>
                  {this.state.text}
                </Text>

                {
                  <Text style={{marginTop: 5, marginBottom: 5, fontSize: 13, color: "#959595", flex: 1, textAlign: 'right'}}>
                    Just now
                  </Text>
                }
              </View>
              : null
            }
          </ScrollView>

          <View style={{borderTopWidth: 1, flexDirection: 'column'}}>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                chatRecommendationPills.map((item, index) => {
                  console.log(item);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        paddingBottom: 5,
                        paddingTop: 5,
                        paddingLeft: 15,
                        paddingRight: 15, 
                        borderRadius: 20, 
                        backgroundColor: "#007aff",
                        marginRight: 5,
                        marginLeft: 5,
                        marginBottom: 5, 
                        marginTop: 10,
                      }}
                      onPress={(e) => this.handleRecommendationPill(item)}
                    >
                      <Text style={{color: 'white'}}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              }
            </ScrollView>

            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{
                  height: 40, 
                  borderRadius: 5, 
                  borderColor: 'gray', 
                  borderWidth: 1, 
                  backgroundColor: '#F4F4F4',
                  width: 290,
                  margin: 5
                }}
                placeholder="  Type your message here"
                onChangeText={(text) => this.setState({text})}
              />

              <MaterialIcon name="local-shipping" size={30} color="#00529b" style={{alignSelf: 'center', marginLeft: 5, marginRight: 5}}/>
              <TouchableOpacity style={{alignSelf: 'center'}}>
                <MaterialCommunityIcons name="calendar-blank" size={30} color="#00529b" style={{alignSelf: 'center'}}/>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ChatRoom;

  