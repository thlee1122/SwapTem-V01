import React 																						from 'react';
import { connect }                                      from 'react-redux';
import get                                              from 'lodash.get';
import { View, Image, TouchableOpacity, SafeAreaView, Dimensions } 								from 'react-native';
import { Container, Content, List, ListItem, 
				 Text, Button, Card, CardItem } 								from 'native-base';
import { Actions } 																			from 'react-native-router-flux';
import FontAwesomeIcon 																	from 'react-native-vector-icons/FontAwesome';
import FeatherIcon 																			from 'react-native-vector-icons/Feather';
import MaterialIcon 																		from 'react-native-vector-icons/MaterialIcons';
import Ionicons                                         from 'react-native-vector-icons/Ionicons';
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
		const Files = get(singleProduct, "ItemFiles", []);
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

		// const spec = get(singleProduct, "spec", {});
		const sellFlag = get(singleProduct, 'sell', "");
		const swapFlag = get(singleProduct, 'swap', "");
		const description = get(singleProduct, "description", "");

		const thumbnailUrl = `https://s3.us-east-2.amazonaws.com/swaptem/${Files[0].thumbPath}`;
		let itemHashTags = [];

		const coordinates = get(User.location, "coordinates", []);
		const latitude = coordinates[0];
		const longitude = coordinates[1];

		const {userInfo} = this.props;
		const MyItems = get(userInfo, "Items", []);
		const offerSent = get(this.props, "offerSent", "");


		const { height, width } = Dimensions.get('window');

		console.log("1111 userInfo", userInfo);

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

		console.log("@@@@@@ singleproduct", singleProduct);

		for(let i = 0; i < HashTags.length; i++) {
      // let text = `#${HashTags[i].text}`;
      let text = `${HashTags[i].text}`;
      itemHashTags.push(text);
    }

    // console.log("OthersReviews", OthersReviews);

    // console.log("3333 this.props", this.props);

    return (
    	<React.Fragment>
    		<SafeAreaView>
	    	<View>
		    	<View style={styles.singleProductCard}>
			    	<View style={styles.singleProductCardItem}>
			    		<Image
			          source={{uri: thumbnailUrl}}
			          style={styles.cardImage}
			        />

			        <View style={styles.cardContent}>
			        	<View 
			        		style={{
			        			marginTop: 16,
									  marginLeft: 16
									}}
								>
				        	<Text 
				        		// style={styles.cardHashTags}
				        		style={{
				        			// textAlign: 'center', 
									    fontWeight: 'bold', 
									    fontSize: 24,
									    lineHeight: 28, 
									    
				        		}}
				        	>
				          	{itemHashTags.join(" ")}
				          </Text>

				          <Text 
				          	style={{
				          		// textAlign: 'center', 
				          		// fontWeight: 'bold', 
				          		lineHeight: 24,
				          		fontSize: 16, 
				          		marginTop: 13,
				          	}}
				          >
				          	{`$${itemPrice}`}
				          </Text>
			          </View>

			          <View>
			          	{/* <Text 
			          		style={{
			          			textAlign: 'center', 
			          			fontWeight: 'bold', 
			          			fontSize: 18, 
			          			// color: "#00529b",
			          			marginTop: 32
			          		}}
			          	>
			          		Great! You have matching product!
			          	</Text> */}
			          </View>

			          <View style={{flexDirection: 'column'}}>
					        <View 
					        	style={{
					        		flexDirection: 'row', 
					        		alignSelf: 'center', 
					        		height: 50, 
					        		marginTop: height * 0.1
					        	}}
					        >
					        	{
					        		swapFlag === true ?
				              <Button 
				              	// style={styles.swapButton}
				              	style={{
				              		backgroundColor: 'white', 
											    borderWidth: 1, 
											    borderColor: 'black', 
											    borderRadius: 50, 
											    width: '42%', 
											    alignSelf: 'center',
											    height: 58,
											    marginRight: 14
				              	}}
				              	onPress={ () => { Actions.mySwapItemsPage({ 
				              		MyItems: MyItems, 
				              		singleProductDetail: singleProductDetail,
				              		itemHashTags: itemHashTags,
				              		thumbnailUrl: thumbnailUrl }) 
				              	}}
				              >
				                <Text 
				                	// style={styles.swapButtonText}
				                	style={{
				                		color: 'black', 
												    fontSize: 14, 
												    textAlign: 'center', 
												    flex: 1
				                	}}
				                >
				                	Swap
				               	</Text>
				              </Button>
					        		:null
					        	}

					        	{
					        		sellFlag === true ?
				              <Button 
				              	// style={styles.sellButton}
				              	style={{
				              		backgroundColor: 'white', 
											    borderWidth: 1, 
											    borderColor: 'black', 
											    borderRadius: 50, 
											    width: '42%', 
											    alignSelf: 'center',
											    height: 58
				              	}}
				              >
				                <Text 
				                	// style={styles.sellButtonText}
				                	style={{
				                		color: 'black', 
												    fontSize: 14, 
												    textAlign: 'center', 
												    flex: 1
				                	}}
				                >
				                	Buy
				                </Text>
				              </Button>
					        		: null
					        	}
			            </View>

			            <View 
			            	style={{
			            		borderWidth: 2, 
			            		borderColor: 'black', 
			            		width: 100, 
			            		marginTop: 24, 
			            		borderRadius: 20,
			            		alignSelf: 'center'
			            	}}
			            />
			          </View>
			        </View>
			    	</View>
		    	</View>
	    	</View>

	    	<List style={{marginTop: 24, marginBottom: 20, marginLeft: 16}}>
	    		<Text style={{fontSize: 16, lineHeight: 20, fontWeight: 'bold'}}>
	    			Product Details
	    		</Text>

	    		<View style={{marginTop: 20}}>
	    			<View 
	        		style={{
	        			flex: 1, 
	        			flexDirection: 'row', 
	        			// marginLeft: 40, 
	        			marginBottom: 15, 
	        			marginRight: 40
	        		}}
	        	>
	        		<Text 
	        			style={{
	        				// fontWeight: 'bold'
	        				fontSize: 14,
	        				color: "#A3A3A2",
	        				lineHeight: 16
	        			}}
	        		>
	        			Condition
	        		</Text>
	        		<Text 
	        			style={{
	        				position: 'absolute', 
	        				right: '40%',
	        				fontSize: 14,
	        				lineHeight: 20
	        			}}
	        		>
	        			Excellent
	        		</Text>
	        	</View>

	        	{
        		Title === "Fashion" ?
		        	<View 
		        		style={{
		        			flex: 1, 
		        			flexDirection: 'row', 
		        			// marginLeft: 40, 
		        			marginBottom: 15, 
		        			marginRight: 40
		        		}}
		        	>
		        		<Text 
		        			style={{
		        				// fontWeight: 'bold'
		        				fontSize: 14,
		        				color: "#A3A3A2",
		        				lineHeight: 16
		        			}}
		        		>
		        			Size
		        		</Text>
		        		<Text 
		        			style={{
		        				position: 'absolute', 
		        				right: '40%',
		        				fontSize: 14,
		        				lineHeight: 20
		        			}}
		        		>
		        			9.5 US
		        		</Text>
		        	</View>
	        		: null
	        	}

	        	<View 
	        		style={{
	        			flex: 1, 
	        			flexDirection: 'row', 
	        			// marginLeft: 40, 
	        			marginBottom: 15, 
	        			marginRight: 40
	        		}}
	        	>
	        		<Text 
	        			style={{
	        				// fontWeight: 'bold'
	        				fontSize: 14,
	        				color: "#A3A3A2",
	        				lineHeight: 16
	        			}}
	        		>
	        			Location
	        		</Text>
	        		<Text 
	        			style={{
	        				position: 'absolute', 
	        				right: '38%',
	        				fontSize: 14,
	        				lineHeight: 20
	        			}}
	        		>
	        			{this.state.location}
	        		</Text>
	        	</View>

	        	<View 
	        		style={{
	        			flex: 1, 
	        			flexDirection: 'row', 
	        			// marginLeft: 40, 
	        			marginBottom: 15, 
	        			marginRight: 40
	        		}}
	        	>
	        		<Text 
	        			style={{
	        				// fontWeight: 'bold'
	        				fontSize: 14,
	        				color: "#A3A3A2",
	        				lineHeight: 16
	        			}}
	        		>
	        			Category
	        		</Text>

	        		<Text 
	        			style={{
	        				position: 'absolute', 
	        				right: '45.5%',
	        				fontSize: 14,
	        				lineHeight: 20
	        			}}
	        		>
	        			{Title}
	        		</Text>
	        	</View>

	        	<View 
	        		style={{
	        			flex: 1, 
	        			flexDirection: 'row', 
	        			// marginLeft: 40, 
	        			marginBottom: 15, 
	        			marginRight: 40
	        		}}
	        	>
	        		<Text 
	        			style={{
	        				// fontWeight: 'bold'
	        				fontSize: 14,
	        				color: "#A3A3A2",
	        				lineHeight: 16
	        			}}
	        		>
	        			Looking For
	        		</Text>
	        		<Text 
	        			style={{
	        				position: 'absolute', 
	        				fontSize: 14,
	        				right: '15.5%',
	        				// right: '0%', 
	        				flexWrap: 'wrap', 
	        				maxWidth: 150, 
	        				height: 45, 
	        				textAlign: 'left', 
	        				lineHeight: 20
	        			}}
	        		>
	        			Shoes, Sneakers, Jackets, Jeans
	        		</Text>
	        	</View>
	    		</View>
        	

        	

        	{/* <View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginBottom: 15, marginRight: 40}}>
        		<Text style={{fontWeight: 'bold'}}>LOCATION</Text>
        		<Text style={{position: 'absolute', right: '0%'}}>{this.state.location}</Text>
        	</View> */}

        	{/* <View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginBottom: 15, marginRight: 40}}>
        		<Text style={{fontWeight: 'bold'}}>CATEGORY</Text>
        		<Text style={{position: 'absolute', right: '0%'}}>{Title}</Text>
        	</View> */}

        	{/* <View style={{flex: 1, marginLeft: 40, marginBottom: 15, marginRight: 40}}>
        		<Text style={{fontWeight: 'bold'}}>LOOKING FOR</Text>
        		<Text style={{position: 'absolute', right: '0%', flexWrap: 'wrap', maxWidth: 150, height: 45, textAlign: 'right', lineHeight: 22}}>
        			Shoes, Sneakers, Jackets, Jeans
        		</Text>
        	</View> */}
        </List>

        <View 
        	// style={styles.blankLineOne} 
        	style={{
        		marginTop: 64,
				    borderBottomColor: '#EDEBEB',
				    borderBottomWidth: 1,
				    // width: '90%',
				    marginLeft: 16,
				    marginRight: 16
        	}}
        />

        <View 
        	style={{
        		flex: 1, 
        		// alignSelf: 'center', 
        		marginTop: 24, 
        		// marginBottom: 10
        		marginLeft: 16,
        		marginRight: 16,
        		marginBottom: 32
        	}}
        >
        	<Text 
        		style={{
        			fontWeight: 'bold', 
        			// textAlign: 'center', 
        			marginBottom: 10,
        			fontSize: 16,
        			lineHeight: 20
        		}}
        	>
        		Description
        	</Text>
        	<Text style={{lineHeight: 20, width: 330, fontSize: 16}}>
        		{description}
        	</Text>
        </View>

        <View 
        	style={{
        		backgroundColor: "black", 
        		paddingBottom: 27, 
        		paddingTop: 27,
        		paddingLeft: 47,
        		marginTop: 15
        		// height: 93
        	}}
       	>
	        
        	<View style={{flex: 1, flexDirection: 'column'}}>
        		<Text button style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
        			Buyer Protection Guarantee
        		</Text>
        		<Text style={{color: 'white', fontSize: 14, marginTop: 5}}>
        			Receive your item as listed, or we'll reimburse you.
        		</Text>
        	</View>
	        
	      </View>

	      <View style={{marginTop: 15}}>
	      	<View style={styles.sellerSectionContent}>
	      		<View style={{flexDirection: 'row', flex: 1}}>
	      			<View style={styles.sellerSectionHeadshot} />
	      			<Text style={{fontSize: 20, lineHeight: 24, fontWeight: 'bold', marginTop: 24}}>
	      				{name}
	      			</Text>
	      		</View>

	      		<View style={{marginTop: 24}}>
	      			<View style={{flexDirection: 'row'}}>
	      				<Text style={{fontSize: 14, lineHeight: 16, color: "#A3A3A2", marginRight: 70}}>
	      					Verified:
	      				</Text>

	      				<View style={{flexDirection: 'row'}}>
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
	      			</View>

	      			<View style={{flexDirection: 'row', marginTop: 16}}>
	      				<Text style={{fontSize: 14, lineHeight: 16, color: "#A3A3A2", marginRight: 22}}>
	      					Response Rate:
	      				</Text>

	      				<Text style={{fontSize: 14, lineHeight: 20}}>
	      					100%
	      				</Text>
	      			</View>

	      			<View style={{flexDirection: 'row', marginTop: 16}}>
	      				<Text style={{fontSize: 14, lineHeight: 16, color: "#A3A3A2", marginRight: 20}}>
	      					Response Time:
	      				</Text>

	      				<Text style={{fontSize: 14, lineHeight: 20}}>
	      					Within an hour
	      				</Text>
	      			</View>

	      			<View style={{flexDirection: 'row', marginTop: 16}}>
	      				<Text style={{fontSize: 14, lineHeight: 16, color: "#A3A3A2", marginRight: 22, width: 102}}>
	      					Total Transactions
	      				</Text>

	      				<Text style={{fontSize: 14, lineHeight: 20}}>
	      					8
	      				</Text>
	      			</View>
	      		</View>
	      	</View>
        	{/* <View style={styles.sellerSectionContent}>
          	<TouchableOpacity onPress={ () => { Actions.userProfilePage({ User: User }) }}>
	        		<View style={styles.sellerSectionHeadshot} />
        		</TouchableOpacity>

        		<View style={styles.sellerSectionContentTwo}>
        			<TouchableOpacity onPress={ () => { Actions.userProfilePage({ User: User }) }}>
        				<Text style={styles.sellerName}>{name}</Text>
        			</TouchableOpacity>
        			
        			<View style={styles.sellerConfirmSection}>
        				<Text style={{color: '#656464'}}>Confirmed</Text>
        				<FontAwesomeIcon name="facebook-f" size={20} color='#656464' style={{marginRight: 8, marginLeft: 8, marginTop: 2}}/>
        				<MaterialIcon name="email" size={20} color='#656464' style={{marginRight: 8, marginTop: 2}}/>
        				<MaterialIcon name="smartphone" size={20} color='#656464' style={{marginTop: 2}}/>
        			</View>
        		</View>
        	</View> */}

        	{/* <View style={styles.ratingSection}>
          	{
	        		ratingTypes.map((rating, index) => {
	        			return (
	        				<View key={index} style={styles.singleRating}>
	        					<Text style={styles.singleRatingType}>
	        						{rating.type}
	        					</Text>

	        					<Text style={styles.singleRatingValue}>
	        						{rating.value}
	        					</Text>
                  </View>
	        			);
	        		})
	        	}
          </View> */}

        	<Button style={styles.messageSellerButton}>
            <Text style={styles.messageSellerButtonText}>Message Seller</Text>
          </Button>
        </View>

        <View style={styles.blankLineTwo} />

        <View>
	        <View style={styles.reviewSection}>
	        	<View 
	        		style={{
	        			flexDirection: 'column',
	        			marginLeft: 16, 
	        			marginRight: 16,
	        			paddingTop: 32, 
	        			paddingBottom: 32, 
	        			borderBottomWidth: 1,
	        			borderBottomColor: "#ECEBEB"
	        		}}
	        	>
	        		<View style={{flexDirection: 'row'}}>
	        			<Text style={{fontWeight: 'bold', fontSize: 16}}>
	        				Reviews
	        			</Text>

	        			{
	        				OthersReviews.length >= 2 ?	
		        			<TouchableOpacity 
		        				style={{flexDirection: 'row', position: 'absolute', right: 0}}
		        				onPress={ () => { Actions.reviewPage({ OthersReviews: OthersReviews, User: User }) }}
		        			>
		        				<Ionicons name="ios-arrow-forward" color="#A3A3A2" size={22} style={{marginRight: 10}}/>
		        				<Text style={{fontWeight: 'bold', fontSize: 16}}>
		        					Read all
		        				</Text>
		        			</TouchableOpacity>
		        			: null
	        			}
	        		</View>

	        		{
	        			OthersReviews.length > 0 ?
	        			<React.Fragment>
		        			<View style={{flexDirection: 'row', marginTop: 16}}>
			        			<Text style={{fontSize: 14, marginRight: 10}}>
			        				4.8
			        			</Text>

			        			<StarRating
			                disabled={true}
			                maxStars={1}
			                rating={1}
			                fullStarColor="black"
			                starSize={16}
			                containerStyle={{width: 100}}
			              />
			        		</View>

			        		<Text style={{fontSize: 14, marginTop: 10}}>
			        			{OthersReviews.length} Reviews
			        		</Text>	
		        		</React.Fragment>
		        		:
		        		<Text style={{fontSize: 14, marginTop: 10}}>
		        			This user currently do not have any reviews.
		        		</Text>
	        		}
	        		
	        	</View>

	        	{/* <Text style={styles.reviewSectionTitle}>REVIEWS</Text>
	        	<View style={styles.singleReviewStars}>
	        		<StarRating
        				disabled={true}
        				maxStars={5}
        				rating={5}
        				fullStarColor="#FBDB0A"
        				starSize={20}
        				containerStyle={{width: 120}}
        			/>
	        		<Text style={styles.numbeOfReviews}>
	        			{OthersReviews.length}
	        		</Text>
	        	</View> */}

	        	{
	        		OthersReviews.slice(0, 2).map((review, index) => {
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

	        {/* {
	        	OthersReviews.length > 1 ?
	        	<TouchableOpacity
	        		onPress={ () => { Actions.reviewPage({ OthersReviews: OthersReviews, User: User }) }}
	        		style={styles.readAllReviewButton}
	        	>
			      	<Text style={styles.readAllReviewButtonText}>
			      		{`Read all ${OthersReviews.length} reviews`}
			      	</Text>
		      	</TouchableOpacity>
	        	: null
	        } */}
      	</View>
      	</SafeAreaView>
    	</React.Fragment>
    );
	}


	render() {
		const singleProduct = get(this.props, "singleProduct", {});
		const thumbnailUrl = `https://s3.us-east-2.amazonaws.com/swaptem/${singleProduct.ItemFiles[0].thumbPath}`;

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



