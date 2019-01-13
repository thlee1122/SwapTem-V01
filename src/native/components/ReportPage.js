import React, { Component } 																	from 'react';
// import { connect } from 'react-redux';
import { View, Image, TouchableOpacity} 											from 'react-native';
import { Container, Content, List, Text, Button } 						from 'native-base';
import FontAwesomeIcon 																				from 'react-native-vector-icons/FontAwesome';
import styles                                             		from '../styles/ReportPageStyles';

class ReportPage extends Component {
	constructor(props) {
    super(props);
    this.state = { 
      reportCategoryClicked: false 
    };

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
		const reportCategory = [ "Prohibited Item", "Stolen Photos", "Counterfeit Items", 
				"Advertising/Soliciting", "Trades/Offline Transactions", "Coupons/Voucher",
				"Inappropriate Content", "Digital Items", "Other" ];

		return (
			<Container>
        <Content style={styles.contentSection}>
         	<List style={styles.listSection}>
         		<Text style={styles.reportPageTitle}>Choose a reason for reporting</Text>

         		<View style={styles.reportContent}>
         			{
         				reportCategory.map((category, index) => {
         					return(
         						<View style={styles.reportCategory} key={index}>
	         						<TouchableOpacity onPress={(e) => this.handleReportCategory(category)}>
		         						{
				         					this.reportCategoryName === category ?
				         						<View style={styles.reportCategoryCheckCircle}>
						               		<FontAwesomeIcon name="check" size={35} color="#00529b" style={{zIndex: 100, alignSelf: 'center', marginTop: 20}}/>
				         						</View>
				         					: null
				         				}
		         						<View 
		         							style={[styles.reportCategoryCircle, {
		         								borderWidth: this.reportCategoryName === category ? 3 : 0,
						                borderColor: this.reportCategoryName === category ? "#00529b" : "transparent"}]}
						        		/>
		         					</TouchableOpacity>
		         					<Text style={styles.reportCategoryTitle}>
		         						{category}
		         					</Text>
		         				</View>
         					)
         				})
         			}
         		</View>

         		{
         			this.state.reportCategoryClicked === true ?
	         		<Button style={styles.submitButton}>
	              <Text style={styles.submitButtonText}>Submit</Text>
	            </Button> 
         			: null
         		}
          </List>
        </Content>
     	</Container>
		);
	}
}

export default ReportPage;

