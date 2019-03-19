import React, { Component }                                           from 'react';
import get                                                            from 'lodash.get';
import { connect }                                                    from 'react-redux';
import { View, Image, TouchableOpacity, ScrollView, 
         TextInput }                                                  from 'react-native';
import { Container, Content, List, Text }                             from 'native-base';
import { Actions }                                                    from 'react-native-router-flux';
import MaterialIcon                                                   from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon                                          from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon                                                from 'react-native-vector-icons/FontAwesome';
import SingleMySwapItem                                               from './SingleMySwapItem';
import { postOffer }                                                  from '../../actions/registerOfferActions';
import MyItemList                                                     from './MyItemList';

class MySwapItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
      itemSelected: false,
      valueDifference: "",
      selectedItemPrice: [],
      showCreditInputSection: false,
      showRequestCreditInputSection: false,
      creditInput: "0",
      requestCreditInput: "0",
      creditInputError: false,
      creditAdded: false,
      creditRequested: false,
    };

    this.creditBalance = 100.00;
    this.creditInput = 0;
    this.selectedItems = [];
    this.selectedItemPrice = [];
    this.requestCreditInput = 0;
  }

  componentWillMount() {
    const { singleProductDetail } = this.props;
    const swapItemPrice = get(singleProductDetail, "price", 0);

    this.setState({
      valueDifference: Number(swapItemPrice)
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.registerOffer.registeredOffer !== nextProps.registerOffer.registeredOffer) {
      if(nextProps.registerOffer.registeredOffer.headers.status === 200) {
        Actions.singleProduct({offerSent: true});
      }
    }

    if((this.props.selectedItemArray !== nextProps.selectedItemArray) && nextProps.selectedItemArray.length > 0) {
      this.setState({
        itemSelected: true
      })

      this.selectedItems = nextProps.selectedItemArray;

      this.setState({
        selectedItems: nextProps.selectedItemArray
      });
    }
  }

  handleSwapSubmit = () => {
    const { singleProductDetail, postOffer, registerOffer } = this.props;
    const UserName = get(singleProductDetail.User, "username", "");
    const registeredOffer = get(registerOffer, "registeredOffer", {});
    const headers = get(registeredOffer, "headers", {});
    const postStatus = get(headers, "status", "");
    const offereeItemId = get(singleProductDetail, "id", "");
    const offererItemId = this.selectedItems[0];

    const offerRequestObj = {
      offererItemId: offererItemId,
      offereeItemId: offereeItemId,
      tradeType: "swap",
      credit: 0,
      status: 'requested'
    };

    //POST API need to be able to take "requested credit" & "added credit";
    // postOffer(offerRequestObj);

    Actions.offerSubmissionPage({UserName: UserName});
  }

  handleUseButton = () => {
    this.setState({
      showCreditInputSection: !this.state.showCreditInputSection,
      showRequestCreditInputSection: false,
      creditAdded: false
    });
  }

  handleAddCreditButton = () => {
    this.setState({
      creditAdded: true,
      showCreditInputSection: false
    });
  }

  handleRequestCreditSubmitButton = () => {
    this.setState({
      creditRequested: true,
      showRequestCreditInputSection: false
    });
  }

  handleRequestCreditButton = () => {
    this.setState({
      showRequestCreditInputSection: !this.state.showRequestCreditInputSection,
      showCreditInputSection: false,
      creditRequested: false
    });
  }

  handleCreditInputChange = (text) => {
    this.setState({
      creditInput: text.text
    });

    this.creditInput = Number(text.text);

    if(this.creditInput > this.creditBalance) {
      this.setState({
        creditInputError: true
      });

    } else {
      this.setState({
        creditInputError: false
      });
    }
  }

  handleRequestCreditInputChange = (text) => {
    this.setState({
      requestCreditInput: text.text
    });

    this.requestCreditInput = Number(text.text);
  }

  handleDeleteCredit = (deleteType) => {
    if(deleteType === "Credit Requested") {
      this.setState({
        creditRequested: false
      });

    } else if(deleteType === "Credit Added") {
      this.setState({
        creditAdded: false
      });
    }
  }

  handleDeleteSelectedItem = (itemID) => {
    let newSelectedItems = this.selectedItems.filter((item) => {
      return item.itemID !== itemID;
    });

    this.selectedItems = newSelectedItems;

    this.setState({
      selectedItems: newSelectedItems
    });

    if(this.selectedItems.length < 1) {
      this.setState({
        itemSelected: false
      });
    }

  }

  render() {
    const { MyItems, singleProductDetail, itemHashTags, thumbnailUrl, selectedItemArray } = this.props;
    const swapItemPrice = get(singleProductDetail, "price", 0);

    console.log("@@@@@ singleProductDetail", singleProductDetail);

    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content style={{backgroundColor: 'white'}}>
          <View style={{flexDirection: "column", paddingBottom: 2,shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,  
            backgroundColor: 'white'}}
          >
            <View style={{padding: 5, flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: thumbnailUrl}}
                  style={{
                    width: 120, 
                    height: 120,
                    borderRadius: 5
                  }}
                />

                <View style={{flexDirection: 'column', marginTop: 2}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: "#007aff"}}>
                    {itemHashTags.join(" ")}
                  </Text>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 5}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', paddingTop: 3}}>
                      {`$${Number(swapItemPrice).toFixed(2)}`}
                    </Text>

                    <View style={{flexDirection: "row", marginLeft: 10}}>
                      <MaterialCommunityIcon name="coin" size={25} color="#FBDB0A" style={{marginTop: 0, marginRight: 3}}/>
                      <Text style={{fontSize: 16, fontWeight: 'bold', paddingTop: 2}}>
                        100.00
                      </Text>
                    </View>

                  </View>

                  <View style={{flexDirection: 'column', marginTop: 5, flex: 1, marginLeft: 10}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: "#007aff"}}>
                      {"looking for:".toUpperCase()}
                    </Text>
                    <Text style={{fontSize: 16, width: "100%", fontWeight: 'bold', marginTop: 2}}>
                      #notebook #textbook #notes
                    </Text>
                  </View>
                </View>
              </View>              
            </View>
          </View>
          
          <ScrollView 
            style={{flex: 1, flexDirection: 'column'}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: "#007aff", marginTop: 10, padding: 5}}>
                  ** Please press below buttons to send a swap request.
                </Text>

                <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10, alignSelf: 'center'}}>
                  <TouchableOpacity 
                    style={{
                      backgroundColor: (this.state.itemSelected === false && this.selectedItems.length < 1) ? "white" : '#007aff', 
                      borderRadius: 5, 
                      width: '30%', 
                      height: 60, 
                      borderColor: '#007aff', 
                      borderWidth: 1,
                      marginRight: 15
                    }}
                    onPress={(e) => Actions.myItemListPage({ MyItems: MyItems, selectedItems: this.selectedItems })}
                  >
                    <Text 
                      style={{
                        fontSize: 16,
                        color: (this.state.itemSelected === false && this.selectedItems.length < 1) ? '#007aff' : 'white',
                        fontWeight: 'bold', 
                        flex: 1, 
                        textAlign: 'center', 
                        paddingTop: 10, 
                        letterSpacing: 2
                      }}
                    >
                      {(this.state.itemSelected === false && this.selectedItems.length < 1) ? `Add ${"\n"} Items` : `Items ${"\n"} Added`}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: (this.state.creditAdded === false && this.state.creditRequested === false) ? "white" :
                                       (this.state.creditAdded === true && this.state.creditRequested === false) ? '#007aff'
                                       : "rgba(0, 0, 0, 0.12)",
                      borderRadius: 5, 
                      width: '30%', 
                      height: 60,
                      borderColor: (this.state.creditAdded === false && this.state.creditRequested === false) ? "#007aff" :
                                   (this.state.creditAdded === true && this.state.creditRequested === false) ? 'white'
                                   : "rgba(0, 0, 0, 0.12)",
                      borderWidth: 1, 
                      marginRight: 15
                    }}
                    onPress={(e) => this.handleUseButton()}
                    disabled = { this.state.creditRequested === true || this.state.creditAdded === true ? true : false}
                  >
                    <Text 
                      style={{
                        fontSize: 16, 
                        color: (this.state.creditAdded === false && this.state.creditRequested === false) ? "#007aff" :
                               (this.state.creditAdded === true && this.state.creditRequested === false) ? 'white'
                               : "rgba(0, 0, 0, 0.26)",
                        color: this.state.creditAdded === false ? '#007aff' : 'white', 
                        fontWeight: 'bold', 
                        flex: 1, 
                        textAlign: 'center', 
                        paddingTop: 10, 
                        letterSpacing: 2
                      }}>
                      {this.state.creditAdded === false ? `Add ${"\n"} Credit` : `Credit ${"\n"} Added`}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={{
                      backgroundColor: (this.state.creditAdded === false && this.state.creditRequested === false) ? "white" :
                                       (this.state.creditAdded === false && this.state.creditRequested === true) ? '#007aff'
                                       : "rgba(0, 0, 0, 0.12)",
                      borderRadius: 5, 
                      width: '30%', 
                      height: 60, 
                      borderColor: (this.state.creditAdded === false && this.state.creditRequested === false) ? "#007aff" :
                                   (this.state.creditAdded === false && this.state.creditRequested === true) ? 'white'
                                   : "rgba(0, 0, 0, 0.12)",
                      borderWidth: 1, 
                    }}
                    onPress={(e) => this.handleRequestCreditButton()}
                    disabled = { this.state.creditAdded === true || this.state.creditRequested === true ? true : false}
                  >
                    <Text 
                      style={{
                        fontSize: 16, 
                        color: (this.state.creditAdded === false && this.state.creditRequested === false) ? "#007aff" :
                               (this.state.creditAdded === false && this.state.creditRequested === true) ? 'white'
                               : "rgba(0, 0, 0, 0.26)",
                        fontWeight: 'bold', 
                        flex: 1, 
                        textAlign: 'center', 
                        paddingTop: 10, 
                        letterSpacing: 2
                      }}>
                      {this.state.creditRequested === false ? `Request ${"\n"} Credit` : `Credit ${"\n"} Requested`}
                    </Text>
                  </TouchableOpacity>
                </View>
            
                {
                  this.state.showCreditInputSection === true ?
                  <View style={{flexDirection: 'column', marginBottom: 10}}>
                    {
                      this.state.creditInputError === false ?
                        <Text style={{fontSize: 16, color: "#007aff", flex: 1, textAlign: 'center'}}>
                          Please input credit amount you would like to ADD.
                        </Text>
                      :
                        <Text style={{fontSize: 16, color: 'red', flex: 1, textAlign: 'center'}}>
                          Amount you inputted exceeds your credit balance. Please input valid credit amount.
                        </Text>
                    }
                    <View style={{flexDirection: 'row', flex: 1, alignSelf: 'center', marginTop: 10}}>
                      <FontAwesomeIcon
                        name="dollar"
                        size={18}
                        style={{
                          position: "absolute",
                          marginTop: 8,
                          marginLeft: 10
                        }}
                        color="#007aff" 
                      />

                      <TextInput
                        style={{
                          height: 35,
                          color: "#007aff", 
                          fontWeight: 'bold',
                          fontSize: 18,
                          width: 200, 
                          borderWidth: 1,
                          borderColor: "#00529b",
                          borderRadius: 5
                        }}
                        onChangeText={(text) => this.handleCreditInputChange({text})}
                        value={this.state.creditInput}
                        keyboardType="number-pad"
                        paddingLeft={25}
                        textAlignVertical='top'
                        clearButtonMode="while-editing"
                      />

                      <TouchableOpacity 
                        disabled={(this.state.creditInputError === true || this.creditInput <= 0) ? true : false}
                        style={{
                          backgroundColor: (this.state.creditInputError === true || this.creditInput <= 0) ? "rgba(0, 0, 0, 0.12)" : "#007aff", 
                          borderRadius: 5, 
                          width: "20%", 
                          height: 35, 
                          marginLeft: 15
                        }}
                        onPress={(e) => this.handleAddCreditButton()}
                      >
                        <Text 
                          style={{
                            color: (this.state.creditInputError === true || this.creditInput <= 0) ? "rgba(0, 0, 0, 0.26)" : 'white',
                            fontSize: 16, 
                            letterSpacing: 2, 
                            flex: 1, 
                            textAlign: 'center', 
                            fontWeight: 'bold', 
                            paddingTop: 6
                          }}
                        >
                          Add
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  : null
                }

                {
                  this.state.showRequestCreditInputSection === true ?
                  <View style={{flexDirection: 'column', marginBottom: 10}}>
                    <Text style={{fontSize: 16, color: "#007aff", flex: 1, textAlign: 'center'}}>
                      Please input credit amount you would like to REQUEST.
                    </Text>

                    <View style={{flexDirection: 'row', flex: 1, alignSelf: 'center', marginTop: 10}}>
                      <FontAwesomeIcon
                        name="dollar"
                        size={18}
                        style={{
                          position: "absolute",
                          marginTop: 8,
                          marginLeft: 10
                        }}
                        color="#007aff" 
                      />

                      <TextInput
                        style={{
                          height: 35,
                          color: "#007aff", 
                          fontWeight: 'bold',
                          fontSize: 18,
                          width: 200, 
                          borderWidth: 1,
                          borderColor: "#00529b",
                          borderRadius: 5
                        }}
                        onChangeText={(text) => this.handleRequestCreditInputChange({text})}
                        value={this.state.requestCreditInput}
                        keyboardType="number-pad"
                        paddingLeft={25}
                        textAlignVertical='top'
                        clearButtonMode="while-editing"
                      />

                      <TouchableOpacity 
                        disabled={this.requestCreditInput <= 0 ? true : false}
                        style={{
                          backgroundColor: (this.requestCreditInput <= 0) ? "rgba(0, 0, 0, 0.12)" : "#007aff", 
                          borderRadius: 5, 
                          width: "25%", 
                          height: 35, 
                          marginLeft: 15
                        }}
                        onPress={(e) => this.handleRequestCreditSubmitButton()}
                      >
                        <Text 
                          style={{
                            color: (this.requestCreditInput <= 0) ? "rgba(0, 0, 0, 0.26)" : 'white',
                            fontSize: 16, 
                            letterSpacing: 2, 
                            flex: 1, 
                            textAlign: 'center', 
                            fontWeight: 'bold', 
                            paddingTop: 6
                          }}
                        >
                          Request
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  : null
                }

                {
                this.state.creditAdded === true || this.state.creditRequested === true || this.selectedItems.length > 0 ?
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5, marginBottom: 5, letterSpacing: 3}}>
                    {"My Offer".toUpperCase()}
                  </Text>

                  {
                    this.state.itemSelected === true && (!!selectedItemArray && selectedItemArray.length > 0) ?

                    this.state.selectedItems.map((item, index) => {
                      return (
                        <View 
                          style={{flexDirection: 'row'}}
                          key={item.itemID}
                        >
                          <View style={{width: '100%'}}>
                            <SingleMySwapItem
                              itemIndex={index}
                              item={item.item}
                              thumbnailUrl={item.thumbnailUrl}
                              itemPrice={item.itemPrice}
                              itemHashTags={item.itemHashTags}
                              description={item.description}
                              swapItemListType={"Added Items"}
                            />
                          </View>

                          <TouchableOpacity
                            onPress={(e) => this.handleDeleteSelectedItem(item.itemID)}
                            style={{zIndex: 100, position: 'absolute', right: 10}}
                          >
                            <FontAwesomeIcon 
                              name="trash-o"
                              size={25} 
                              color="#717070" 
                              style={{marginTop: 9, marginLeft: 15}} 
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })
                    : null
                  }

                  {
                    this.state.creditAdded === true ?
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
                      <View 
                        style={{
                          borderColor: "#007aff", 
                          borderWidth: 1, 
                          borderRadius: 5, 
                          width: '60%', 
                          height: 50, 
                          alignSelf: 'center',
                          flexDirection: 'row',
                          marginBottom: 10
                        }}
                      >
                        <MaterialCommunityIcon name="coin" size={27} color="#FBDB0A" style={{marginTop: 9, marginRight: -5, marginLeft: 5}} />
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: "#007aff", letterSpacing: 2, flex: 1, textAlign: 'center', paddingTop: 13}}>
                          {`${this.creditInput.toFixed(2)} Credit Added`}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={(e) => this.handleDeleteCredit("Credit Added")}
                      >
                        <FontAwesomeIcon 
                          name="trash-o"
                          size={25} 
                          color="#717070" 
                          style={{marginTop: 9, marginLeft: 15}} 
                        />
                      </TouchableOpacity>
                    </View>
                    : null
                  }

                  {
                    this.state.creditRequested === true ?
                      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
                        <View 
                          style={{
                            borderColor: "#007aff", 
                            borderWidth: 1, 
                            borderRadius: 5, 
                            width: '70%', 
                            height: 50, 
                            alignSelf: 'center',
                            flexDirection: 'row',
                            marginBottom: 10
                          }}
                        >
                          <MaterialCommunityIcon name="coin" size={27} color="#FBDB0A" style={{marginTop: 9, marginRight: -5, marginLeft: 5}} />
                          <Text style={{fontSize: 16, fontWeight: 'bold', color: "#007aff", letterSpacing: 2, flex: 1, textAlign: 'center', paddingTop: 13}}>
                            {`${this.requestCreditInput.toFixed(2)} Credit Requested`}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={(e) => this.handleDeleteCredit("Credit Requested")}
                        >
                          <FontAwesomeIcon 
                            name="trash-o"
                            size={25} 
                            color="#717070" 
                            style={{marginTop: 9, marginLeft: 15}} 
                          />
                        </TouchableOpacity>
                      </View>
                      : null
                    }
                  </View>
                  : null 
                }

                <TouchableOpacity
                  disabled={(this.state.creditAdded === true || 
                             this.state.creditRequested === true || 
                             this.state.itemSelected === true) ? false : true}
                  style={{
                    backgroundColor: (this.state.creditAdded === true || 
                             this.state.creditRequested === true || 
                             this.state.itemSelected === true) ? '#00529b' : "rgba(0, 0, 0, 0.26)",
                    borderRadius: 5, 
                    width: '60%', 
                    height: 45, 
                    borderColor: (this.state.creditAdded === true || 
                             this.state.creditRequested === true || 
                             this.state.itemSelected === true) ? '#00529b' : "rgba(0, 0, 0, 0.26)", 
                    borderWidth: 1,
                    alignSelf: 'center',
                    marginTop: "8%"
                  }}
                  onPress={(e) => this.handleSwapSubmit()}
                >
                  <Text 
                    style={{
                      fontSize: 16, 
                      color: 'white',
                      color: (this.state.creditAdded === true || 
                             this.state.creditRequested === true || 
                             this.state.itemSelected === true) ? 'white' : "rgba(0, 0, 0, 0.26)",
                      fontWeight: 'bold', 
                      flex: 1, 
                      textAlign: 'center', 
                      paddingTop: 10, 
                      letterSpacing: 2
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  registerOffer: state.registerOffer
});

const mapDispatchToProps = {
  postOffer: postOffer
};

export default connect(mapStateToProps, mapDispatchToProps)(MySwapItems);

