import React, { Component }                               from 'react';
import get                                              from 'lodash.get';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
// import FontAwesomeIcon                                  from 'react-native-vector-icons/FontAwesome';
import MaterialIcon                                     from 'react-native-vector-icons/MaterialIcons';
import StarRating                                       from 'react-native-star-rating';
import LikeComponent      from './LikeComponent';

// import styles                                             from '../styles/InboxStyles';

class LikedItems extends Component {

  render() {
    const { userInfo } = this.props;
    const CartItem = get(userInfo, "CartItem", []);
    // const name = get(User, "name", "");

    console.log("@@@ likedItems", userInfo);
    console.log("@@@ cartItem", CartItem);

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <View style={{flex: 1, flexDirection: 'column', marginLeft: 20, marginTop: 15}}>
            <View 
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                marginBottom: 10
              }}
            >
              {
                CartItem.map((item, index) => {
                  const hashTags = item.HashTags;
                  const thumbnailUrl = `https://s3.us-east-2.amazonaws.com/swaptem/${item.Files[0].thumbPath}`;
                  let itemPrice = Number(item.price).toFixed(2);
                  let itemHashTags = [];
                  let itemDistance = (Number(item.distance) / 1609.344).toFixed(2);
                  let cartUserIdArray = [];

                  // const locationCoordinates = item.User.location.coordinates;

                  // console.log("@@@", hashTags);
                  
                  for(let i = 0; i < hashTags.length; i++) {
                    let text = `#${hashTags[i].text}`;
                    itemHashTags.push(text);
                  }

                  // console.log("!!!! inside mainPage", item);
                  // console.log("!!!! cart User", item.CartUser);

                  // for(let i = 0; i < item.CartUser.length; i++) {
                  //   cartUserIdArray.push((item.CartUser)[i].id);
                  // }

                  // if(cartUserIdArray.indexOf(this.currentUserId)) {
                  //   this.setState({
                  //     liked: true
                  //   });

                  // } else {
                  //   this.setState({
                  //     liked: false
                  //   });
                  // }

                  return (
                    <TouchableOpacity
                      style={{marginBottom: 10}}
                      key={item.id}
                      // onPress={ () => { Actions.singleProduct({ singleProduct: item, locationCoordinates: locationCoordinates }) }}
                    >
                    <View 
                      style={{width: '96.5%', marginBottom: 5, marginRight: 5, backgroundColor: 'rgb(250,250,250)'}}
                    >
                      <Image 
                        source={{uri: thumbnailUrl}}
                        style={{width: 164, height: 180, borderRadius: 5}}
                      />

                      {/* <LikeComponent 
                        itemId={item.id}
                        itemCartUser={item.CartUser}
                        currentUserId={this.currentUserId}
                      /> */}

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
        </Content>
      </Container>
    );
  }
}

export default LikedItems;

