import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, TouchableOpacity, Text, PanResponder, FlatList, ListItem} from 'react-native';
import { Container, Content, Tabs, Tab, TabHeading, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
// import { connect } from 'react-redux';
import MaterialIcon                                 from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Swiper from 'react-native-deck-swiper';
import CountDown from 'react-native-countdown-component';
import LottieView from 'lottie-react-native';
import { Dropdown }                                 from 'react-native-material-dropdown';
import styles                                       from '../styles/OfferComponentStyles';
import { cardItem, matchItemList, 
         receivedOffers, pendingOffers, acceptedOffers, allOffers } from '../data/offerComponentData';

class OfferPage extends Component {
	constructor(props) {
    super(props);

    this.state = {
      rightSwipe: false,
      currentIndex: 0,
      allSwiped: false,
      disableSendOfferButton: true,
      remainingCard: cardItem.length,
      ROSectionHeight: 250,
      POSectionHeight: 250,
      AOSectionHeight: 250,
      ROSectionText: "View More",
      POSectionText: "View More",
      AOSectionText: "View More",

      acceptedButtonClicked: true,
      receivedButtonClicked: true,
      pendingButtonClicked: true,

      fullOfferList: allOffers
    };  

    this.swiper = React.createRef();

    this.swapItem = [];

    this.ROSectionExpand = false;
    this.POSectionExpand = false;
    this.AOSectionExpand = false;

    this.shuffleContainer = "";
    this.sizer = "";
    this.shuffle = "";

    this.acceptedButtonClicked = true;
    this.receivedButtonClicked = true;
    this.pendingButtonClicked = true;
  }

  componentDidMount = () => {

    this.shuffleContainer = this.refs.myShuffleContainer;

    // this.shuffle = new Shuffle(this.shuffleContainer, {
    //   itemSelector: this.refs.shuffleItem,
    // });

    console.log(this.shuffleContainer);
    console.log(this.refs.myShuffleContainer);
  }

  renderCard = item => {
    return (
      <View style={styles.card}>
        <Image style={styles.cardImage} />
        <View style={{marginBottom: 20}}>
          <Text style={styles.itemName}>{item.name}</Text>

          { item.matchingProduct === true ?
            <Text style={styles.matchingText}>
              Great, you have matching items!
            </Text>
            :
            null }

          <Text style={styles.valueText}>
            <Text style={{fontWeight: 'bold'}}>Value:</Text> ${(item.value).toFixed(2)} USD
          </Text>

          <View style={styles.cardSubContent}>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcon name="location-on" size={20} color="#00529b"/>
              <Text style={styles.locationText}>
                {item.location}
              </Text>
            </View>

            {
              item.shipping === true ?
              <View style={styles.shippingSection}>
                <MaterialIcon name="local-shipping" size={20} color="#00529b" />
                <Text style={styles.shippingText}>
                  Shipping Available
                </Text>
              </View>
              :
              null
            }
          </View>
        </View>
      </View>
    );
  };

  onSwipedAll = () => {
    this.setState({ allSwiped: true });
  };

  onSwipeRight = (event) => {
    this.setState({
      rightSwipe: true,
    })

    this.refs.modal3.open();
  }

  onSwiped = (cardIndex) => {
    this.currentIndex = cardIndex;

    this.setState({
      remainingCard: this.state.remainingCard - 1,
    })
  }

  sendOfferModalButtonClick = () => {
    this.setState({
      rightSwipe: false
    });

    this.refs.modal3.close();
    this.refs.modal4.open();

    setTimeout(() => {
      this.refs.modal4.close();
    }, 2000);
  }

  handleDropDown = (dropDownName, value) => {
    if(dropDownName === "matchItemDropdown") {
      this.swapItem.push(
        {
          offerItemIndex: this.currentIndex,
          itemName: value
        }
      );

      this.setState({
        disableSendOfferButton: false
      });
    }
  }

  handleViewMore = (sectionName) => {
    if(sectionName === "receivedOfferSection") {
      this.ROSectionExpand = !this.ROSectionExpand;

      if(this.ROSectionExpand === true) {
        this.setState({
          ROSectionHeight: 500,
          ROSectionText: "View Less"
        })
      } else if(this.ROSectionExpand === false) {
        this.setState({
          ROSectionHeight: 250,
          ROSectionText: "View More"
        })
      }

    } else if(sectionName === "pendingOfferSection") {
      this.POSectionExpand = !this.POSectionExpand;

      if(this.POSectionExpand === true) {
        this.setState({
          POSectionHeight: 500,
          POSectionText: "View Less"
        })
      } else if(this.POSectionExpand === false) {
        this.setState({
          POSectionHeight: 250,
          POSectionText: "View More"
        })
      }
    
    } else if(sectionName === "accpetedOfferSection") {
      this.AOSectionExpand = !this.AOSectionExpand;

      if(this.AOSectionExpand === true) {
        this.setState({
          AOSectionHeight: 500,
          AOSectionText: "View Less"
        })
      } else if(this.AOSectionExpand === false) {
        this.setState({
          AOSectionHeight: 250,
          AOSectionText: "View More"
        })
      }
    }
  }

  displayOfferMainPart = (data) => {
    return (
      <View style={styles.offerCardSection}>
        {
          data.map((item, index) => {
            return (
              <TouchableOpacity 
                key={index}
                onPress={ () => { Actions.acceptedSwapProductPage({ swapCard: item }) }}
              >
                <View style={styles.offerSingleCard} key={index}>
                  <Image style={styles.offerCardImage} />

                  <CountDown
                    until={item.countDown}
                    size={12}
                    timeToShow={['H', 'M', 'S']}
                    digitBgColor="#007aff"
                    digitTxtColor="white"
                    style={styles.offerCardCountdown}
                  />

                  <Text style={styles.offerCardName}>
                    {item.name}
                  </Text>

                  { item.matchingProduct === true ?
                    <Text style={styles.offerCardMessage}>
                      Great, you have matching items!
                    </Text>
                    :
                    null }

                  <Text style={styles.offerCardValueText}>
                    <Text style={{fontWeight: 'bold'}}>Value:</Text> ${(item.value).toFixed(2)} USD
                  </Text>

                  <View style={styles.offerCardSubSection}>
                    <View style={styles.offerCardLocationSection}>
                      <MaterialIcon name="location-on" size={12} color="#00529b"/>
                      <Text style={styles.offerCardLocationText}>
                        {item.location}
                      </Text>
                    </View>

                    {
                      item.shipping === true ?
                      <View style={styles.offerCardShippingSection}>
                        <MaterialIcon name="local-shipping" size={12} color="#00529b" />
                        <Text style={styles.offerCardShippingText}>
                          Shipping Available
                        </Text>
                      </View>
                      :
                      null
                    }
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        }
      </View>
    )
  }

  displayAcceptedOffers = (acceptedOffers) => {
    return (
      <React.Fragment>
        <View 
          style={styles.offerAcceptedHeader}>
          <Text style={styles.offerCardHeaderSubText}>** These are the Swap offers that you have accepted.</Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          <View style={{
            height: this.state.AOSectionHeight, 
            overflow: 'hidden',
          }}>
            {this.displayOfferMainPart(acceptedOffers)}
          </View>

          {
            acceptedOffers.length > 2 ?
            <Button 
              style={styles.offerCardButton}
              onPress={(e) => this.handleViewMore("accpetedOfferSection")}
            >
              <Text style={styles.offerCardButtonText}>
                {this.state.ROSectionText}
              </Text>
            </Button>
            :
            null
          }
        </View>
      </React.Fragment>
    );
  }

  newDisplayReceviedOffers = (receivedOffers) => {
    return (
      <View style={{flex: 1}}>
        <View 
          style={styles.offerReceivedHeader}>
          <Text style={styles.offerCardHeaderSubText}>** These are the Swap offers you received from other users.</Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          <View style={{
            height: this.state.ROSectionHeight, 
            overflow: 'hidden',
          }}>
            {this.displayOfferMainPart(receivedOffers)}
          </View>

          {
            receivedOffers.length > 2 ?
            <Button 
              style={styles.offerCardButton}
              onPress={(e) => this.handleViewMore("receivedOfferSection")}
            >
              <Text style={styles.offerCardButtonText}>
                {this.state.ROSectionText}
              </Text>
            </Button>
            :
            null
          }
        </View>
      </View>
    );
  }

  newDisplayPendingOffers = (pendingOffers) => {
    return (
      <React.Fragment>
        <View style={styles.offerReceivedHeader}>
          <Text style={styles.offerCardHeaderSubText}>
            ** These Swap offers are not accepted by other users yet and currently in pending status.
          </Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          <View style={{
            height: this.state.POSectionHeight,
            overflow: 'hidden',
            marginBottom: 5
          }}>
            
            <View style={styles.offerCardSection}>
              {
                receivedOffers.map((item, index) => {
                  return (
                    <View style={styles.offerSingleCard} key={index}>
                      <Image style={styles.offerCardImage} />
                      <Text style={styles.offerCardName}>{item.name}</Text>

                      {
                        item.matchingProduct === true ?
                        <Text style={styles.offerCardMessage}>
                          Great, you have matching items!
                        </Text>
                        :
                        null
                      }

                      <Text style={styles.offerCardValueText}>
                        <Text style={{fontWeight: 'bold'}}>Value:</Text> ${(item.value).toFixed(2)} USD
                      </Text>

                      <View style={styles.offerCardSubSection}>
                        <View style={styles.offerCardLocationSection}>
                          <MaterialIcon name="location-on" size={12} color="#00529b"/>
                          <Text style={styles.offerCardLocationText}>
                            {item.location}
                          </Text>
                        </View>

                        {
                          item.shipping === true ?
                          <View style={styles.offerCardShippingSection}>
                            <MaterialIcon name="local-shipping" size={12} color="#00529b" />
                            <Text style={styles.offerCardShippingText}>
                              Shipping Available
                            </Text>
                          </View>
                          :
                          null
                        }
                      </View>
                    </View>
                  );
                })
              }
            </View>
          </View>

          {
            pendingOffers.length > 2 ?
            <Button 
              style={styles.offerCardButton}
              onPress={(e) => this.handleViewMore("pendingOfferSection")}
            >
              <Text style={styles.offerCardButtonText}>
                {this.state.POSectionText}
              </Text>
            </Button>
            :
            null
          }
        </View>
      </React.Fragment>
    );
  }

  handleFilterButton = (filterType) => {

    if(filterType === "Accepted") {
      this.setState({
        acceptedButtonClicked: !this.state.acceptedButtonClicked
      });

      this.acceptedButtonClicked = !this.acceptedButtonClicked;
      this.filterOfferList("accepted", this.acceptedButtonClicked)

    } else if(filterType === "Received") {
      this.setState({
        receivedButtonClicked: !this.state.receivedButtonClicked
      });

      this.receivedButtonClicked = !this.receivedButtonClicked;
      this.filterOfferList("received", this.receivedButtonClicked);

    } else if(filterType === "Pending") {
      this.setState({
        pendingButtonClicked: !this.state.pendingButtonClicked
      });

      this.pendingButtonClicked = !this.pendingButtonClicked;
      this.filterOfferList("pending", this.pendingButtonClicked);
    }
  }

  filterOfferList = (filterType, filterButtonClicked) => {
    if(filterButtonClicked === false)  {
      let newOfferList = this.state.fullOfferList.filter((child, index) => {

        if(child.type !== filterType ) {
          return child
        }
      })

      this.setState({
        fullOfferList: newOfferList
      });

    } else if(filterButtonClicked === true) {

      let filters = [];

      if(this.acceptedButtonClicked === false) {
        filters.push("accepted");
      }

      if(this.receivedButtonClicked === false) {
        filters.push("received");
      }

      if(this.pendingButtonClicked === false) {
        filters.push("pending");
      }

      let newOfferList = allOffers.filter((child, index) => {
        if(filters.indexOf(child.type) === -1) {
          return child
        }
      })

      this.setState({
        fullOfferList: newOfferList
      });
    }
  }

	render() {

    const filterButtonNames = [
      {name: "Accepted", state: this.state.acceptedButtonClicked}, 
      {name: "Received", state: this.state.receivedButtonClicked},
      {name: "Pending", state: this.state.pendingButtonClicked}, 
    ];

		return (
			<Container>
        <Content style={styles.mainContent}>
          <Tabs style={{height: 630}} locked={true}>
            <Tab
              heading={ 
                <TabHeading>
                  <Text style={styles.offerMainTabText}>Offers</Text>
                </TabHeading>
              }
            >
              <Content>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 10}}>
                  {
                    filterButtonNames.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={(e) => this.handleFilterButton(`${item.name}`)}
                          key={index}
                        >
                          <View 
                            style={item.state === true ? styles.selectedButton : styles.unSelectedButton}
                          >
                            <FeatherIcon 
                              name="check" 
                              size={15} 
                              style={item.state === true ? styles.selectedButtonCheck : styles.unSelectedButtonCheck}
                            />
                            <Text 
                              style={item.state === true ? styles.selectedButtonText : styles.unSelectedButtonText}
                            >
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })
                  }
                </View>

                {
                  <FlatList 
                    data={this.state.fullOfferList}
                    style={{flex: 1}}
                    ref="myShuffleContainer"
                    keyExtractor={(item, index) => (item.id).toString()}
                    renderItem={({item}) => 
                      
                      <TouchableOpacity
                        onPress={ () => { Actions.acceptedSwapProductPage({ swapCard: item }) }}
                        data-groups={`["${item.type}"]`}
                        ref="shuffleItem"
                      >
                        <View style={{
                          borderWidth: 1, 
                          borderRadius: 5, 
                          marginBottom: 10, 
                          width: 350,
                          alignSelf: 'center',
                          borderColor: '#D2D2D2'
                        }}>
                          <View style={{flexDirection: 'row', marginLeft: 0, marginRight: 5}}>
                            
                            <View style={{flexDirection: 'column', margin: 5, flex: 1, maxWidth: 240, alignSelf: 'center'}}>
                              <Text 
                                style={{
                                  fontSize: 13,
                                  fontWeight: 'bold',
                                  color: item.type === "accepted" ? "#007aff" : item.type === "received" ? "#FF9B00" : "#AEABAB"
                                }}>
                                {(item.type).toUpperCase()}
                              </Text>
                              <Text style={styles.offerCardName}>{item.name}</Text>

                              {
                                item.matchingProduct === true ?
                                <Text style={styles.offerCardMessage}>
                                  Great, you have matching items!
                                </Text>
                                :
                                null
                              }

                              <Text style={styles.offerCardValueText}>
                                <Text style={{fontWeight: 'bold'}}>Value:</Text> ${(item.value).toFixed(2)} USD
                              </Text>

                              <View style={styles.offerCardSubSection}>
                                <View style={styles.offerCardLocationSection}>
                                  <MaterialIcon name="location-on" size={15} color="#00529b"/>
                                  <Text style={styles.offerCardLocationText}>
                                    {item.location}
                                  </Text>
                                </View>

                                {
                                  item.shipping === true ?
                                  <View style={styles.offerCardShippingSection}>
                                    <MaterialIcon name="local-shipping" size={15} color="#00529b" />
                                    <Text style={styles.offerCardShippingText}>
                                      Shipping Available
                                    </Text>
                                  </View>
                                  :
                                  null
                                }
                              </View>

                            </View>

                            <CountDown
                              until={item.countDown}
                              size={10}
                              timeToShow={['H', 'M', 'S']}
                              digitBgColor="#007aff"
                              digitTxtColor="white"
                              style={{
                                position: 'absolute',
                                zIndex: 10,
                                right: 5,
                                top: 10
                              }}
                            />
                            <Image style={{minHeight: 110, minWidth: 125, backgroundColor: '#E5E3E3', marginTop: 5, marginBottom: 5}} />

                          </View>

                        </View>
                      </TouchableOpacity>
                    }
                  /> 

                }

              </Content>


              {/* <Content>
                <Tabs locked={true}>
                  <Tab 
                    heading={ 
                      <TabHeading>
                        <Text style={{fontSize: 18}}>Accepted</Text>
                      </TabHeading>
                    }
                  >
                    <Content>
                      { this.displayAcceptedOffers(acceptedOffers) }
                    </Content>
                  </Tab>

                  <Tab 
                    heading={ 
                      <TabHeading>
                        <Text style={{fontSize: 18}}>Received</Text>
                      </TabHeading>
                    }
                  >
                    <Content>
                      { this.newDisplayReceviedOffers(receivedOffers) }
                    </Content>
                  </Tab>

                  <Tab 
                    heading={ 
                      <TabHeading>
                        <Text style={{fontSize: 18}}>Pending</Text>
                      </TabHeading>
                    }
                  >
                    <Content>
                      { this.newDisplayPendingOffers(pendingOffers) }
                    </Content>
                  </Tab>
                </Tabs>
              </Content> */}
            </Tab>

            <Tab 
              heading={ 
                <TabHeading>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.offerMainTabText}>Swap Cards</Text>
                  
                    {
                      this.state.remainingCard > 0 ?
                      <View style={styles.swapCardRemaining}>
                        <Text style={styles.swapCardRemainingNumber}>
                          { this.state.remainingCard }
                        </Text>
                      </View>
                      :
                      null
                    }

                  </View>
                </TabHeading>}
              >
              <Content>
      					<View style={styles.container}>
               		 <Swiper
                    ref={this.swiper}
                    cards={cardItem}
                    renderCard={this.renderCard}
                    onSwipedRight={(e) => this.onSwipeRight(e)}
                    onSwipedAll={this.onSwipedAll}
                    onSwiped={ (cardIndex) => this.onSwiped(cardIndex) }
                    cardIndex={0}
                    backgroundColor={'#4FD0E9'}
                    stackSize={2}
                    cardVerticalMargin={80}
                    showSecondCard={true}
                    verticalSwipe={false}
                    animateCardOpacity={true}
                    overlayLabels={{
                      left: {
                        title: 'NOPE',
                        style: {
                          label: {
                            backgroundColor: 'transparent',
                            borderColor: '#FF4057',
                            color: '#FF4057',
                            borderWidth: 3
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                            marginTop: 30,
                            marginLeft: -30
                          }
                        }
                      },
                      right: {
                        title: 'LIKE',
                        style: {
                          label: {
                            backgroundColor: 'transparent',
                            borderColor: '#007aff',
                            color: '#007aff',
                            borderWidth: 3
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginTop: 30,
                            marginLeft: 30
                          }
                        }
                      },
                    }}
                    cardStyle={{height: 450}}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                  />
                </View>
                
                {
                  this.state.allSwiped === true ?
                  <View style={styles.allSwapCardSwipedSection}>
                    <CountDown
                      until={43200}
                      size={20}
                      timeToShow={['H', 'M', 'S']}
                      digitBgColor="#007aff"
                      digitTxtColor="white"
                      style={{
                        marginBottom: 20
                      }}
                    />

                    <LottieView
                      source={require('../../lottieAnimations/newAnimation.json')}
                      autoPlay
                      loop
                      style={styles.lottieAnimationMedium}
                    />
                    <View style={styles.allSwapCardSwipedTextSection}>
                      <Text style={styles.allSwapCardSwipedTextOne}>
                        We serve you a limited amount of curated <Text style={{fontWeight: 'bold', color: '#007aff'}}>Swap Cards</Text> each day because we believe in quality over quantity.
                      </Text>
                      <Text style={styles.allSwapCardSwipedTextTwo}>
                        However, if you are craving more, you can unlock extras now.
                      </Text>
                    </View>

                    <Button style={styles.allSwapCardSwipedButton}>
                      <Text style={styles.allSwapCardSwipedButtonText}>
                        Unlock an Extra Swap Card
                      </Text>
                    </Button>
                  </View>
                  :
                  null            
                }
       
                <Modal
                  position={"center"}
                  style={styles.likeModalOne}
                  ref={"modal3"}
                  backdropOpacity={0.5}
                >
                  <Text style={styles.likeModalOneTitle}>
                    Would you like to send a Swap offer?
                  </Text>

                  <LottieView
                    source={require('../../lottieAnimations/fireworks.json')}
                    autoPlay
                    loop
                    style={styles.likeModalOneLottie}
                  />

                  <Text style={styles.likeModalOneTextOne}>
                    User is looking for <Text style={{fontWeight: 'bold'}}>Xbox Game CD, Shoes, PlayStation</Text>
                  </Text>

                  <Text style={styles.likeModalOneTextTwo}>
                    Great, You have matching item!
                  </Text>

                  <Dropdown
                    label={"Please choose item"}
                    labelFontSize={13}
                    labelHeight={10}
                    labelPadding={1}
                    baseColor="black"
                    selectedItemColor="#3578e5"
                    data={matchItemList}
                    dropdownPosition={4.2}
                    textColor="#3578e5"
                    containerStyle={styles.selectDropdown}
                    dropdownOffset={{top: 0, left: 0 }}
                    rippleInsets={{top:0, bottom: 0}}
                    onChangeText={(value)=>{this.handleDropDown("matchItemDropdown", value)}}
                  />

                  <Button 
                    style={styles.likeModalOneButton}
                    disabled={this.state.disableSendOfferButton}
                    onPress={(e) => this.sendOfferModalButtonClick()}
                  >
                    <Text style={styles.likeModalOneButtonText}>Send Swap Offer</Text>
                  </Button>
                </Modal>

                <Modal
                  position={'center'}
                  style={styles.likeModalTwo}
                  ref={"modal4"}
                >
                  <Text style={styles.likeModalTwoTitle}>Swap offer sent!</Text>

                  <LottieView
                    source={require('../../lottieAnimations/checked_done_.json')}
                    autoPlay
                    loop
                    style={styles.likeModalTwoLottie}
                  />
                </Modal>
              </Content>
            </Tab>
          </Tabs>
        </Content>
     	</Container>
		);
	}
}

export default OfferPage;

