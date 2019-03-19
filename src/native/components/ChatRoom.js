import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get                      from "lodash.get";
import { View, Image, TouchableOpacity, TextInput, ScrollView, Dimensions} from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem, Drawer
} from 'native-base';
import MaterialIcon                                 from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons                       from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import SettingsScreen from './ChatRoomScreens/SettingsScreen';
import SafetyDrawer from './ChatRoomScreens/SafetyDrawer';
// import * as Animatable from 'react-native-animatable';
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
      text: "",

      swapInProgress: false,

      sharingWithTrustedContacts: false
    }

    // this.trustedContactName = [];
  }

  // componentDidMount = () => {
  //   const { selectedContactList } = this.props;

  //   if(!!selectedContactList && Object.keys(selectedContactList).length !== 0) {
  //     selectedContactList.map((item, index) => {
  //       let firstName = item.fullName.split(" ")[0];
  //       this.trustedContactName.push(firstName);
  //     });
  //   }
  // }

  // componentWillMount = () => {
  //   const { selectedContactList } = this.props;

  //   if(!!selectedContactList && Object.keys(selectedContactList).length !== 0) {
  //     selectedContactList.map((item, index) => {
  //       this.trustedContactName.push(item.fullName);
  //     });
  //   }
  // }

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
                  marginRight: 10,
                  backgroundColor: '#F4F4F4',
                  borderRadius: 10,
                  paddingLeft: 12, 
                  paddingRight: 12, 
                  paddingTop: 5, 
                  paddingBottom: 5,
                  flexDirection: 'row',
                  maxWidth: 230,
                  minHeight: 35,
                  alignSelf: 'flex-end',
                  flexDirection: 'column'
                }}
              >
                <Text style={{fontSize: 16, lineHeight: 22, textAlign: 'left', lineHeight: 22}}>
                  {chats[key].you.text}
                </Text>

                {
                  chats[key].you.receivedTime !== undefined ?
                  <Text style={{marginTop: 5, marginBottom: 5, fontSize: 13, color: "#959595", textAlign: 'right'}}>
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

  // displayChatRoomSettings = () => {
  //   this.refs.view.fadeInRight(300);
  // }

  closeDrawer = () => {
    this.drawer._root.close();
  }

  openDrawer = () => {
    this.drawer._root.open()
  }

  closeSafetyDrawer = () => {
    this.safetyDrawer._root.close();
  }

  openSafetyDrawer = () => {
    this.safetyDrawer._root.open();
  }

  render() {
    const { inboxItem } = this.props;
    const { productName, productValue } = inboxItem;
    const { height, width } = Dimensions.get('window');
    const chattingHeight = this.state.swapInProgress === true ? height * 0.58 : height * 0.55;
    const trustedContactSubmitted = get(this.props, "trustedContactSubmitted", false);
    const selectedContactList = get(this.props, "selectedContactList", {});
    const trustedContactName = get(this.props, "trustedContactName", []);

    // if(!!selectedContactList && Object.keys(selectedContactList).length !== 0) {
    //   selectedContactList.map((item, index) => {
    //     let firstName = item.fullName.split(" ")[0];
    //     this.trustedContactName.push(firstName);
    //   });
    // }

    console.log("@@@@@ trustedContactSubmitted", trustedContactSubmitted);
    console.log("@@@@@ selectedContactList", selectedContactList);
    // console.log("@@@@@ this.trustedContactName", this.trustedContactName);

    const drawerStyles = {
      drawer: {},
    };

    return (
      <Drawer
        ref={(ref) => { this.safetyDrawer = ref; }}
        content={<SafetyDrawer closeSafetyDrawer={this.closeSafetyDrawer} trustedContactSubmitted={trustedContactSubmitted}/>}
        side="bottom"
        openDrawerOffset={trustedContactSubmitted === false ? 0.72 : 0.84}
        panCloseMask={0.6}
        closedDrawerOffset={-3}
        // styles={drawerStyles}
        tapToClose={true}
        elevation={1}
      >

      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SettingsScreen closeDrawer={this.closeDrawer}/>}
        side="right"
        openDrawerOffset={0.5}
        type="overlay"
        panCloseMask={0.6}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tapToClose={true}
        elevation={1}
      >
        <Container>
          <Content style={{backgroundColor: 'white', flex:1}}>
            <View style={{height: height * 0.8}}>
              <View style={{backgroundColor: '#F4F4F4', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                <TouchableOpacity
                  style={{position: 'absolute', right:5, marginTop: 5, height: 50}}
                  onPress={()=> this.openDrawer()}
                >
                  <MaterialCommunityIcons 
                    name="dots-vertical" 
                    size={30} 
                    color="black"
                  />
                </TouchableOpacity>

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
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
                      {productName}
                    </Text>

                    <Text style={{fontSize: 13, color: '#959595'}}>
                      {`$${(productValue).toFixed(2)} USD`}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{
                backgroundColor: "#959595", 
                height: this.state.swapInProgress === true ? 40 : 62, 
                paddingLeft: 20, 
                paddingRight: 20, 
                paddingTop: 5, 
                paddingBottom: 5,
                marginBottom: 10
              }}>
                {
                  this.state.swapInProgress === true ?
                  <View style={{flexDirection: 'row'}}>
                    <MaterialIcon name="swap-horiz" size={30} color="#FF9000" style={{marginRight: 5, marginTop: -1}}/>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16, marginTop: 4}}>
                      Swap in progress ...
                    </Text>
                  </View>

                  :

                  <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name="calendar-blank" size={30} color="white" style={{marginRight: 10, marginTop: 4}}/>
                    
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16, marginTop: 4, width: '80%', height: 50}}>
                      Meeting on Feb 26, 2019 Tuesday at 6:00 pm at Starbucks Westwood, NJ
                    </Text>
                  </View>
                }
              </View>

              <ScrollView style={{maxHeight: chattingHeight}}>
                {
                  this.state.swapInProgress === false ?
                  <TouchableOpacity 
                    style={{
                      position: 'absolute', 
                      right: 20, 
                      alignSelf: 'center', 
                      backgroundColor: "#007aff", 
                      borderRadius: 50,
                      zIndex: 1000
                    }}
                    onPress={()=> this.openSafetyDrawer()}
                  >
                    <Feather name="shield" size={28} color="white" style={{padding: 8}}/>
                  </TouchableOpacity>
                  : null
                }


                { this.displayChats(inboxItem) }

                {
                  this.state.text !== "" ?
                  <View>
                    <View 
                      style={{
                        marginTop: 10, 
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
                        position: "absolute",
                        right: 0,
                        flexDirection: 'column'
                      }}
                    >
                      <Text style={{fontSize: 16, lineHeight: 22, flex: 1, textAlign: 'left', lineHeight: 22}}>
                        {this.state.text}
                      </Text>

                      {
                        <Text style={{marginTop: 5, marginBottom: 5, fontSize: 13, color: "#959595", flex: 1, textAlign: 'right'}}>
                          Just now
                        </Text>
                      }
                    </View>
                  </View>
                  : null
                }
              </ScrollView>

              <View style={{flexDirection: 'column', position: 'absolute', bottom: -10, height: 100}}>

                {
                  !!trustedContactSubmitted && trustedContactSubmitted === true ?
                  <View 
                    style={{
                      flexDirection: 'row', 
                      borderWidth: 1,
                      borderColor: "#EAEAEA", 
                      borderRadius: 20,
                      height: 32,
                      width: '95%',
                      alignSelf: 'center',
                      marginBottom: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 20,
                      paddingRight: 20

                    }}
                  >
                    <SimpleLineIcons 
                      name="rocket" 
                      size={15} 
                      color={this.state.sharingWithTrustedContacts === false ? "black" : "#007aff"}
                      style={{marginRight: 10}}
                    />

                    <Text style={{fontWeight: '500'}}>
                      {
                        this.state.sharingWithTrustedContacts === false ?
                          `Share with ${trustedContactName.join(", ")}`
                        :
                          `Sharing with ${trustedContactName.join(", ")}`
                      }
                    </Text>

                    {
                      this.state.sharingWithTrustedContacts === false ?  
                      <TouchableOpacity 
                        style={{position: 'absolute', right: 20}}
                        onPress={()=> this.setState({ sharingWithTrustedContacts: true })}
                      >
                        <Text style={{letterSpacing: 2, color:"#007aff", fontWeight: 'bold', paddingTop: 5}}>
                          Share
                        </Text>
                      </TouchableOpacity>
                      : null
                    }
                  </View>
                  : null
                }

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
                        flex: 1,
                        // width: '86%',
                        margin: 5,
                        marginRight: 10
                      }}
                      placeholder="  Type your message here"
                      onChangeText={(text) => this.setState({text})}
                    />

                    {/* <MaterialIcon name="local-shipping" size={30} color="#00529b" style={{alignSelf: 'center', marginLeft: 5, marginRight: 5}}/> */}
                    
                    {
                      this.state.swapInProgress === true ?
                      <TouchableOpacity 
                        style={{alignSelf: 'center', marginRight: 10}}
                        onPress={(e) => Actions.scheduleMeetupPageTwo()}
                      >
                        <MaterialCommunityIcons name="calendar-blank" size={35} color="#00529b" style={{alignSelf: 'center'}}/>
                      </TouchableOpacity>
                      : null
                    }
                  </View>
                </View>
              </View>
            </View>
          </Content>
        </Container>
      </Drawer>
      </Drawer>
    );
  }
}

export default ChatRoom;

  