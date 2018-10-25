import React from 'react';
import PropTypes from 'prop-types';
import { View, Image} from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';
import CheckCircle                    from '@material-ui/icons/CheckCircle';
import Tooltip                        from '@material-ui/core/Tooltip';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';



class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    following: false,
    reportFlagColor: "white"
  }


  handleFollowButton = () => {
    if(this.state.following === false) {
      this.setState({
        following: true
      });

    } else {
      this.setState({
        following: false 
      });
    }
  }

  handleReportButton = () => {
    //#1D60FD

    // alert("Report button has been clicked");
    if(this.state.reportFlagColor === "white") {
      this.setState({
        reportFlagColor: "#1D60FD"
      });
      Actions.reportItem();
    } else {
      this.setState({
        reportFlagColor: "white"
      });
    }


  }

  render() {
    console.log(this.state);

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <List>
            <View>
              <Content padder>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                  <View 
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1, 
                      width: 80, 
                      height: 80, 
                      backgroundColor:'#959595',
                      borderRadius: 50,
                      // alignSelf: 'center',
                      marginTop: 15,
                      marginLeft: 10
                    }}
                  />
                
                  <View style={{flex: 1, flexDirection: 'column', marginLeft: 20}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      Tae Hoon Lee
                    </Text>

                    <Text style={{marginTop: 10, fontSize: 15}}>
                      Editor Director @Vogue.
                    </Text>

                    <Text style={{fontSize: 15}}>
                      Fashion addict & notorious shoe connossieur.
                    </Text>

                    <View style={{flex: 1, flexDirection: 'row', marginTop: 15}} >
                      <Button style={{backgroundColor: '#00529b', borderRadius: 20, marginRight: 10, width: 100}}>
                        <Text style={{fontSize: 15}}>Message</Text>
                      </Button>

                      {
                        this.state.following === false ?
                        <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 20, width: 100}} onPress={this.handleFollowButton}>
                          <Text style={{color: '#00529b', fontSize: 15, marginLeft: 10}}>Follow</Text>
                        </Button>
                        :
                        <Button style={{backgroundColor: '#00529b', borderWidth: 1, borderColor: '#00529b', borderRadius: 20, width: 100}} onPress={this.handleFollowButton}>
                          <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>Following</Text>
                        </Button>
                      }
                    </View>
                  </View>
                  
                  <MaterialIcon name="settings" size={25} color="#959595" onPress={Actions.myaccount}/>
                </View>

                {/* <View
                  style={{
                    marginTop: 14,
                    borderBottomColor: '#959595',
                    borderBottomWidth: 1,
                  }}
                /> */}

                {/* Profile Product, Follower, Following Numbers START*/}
                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                  <View style={{borderBottomWidth: 1, borderTopWidth: 1, borderRightWidth: 1, borderColor: '#959595', width: 118, height: 60}}>
                    <Text style={{fontSize: 20, fontWeight: "bold", textAlign: 'center', marginTop: 8}}>
                      10
                    </Text>

                    <Text style={{fontSize: 15, textAlign: 'center'}}>
                      Products
                    </Text>
                  </View>

                  <View style={{borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#959595', width: 118, height: 60}}>
                    <Text style={{fontSize: 20, fontWeight: "bold", textAlign: 'center', marginTop: 8}}>
                      2.3K
                    </Text>

                    <Text style={{fontSize: 15, textAlign: 'center'}}>
                      Followers
                    </Text>
                  </View>

                  <View style={{borderBottomWidth: 1, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#959595', width: 118, height: 60}}>
                    <Text style={{fontSize: 20, fontWeight: "bold", textAlign: 'center', marginTop: 8}}>
                      1.2K
                    </Text>

                    <Text style={{fontSize: 15, textAlign: 'center'}}>
                      Following
                    </Text>
                  </View>
                </View>
                {/* Profile Product, Follower, Following Numbers END*/}

                {/* Profile page product feed START */}
                <View>
                  <Tabs>
                    {/* Swap Section START */}
                    <Tab heading={ <TabHeading><Text style={{fontSize: 20}}>Swap</Text></TabHeading>}>
                      <Content >
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <Card style={{height: 300, width: 170}}>
                          <View style={{backgroundColor: '#1D60FD', width: 60, height: 60, position: 'absolute', zIndex: 10, borderRadius: 50}}>
                            <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold', flex: 1, alignSelf: 'center', marginTop: 20}}>Swapped</Text>
                          </View>
                          <Button 
                            style={{
                              position: 'absolute', 
                              zIndex: 10, 
                              marginLeft: 137, 
                              marginTop: 100, 
                              backgroundColor: "transparent"
                            }} 
                            // onPress={() => {
                            //   // this.setModalVisible(!this.state.modalVisible);
                            //   // this.handleReportButton();
                            //   Actions.accountSettings
                            // }}
                            onPress={Actions.accountSettings}
                            onPress={this.handleReportButton}
                          >
                            <MaterialIcon name="flag" size={30} color={this.state.reportFlagColor} />
                          </Button>
                          <FontAwesomeIcon name="heart" size={25} color="#1D60FD" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 170 }}/>
                          <FontAwesomeIcon name="share-alt" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 140 }}/>
                            <CardItem cardBody button style={{flex: 1, flexDirection: 'column'}} onPress={Actions.singleProduct}>
                              <Image 
                                source={{uri: 'https://techcrunch.com/wp-content/uploads/2017/12/apple_imac_pro_002.jpg?w=730&crop=1'}} 
                                style={{height: 100, width: 170, flex: 1}}
                              />
                              
                              <Text style={{fontWeight: 'bold', fontSize: 20}}>Apple</Text>
                              <Text style={{textAlign: 'center'}}>Apple 27" iMac Pro with Retina 5K Display</Text>
                              <Text style={{fontWeight: 'bold'}}>$4,599.00</Text>
                            </CardItem>
                          </Card>

                          <Card style={{height: 300, width: 170, marginLeft: 15}}>
                            <FontAwesomeIcon name="heart" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 170 }}/>
                            <FontAwesomeIcon name="share-alt" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 140 }}/>
                            <CardItem cardBody style={{flex: 1, flexDirection: 'column'}}>
                              <Image 
                                source={{uri: 'https://techcrunch.com/wp-content/uploads/2017/12/apple_imac_pro_002.jpg?w=730&crop=1'}} 
                                style={{height: 100, width: 170, flex: 1}}
                              />
                              <Text style={{fontWeight: 'bold', fontSize: 20}}>Apple</Text>
                              <Text style={{textAlign: 'center'}}>Apple 27" iMac Pro with Retina 5K Display</Text>
                              <Text style={{fontWeight: 'bold'}}>$4,599.00</Text>
                            </CardItem>
                          </Card>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                          <Card style={{height: 300, width: 170}}>
                            <FontAwesomeIcon name="heart" size={25} color="#1D60FD" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 170 }}/>
                            <FontAwesomeIcon name="share-alt" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 140 }}/>
                            <CardItem cardBody style={{flex: 1, flexDirection: 'column'}}>
                              <Image 
                                source={{uri: 'https://techcrunch.com/wp-content/uploads/2017/12/apple_imac_pro_002.jpg?w=730&crop=1'}} 
                                style={{height: 100, width: 170, flex: 1}}
                              />
                              <Text style={{fontWeight: 'bold', fontSize: 20}}>Apple</Text>
                              <Text style={{textAlign: 'center'}}>Apple 27" iMac Pro with Retina 5K Display</Text>
                              <Text style={{fontWeight: 'bold'}}>$4,599.00</Text>
                            </CardItem>
                          </Card>

                          <Card style={{height: 300, width: 170, marginLeft: 15}}>
                            <FontAwesomeIcon name="heart" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 170 }}/>
                            <FontAwesomeIcon name="share-alt" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 140 }}/>
                            <View style={{backgroundColor: '#1D60FD', width: 60, height: 60, position: 'absolute', zIndex: 10, borderRadius: 50}}>
                              <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold', flex: 1, alignSelf: 'center', marginTop: 20}}>Swapped</Text>
                            </View>
                            <CardItem cardBody style={{flex: 1, flexDirection: 'column'}}>
                              <Image 
                                source={{uri: 'https://techcrunch.com/wp-content/uploads/2017/12/apple_imac_pro_002.jpg?w=730&crop=1'}} 
                                style={{height: 100, width: 170, flex: 1}}
                              />
                              <Text style={{fontWeight: 'bold', fontSize: 20}}>Apple</Text>
                              <Text style={{textAlign: 'center'}}>Apple 27" iMac Pro with Retina 5K Display</Text>
                              <Text style={{fontWeight: 'bold'}}>$4,599.00</Text>
                            </CardItem>
                          </Card>
                        </View>


                      </Content>
                    </Tab>
                    {/* Swap Section END */}

                    {/* Sell Section START */}
                    <Tab heading={ <TabHeading><Text style={{fontSize: 20}}>Sell</Text></TabHeading>}>
                      <Content >
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <Card style={{height: 300, width: 170}}>
                            <View style={{backgroundColor: '#1D60FD', width: 60, height: 60, position: 'absolute', zIndex: 10, borderRadius: 50}}>
                              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', flex: 1, alignSelf: 'center', marginTop: 20}}>Sold</Text>
                            </View>
                            <FontAwesomeIcon name="heart" size={25} color="#a1adb5" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 165 }}/>
                            <FontAwesomeIcon name="share-alt" size={25} color="#a1adb5" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 135 }}/>
                            <CardItem cardBody button style={{flex: 1, flexDirection: 'column'}} onPress={() => alert("This is Card Header")}>
                              <Image 
                                source={{uri: 'https://cache.net-a-porter.com/images/products/729009/729009_in_pp.jpg'}} 
                                style={{height: 100, width: 170, flex: 1}}
                              />
                              
                              <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Common Projects</Text>
                              <Text style={{textAlign: 'center'}}>Original Achilles Leather Sneakers</Text>
                              <Text style={{fontWeight: 'bold'}}>$410.00</Text>
                            </CardItem>
                          </Card>

                          <Card style={{height: 300, width: 170}}>
                            <FontAwesomeIcon name="heart" size={25} color="#1D60FD" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 165 }}/>
                            <FontAwesomeIcon name="share-alt" size={25} color="#a1adb5" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 135 }}/>

                            <CardItem cardBody button style={{flex: 1, flexDirection: 'column'}} onPress={() => alert("This is Card Header")}>
                              <Image 
                                source={{uri: 'https://cache.net-a-porter.com/images/products/729009/729009_in_pp.jpg'}} 
                                style={{height: 100, width: 170, flex: 1}}
                              />
                              
                              <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Common Projects</Text>
                              <Text style={{textAlign: 'center'}}>Original Achilles Leather Sneakers</Text>
                              <Text style={{fontWeight: 'bold'}}>$410.00</Text>
                            </CardItem>
                          </Card>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <Card style={{height: 300, width: 170}}>
                            <FontAwesomeIcon name="heart" size={25} color="#a1adb5" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 165 }}/>
                            <FontAwesomeIcon name="share-alt" size={25} color="#a1adb5" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 135 }}/>
                            
                            <CardItem cardBody button style={{flex: 1, flexDirection: 'column'}} onPress={() => alert("This is Card Header")}>
                              <Image 
                                source={{uri: 'https://cache.net-a-porter.com/images/products/729009/729009_in_pp.jpg'}} 
                                style={{height: 100, width: 170, flex: 1}}
                              />
                              
                              <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Common Projects</Text>
                              <Text style={{textAlign: 'center'}}>Original Achilles Leather Sneakers</Text>
                              <Text style={{fontWeight: 'bold'}}>$410.00</Text>
                            </CardItem>
                          </Card>

                          <Card style={{height: 300, width: 170}}>
                            <FontAwesomeIcon name="heart" size={25} color="#a1adb5" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 165 }}/>
                            <FontAwesomeIcon name="share-alt" size={25} color="#a1adb5" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 135 }}/>
                            
                            <CardItem cardBody button style={{flex: 1, flexDirection: 'column'}} onPress={() => alert("This is Card Header")}>
                              <Image 
                                source={{uri: 'https://cache.net-a-porter.com/images/products/729009/729009_in_pp.jpg'}} 
                                style={{height: 100, width: 170, flex: 1}}
                              />
                              
                              <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Common Projects</Text>
                              <Text style={{textAlign: 'center'}}>Original Achilles Leather Sneakers</Text>
                              <Text style={{fontWeight: 'bold'}}>$410.00</Text>
                            </CardItem>
                          </Card>
                        </View>
                      </Content>
                    </Tab>
                  {/* Sell Section END */}
                  </Tabs>
                </View>
                {/* Profile page product feed END */}
              </Content>
              
            </View>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Profile;
