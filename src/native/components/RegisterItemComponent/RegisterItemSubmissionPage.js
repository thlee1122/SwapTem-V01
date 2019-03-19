import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import get                                                from 'lodash.get';
import { Actions }                                        from 'react-native-router-flux';
import MaterialIcon                                     from 'react-native-vector-icons/MaterialIcons';
// import { connect }                                     from 'react-redux';
// import styles                                             from '../styles/InboxStyles';

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

    console.log("#### temp", temp);

    for(let i = 0; i < temp.length; i++) {
      let text = `#${temp[i]}`;
      itemHashTags.push(text);
    }

    console.log("&&&&& itemHashTags", itemHashTags);


    console.log("@@@@@ registerDataObj", registerDataObj);
    console.log("!!!!! files", files);
    console.log("~~~~~ files[0]", files[0]);

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
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center'}}>
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
                // borderWidth: 1
              }}
            />

            <Text style={{fontWeight: '500', fontSize: 18, marginTop: 15, textAlign: 'center'}}>
              {itemHashTags.join(" ")}
            </Text>

            <Text style={{fontSize: 18, marginTop: 5, textAlign: 'center'}}>
              {`$${(itemValue).toFixed(2)} USD`}
            </Text>

          </View>

          {/* <TouchableOpacity 
            style={{
              borderWidth: 1, 
              borderColor: "#00529b", 
              borderRadius: 5, 
              width: 250, 
              height: 45,
              marginTop: 30
            }}
          >
            <Text style={{fontSize: 18, color: "#00529b", letterSpacing: 2, padding: 5, flex: 1, textAlign: 'center', marginTop: 5}}>
              Feature listing
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity 
            style={{
              backgroundColor: '#00529b', 
              borderColor: "#00529b", 
              borderRadius: 5, 
              marginTop: 30,
              width: 250,
              height: 45
            }}
          >
            <Text style={{fontSize: 18, color: "white", letterSpacing: 2, padding: 5, flex: 1, textAlign: 'center', marginTop: 5}}>
              View listing
            </Text>
          </TouchableOpacity>

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

