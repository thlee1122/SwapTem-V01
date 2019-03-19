import React, { Component }                                           from 'react';
import get                                                            from 'lodash.get';
import { connect }                                                    from 'react-redux';
import { View, Image, TouchableOpacity, ScrollView, 
         TextInput }                                                  from 'react-native';
import { Container, Content, List, Text }                             from 'native-base';
import { Actions }                                                    from 'react-native-router-flux';
import MaterialIcon                                                   from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon                                                from 'react-native-vector-icons/FontAwesome';
import SingleMySwapItem                                               from './SingleMySwapItem';
import { postOffer }                                                  from '../../actions/registerOfferActions';

class MySwapItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemSelected: false,
      valueDifference: "",
      selectedItemPrice: [],

      showCreditInputSection: false,
      creditInput: "0",

      creditInputError: false
    };

    this.creditBalance = 40.00;
    this.creditInput = 0;
    this.selectedItems = [];
    this.selectedItemPrice = [];
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
  }

  handleItemSelection = (itemID, selectedFlag, selectedItemPrice, itemIndex, itemHashTags) => {
    const { singleProductDetail } = this.props;
    const swapItemPrice = get(singleProductDetail, "price", 0);
    let newSelectedItemPrice = selectedItemPrice + "-" + itemIndex;
    let newItemHashTags = itemHashTags.join(" ");

    this.setState({
      itemSelected: !this.state.itemSelected
    });

    if(selectedFlag === true) {
      this.addSelectedItemID(itemID, newSelectedItemPrice, newItemHashTags);

    } else if(selectedFlag === false) {
      this.deleteSelectedItemID(itemID, newSelectedItemPrice, newItemHashTags);
    }
  }

  addSelectedItemID = (itemID, newSelectedItemPrice, newItemHashTags) => {
    this.selectedItems.push(itemID);

    this.selectedItemPrice.push({
      itemPrice: newSelectedItemPrice,
      itemHashTags: newItemHashTags
    });

    let selectedItemPriceNumber = Number(newSelectedItemPrice.split("-")[0]);

    this.setState({
      valueDifference: this.state.valueDifference - selectedItemPriceNumber,
      selectedItemPrice: this.selectedItemPrice
    });
  }

  deleteSelectedItemID = (itemID, newSelectedItemPrice) => {
    this.selectedItems = this.selectedItems.filter((id) => {
      return id !== itemID;
    });

    this.selectedItemPrice = this.selectedItemPrice.filter((item) => {
      return item.itemPrice !== newSelectedItemPrice
    });

    let selectedItemPriceNumber = Number(newSelectedItemPrice.split("-")[0]);

    this.setState({
      valueDifference: this.state.valueDifference + selectedItemPriceNumber,
      selectedItemPrice: this.selectedItemPrice
    });
  }

  displayCalculation = () => {
    const { singleProductDetail } = this.props;
    const swapItemPrice = get(singleProductDetail, "price", 0);
    let totalValueDifference = this.state.valueDifference - this.state.creditInput;


    return (
      <View>
        <View style={{marginTop: 15, flexDirection: 'column', width: "85%"}}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: "#696969"}}>
            {'Summary'.toUpperCase()}
          </Text>

          <View style={{flexDirection: 'column', alignItems: 'stretch'}}>
            <Text style={{marginTop: 5, fontSize: 14, color: "#696969", textAlign: 'right'}}>
              {'Swap Item Price'.toUpperCase()} : {`$${Number(swapItemPrice).toFixed(2)}`}
            </Text>

            {
              Number(this.state.creditInput) > 0 ?
              <Text style={{fontSize:14, color: "#696969", textAlign: 'right', marginTop: 5}}>
                {`- Credit : $${Number(this.state.creditInput).toFixed(2)}`}
              </Text>
              : null
            }

            {
              this.state.selectedItemPrice.map((item, index) => {
                let newItemPrice = Number(item.itemPrice.split("-")[0]);

                return (
                  <Text key={index} style={{fontSize:14, color: "#696969", textAlign: 'right', marginTop: 5}}>
                    {`${"- Item".toUpperCase()} ${index+1} (${item.itemHashTags}) : $${newItemPrice.toFixed(2)}`}
                  </Text>
                );
              })
            }

            <View
              style={{
                marginTop: 10,
                borderBottomColor: '#696969',
                borderBottomWidth: 1,
                width: '75%',
                alignSelf: 'flex-end'
              }}
            />
            
            <Text 
              style={{
                fontWeight: 'bold', 
                color: this.state.valueDifference < 0 ? 'red' : '#007aff',
                marginTop: 10, 
                fontSize: 14, 
                textAlign: 'right'
              }}>
              {/* {`${"Value Difference".toUpperCase()}: $${this.state.valueDifference.toFixed(2)}`} */}
              {`${"Value Difference".toUpperCase()}: $${totalValueDifference.toFixed(2)}`}
            </Text>          
          </View>
        </View>

        {
          this.state.valueDifference < 0 ?
          <Text style={{fontSize: 14, color: 'red', textAlign: 'center', marginTop: 10}}>
            Your value is higher than swap item value.
          </Text>
          : null
        }
      </View>
    );
  }

  handleSwapSubmit = () => {
    const { singleProductDetail, postOffer, registerOffer } = this.props;
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

    // postOffer(offerRequestObj);

    postOffer(offerRequestObj)
    // .then((res) => {
        
    //     console.log(res);
    //     console.log("#### insdie handleSwapSubmit postStatus", postStatus);
    //   })

    // console.log("#### inside handleSwapSubmit offereeItemId", offereeItemId);
    // console.log("#### inside handleSwapSubmit this.selectedItems", this.selectedItems[0]);    
  }

  handleUseButton = () => {
    this.setState({
      showCreditInputSection: !this.state.showCreditInputSection
    });
  }

  handleCreditInputChange = (text) => {
    this.setState({
      creditInput: text.text
    });

    this.creditInput = Number(text.text);

    // this.setState({
    //   valueDifference: this.state.valueDifference - this.creditInput
    // });

    console.log("$$$$$$ this.creditInput", this.creditInput);
    console.log("$$$$$$ this.creditInput typeof", typeof this.creditInput);

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

  render() {
    const { MyItems, singleProductDetail, itemHashTags } = this.props;
    // const swapItemDescription = get(singleProductDetail.spec, "description", "");
    const swapItemPrice = get(singleProductDetail, "price", 0);

    console.log("%%%%%%%% inside MySwapItems", this.props);

    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content style={{backgroundColor: 'white'}}>
          <View style={{flexDirection: "column", paddingBottom: 10}}>
            <View style={{padding: 5, flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {itemHashTags.join(" ")}
                </Text>

                <Text style={{fontSize: 16, color: "#696969", fontWeight: 'bold', paddingTop: 3, marginLeft: 10}}>
                  {`$${Number(swapItemPrice).toFixed(2)}`}
                </Text>
              </View>

              {/* Instead of swap item description, display what the seller is looking for */}
              <View style={{flexDirection: 'row', marginTop: 10, flex: 1}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: "#007aff"}}>
                  {"looking for:".toUpperCase()}
                </Text>
                <Text style={{fontSize: 16, marginLeft: 5, width: "70%", color: "#696969", fontWeight: 'bold'}}>
                  #notebook #textbook #notes
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: "#007aff"}}>
                  {"Your credit balance:".toUpperCase()}
                </Text>

                <Text style={{fontSize: 16, marginLeft: 5, color: "#696969", fontWeight: 'bold'}}>
                  {`$${this.creditBalance.toFixed(2)}`}
                </Text>
              </View>

              <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
                <TouchableOpacity 
                  style={{backgroundColor: "#007aff", borderRadius: 5, width: 150, height: 30, marginRight: 20}}
                  onPress={(e) => this.handleUseButton()}
                >
                  <Text style={{fontSize: 16, color: 'white', flex: 1, textAlign: 'center', fontWeight: 'bold', paddingTop: 4}}>
                    {"Use".toUpperCase()}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{backgroundColor: "#007aff", borderRadius: 5, width: 150, height: 30}}>
                  <Text style={{fontSize: 16, color: 'white', flex: 1, textAlign: 'center', fontWeight: 'bold', paddingTop: 4}}>
                    {"Recharge".toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>

              {
                this.state.showCreditInputSection === true ?
                <View style={{flexDirection: 'column'}}>
                  {
                    this.state.creditInputError === false ?
                      <Text style={{fontSize: 16, color: "#007aff", marginTop: 10, flex: 1, textAlign: 'center'}}>
                        Please input credit amount you would like to use.
                      </Text>
                    :
                      <Text style={{fontSize: 16, color: 'red', marginTop: 10, flex: 1, textAlign: 'center'}}>
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
                  </View>
                </View>
                : null
              }

              {
                this.selectedItems.length > 0 || 
                (this.state.creditInputError === false && Number(this.state.creditInput) > 0) ?
                  this.displayCalculation()
                : null
              }
              
            </View>
            {
              this.selectedItems.length > 0 ?
              <TouchableOpacity
                style={{
                  width: 300, 
                  backgroundColor: "#007aff", 
                  height: 40, 
                  borderRadius: 5, 
                  marginTop: 10, 
                  marginBottom: 5,
                  alignSelf: 'center'}}

                onPress={(e) => this.handleSwapSubmit()}
              >
                <Text 
                  style={{
                    fontSize: 18, 
                    color: 'white', 
                    flex: 1, 
                    textAlign: 'center',
                    marginTop: 8, 
                    marginBottom: 8,
                    fontWeight: 'bold'
                }}>
                  {"Submit".toUpperCase()}
                </Text>
              </TouchableOpacity>
              : null
            }
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
                      itemSelected={this.state.itemSelected}
                      thumbnailUrl={thumbnailUrl}
                      itemPrice={itemPrice}
                      itemHashTags={itemHashTags}
                      description={description}
                      handleItemSelection={this.handleItemSelection}
                    />
                  );
                })
              }
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

