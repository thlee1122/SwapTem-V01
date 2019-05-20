import React, { Component }                                     from 'react';
import { View, Image, TouchableOpacity, Text, 
         FlatList, Dimensions }                                 from 'react-native';
import { Container, Content, Tabs, Tab, 
         TabHeading, Button }                                   from 'native-base';
import { Actions }                                              from 'react-native-router-flux';
// import { connect } from 'react-redux';
import FeatherIcon                                              from 'react-native-vector-icons/Feather';
import CountDown                                                from 'react-native-countdown-component';
import styles                                                   from '../styles/OfferComponentStyles';
import {  allOffers }                                           from '../data/offerComponentData';

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
            locked={true} 
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
              <Content style={{backgroundColor: 'rgba(236, 235, 235, 0.5)', padding: 16}}>
                {
                  <FlatList 
                    data={this.fullOfferList}
                    keyExtractor={(item, index) => (item.id).toString()}
                    renderItem={({item}) =>
                      
                      <TouchableOpacity
                        onPress={ () => { Actions.acceptedSwapProductPage({ swapCard: item }) }}
                        data-groups={`["${item.type}"]`}
                        style={{backgroundColor: 'white', height: height * 0.25, marginBottom: 16}}
                      >
                        <View style={{flexDirection: 'row'}}>
                          <View style={{padding: 16, width: '62%'}}>
                            <View
                              style={{
                                borderRadius: 50,
                                width: 80,
                                height: 25,
                                backgroundColor: item.type === "received" ? "#44D7B6" : "#FFA361"
                              }}
                            >
                              <Text style={{color: '#FFFFFF', fontSize: 12, lineHeight: 16, flex: 1, textAlign: 'center', marginTop: 4}}>
                                {item.type === "received" ? "Received" : "Pending"}
                              </Text>
                            </View>
                        
                            <Text 
                              style={{fontWeight: 'bold', fontSize: 26, lineHeight: 32, color: 'black', marginTop: 30}}
                            >
                              {`${(item.name).substring(0, 27)} ${(item.name).length > 27 ? "..." : ""}`}
                            </Text>

                            <Text 
                              style={{fontSize: 16, lineHeight: 20, color: 'black', marginTop: 6}}
                            >
                              ${(item.value).toFixed(2)} USD
                            </Text>

                            <View style={{flexDirection: 'row', marginTop: 28, flex: 1}}>
                              <Text style={{fontSize: 12, lineHeight: 16, color: '#A3A3A2', position: 'absolute', left: 0}}>
                                New York, NY
                              </Text>

                              <View style={{flexDirection: 'row', position: 'absolute', right: 0}}>
                                <FeatherIcon name="box" size={20} color="#A3A3A2" style={{marginRight: 8, marginTop: -2}}/>
                                <Text style={{fontSize: 12, lineHeight: 16, color: '#A3A3A2'}}>
                                  Available
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View>
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
              <Content style={{backgroundColor: 'rgba(236, 235, 235, 0.5)', padding: 16}}>
                {
                  <FlatList 
                    data={this.receivedOfferList}
                    keyExtractor={(item, index) => (item.id).toString()}
                    renderItem={({item}) =>
                      
                      <TouchableOpacity
                        onPress={ () => { Actions.acceptedSwapProductPage({ swapCard: item }) }}
                        data-groups={`["${item.type}"]`}
                        style={{backgroundColor: 'white', height: height * 0.25, marginBottom: 16}}
                      >
                        <View style={{flexDirection: 'row'}}>
                          <View style={{padding: 16, width: '62%'}}>
                            <View
                              style={{
                                borderRadius: 50,
                                width: 80,
                                height: 25,
                                backgroundColor: item.type === "received" ? "#44D7B6" : "#FFA361"
                              }}
                            >
                              <Text style={{color: '#FFFFFF', fontSize: 12, lineHeight: 16, flex: 1, textAlign: 'center', marginTop: 4}}>
                                {item.type === "received" ? "Received" : "Pending"}
                              </Text>
                            </View>
                        
                            <Text 
                              style={{fontWeight: 'bold', fontSize: 26, lineHeight: 32, color: 'black', marginTop: 30}}
                            >
                              {`${(item.name).substring(0, 27)} ${(item.name).length > 27 ? "..." : ""}`}
                            </Text>

                            <Text 
                              style={{fontSize: 16, lineHeight: 20, color: 'black', marginTop: 6}}
                            >
                              ${(item.value).toFixed(2)} USD
                            </Text>

                            <View style={{flexDirection: 'row', marginTop: 28, flex: 1}}>
                              <Text style={{fontSize: 12, lineHeight: 16, color: '#A3A3A2', position: 'absolute', left: 0}}>
                                New York, NY
                              </Text>

                              <View style={{flexDirection: 'row', position: 'absolute', right: 0}}>
                                <FeatherIcon name="box" size={20} color="#A3A3A2" style={{marginRight: 8, marginTop: -2}}/>
                                <Text style={{fontSize: 12, lineHeight: 16, color: '#A3A3A2'}}>
                                  Available
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View>
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
              <Content style={{backgroundColor: 'rgba(236, 235, 235, 0.5)', padding: 16}}>
                {
                  <FlatList 
                    data={this.pendingOfferList}
                    keyExtractor={(item, index) => (item.id).toString()}
                    renderItem={({item}) =>
                      
                      <TouchableOpacity
                        onPress={ () => { Actions.acceptedSwapProductPage({ swapCard: item }) }}
                        data-groups={`["${item.type}"]`}
                        style={{backgroundColor: 'white', height: height * 0.25, marginBottom: 16}}
                      >
                        <View style={{flexDirection: 'row'}}>
                          <View style={{padding: 16, width: '62%'}}>
                            <View
                              style={{
                                borderRadius: 50,
                                width: 80,
                                height: 25,
                                backgroundColor: item.type === "received" ? "#44D7B6" : "#FFA361"
                              }}
                            >
                              <Text style={{color: '#FFFFFF', fontSize: 12, lineHeight: 16, flex: 1, textAlign: 'center', marginTop: 4}}>
                                {item.type === "received" ? "Received" : "Pending"}
                              </Text>
                            </View>
                        
                            <Text 
                              style={{fontWeight: 'bold', fontSize: 26, lineHeight: 32, color: 'black', marginTop: 30}}
                            >
                              {`${(item.name).substring(0, 27)} ${(item.name).length > 27 ? "..." : ""}`}
                            </Text>

                            <Text 
                              style={{fontSize: 16, lineHeight: 20, color: 'black', marginTop: 6}}
                            >
                              ${(item.value).toFixed(2)} USD
                            </Text>

                            <View style={{flexDirection: 'row', marginTop: 28, flex: 1}}>
                              <Text style={{fontSize: 12, lineHeight: 16, color: '#A3A3A2', position: 'absolute', left: 0}}>
                                New York, NY
                              </Text>

                              <View style={{flexDirection: 'row', position: 'absolute', right: 0}}>
                                <FeatherIcon name="box" size={20} color="#A3A3A2" style={{marginRight: 8, marginTop: -2}}/>
                                <Text style={{fontSize: 12, lineHeight: 16, color: '#A3A3A2'}}>
                                  Available
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View>
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

