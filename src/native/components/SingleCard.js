import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity, Dimensions }                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import LikeComponent                                      from './LikeComponent';
import MaterialIcon                                                 from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon                                        from 'react-native-vector-icons/MaterialCommunityIcons';

class SingleCard extends Component {
  render() {
    const { item, currentUserId, locationCoordinates,
            itemHashTags, itemPrice, thumbnailUrl, itemIndex } = this.props; 

    const { height, width } = Dimensions.get('window');

  // itemHashTag: {
  //   fontWeight: '500', 
  //   marginLeft: 5, 
  //   marginBottom: 15, 
  //   flex: 1, 
  //   marginTop: 8
  // },

  // itemPrice: {
  //   fontSize: 14, 
  //   marginLeft: 5, 
  //   marginBottom: 8, 
  //   color: 'rgb(30,30,30)', 
  //   lineHeight: 20
  // }

  // console.log("5555 height", height * 0.28);

  console.log("width", width * 0.148);
  console.log("height", height * 0.028);
    return (
      <React.Fragment>
        {
          itemIndex === 0 ?
            <TouchableOpacity 
              key={item.id}
              onPress={ () => { Actions.singleProduct({ 
                singleProduct: item, 
                locationCoordinates: locationCoordinates,
                userInfo: userInfo
              }) }}
              style={{width: '102%', marginRight: itemIndex % 2 === 1 ? 13 : 0, marginLeft: -9}}
            >
              <View 
                style={{
                  width: '100%', 
                  marginBottom: 10, 
                  marginRight: itemIndex % 2 === 1 ? 10 : 0, 
                  backgroundColor: 'white'
                }}
              >
                <Image 
                  source={{uri: thumbnailUrl}}
                  style={{width: '100%', height: height * 0.28}}
                />

                <LikeComponent 
                  itemId={item.id}
                  itemCartUser={item.CartUser}
                  currentUserId={this.currentUserId}
                />

                <View style={{flexDirection: 'row', position: 'absolute', left: '5%', top: '5%'}}>
                  {
                    item.swap === true ?
                    <View style={{
                      borderRadius: 50,
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: 'black',
                      width: width * 0.19, 
                      alignItems: 'center',
                      height: height * 0.038,
                      marginRight: 10
                    }}>
                      <Text style={{color: 'black', alignSelf: 'center', fontSize: 16, paddingTop:6}}>
                        Swap
                      </Text>
                    </View>
                    : null
                  }

                  {
                    item.sell === true ?
                    <View style={{
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: 'black',
                      backgroundColor: 'white',
                      width: width * 0.19, 
                      alignItems: 'center', 
                      marginRight: 5,
                      height: height * 0.038
                    }}>
                      <Text style={{color: 'black', alignSelf: 'center', fontSize: 16, paddingTop:6}}>
                        Sell
                      </Text>
                    </View>
                    : null
                  }
                </View>

                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 28,
                    color: "#FFFFFF",
                    position: 'absolute',
                    bottom: '25%',
                    left: '5%'
                  }}
                >
                  {itemHashTags.join(" ")}
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    position: 'absolute',
                    left: '5%',
                    bottom: '8%'
                  }}
                >
                  {`$${Number(itemPrice).toFixed(2)}`}
                </Text>
              </View>
            </TouchableOpacity>
          :
          <TouchableOpacity 
            key={item.id}
            onPress={ () => { Actions.singleProduct({ 
              singleProduct: item, 
              locationCoordinates: locationCoordinates,
              userInfo: userInfo
            }) }}
            style={{width: '47%', marginRight: itemIndex % 2 === 1 ? 13 : 0}}
          >
            <View 
              style={{
                width: '100%', 
                marginBottom: 10, 
                marginRight: itemIndex % 2 === 1 ? 10 : 0, 
                backgroundColor: 'white'
              }}
            >
              <Image 
                source={{uri: thumbnailUrl}}
                style={{width: '100%', height: 180}}
              />

              <LikeComponent 
                itemId={item.id}
                itemCartUser={item.CartUser}
                currentUserId={this.currentUserId}
              />

              <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 5}}>
                {
                  item.swap === true ?
                  <View style={{
                    borderRadius: 50,
                    backgroundColor: '#ECEBEB',
                    // borderWidth: 1,
                    // borderColor: 'black',
                    width: width * 0.16, 
                    alignItems: 'center',
                    height: height * 0.03,
                    marginRight: 8
                  }}>
                    <Text style={{color: 'black', alignSelf: 'center', fontSize: 14, paddingTop:4}}>
                      Swap
                    </Text>
                  </View>
                  : null
                }

                {
                  item.sell === true ?
                  <View style={{
                    borderRadius: 50,
                    // borderWidth: 1,
                    // borderColor: 'black',
                    backgroundColor: '#ECEBEB',
                    width: width * 0.16, 
                    alignItems: 'center', 
                    marginRight: 5,
                    height: height * 0.03
                  }}>
                    <Text style={{color: 'black', alignSelf: 'center', fontSize: 14, paddingTop:4}}>
                      Sell
                    </Text>
                  </View>
                  : null
                }
              </View>

              <Text 
                style={{
                  fontWeight: 'bold', 
                  marginLeft: 5, 
                  marginBottom: 18,
                  flex: 1,
                  marginTop: 11, 
                  // width: 160, 
                  color: 'rgba(0, 0, 0, 0.87)', 
                  fontSize: 14
                }}
              >
                {itemHashTags.join(" ")}
              </Text>

              <View style={{flexDirection: 'row'}}>
                <Text 
                  style={{
                    fontSize: 14, 
                    marginLeft: 5, 
                    marginBottom: 16, 
                    color: 'rgb(30,30,30)',
                    lineHeight: 20
                  }}
                >
                  {`$${itemPrice}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        }
        
      </React.Fragment>
    );
  }
}

export default SingleCard;

