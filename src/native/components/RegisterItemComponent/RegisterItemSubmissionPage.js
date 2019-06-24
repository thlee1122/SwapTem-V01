import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import get                                                from 'lodash.get';
import MaterialIcon                                     from 'react-native-vector-icons/MaterialIcons';

class RegisterItemSubmissionPage extends Component {
  render() {
    const { registerDataObj } = this.props;
    const files = get(registerDataObj, "files", []);
    const itemTitle = get(registerDataObj, "itemTitle", "");
    const hashTags = get(registerDataObj, "hashTags", []);
    const itemValue = get(registerDataObj, "itemValue", "");

    let temp = "";
    let itemHashTags = [];

    temp = hashTags.filter((item) => {
      return item !== ""
    });

    for(let i = 0; i < temp.length; i++) {
      let text = `${temp[i]}`;
      itemHashTags.push(text);
    }

    const sampleItems = [
      {
        imageUri: "https://icdn2.digitaltrends.com/image/microsoft-surface-laptop-prod-1200x630-c-ar1.91.jpg",
        itemTitle: "Laptop",
        numberOfSearches: 34809
      },
      {
        imageUri: "https://www.lg.com/us/business/images/commercial-display/bd00031541/FRONT-PDP_Zoom_01.jpg",
        itemTitle: "TV",
        numberOfSearches: 28700
      },
      {
        imageUri: "https://www.e-bikesdirect.co.uk/prod_images/l/37056.jpg",
        itemTitle: "Bikes",
        numberOfSearches: 21376
      },
    ];

    return (
      <React.Fragment>
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', marginTop: 50}}>
          <Text style={{fontWeight: '500', fontSize: 20, letterSpacing: 2, marginTop: 20, marginBottom: 10}}>
            {"Congratulations!".toUpperCase()}
          </Text>

          <Text style={{fontSize: 18, letterSpacing: 2}}>
            Your listing has been posted.
          </Text>

          <View style={{flexDirection: 'column', marginTop: 30}}>
            <Image
              source={{uri: files[0]}}
              style={{
                width: 150,
                height: 150,
                alignSelf: 'center'
              }}
            />

            <Text style={{fontWeight: '500', fontSize: 18, marginTop: 15, textAlign: 'center'}}>
              {itemHashTags.join(" ")}
            </Text>

            <Text style={{fontSize: 18, marginTop: 5, textAlign: 'center'}}>
              {`$${(itemValue).toFixed(2)} USD`}
            </Text>
          </View>

          <View style={{alignSelf: 'center', marginTop: 25}}>
            <TouchableOpacity 
              style={{
                flexDirection: 'row', 
                borderWidth: 1,
                borderRadius: 15,
                width: 278,
                height: 58,
                marginBottom: 40,
                borderColor: "black",
                backgroundColor: "white"
              }}
              // onPress={(e) => this.handleContinueButton()}
            >
              <Text 
                style={{
                  fontSize: 14, 
                  fontWeight: 'bold', 
                  lineHeight: 20,
                  flex: 1,
                  textAlign: 'center',
                  marginTop: 18,
                  color: "black"
                }}
              >
                View Listing
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'column', marginTop: 30, marginLeft: 10, marginRight: 10}}>
            
            <Text style={{fontSize: 16, fontWeight: '500', letterSpacing: 1.5, lineHeight: 25, marginBottom: 20}}>
              People around you are looking for these items, got any to sell?
            </Text>

            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              {
                sampleItems.map((item, index) => {
                  return (
                    <View 
                      style={{
                        flexDirection: 'column', 
                        marginRight: index !== 2 ? 15 : 0
                      }}
                      key= {index}
                    >
                      <Image
                        source={{uri: item.imageUri}}
                        style={{
                          width: 120,
                          height: 120,
                          borderWidth: 1
                        }}
                      />

                      <Text style={{fontWeight: '500', fontSize: 16, marginTop: 10, textAlign: 'center'}}>
                        {item.itemTitle}
                      </Text>

                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <MaterialIcon name="search" size={20} color='black' style={{marginRight: 6, marginTop: 5}}/>
                        <Text style={{fontSize: 16, marginTop: 5, textAlign: 'center'}}>
                          {item.numberOfSearches}
                        </Text>
                      </View>
                    </View>
                  );
                })
              }
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

export default RegisterItemSubmissionPage;

