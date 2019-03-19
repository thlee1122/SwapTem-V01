import React, { Component }                                           from 'react';
import { View, Image, TouchableOpacity, ScrollView}                   from 'react-native';
import { Container, Content, List, Text }                             from 'native-base';
import { Actions }                                                    from 'react-native-router-flux';
import SingleMySwapItem                                               from './SingleMySwapItem';

class MyItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemSelected: false,
    }

    this.selectedItemsArray = [];
  }

  componentWillMount() {
    const { selectedItems } = this.props;

    if(selectedItems.length > 0) {
      this.selectedItemsArray = selectedItems;
    }
  }

  handleSingleItemSelection = (currentSingleItem, itemID, selectedFlag) => {
    if(selectedFlag === true) {
      this.setState({
        itemSelected: true
      });

      this.selectedItemsArray.push(currentSingleItem);

    } else if(selectedFlag === false) {
      this.setState({
        itemSelected: false
      });

      this.selectedItemsArray = this.selectedItemsArray.filter((item) => {
        return item.itemID !== itemID;
      });
    }
  }

  handleSelectItems = () => {
    Actions.mySwapItemsPage({ 
      selectedItemArray: this.selectedItemsArray
    });
  }
  
  render() {
    const { MyItems, selectedItems } = this.props;

    return (            
      <Container style={{backgroundColor: 'white'}}>
        <Content>
          <View style={{flexDirection: 'column', marginBottom: 15}}>
            <Text style={{fontSize: 16, paddingLeft: 5, paddingRight: 5, flex: 1, color: "#007aff", letterSpacing: 2, marginTop: 10}}>
              ** Please choose one or more items that you would like to swap.
            </Text>
          </View>

          {
            MyItems.map((item, index) => {
              const hashTags = item.HashTags;
              const sampleThumbNail = "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjTwN2zz4XgAhVCh-AKHckgCX0QjRx6BAgBEAU&url=https%3A%2F%2Flearn.getgrav.org%2Fcontent%2Fmedia&psig=AOvVaw2epXslG8dMtx3SCAPV84yj&ust=1548391879380457";
              let thumbnailUrl = "";
              const Files = item.Files;
              const description = item.spec.description;

              if(Files.length > 0) {
                thumbnailUrl = `https://s3.us-east-2.amazonaws.com/swaptem/${item.Files[0].thumbPath}`;
              } else {
                thumbnailUrl = sampleThumbNail;
              }

              let itemPrice = Number(item.price).toFixed(2);
              let itemHashTags = [];
              
              for(let i = 0; i < hashTags.length; i++) {
                let text = `#${hashTags[i].text}`;
                itemHashTags.push(text);
              }

              return (
                <SingleMySwapItem
                  itemIndex={index}
                  key={item.id}
                  item={item}
                  thumbnailUrl={thumbnailUrl}
                  itemPrice={itemPrice}
                  itemHashTags={itemHashTags}
                  description={description}
                  handleSingleItemSelection={this.handleSingleItemSelection}
                  swapItemListType={"Not Added Items"}
                  selectedItems={selectedItems}
                />
              );
            })
          }

          <TouchableOpacity
            disabled={(this.selectedItemsArray.length < 1) ? true : false}
            style={{
              backgroundColor: (this.selectedItemsArray.length < 1) ? "rgba(0, 0, 0, 0.12)" : '#00529b', 
              borderRadius: 5, 
              width: '60%', 
              height: 45, 
              borderColor: (this.selectedItemsArray.length < 1) ? "rgba(0, 0, 0, 0.12)" : '#00529b',
              borderWidth: 1,
              alignSelf: 'center',
              marginTop: "8%"
            }}
            onPress={(e) => this.handleSelectItems()}
          >
            <Text 
              style={{
                fontSize: 16,
                color: (this.selectedItemsArray.length < 1) ? "rgba(0, 0, 0, 0.26)" : 'white', 
                fontWeight: 'bold', 
                flex: 1, 
                textAlign: 'center', 
                paddingTop: 10, 
                letterSpacing: 2
              }}
            >
              Select Items
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default MyItemList;

