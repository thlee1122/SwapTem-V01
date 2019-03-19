import React from 'react';
import get                                              from 'lodash.get';
import { connect }                                      from 'react-redux';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';
import Header from './Header';
import CheckCircle                    from '@material-ui/icons/CheckCircle';
import Tooltip                        from '@material-ui/core/Tooltip';
import { Actions } from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { getUserInfo }                                  from '../../actions/userInfoActions';
import { getItem }                                      from '../../actions/registerItemActions';
import StarRating                                       from 'react-native-star-rating';

class UserProfile extends React.Component {
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
    const { User } = this.props;
    const name = get(User, "name", "");
    const OthersReviews = get(User, "OthersReviews", []);

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <List>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <View 
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1, 
                  width: 80, 
                  height: 80, 
                  backgroundColor:'#959595',
                  borderRadius: 50,
                  marginTop: 15,
                  marginLeft: 10
                }}
              />
            
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {name}
                </Text>

                <Text style={{marginTop: 10, fontSize: 15}}>
                  Editor Director @Vogue.
                </Text>

                <Text style={{fontSize: 15}}>
                  Fashion addict & notorious shoe connossieur.
                </Text>

                <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={5}
                    fullStarColor="#FBDB0A"
                    starSize={20}
                    containerStyle={{width: 120}}
                  />
                  <Text style={{fontWeight: 'bold', color: '#00529b', fontSize: 15, textAlign: 'center', marginLeft: 10}}>
                    {OthersReviews.length}
                  </Text>
                </View>
              </View>
            </View>

            {/* Profile Product, Follower, Following Numbers START*/}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 20, width: '100%'}}>
              <View style={{
                borderBottomWidth: 1, 
                borderTopWidth: 1, 
                borderRightWidth: 1, 
                borderColor: '#959595', 
                width: "33.33%",
                height: 60}}
              >
                <Text style={{fontSize: 20, fontWeight: "bold", textAlign: 'center', marginTop: 8}}>
                  10
                </Text>

                <Text style={{fontSize: 15, textAlign: 'center'}}>
                  Products
                </Text>
              </View>

              <View style={{borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#959595', width: "33.33%", height: 60}}>
                <Text style={{fontSize: 20, fontWeight: "bold", textAlign: 'center', marginTop: 8}}>
                  Sample
                </Text>

                <Text style={{fontSize: 15, textAlign: 'center'}}>
                  Trades
                </Text>
              </View>

              <TouchableOpacity
                style={{width: "33.33%"}}
                // onPress={ () => { Actions.myReviews({ MyReviews: MyReviews, userInfo: userInfo }) }}
              >
                <View style={{borderBottomWidth: 1, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#959595', height: 60}}>
                  <Text style={{fontSize: 20, fontWeight: "bold", textAlign: 'center', marginTop: 8}}>
                    {OthersReviews.length}
                  </Text>

                  <Text style={{fontSize: 15, textAlign: 'center'}}>
                    Reviews
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* Profile Product, Follower, Following Numbers END*/}

            {/* Profile page product feed START */}
            {/* <View>
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 15}}>
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                  }}
                >
                  {
                    data.map((item, index) => {
                      const hashTags = item.HashTags;
                      const thumbnailUrl = `https://s3.us-east-2.amazonaws.com/swaptem/${item.Files[0].thumbPath}`;
                      let itemPrice = Number(item.price).toFixed(2);
                      let itemHashTags = [];
                      let itemDistance = (Number(item.distance) / 1609.344).toFixed(2);
                      let cartUserIdArray = [];
                      const locationCoordinates = item.User.location.coordinates;
                      
                      for(let i = 0; i < hashTags.length; i++) {
                        let text = `#${hashTags[i].text}`;
                        itemHashTags.push(text);
                      }

                      console.log("#### profile", item, locationCoordinates);

                      return (
                        <TouchableOpacity
                          style={{marginBottom: 10}} 
                          key={item.id}
                          onPress={ () => { Actions.singleProduct({ singleProduct: item, locationCoordinates: locationCoordinates }) }}
                        >
                        <View 
                          style={{width: '96.5%', marginBottom: 5, marginRight: 5, backgroundColor: 'rgb(250,250,250)'}}
                        >
                          <Image 
                            source={{uri: thumbnailUrl}}
                            style={{width: 164, height: 180, borderRadius: 5}}
                          />

                          <View>
                            <View style={{
                              backgroundColor: 'black', 
                              opacity: 0.7, 
                              position: 'absolute', 
                              marginTop: -30, 
                              width: 164, 
                              height:30,
                              flexDirection: 'row'
                            }}>
                              <MaterialIcon name="location-on" size={18} color="white" style={{padding: 6}}/>
                              <Text style={{color: 'white', paddingTop: 7, fontSize: 13, fontWeight: '500'}}>
                                {`${itemDistance} mi.`}
                              </Text>
                            </View>
                          </View>
                          
                          <View style={{flexDirection: 'row', padding: 5}}>
                            {
                              item.spec.sell === true ?
                              <View style={{
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: '#007aff',
                                width: 42, 
                                alignItems: 'center', 
                                marginRight: 5,
                                height: 20
                              }}>
                                <Text style={{color: '#007aff', alignSelf: 'center', fontSize: 13, paddingTop:1}}>
                                  Sell
                                </Text>
                              </View>
                              : null
                            }

                            {
                              item.spec.swap === true ?
                              <View style={{
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: '#007aff',
                                width: 45, 
                                alignItems: 'center',
                                height: 20
                              }}>
                                <Text style={{color: '#007aff', alignSelf: 'center', fontSize: 13, paddingTop:1}}>
                                  Swap
                                </Text>
                              </View>
                              : null
                            }
                          </View>

                          <Text style={{fontWeight: '500', marginLeft: 5, marginBottom: 5, width: 160}}>
                            {itemHashTags.join(" ")}
                          </Text>

                          <Text style={{fontSize: 14, marginLeft: 5, marginBottom: 5, color: 'rgb(30,30,30)'}}>
                            {`$${itemPrice}`}
                          </Text>
                        </View>
                        </TouchableOpacity>
                      );
                    })
                  }
                </View>
              </View>
            </View> */}
            {/* Profile page product feed END */}
          </List>
        </Content>
      </Container>
    );
  }
}

export default UserProfile;

