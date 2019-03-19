import React 																						from 'react';
import { connect }                                      from 'react-redux';
import get                                              from 'lodash.get';
import { View, Image, TouchableOpacity} 								from 'react-native';
import { Container, Content, List, ListItem, 
				 Text, Button, Card, CardItem } 								from 'native-base';
import { Actions } 																			from 'react-native-router-flux';
import FontAwesomeIcon 																	from 'react-native-vector-icons/FontAwesome';
import FeatherIcon 																			from 'react-native-vector-icons/Feather';
import MaterialIcon 																		from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon                            from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating 																			from 'react-native-star-rating';
import Geocoder 																				from 'react-native-geocoding';
import { getSingleProductDetail }                       from '../../actions/singleProductActions';
import styles                                           from '../styles/SingleProductStyles';

class SingleProduct extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			location: ""
		};
	}

	componentWillMount() {
		const { locationCoordinates } = this.props;

		Geocoder.init("AIzaSyA-MsP18EKCeMi7bBBj9VO-HpQEogK2yTc");
    Geocoder.from(locationCoordinates)
			.then(json => {
				this.setState({
					location: json.results[0].address_components[0].long_name
				})
			})
			.catch(error => console.warn(error));
	}

	componentDidMount() {
		const singleProduct = get(this.props, "singleProduct", {});
		const itemId = singleProduct.id;

		this.props.getSingleProductDetail(itemId);
	}

	displaySingleProduct = () => {
		const singleProduct = get(this.props, "singleProduct", {});
		const HashTags = get(singleProduct, "HashTags", []);
		const Files = get(singleProduct, "Files", []);
		const createdAt = get(singleProduct, "createdAt", "");
		const postedDate = createdAt.substring(0, 10);

		const singleProductDetail = get(this.props.singleItem, "singleProductDetail", {});
		const Category = get(singleProductDetail, "Category", {});
		const Title = get(Category, "title", "");

		const User = get(singleProductDetail, "User", {});
		const name = get(User, "name", "");
		const OthersReviews = get(User, "OthersReviews", []);

		const price = get(singleProduct, "price", 0);
		const itemPrice = Number(price).toFixed(2);

		const spec = get(singleProduct, "spec", {});
		const sellFlag = get(spec, 'sell', "");
		const swapFlag = get(spec, 'swap', "");
		const description = get(spec, "description", "");

		const thumbnailUrl = `https://s3.us-east-2.amazonaws.com/swaptem/${Files[0].thumbPath}`;
		let itemHashTags = [];

		const coordinates = get(User.location, "coordinates", []);
		const latitude = coordinates[0];
		const longitude = coordinates[1];

		const {userInfo} = this.props;
		const MyItems = get(userInfo, "Items", []);

		const offerSent = get(this.props, "offerSent", "");

		const ratingTypes = [
			{
				type: 'Response Rate',
				value: '100%'
			},

			{
				type: 'Response Time',
				value: 'Within an hour'
			},

			{
				type: 'Num of Transactions',
				value: 8
			},
		];

		console.log("@@@@ This is inside SingleProduct this.props", this.props);
		console.log("@@@@ This is inside SingleProduct MyItems", MyItems);


		for(let i = 0; i < HashTags.length; i++) {
      let text = `#${HashTags[i].text}`;
      itemHashTags.push(text);
    }

    return (
    	<React.Fragment>
	    	<View>
		    	<Card style={styles.singleProductCard}>
			    	<CardItem cardBody style={styles.singleProductCardItem}>
			    		<Image
			          source={{uri: thumbnailUrl}}
			          style={styles.cardImage}
			        />

			        <View style={styles.cardContent}>
			        	<Text style={styles.cardHashTags}>
			          	{itemHashTags.join(" ")}
			          </Text>

			          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
				          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10, marginBottom: 10}}>
				          	{`$${itemPrice}`}
				          </Text>

				          <View style={{flexDirection: 'row', marginLeft: 15}}>
				          	<MaterialCommunityIcon name="coin" size={30} color="#FBDB0A" style={{marginTop: 7, marginRight: 3}}/>
				          	<Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10, marginBottom: 10}}>
				          		100.00
				          	</Text>
				          </View>
			          </View>

			          {/* <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginLeft: 10, marginBottom: 10}}>
			          	<TouchableOpacity onPress={ () => { Actions.userProfilePage({ User: User }) }}>
				        		<View 
				        			style={{ width: 60, 
				                  height: 60, 
				                  backgroundColor:'#959595',
				                  borderRadius: 50,
				                  marginRight: 10 }}
				        		/>
			        		</TouchableOpacity>

			        		<View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 10}}>
			        			<TouchableOpacity onPress={ () => { Actions.userProfilePage({ User: User }) }}>
			        				<Text style={{fontWeight: 'bold', color: "#00529b", fontSize: 18}}>{name}</Text>
			        			</TouchableOpacity>
			        			
			        			<View style={{flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
			        				<Text style={{color: '#656464'}}>Confirmed</Text>
			        				<FontAwesomeIcon name="facebook-f" size={20} color='#656464' style={{marginRight: 8, marginLeft: 8, marginTop: 2}}/>
			        				<MaterialIcon name="email" size={20} color='#656464' style={{marginRight: 8, marginTop: 2}}/>
			        				<MaterialIcon name="smartphone" size={20} color='#656464' style={{marginTop: 2}}/>
			        			</View>

					        	<View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
					        		<StarRating
				        				disabled={true}
				        				maxStars={5}
				        				rating={5}
				        				fullStarColor="#FBDB0A"
				        				starSize={20}
				        				containerStyle={{width: 120}}
				        			/>

				        			<TouchableOpacity
				        				onPress={ () => { Actions.reviewPage({ OthersReviews: OthersReviews, User: User }) }}
				        			>
						        		<Text style={{fontWeight: 'bold', color: '#00529b', fontSize: 15, textAlign: 'center', marginLeft: 10, marginTop: 0.2}}>
						        			{OthersReviews.length}
						        		</Text>
					        		</TouchableOpacity>
					        	</View>



					        	
			        			
			        		</View>
			        	</View> */}

			        	{
			        		offerSent === true ?
			        		<Text style={{fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center', marginTop: 5, color: "#00529b"}}>
			        			Your offer has been sent to the Swapper!
			        		</Text>
			        		:
			        		<React.Fragment>
				        		<Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: "#00529b"}}>Great! You have matching product!</Text>

						        <View style={{flexDirection: 'row', alignSelf: 'center', height: 50, marginTop: 20}}>
						        	{
						        		swapFlag === true ?
					              <Button 
					              	style={{
					              		backgroundColor: 'white', 
					              		borderWidth: 1, 
					              		borderColor: '#00529b', 
					              		borderRadius: 10, 
					              		width: '42%', 
					              		alignSelf: 'center'
					              	}}
					              	onPress={ () => { Actions.mySwapItemsPage({ 
					              		MyItems: MyItems, 
					              		singleProductDetail: singleProductDetail,
					              		itemHashTags: itemHashTags,
					              		thumbnailUrl: thumbnailUrl }) 
					              	}}
					              >
					                <Text style={{color: '#00529b', fontSize: 15, textAlign: 'center', flex: 1}}>SWAP</Text>
					              </Button>
						        		:null
						        	}

						        	{
						        		sellFlag === true ?
					              <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, width: '42%', alignSelf: 'center', marginLeft: 20}}>
					                <Text style={{color: '#00529b', fontSize: 15, textAlign: 'center', flex: 1}}>BUY</Text>
					              </Button>
						        		: null
						        	}
				            </View>
			            </React.Fragment>

			        	}

			          
		            <Button style={{backgroundColor: '#00529b', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, width: '90%', alignSelf: 'center', marginTop: 15}}>
			            <Text style={{color: 'white', fontSize: 15, flex: 1, textAlign: 'center'}}>MESSAGE SELLER</Text>
			          </Button>
			        </View>
			    	</CardItem>
		    	</Card>
	    	</View>

	    	<List style={{marginTop: 20, marginBottom: 20}}>
        	<View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginBottom: 15, marginRight: 40}}>
        		<Text style={{fontWeight: 'bold'}}>CONDITION</Text>
        		<Text style={{position: 'absolute', right: '0%'}}>EXCELLENT</Text>
        	</View>

        	{
        		Title === "Fashion" ?
	        	<View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginBottom: 15, marginRight: 40}}>
	        		<Text style={{fontWeight: 'bold'}}>SIZE</Text>
	        		<Text style={{position: 'absolute', right: '0%'}}>9.5 US</Text>
	        	</View>
        		: null
        	}

        	<View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginBottom: 15, marginRight: 40}}>
        		<Text style={{fontWeight: 'bold'}}>LOCATION</Text>
        		<Text style={{position: 'absolute', right: '0%'}}>{this.state.location}</Text>
        	</View>

        	<View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginBottom: 15, marginRight: 40}}>
        		<Text style={{fontWeight: 'bold'}}>CATEGORY</Text>
        		<Text style={{position: 'absolute', right: '0%'}}>{Title}</Text>
        	</View>

        	<View style={{flex: 1, marginLeft: 40, marginBottom: 15, marginRight: 40}}>
        		<Text style={{fontWeight: 'bold'}}>LOOKING FOR</Text>
        		<Text style={{position: 'absolute', right: '0%', flexWrap: 'wrap', maxWidth: 150, height: 45, textAlign: 'right', lineHeight: 22}}>
        			Shoes, Sneakers, Jackets, Jeans
        		</Text>
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

        <View style={{flex: 1, alignSelf: 'center', marginTop: 15, marginBottom: 10}}>
        	<Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 15}}>DESCRIPTION</Text>
        	<Text style={{lineHeight: 22, width: 330}}>
        		{description}
        	</Text>
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

        	{/* <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', marginLeft: 10}}>
        		<View 
        			style={{ width: 50, 
                  height: 50, 
                  backgroundColor:'#959595',
                  borderRadius: 50 }}
        		/>

        		<View style={{flex: 1, flexDirection: 'column', alignSelf: 'center', marginLeft: 10}}>
        			<Text style={{fontWeight: 'bold'}}>{name}</Text>
        			
        			<View style={{flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
        				<Text style={{color: '#656464'}}>Confirmed</Text>
        				<FontAwesomeIcon name="facebook-f" size={20} color='#656464' style={{marginRight: 8, marginLeft: 8}}/>
        				<MaterialIcon name="email" size={20} color='#656464' style={{marginRight: 8}}/>
        				<MaterialIcon name="smartphone" size={20} color='#656464' />
        			</View>
        			
        			<Text style={{fontWeight: 'bold', marginBottom: 3}}>Software Developer @Gartner</Text>
        			<Text>Fashion addict & notorious shoe connossieur</Text>
        		</View>
        	</View> */}

        	<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginLeft: 10, marginBottom: 10}}>
          	<TouchableOpacity onPress={ () => { Actions.userProfilePage({ User: User }) }}>
	        		<View 
	        			style={{ width: 60, 
	                  height: 60, 
	                  backgroundColor:'#959595',
	                  borderRadius: 50,
	                  marginRight: 10 }}
	        		/>
        		</TouchableOpacity>

        		<View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 10}}>
        			<TouchableOpacity onPress={ () => { Actions.userProfilePage({ User: User }) }}>
        				<Text style={{fontWeight: 'bold', color: "#00529b", fontSize: 18}}>{name}</Text>
        			</TouchableOpacity>
        			
        			<View style={{flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
        				<Text style={{color: '#656464'}}>Confirmed</Text>
        				<FontAwesomeIcon name="facebook-f" size={20} color='#656464' style={{marginRight: 8, marginLeft: 8, marginTop: 2}}/>
        				<MaterialIcon name="email" size={20} color='#656464' style={{marginRight: 8, marginTop: 2}}/>
        				<MaterialIcon name="smartphone" size={20} color='#656464' style={{marginTop: 2}}/>
        			</View>

		        	{/* <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
		        		<StarRating
	        				disabled={true}
	        				maxStars={5}
	        				rating={5}
	        				fullStarColor="#FBDB0A"
	        				starSize={20}
	        				containerStyle={{width: 120}}
	        			/>

	        			<TouchableOpacity
	        				onPress={ () => { Actions.reviewPage({ OthersReviews: OthersReviews, User: User }) }}
	        			>
			        		<Text style={{fontWeight: 'bold', color: '#00529b', fontSize: 15, textAlign: 'center', marginLeft: 10, marginTop: 0.2}}>
			        			{OthersReviews.length}
			        		</Text>
		        		</TouchableOpacity>
		        	</View> */}
        			
        		</View>
        	</View>

        	<View 
        		style={{
        			flex: 1, 
        			width: '100%', 
        			flexDirection: 'column', 
        			alignItems: 'center',
        			marginTop: 10
        			// marginBottom: 10
        		}}
        	>                    
          	{
	        		ratingTypes.map((rating, index) => {
	        			return (
	        				<View
	        					key={index} 
	        					style={{width: '80%', marginBottom: 5, marginRight: 5, flexDirection: 'row'}}
	        				>
	        					<Text style={{fontWeight: 'bold', fontSize: 16}}>
	        						{rating.type}
	        					</Text>

	        					<Text style={{flex: 1, position: 'absolute', right: 0, fontSize: 16}}>
	        						{rating.value}
	        					</Text>
                  </View>
	        			);
	        		})
	        	}
          </View>

        	<Button style={{backgroundColor: '#00529b', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, width: '90%', alignSelf: 'center', marginTop: 20}}>
            <Text style={{color: 'white', fontSize: 15, flex: 1, textAlign: 'center'}}>MESSAGE SELLER</Text>
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

        <View>
	        <View style={{marginTop: 15, marginBottom: 20}}>
	        	<Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 10}}>REVIEWS</Text>
	        	<View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
	        		<StarRating
        				disabled={true}
        				maxStars={5}
        				rating={5}
        				fullStarColor="#FBDB0A"
        				starSize={20}
        				containerStyle={{width: 120}}
        			/>
	        		<Text style={{fontWeight: 'bold', color: '#00529b', fontSize: 15, textAlign: 'center', marginLeft: 10}}>
	        			{OthersReviews.length}
	        		</Text>
	        	</View>

	        	{
	        		OthersReviews.slice(0, 2).map((review) => {
	        			const singleReview = review.Writer;
	        			const reviewContext = review.text;
	        			const rating = (review.rating / 10);
	        			const date = singleReview.createdAt.split("T")[0];
	        			const tempTime = (singleReview.createdAt.split("T")[1]).substring(0,5);
	        			const tempHour = tempTime.substring(0,2);
	        			const minute = tempTime.substring(3);
	        			const hour = tempHour > 12 ? tempHour - 12 : tempHour;
	        			const amPM = tempHour > 12 ? "PM" : "AM";
	        			const newDate = `${date} ${hour}:${minute} ${amPM}`;

	        			return (
									<View 
										key={review.id}
										style={{marginTop: 10}}
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
				          			{/* <Text style={{fontWeight: 'bold'}}>Sarah, G.</Text> */}
				          			<Text style={{fontWeight: 'bold', marginBottom: 4}}>{singleReview.name}</Text>
				          			<Text style={{fontSize: 15, color: '#656464'}}>
				          				{newDate}
				          			</Text>

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

	        {
	        	OthersReviews.length > 1 ?
	        	<TouchableOpacity
	        		onPress={ () => { Actions.reviewPage({ OthersReviews: OthersReviews, User: User }) }}
	        		style={{marginBottom: 30}}
	        	>
			      	<Text style={{color: '#00529b', textAlign: 'center', fontWeight: 'bold', marginTop: 15}}>
			      		{`Read all ${OthersReviews.length} reviews`}
			      	</Text>
		      	</TouchableOpacity>
	        	: null
	        }
      	</View>
    	</React.Fragment>
    );
	}


	render() {
		const singleProduct = get(this.props, "singleProduct", {});
		const thumbnailUrl = `https://s3.us-east-2.amazonaws.com/swaptem/${singleProduct.Files[0].thumbPath}`;

		return (
			<Container>
        <Content style={{backgroundColor: 'white'}}>
         	<List>
           	{this.displaySingleProduct()}
          </List>
        </Content>
      </Container>
		);
	}
}

const mapStateToProps = state => ({
  singleItem: state.singleItem || {},
});

const mapDispatchToProps = {
  getSingleProductDetail: getSingleProductDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);



