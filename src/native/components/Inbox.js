import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
// import { connect }                                     from 'react-redux';
import { inboxItem }                                      from '../data/sampleInboxData';
import styles                                             from '../styles/InboxStyles';

class InboxPage extends Component {

  render() {
    return (
      <Container>
        <Content style={styles.contentSection}>
          <List>
            <View style={styles.contentViewSection}>
              {
                inboxItem.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={ () => { Actions.chatRoom({ inboxItem: item }) }}
                      key={index}
                    >
                      <View style={styles.singleMessageContainer}>
                        <View style={styles.itemPic} />
                        <View style={styles.singleMessageContent}>
                          <Text style={styles.userName}>{item.name}</Text>
                          <Text numberOfLines={1} style={styles.productName}>
                            {item.productName}
                          </Text>
                          <Text style={styles.hourText}>{item.hour} hours ago</Text>
                        </View>

                        <View style={styles.userHeadshot} />
                      </View>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
          </List>
        </Content>
      </Container>
    );
  }
}

export default InboxPage;

