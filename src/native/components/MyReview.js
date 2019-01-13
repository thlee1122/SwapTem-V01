import React, { Component }                               from 'react';
import get                                              from 'lodash.get';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import FontAwesomeIcon                                  from 'react-native-vector-icons/FontAwesome';
import MaterialIcon                                     from 'react-native-vector-icons/MaterialIcons';
import StarRating                                       from 'react-native-star-rating';

// import styles                                             from '../styles/InboxStyles';

class MyReview extends Component {

  render() {
    const { MyReviews } = this.props;
    const { name } = this.props.userInfo;
    // const name = get(User, "name", "");

    console.log("@@@@@", this.props);

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <View style={{marginTop: 15}}>
            <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', marginLeft: 10}}>
              <View 
                style={{ width: 85, 
                    height: 85, 
                    backgroundColor:'#959595',
                    borderRadius: 50 }}
              />
            </View>
            
            <View 
              style={{
                flex: 1, 
                flexDirection: 'column', 
                alignSelf: 'center', 
                marginLeft: 10, 
                alignItems: 'center', 
                marginTop: 10
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>{name}</Text>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                <Text style={{color: '#656464'}}>Confirmed</Text>
                <FontAwesomeIcon name="facebook-f" size={20} color='#656464' style={{marginRight: 8, marginLeft: 8}}/>
                <MaterialIcon name="email" size={20} color='#656464' style={{marginRight: 8}}/>
                <MaterialIcon name="smartphone" size={20} color='#656464' />
              </View>
              
              <Text style={{fontWeight: 'bold', marginBottom: 3}}>Software Developer @Gartner</Text>
              <Text>Fashion addict & notorious shoe connossieur</Text>

              <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', marginTop: 15}}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={5}
                  fullStarColor="#FBDB0A"
                  starSize={20}
                  containerStyle={{width: 120}}
                />
                <Text style={{fontWeight: 'bold', color: '#00529b', fontSize: 15, textAlign: 'center', marginLeft: 10}}>
                  {MyReviews.length}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              borderBottomColor: '#EDEBEB',
              borderBottomWidth: 1,
              width: '98%',
              marginLeft: 5
            }}
          />

          <View>
            {
              MyReviews.map((review) => {
                // const singleReview = review.Writer;
                const reviewContext = review.text;
                const rating = (review.rating / 10);
                const date = review.createdAt.split("T")[0];
                const tempTime = (review.createdAt.split("T")[1]).substring(0,5);
                const tempHour = tempTime.substring(0,2);
                const minute = tempTime.substring(3);
                const hour = tempHour > 12 ? tempHour - 12 : tempHour;
                const amPM = tempHour > 12 ? "PM" : "AM";
                const newDate = `${date} ${hour}:${minute} ${amPM}`;

                return (
                  <View 
                    key={review.id}
                    style={{marginTop: 10, marginBottom: 15}}
                  >
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                      <View 
                        style={{ 
                          width: 50, 
                          height: 50, 
                          backgroundColor:'#959595',
                          borderRadius: 50,
                          marginTop: 10
                        }}
                      />

                      <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                        <Text style={{fontWeight: 'bold', marginBottom: 4, width: 290}}>{review.TargetId}</Text>
                        <Text style={{fontSize: 15, color: '#656464'}}>
                          {newDate}
                        </Text>

                        <View style={{flexDirection: 'row'}}>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={rating}
                            fullStarColor="#FBDB0A"
                            starSize={20}
                            containerStyle={{
                              width: 120,
                              marginTop: 10
                            }}
                          />
                          <Text 
                            style={{
                              marginLeft: 15, 
                              fontSize: 15, 
                              color: "#00529b", 
                              fontWeight: 'bold', 
                              paddingTop: 10
                            }}>
                            {rating}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <Text style={{marginLeft: 70, marginTop: 10, lineHeight: 22}}>
                      {reviewContext}
                    </Text>
                  </View>
                );
              })
            }
          </View>
        </Content>
      </Container>
    );
  }
}

export default MyReview;

