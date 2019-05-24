import React, { Component }                                         from 'react';
import { View, Image, TouchableOpacity, Dimensions, Text }          from 'react-native';
import { Actions }                                                  from 'react-native-router-flux';
import LikeComponent                                                from './LikeComponent';
import styles                                                       from '../styles/SingleCardStyles';

class SingleCard extends Component {
  render() {
    const { item, currentUserId, locationCoordinates, userInfo,
            itemHashTags, itemPrice, thumbnailUrl, itemIndex } = this.props; 
    const { height, width } = Dimensions.get('window');
  
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
                  backgroundColor: 'white',
                }}
              >
                <Image source={{uri: thumbnailUrl}} style={styles.bigImage} />

                <LikeComponent 
                  itemId={item.id}
                  itemCartUser={item.CartUser}
                  currentUserId={this.currentUserId}
                />

                <View style={styles.bigCardPillSection}>
                  {
                    item.swap === true ?
                    <View style={styles.bigSwapPill}>
                      <Text style={styles.bigPillText}>
                        Swap
                      </Text>
                    </View>
                    : null
                  }

                  {
                    item.sell === true ?
                    <View style={styles.bigSellPill}>
                      <Text style={styles.bigPillText}>
                        Sell
                      </Text>
                    </View>
                    : null
                  }
                </View>

                <Text style={styles.bigHashTagText}>
                  {itemHashTags.join(" ")}
                </Text>

                <Text style={styles.bigItemPriceText}>
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
              <Image source={{uri: thumbnailUrl}} style={styles.smallImage} />

              <LikeComponent 
                itemId={item.id}
                itemCartUser={item.CartUser}
                currentUserId={this.currentUserId}
              />

              <View style={styles.smallPillSection}>
                {
                  item.swap === true ?
                  <View style={styles.smallSwapPill}>
                    <Text style={styles.smallPillText}>
                      Swap
                    </Text>
                  </View>
                  : null
                }

                {
                  item.sell === true ?
                  <View style={styles.smallSellPill}>
                    <Text style={styles.smallPillText}>
                      Sell
                    </Text>
                  </View>
                  : null
                }
              </View>

              <Text style={styles.smallHashTagText}>
                {itemHashTags.join(" ")}
              </Text>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.smallItemPriceText}>
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

