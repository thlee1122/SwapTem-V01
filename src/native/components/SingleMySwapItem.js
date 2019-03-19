import React, { Component }                                           from 'react';
import { View, Image, TouchableOpacity, ScrollView}                   from 'react-native';
import { Container, Content, List, Text }                             from 'native-base';
import { Actions }                                                    from 'react-native-router-flux';
import MaterialIcon                                                   from 'react-native-vector-icons/MaterialIcons';
// import styles                                             from '../styles/InboxStyles';

class SingleMySwapItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemSelected: false
    };

    this.itemSelected = false;

    this.currentSingleItem = {};
  }

  componentWillMount() {
    const { itemIndex, selectedItems } = this.props;

    if(!!selectedItems && selectedItems.length > 0) {
      selectedItems.map((item, index) => {
        console.log("%%%% inside componentWillMount item", item);

        if(itemIndex === item.itemIndex) {
          this.setState({
            itemSelected: true
          });

          this.itemSelected = true;
        }
      });
    }
  }

  handleItemSelection = (itemID, itemPrice, itemIndex, itemHashTags, description, thumbnailUrl, item, itemSelectedFlag) => {
    const { handleSingleItemSelection } = this.props;

    this.setState({
      itemSelected: !this.state.itemSelected
    });

    this.itemSelected = !this.itemSelected;

    this.currentSingleItem = {
      itemID: itemID,
      itemPrice: itemPrice,
      itemIndex: itemIndex,
      itemHashTags: itemHashTags,
      description: description,
      thumbnailUrl: thumbnailUrl,
      item: item,
      itemSelectedFlag: itemSelectedFlag
      
    };

    handleSingleItemSelection(this.currentSingleItem, itemID, this.itemSelected, 
      itemPrice, itemIndex, itemHashTags, description, thumbnailUrl);

  }

  render() {
    //pass another flag for disabling clicks on the item card.

    const { item, thumbnailUrl, itemPrice, swapItemListType,
            itemHashTags, description, itemIndex, selectedItems } = this.props;

    // console.log("$$$$$$ inside SingleMySwapItem, this.itemSelected", this.itemSelected);
    // console.log("$$$$$$ inside SingleMySwapItem, swapItemListType", swapItemListType);
    // console.log("$$$$$$ inside SingleMySwapItem, this.state.itemSelected", this.state.itemSelected);
    console.log("$$$$$$ inside SingleMySwapItem, selectedItems", selectedItems);

    return (            
      <TouchableOpacity
        disabled={swapItemListType === "Added Items" ? true : false}
        onPress={(e) => this.handleItemSelection(
          item.id, itemPrice, itemIndex, itemHashTags, 
          description, thumbnailUrl, item, this.state.itemSelected
        )}
        style={{
          width: '100%', 
          backgroundColor: 'rgb(250,250,250)', 
          marginBottom: 5,


          // display: this.state.itemSelected === true ? "none" : "flex",

          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 1,  
          backgroundColor: 'white'
        }}
      >
      <View 
        style={{
          borderWidth: this.state.itemSelected === true ? 3 : 0.5,
          borderColor: this.state.itemSelected === true ? "#007aff" : '#696969',
          borderRadius: 5,
          flexDirection: 'row',
        }}
      >
        {
          // this.state.itemSelected === true ?
          swapItemListType === "Not Added Items" && this.state.itemSelected === true ?
          <MaterialIcon 
            name="check-circle" 
            size={35} 
            color="#007aff" 
            style={{
              marginLeft: 5,
              position: "absolute",
              zIndex: 10,
              margin: 5,
              backgroundColor: 'transparent',
              borderRadius: 15
            }}
          />
          : null
        }
        
        <Image 
          source={{uri: thumbnailUrl}}
          style={{width: '40%', height: 140, borderRadius: 5, borderWidth: 1}}
        />

        <View style={{flexDirection: 'column', flex: 1, alignSelf: 'center'}}>
          <View style={{flexDirection: 'row', padding: 10, marginBottom: -10}}>
            {
              item.spec.sell === "true" ?
              <View style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#007aff',
                width: 42, 
                alignItems: 'center', 
                marginRight: 5,
                height: 20,                                
                marginRight: 10
              }}>
                <Text style={{color: '#007aff', alignSelf: 'center', fontSize: 13, paddingTop:1, fontWeight: '500'}}>
                  Sell
                </Text>
              </View>
              : null
            }

            {
              item.spec.swap === "true" ?
              <View style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#007aff',
                width: 50, 
                alignItems: 'center',
                height: 20
              }}>
                <Text style={{color: '#007aff', alignSelf: 'center', fontSize: 13, paddingTop:1, fontWeight: '500'}}>
                  Swap
                </Text>
              </View>
              : null
            }
          </View>

          <Text style={{fontWeight: '500', marginLeft: 5, width: '100%', fontSize: 16, padding: 5}}>
            {itemHashTags.join(" ")}
          </Text>

          <Text style={{fontSize: 14, marginLeft: 5, color: 'rgb(30,30,30)', padding: 5, fontWeight: '500'}}>
            {`$${itemPrice}`}
          </Text>

          <Text style={{fontSize: 14, marginLeft: 5, marginBottom: 5, color: 'rgb(30,30,30)', padding: 5, fontWeight: '500'}}>
            {`${description}`}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}

export default SingleMySwapItem;

