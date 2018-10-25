import React from 'react';
import PropTypes from 'prop-types';
import { View, Image} from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class SingleProduct extends React.Component {

	render() {

		return (
			<Container>
        <Content style={{backgroundColor: 'white'}}>
         	
         	<List>
           	<View>
	            <Card style={{height: 550, width: 370, flex: 1}}>
	              {/* <FontAwesomeIcon name="heart" size={25} color="#1D60FD" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 170 }}/>
	              <FontAwesomeIcon name="share-alt" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 140 }}/> */}
	                <CardItem cardBody style={{flex: 1, flexDirection: 'column'}}>
	                  <Image 
	                    source={{uri: 'https://techcrunch.com/wp-content/uploads/2017/12/apple_imac_pro_002.jpg?w=730&crop=1'}} 
	                    style={{height: 100, width: 370, flex: 1}}
	                  />
	                  
	                  <View style={{flex: 1, flexDirection: 'column'}} >
		                  <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 20}}>Apple</Text>
		                  <Text style={{textAlign: 'center'}}>Apple 27" iMac Pro with Retina 5K Display</Text>
		                  <Text style={{textAlign: 'center', color: "grey"}}>Posted 15 mins ago</Text>
		                  <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10, marginBottom: 10}}>$4,599.00</Text>
		                  <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: "#00529b"}}>Great! You have matching product!</Text>
		                  <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: "#00529b"}}>SWAP it with your Apple MacBook Pro!</Text>

		                  <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
		                    <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 20, width: 100, alignSelf: 'center'}}>
	                        <Text style={{color: '#00529b', fontSize: 15, marginLeft: 10, textAlign: 'center'}}>SWAP</Text>
	                      </Button>

	                      <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 20, width: 100, alignSelf: 'center', marginLeft: 20}}>
	                        <Text style={{color: '#00529b', fontSize: 15, marginLeft: 10, textAlign: 'center', marginLeft: 20}}>BUY</Text>
	                      </Button>
                      </View>
                    </View>
	                </CardItem>
	              </Card>
            </View>

            <List>
            	<View style={{flex: 1, flexDirection: 'row', marginLeft: 20, marginBottom: 15, marginTop: 20}}>
            		<Text style={{fontWeight: 'bold'}}>CONDITION</Text>
            		<Text style={{marginLeft: 70}}>EXCELLENT</Text>
            	</View>

            	<View style={{flex: 1, flexDirection: 'row', marginLeft: 20, marginBottom: 15}}>
            		<Text style={{fontWeight: 'bold'}}>SIZE</Text>
            		<Text style={{marginLeft: 126}}>9.5 US</Text>
            	</View>

            	<View style={{flex: 1, flexDirection: 'row', marginLeft: 20, marginBottom: 15}}>
            		<Text style={{fontWeight: 'bold'}}>LOCATION</Text>
            		<Text style={{marginLeft: 80}}>Edgewater, NJ</Text>
            	</View>

							<View style={{flex: 1, flexDirection: 'row', marginLeft: 20, marginBottom: 15}}>
            		<Text style={{fontWeight: 'bold'}}>BRAND</Text>
            		<Text style={{marginLeft: 105}}>Apple</Text>
            	</View>   

            	<View style={{flex: 1, flexDirection: 'row', marginLeft: 20, marginBottom: 15}}>
            		<Text style={{fontWeight: 'bold'}}>CATEGORY</Text>
            		<Text style={{marginLeft: 75, width: 200}}>Consumer Electronics, Laptop, Computer</Text>
            	</View>

            	<View style={{flex: 1, flexDirection: 'row', marginLeft: 20}}>
            		<Text style={{fontWeight: 'bold'}}>LOOKING FOR</Text>
            		<Text style={{marginLeft: 52, width: 200}}>Shoes, Sneakers, Jackets, Jeans</Text>
            	</View>      	
            </List>

            <View
	            style={{
	              marginTop: 14,
	              borderBottomColor: '#EDEBEB',
	              borderBottomWidth: 1,
	              width: '98%',
	              marginLeft: 5
	            }}
	          />

            <View style={{flex: 1, alignSelf: 'center', marginTop: 15}}>
            	<Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 15}}>DESCRIPTION</Text>
            	<List>
            		<Text style={{height: 20}}>3.2 GHz Intel Xeon W 8-Core</Text>
            		<Text style={{height: 20}}>32GB of DDR4 RAM | 1TB SSD</Text>
            		<Text style={{height: 20}}>AMD Radeon Pro Vega 56 (8GB HBM2)</Text>
            		<Text style={{height: 20}}>27" 5120 x 2880 IPS Retina 5K Display</Text>
            	</List>

            	<Text style={{alignSelf: 'center', color: "#00529b", fontWeight: 'bold', marginTop: 10}}>Ask for more detail</Text>
            </View>

	          <View style={{backgroundColor: "#ADB1B3", paddingBottom: 5, paddingTop: 5, marginTop: 15}}>
	            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#2DAADF", height: 58}}>
	            	<FeatherIcon name="shield" size={25} color="white" style={{alignSelf: 'center', marginLeft: 15, marginTop: -5}}/>
	            	<View style={{flex: 1, flexDirection: 'column', marginTop: 10, marginLeft: 15}}>
	            		<Text button style={{color: 'white', fontWeight: 'bold'}}>BUYER PROTECTION GUARANTEE</Text>
	            		<Text style={{color: 'white', fontSize: 12}}>Receive your item as listed, or we'll reimburse you.</Text>
	            	</View>
	            </View>
            </View>

            <View style={{marginTop: 15}}>
            	<Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 10}}>SELLER</Text>
            	<View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', marginLeft: 10}}>
            		<View 
            			style={{ width: 50, 
                      height: 50, 
                      backgroundColor:'#959595',
                      borderRadius: 50 }}
            		/>

            		<View style={{flex: 1, flexDirection: 'column', alignSelf: 'center', marginLeft: 10}}>
            			<Text style={{fontWeight: 'bold'}}>Tae Hoon Lee</Text>
            			
            			<View style={{flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            				<Text style={{color: '#656464'}}>Confirmed</Text>
            				<FontAwesomeIcon name="facebook-f" size={20} color='#656464' style={{marginRight: 8, marginLeft: 8}}/>
            				<MaterialIcon name="email" size={20} color='#656464' style={{marginRight: 8}}/>
            				<MaterialIcon name="smartphone" size={20} color='#656464' />
            			</View>
            			
            			<Text style={{fontWeight: 'bold', marginBottom: 3}}>Software Developer @Gartner</Text>
            			<Text>Fashion addict & notorious shoe connossieur</Text>
            		</View>
            	</View>

            	<Button style={{backgroundColor: '#00529b', borderWidth: 1, borderColor: '#00529b', borderRadius: 20, width: 200, alignSelf: 'center', marginTop: 15}}>
                <Text style={{color: 'white', fontSize: 15, marginLeft: 10, textAlign: 'center'}}>MESSAGE SELLER</Text>
              </Button>
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

	          <View style={{marginTop: 15}}>
	          	<Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 10}}>REVIEWS</Text>
	          	<View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
	          		<FontAwesomeIcon name="star" size={20} color='#FBDB0A' style={{marginRight: 5, marginLeft: 5}}/>
	          		<FontAwesomeIcon name="star" size={20} color='#FBDB0A' style={{marginRight: 5, marginLeft: 5}}/>
	          		<FontAwesomeIcon name="star" size={20} color='#FBDB0A' style={{marginRight: 5, marginLeft: 5}}/>
	          		<FontAwesomeIcon name="star" size={20} color='#FBDB0A' style={{marginRight: 5, marginLeft: 5}}/>
	          		<FontAwesomeIcon name="star" size={20} color='#656464' style={{marginRight: 5, marginLeft: 5}}/>
	          		<Text style={{fontWeight: 'bold', color: '#00529b', fontSize: 15, textAlign: 'center', marginLeft: 10}}>65</Text>
	          	</View>

	          	<View style={{marginTop: 10}}>
		          	<View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
		          		<View 
	            			style={{ width: 50, 
	                      height: 50, 
	                      backgroundColor:'#959595',
	                      borderRadius: 50 }}
	            		/>

	            		<View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
	            			<Text style={{fontWeight: 'bold'}}>Sarah G.</Text>
	            			<Text style={{fontSize: 15, color: '#656464'}}>Aug 10, 2018 4:30 PM</Text>
	            		</View>
		          	</View>

		          	<Text style={{marginLeft: 10, marginTop: 10}}>Awesome. Received item as described. Fast shipping!</Text>
	          	</View>

	          	<View style={{marginTop: 10}}>
		          	<View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
		          		<View 
	            			style={{ width: 50, 
	                      height: 50, 
	                      backgroundColor:'#959595',
	                      borderRadius: 50 }}
	            		/>

	            		<View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
	            			<Text style={{fontWeight: 'bold'}}>Nick N.</Text>
	            			<Text style={{fontSize: 15, color: '#656464'}}>July 22, 2018 12:20 PM</Text>
	            		</View>
		          	</View>

		          	<Text style={{marginLeft: 10, marginTop: 10}}>Great products! Very trustworthy seller!</Text>
	          	</View>

	          	<Text style={{color: '#00529b', textAlign: 'center', fontWeight: 'bold', marginTop: 15}}>Read all 65 reviews</Text>
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
	          	<Text style={{fontWeight: 'bold', textAlign: 'center', marginTop: 15, marginBottom: 15}}>ITEMS FROM SELLER</Text>

	          	<View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', marginBottom: 15}}>
	          		<Card style={{height: 220, width: 120, flex: 1, borderColor: 'black', borderWidth: 1}}>
	          			<CardItem cardBody style={{flex: 1, flexDirection: 'column'}}>
	                  <View style={{height: 120, width: 120, backgroundColor: "#EDEBEB", borderWidth: 1, borderColor: 'black'}} />
	                  <View style={{flex: 1, flexDirection: 'column'}} >
		                  <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, marginTop: 10}}>Apple</Text>
		                  <Text style={{textAlign: 'center', fontSize: 15, width: 120}}>Apple 27" iMac Pro with Retina 5K Display</Text>
		                </View>
	                 </CardItem>
	          		</Card>

	          		<Card style={{height: 220, width: 120, flex: 1, borderColor: 'black', borderWidth: 1}}>
	          			<CardItem cardBody style={{flex: 1, flexDirection: 'column'}}>
	                  <View style={{height: 120, width: 120, backgroundColor: "#EDEBEB", borderWidth: 1, borderColor: 'black'}} />
	                  <View style={{flex: 1, flexDirection: 'column'}} >
		                  <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, marginTop: 10}}>Apple</Text>
		                  <Text style={{textAlign: 'center', fontSize: 15, width: 120}}>Apple 27" iMac Pro with Retina 5K Display</Text>
		                </View>
	                 </CardItem>
	          		</Card>

	          		<Card style={{height: 220, width: 120, flex: 1, borderColor: 'black', borderWidth: 1}}>
	          			<CardItem cardBody style={{flex: 1, flexDirection: 'column'}}>
	                  <View style={{height: 120, width: 120, backgroundColor: "#EDEBEB", borderWidth: 1, borderColor: 'black'}} />
	                  <View style={{flex: 1, flexDirection: 'column'}} >
		                  <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, marginTop: 10}}>Apple</Text>
		                  <Text style={{textAlign: 'center', fontSize: 15, width: 120}}>Apple 27" iMac Pro with Retina 5K Display</Text>
		                </View>
	                 </CardItem>
	          		</Card>
	          	</View>
	          </View>

	          <View
	            style={{
	              marginTop: 10,
	              borderBottomColor: '#EDEBEB',
	              borderBottomWidth: 1,
	              width: '98%',
	              marginLeft: 5
	            }}
	          />

	          <View>
	          	<Text style={{fontWeight: 'bold', textAlign: 'center', marginTop: 15, marginBottom: 15}}>SIMILAR ITEMS</Text>

	          	<View style={{flex: 1, flexDirection: 'row'}}>
                <Card style={{height: 300, width: 170}}>
                <FontAwesomeIcon name="heart" size={25} color="#1D60FD" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 170 }}/>
                <FontAwesomeIcon name="share-alt" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 140 }}/>
                  <CardItem cardBody button style={{flex: 1, flexDirection: 'column'}} onPress={Actions.singleProduct}>
                    <Image 
                      source={{uri: 'https://techcrunch.com/wp-content/uploads/2017/12/apple_imac_pro_002.jpg?w=730&crop=1'}} 
                      style={{height: 100, width: 170, flex: 1}}
                    />
                    
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Apple</Text>
                    <Text style={{textAlign: 'center'}}>Apple 27" iMac Pro with Retina 5K Display</Text>
                    <Text style={{fontWeight: 'bold'}}>$4,599.00</Text>
                  </CardItem>
                </Card>

                <Card style={{height: 300, width: 170, marginLeft: 15}}>
                  <FontAwesomeIcon name="heart" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 170 }}/>
                  <FontAwesomeIcon name="share-alt" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 140 }}/>
                  <CardItem cardBody style={{flex: 1, flexDirection: 'column'}}>
                    <Image 
                      source={{uri: 'https://techcrunch.com/wp-content/uploads/2017/12/apple_imac_pro_002.jpg?w=730&crop=1'}} 
                      style={{height: 100, width: 170, flex: 1}}
                    />
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Apple</Text>
                    <Text style={{textAlign: 'center'}}>Apple 27" iMac Pro with Retina 5K Display</Text>
                    <Text style={{fontWeight: 'bold'}}>$4,599.00</Text>
                  </CardItem>
                </Card>
              </View>

              <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                <Card style={{height: 300, width: 170}}>
                  <FontAwesomeIcon name="heart" size={25} color="#1D60FD" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 170 }}/>
                  <FontAwesomeIcon name="share-alt" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 140 }}/>
                  <CardItem cardBody style={{flex: 1, flexDirection: 'column'}}>
                    <Image 
                      source={{uri: 'https://techcrunch.com/wp-content/uploads/2017/12/apple_imac_pro_002.jpg?w=730&crop=1'}} 
                      style={{height: 100, width: 170, flex: 1}}
                    />
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Apple</Text>
                    <Text style={{textAlign: 'center'}}>Apple 27" iMac Pro with Retina 5K Display</Text>
                    <Text style={{fontWeight: 'bold'}}>$4,599.00</Text>
                  </CardItem>
                </Card>

                <Card style={{height: 300, width: 170, marginLeft: 15}}>
                  <FontAwesomeIcon name="heart" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 170 }}/>
                  <FontAwesomeIcon name="share-alt" size={25} color="white" style={{position: 'absolute', zIndex: 10, marginLeft: 140, marginTop: 140 }}/>
                  <CardItem cardBody style={{flex: 1, flexDirection: 'column'}}>
                    <Image 
                      source={{uri: 'https://techcrunch.com/wp-content/uploads/2017/12/apple_imac_pro_002.jpg?w=730&crop=1'}} 
                      style={{height: 100, width: 170, flex: 1}}
                    />
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Apple</Text>
                    <Text style={{textAlign: 'center'}}>Apple 27" iMac Pro with Retina 5K Display</Text>
                    <Text style={{fontWeight: 'bold'}}>$4,599.00</Text>
                  </CardItem>
                </Card>
              </View>
	          </View>


          </List>
        </Content>
      </Container>
		);
	}
}

export default SingleProduct;