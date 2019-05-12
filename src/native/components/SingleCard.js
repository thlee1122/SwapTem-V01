import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import LikeComponent                                      from './LikeComponent';
import MaterialIcon                                                 from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon                                        from 'react-native-vector-icons/MaterialCommunityIcons';

class SingleCard extends Component {
  render() {
    const { item, currentUserId, locationCoordinates,
            itemHashTags, itemPrice, thumbnailUrl } = this.props; 

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

    return (
      <TouchableOpacity 
        key={item.id}
        onPress={ () => { Actions.singleProduct({ 
          singleProduct: item, 
          locationCoordinates: locationCoordinates,
          userInfo: userInfo
        }) }}
        style={{width: '47%', marginRight: 10}}
      >
        <View 
          style={{width: '100%', marginBottom: 5, marginRight: 5, backgroundColor: 'white'}}
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
    );
  }
}

export default SingleCard;

