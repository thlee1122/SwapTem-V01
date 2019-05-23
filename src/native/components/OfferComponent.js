import React, { Component }                                     from 'react';
import { View, Image, TouchableOpacity, Text, 
         FlatList, Dimensions }                                 from 'react-native';
import { Container, Content, Tabs, Tab, 
         TabHeading, Button }                                   from 'native-base';
import { Actions }                                              from 'react-native-router-flux';
import FeatherIcon                                              from 'react-native-vector-icons/Feather';
import CountDown                                                from 'react-native-countdown-component';
import styles                                                   from '../styles/OfferComponentStyles';
import { allOffers }                                            from '../data/offerComponentData';

class OfferPage extends Component {
	constructor(props) {
    super(props);

    this.fullOfferList = allOffers;
    this.receivedOfferList = [];
    this.pendingOfferList = [];
  }

  componentWillMount() {
    this.receivedOfferList = allOffers.filter((child, index) => {
      if(child.type === "received") {
        return child
      }
    });

    this.pendingOfferList = allOffers.filter((child, index) => {
      if(child.type === "pending") {
        return child
      }
    });
  }

	render() {
    const { height, width } = Dimensions.get('window');

		return (
			<Container>
        <Content style={styles.mainContent}>
          <Tabs 
            style={{height: 725}} 
            tabBarUnderlineStyle={{height:1, backgroundColor: 'black'}}
            tabContainerStyle={{ height: 65 }}
          >
            <Tab
              heading={ 
                <TabHeading style={{backgroundColor: 'white'}} >
                  <Text style={styles.offerMainTabText}>All</Text>
                </TabHeading>
              }
            >
              <Content style={styles.singleOfferContent}>
                {
                  <FlatList 
                    data={this.fullOfferList}
                    keyExtractor={(item, index) => (item.id).toString()}
                    renderItem={({item}) =>
                      
                      <TouchableOpacity
                        onPress={ () => { Actions.acceptedSwapProductPage({ swapCard: item }) }}
                        data-groups={`["${item.type}"]`}
                        style={styles.offerSingleCard}
                      >
                        <View style={{flexDirection: 'row', flex: 1}}>

                          <View style={{padding: 16, width: width * 0.58}}>
                            <View
                              style={{
                                borderRadius: 50,
                                width: 80,
                                height: 25,
                                backgroundColor: item.type === "received" ? "#44D7B6" : "#FFA361"
                              }}
                            >
                              <Text style={styles.pillText}>
                                {item.type === "received" ? "Received" : "Pending"}
                              </Text>
                            </View>
                        
                            <Text style={styles.itemName}>
                              {`${(item.name).substring(0, 20)} ${(item.name).length > 20 ? "..." : ""}`}
                            </Text>

                            <Text style={styles.valueText}>
                              ${(item.value).toFixed(2)} USD
                            </Text>

                            <View style={styles.cardFooter}>
                              <Text style={styles.locationText}>
                                New York, NY
                              </Text>

                              <View style={styles.shippingAvailability}>
                                <FeatherIcon name="box" size={20} color="#A3A3A2" style={{marginRight: 8, marginTop: -2}}/>
                                <Text style={styles.shippingText}>
                                  Available
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View style={styles.cardRightSection}>
                            <CountDown
                              until={item.countDown}
                              size={10}
                              timeToShow={['H', 'M', 'S']}
                              digitStyle={{backgroundColor: '#000', paddingTop: 10}}
                              digitTxtStyle={{color: 'white', fontSize:12}}
                              separatorStyle={{color: 'white'}}
                              style={styles.singleOfferCountDown}
                              showSeparator
                            />
                            <Image style={styles.singleOfferImage} />
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                }
              </Content>
            </Tab>

            <Tab
              heading={ 
                <TabHeading style={{backgroundColor: 'white'}}>
                  <Text style={styles.offerMainTabText}>Received</Text>
                </TabHeading>
              }
            >
              <Content style={styles.singleOfferContent}>
                {
                  <FlatList 
                    data={this.receivedOfferList}
                    keyExtractor={(item, index) => (item.id).toString()}
                    renderItem={({item}) =>
                      
                      <TouchableOpacity
                        onPress={ () => { Actions.acceptedSwapProductPage({ swapCard: item }) }}
                        data-groups={`["${item.type}"]`}
                        style={styles.offerSingleCard}
                      >
                        <View style={{flexDirection: 'row', flex: 1}}>
                          <View style={{padding: 16, width: width * 0.58}}>
                            <View
                              style={{
                                borderRadius: 50,
                                width: 80,
                                height: 25,
                                backgroundColor: item.type === "received" ? "#44D7B6" : "#FFA361"
                              }}
                            >
                              <Text style={styles.pillText}>
                                {item.type === "received" ? "Received" : "Pending"}
                              </Text>
                            </View>
                        
                            <Text style={styles.itemName}>
                              {`${(item.name).substring(0, 20)} ${(item.name).length > 20 ? "..." : ""}`}
                            </Text>

                            <Text style={styles.valueText}>
                              ${(item.value).toFixed(2)} USD
                            </Text>

                            <View style={styles.cardFooter}>
                              <Text style={styles.locationText}>
                                New York, NY
                              </Text>

                              <View style={styles.shippingAvailability}>
                                <FeatherIcon name="box" size={20} color="#A3A3A2" style={{marginRight: 8, marginTop: -2}}/>
                                <Text style={styles.shippingText}>
                                  Available
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View style={styles.cardRightSection}>
                            <CountDown
                              until={item.countDown}
                              size={10}
                              timeToShow={['H', 'M', 'S']}
                              digitStyle={{backgroundColor: '#000', paddingTop: 10}}
                              digitTxtStyle={{color: 'white', fontSize:12}}
                              separatorStyle={{color: 'white'}}
                              style={styles.singleOfferCountDown}
                              showSeparator
                            />
                            <Image style={styles.singleOfferImage} />
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                }
              </Content>
            </Tab>

            <Tab
              heading={ 
                <TabHeading style={{backgroundColor: 'white'}}>
                  <Text style={styles.offerMainTabText}>Pending</Text>
                </TabHeading>
              }
            >
              <Content style={styles.singleOfferContent}>
                {
                  <FlatList 
                    data={this.pendingOfferList}
                    keyExtractor={(item, index) => (item.id).toString()}
                    renderItem={({item}) =>
                      
                      <TouchableOpacity
                        onPress={ () => { Actions.acceptedSwapProductPage({ swapCard: item }) }}
                        data-groups={`["${item.type}"]`}
                        style={styles.offerSingleCard}
                      >
                        <View style={{flexDirection: 'row', flex: 1}}>
                          <View style={{padding: 16, width: width * 0.58}}>
                            <View
                              style={{
                                borderRadius: 50,
                                width: 80,
                                height: 25,
                                backgroundColor: item.type === "received" ? "#44D7B6" : "#FFA361"
                              }}
                            >
                              <Text style={styles.pillText}>
                                {item.type === "received" ? "Received" : "Pending"}
                              </Text>
                            </View>
                        
                            <Text style={styles.itemName}>
                              {`${(item.name).substring(0, 20)} ${(item.name).length > 20 ? "..." : ""}`}
                            </Text>

                            <Text style={styles.valueText}>
                              ${(item.value).toFixed(2)} USD
                            </Text>

                            <View style={styles.cardFooter}>
                              <Text style={styles.locationText}>
                                New York, NY
                              </Text>

                              <View style={styles.shippingAvailability}>
                                <FeatherIcon name="box" size={20} color="#A3A3A2" style={{marginRight: 8, marginTop: -2}}/>
                                <Text style={styles.shippingText}>
                                  Available
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View style={styles.cardRightSection}>
                            <CountDown
                              until={item.countDown}
                              size={10}
                              timeToShow={['H', 'M', 'S']}
                              digitStyle={{backgroundColor: '#000', paddingTop: 10}}
                              digitTxtStyle={{color: 'white', fontSize:12}}
                              separatorStyle={{color: 'white'}}
                              style={styles.singleOfferCountDown}
                              showSeparator
                            />
                            <Image style={styles.singleOfferImage} />
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                }
              </Content>
            </Tab>
          </Tabs>
        </Content>
     	</Container>
		);
	}
}

export default OfferPage;

