import React                                                    from 'react';
import get                                                      from 'lodash.get';
import { View, Image, TouchableOpacity, Dimensions,
         TextInput, FlatList }                                  from 'react-native';
import { Container, Content, List, ListItem, Body, 
         Left, Right, Text, Button, Tabs, Tab, 
         TabHeading, Card, CardItem, ScrollableTab }            from 'native-base';
import { Actions }                                              from 'react-native-router-flux';
import FeatherIcon                                              from 'react-native-vector-icons/Feather';
import MaterialIcon                                             from 'react-native-vector-icons/MaterialIcons';
import styles                                                   from '../styles/ProfileStyles';

class StoreEditPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSingleStandOutItem = (item, itemTitle) => {
    Actions.editStore({ selectedStandoutItem: itemTitle });
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { userItems } = this.props;  

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <View style={{paddingTop: 24, paddingBottom: 24, paddingLeft: 16, paddingRight: 16, flexDirection: 'column'}}>
            <Text style={{fontSize: 18, textAlign: 'center', fontWeight: '500'}}>
              Select a Standout Item
            </Text>

            <FlatList
              style={{borderColor: '#A3A3A2', borderWidth: 1, height: height * 0.715, marginTop: 16}}
              data={userItems}
              keyExtractor={userItem => userItem.id}
              renderItem={({ item }) => {
                let title = "";
                let tempHashTags = [];

                item.HashTags.map((item, index) => {
                  tempHashTags.push(item.text);
                });

                title = tempHashTags.join(" ");
                const thumbnailUrl = `https://s3.us-east-2.amazonaws.com/swaptem/${item.ItemFiles[0].thumbPath}`;

                return (
                  <ListItem style={{marginLeft: 0}}>
                    <TouchableOpacity 
                      style={{flex: 1, flexDirection: 'row'}}
                      onPress={(e) => this.handleSingleStandOutItem(item, title)}
                    >
                      <Image
                        source={{uri: thumbnailUrl}}
                        style={{
                          width: 80,
                          height: 80,
                          marginLeft: 16,
                          marginRight: 16
                        }}
                      />

                      <View style={{flexDirection: 'column', marginTop: 8}}>
                        <Text style={{marginBottom: 16, fontSize: 18, fontWeight: '500'}}>
                          {title}
                        </Text>

                        <Text style={{fontSize: 16, alignSelf: 'flex-start'}}>
                          {`$${item.price}`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </ListItem>
                );
              }}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default StoreEditPage;


