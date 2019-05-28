import React, { Component }                               from 'react';
import get                                              from 'lodash.get';
import { View, Image, TouchableOpacity, SafeAreaView}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import FontAwesomeIcon                                  from 'react-native-vector-icons/FontAwesome';
import MaterialIcon                                     from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon                                      from 'react-native-vector-icons/Feather';
import Ionicons                                         from 'react-native-vector-icons/Ionicons';
import StarRating                                       from 'react-native-star-rating';
import styles                                           from '../styles/SingleProductStyles';
// import styles                                             from '../styles/InboxStyles';

class ReviewPage extends Component {

  render() {
    const { OthersReviews, User } = this.props;
    const name = get(User, "name", "");

    console.log("@@@@@", this.props);

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <SafeAreaView>
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
                // marginLeft: 10, 
                alignItems: 'center', 
                // marginTop: 10
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 16}}>{name}</Text>
              <View 
                style={{
                  flex: 1, 
                  flexDirection: 'row', 
                  marginTop: 16, 
                  marginBottom: 5
                }}
              >
                <Text style={{color: '#656464', fontSize: 14, marginRight: 16}}>Verified:</Text>

                <View style={{backgroundColor: 'black', width: 32, height: 32, borderRadius: 50, alignSelf: 'center', marginRight: 8}}>
                  <FeatherIcon name="phone" size={15} color="white" style={{alignSelf: 'center', marginTop: 8}}/>
                </View>

                <View style={{backgroundColor: 'black', width: 32, height: 32, borderRadius: 50, alignSelf: 'center', marginRight: 8}}>
                  <FeatherIcon name="mail" size={15} color="white" style={{alignSelf: 'center', marginTop: 8}}/>
                </View>

                <View 
                  style={{
                    backgroundColor: 'white', 
                    width: 32, 
                    height: 32, 
                    borderRadius: 50,
                    borderColor: 'black',
                    borderWidth: 1, 
                    alignSelf: 'center'
                  }}
                >
                  <FeatherIcon name="facebook" size={15} color="black" style={{alignSelf: 'center', marginTop: 7}}/>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 16, alignSelf: 'center'}}>
                <Text style={{fontSize: 14, marginRight: 10}}>
                  4.8
                </Text>

                <StarRating
                  disabled={true}
                  maxStars={1}
                  rating={1}
                  fullStarColor="black"
                  starSize={16}
                  containerStyle={{width: 40}}
                />

                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  {OthersReviews.length} Reviews
                </Text> 
              </View>

              {/* <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', marginTop: 16}}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={5}
                  fullStarColor="black"
                  starSize={20}
                  containerStyle={{width: 120}}
                />
                <Text style={{fontWeight: 'bold', color: '#00529b', fontSize: 15, textAlign: 'center', marginLeft: 10}}>
                  {OthersReviews.length}
                </Text>
              </View> */}
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
              OthersReviews.map((review, index) => {
                const singleReview = review.Writer;
                const reviewContext = review.text;
                const rating = (review.rating / 10);
                const date = singleReview.createdAt.split("T")[0];
                const tempTime = (singleReview.createdAt.split("T")[1]).substring(0,5);
                const tempHour = tempTime.substring(0,2);
                // const minute = tempTime.substring(3);
                // const hour = tempHour > 12 ? tempHour - 12 : tempHour;
                // const amPM = tempHour > 12 ? "PM" : "AM";
                // const newDate = `${date} ${hour}:${minute} ${amPM}`;
                const newDate = date;

                return (
                  <View
                    key={review.id}
                    style={{
                      paddingTop: 32,
                      marginRight: 16,
                      marginLeft: 16,
                      paddingBottom: 32,
                      flexDirection: 'row',
                      borderBottomWidth: index === OthersReviews.length-1 ? 0 : 1,
                      borderBottomColor: "#ECEBEB"
                    }}
                  >
                    <View style={styles.singleReviewHeadshot} />

                    <View style={{flexDirection: 'column', marginLeft: 28}}>
                      <Text 
                        // style={styles.singleReviewName}
                        style={{fontSize: 16, fontWeight: 'bold', lineHeight: 20}}
                      >
                        {singleReview.name}
                      </Text>

                      <Text 
                        // style={styles.singleReviewDate}
                        style={{
                          fontSize: 14, 
                          color: "#A3A3A2", 
                          lineHeight: 16,
                          marginTop: 10
                        }}
                      >
                        {newDate}
                      </Text>

                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={rating}
                        fullStarColor="black"
                        starSize={16}
                        containerStyle={{
                          width: 90,
                          marginTop: 10
                        }}
                      />

                      <Text 
                        // style={styles.singleReviewContext}
                        style={{
                          fontSize: 14,
                          lineHeight: 22,
                          color: '#A3A3A2',
                          marginTop: 12,
                          width: '70%'
                        }}
                      >
                        {reviewContext}
                      </Text>
                    </View>

                  </View>
                );
              })
            }
          </View>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

export default ReviewPage;

