import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableHighlight, TouchableOpacity} from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { connect } from 'react-redux';

class ReportPage extends Component {

	constructor(props) {
    super(props);
    this.state = { 
      reportCategoryClicked: false 
    };

    this.reportCategoryClicked = false;
    this.reportCategoryName = "";
  }

	handleReportCategory = (name) => {

		if(this.state.reportCategoryClicked === false) {
			this.setState({
				reportCategoryClicked: true
			});

			this.reportCategoryName = name;

		} else if(this.state.reportCategoryClicked === true) {
			
			if(this.reportCategoryName !== name) {
				this.setState({
					reportCategoryClicked: false
				});

				this.reportCategoryName = name;

			} else {
				this.setState({
					reportCategoryClicked: false
				});

				this.reportCategoryName = "";
			}
		}
	}

	render() {
		const reportCategory = 
			[ "Prohibited Item", 
				"Stolen Photos", 
				"Counterfeit Items", 
				"Advertising/Soliciting", 
				"Trades/Offline Transactions",
				"Coupons/Voucher",
				"Inappropriate Content",
				"Digital Items",
				"Other"
			];

		return (
			<Container>
        <Content style={{backgroundColor: 'white'}}>
         	<List style={{marginLeft: 20, marginTop: 30, marginRight: 20}}>
         		<Text style={{fontWeight: 'bold', marginBottom: 20}}>Choose a reason for reporting</Text>

         		<View style={{display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
         			{
         				reportCategory.map((category, index) => {
         					return(
         						<View style={{alignItems: 'center'}} key={index}>
	         						<TouchableOpacity 
		         						onPress={(e) => this.handleReportCategory(category)} 
		         					>
		         						{
				         					this.reportCategoryName === category ?
				         						<View 
				         							style={{ 
						        						width: 80, 
						                		height: 80,
						                		marginTop: 5,
						                		borderRadius: 50,
						                		position: 'absolute',
						                		zIndex: 1
						                	}}
						               	>
						               		<FontAwesomeIcon name="check" size={35} color="#00529b" style={{zIndex: 100, alignSelf: 'center', marginTop: 20}}/>
				         						</View>
				         					:
				         					<React.Fragment></React.Fragment>
				         				}
		         						<View 
						        			style={{ 
						        				width: 80, 
						                height: 80, 
						                backgroundColor:'#959595',
						                marginTop: 5,
						                borderRadius: 50,
						                borderWidth: this.reportCategoryName === category ? 3 : 0,
						                borderColor: this.reportCategoryName === category ? "#00529b" : "transparent"
						             	}}
						        		/>
		         					</TouchableOpacity>
		         					<Text 
		         						style={{
		         							fontSize: 13, 
		         							marginTop: 10, 
		         							fontWeight: 'bold',
		         							width: 100,
		         							textAlign: 'center',
		         							marginBottom: 20
		         						}}
		         					>
		         						{category}
		         					</Text>
		         				</View>
         					)
         				})
         			}
         		</View>

         		{
         			this.state.reportCategoryClicked === true ?
	         		<Button 
	        			style={{
	        				backgroundColor: '#00529b', 
	        				borderRadius: 15, 
	        				marginRight: 10, 
	        				width: 200, 
	        				marginTop: 30, 
	        				alignItems: 'center', 
	        				alignSelf: 'center'
	        			}}>
	              <Text style={{fontSize: 15, textAlign: 'center', marginLeft: '30%'}}>Submit</Text>
	            </Button> 
         			:
         			<React.Fragment></React.Fragment>
         		}
          </List>
        </Content>
     	</Container>
		);
	}
}

export default ReportPage;

