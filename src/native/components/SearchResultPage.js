import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';

import { Switch }                                   from 'react-native-switch';
import { Fumi } from 'react-native-textinput-effects';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import { connect } from 'react-redux';

class SearchResultPage extends Component {

	constructor(props) {
    super(props);
    this.state = { 
      textValue: "",
    };

    this.currentUserId = "";
  }

	handleSwitch = (topicName, value) => {
		// console.log("@@@@ topicName", topicName);
		// console.log("@@@@ value", value);
	}

	highlightText = (fullText, query, idx) => {
    let   newText = '';
    const reg     = new RegExp(query, 'gi');
    newText       = fullText.replace(reg, function(query) { 
      return `<mark class="tt-suggestion-mark" data-attr-idx=${idx}>${query}</mark>`;});

    return newText;
  }

 // if(!!group && !!group['doclist'] && !!group['doclist']['docs'] && group['doclist']['docs'].length){
 //  if(group.groupValue == 'research'){
 //    suggestionsList = group['doclist']['docs'].map( (doc, idx) => {
 //      let text = self.hightLightText(doc.GGTITLE, query, idx);

 //      if(!text.length) text = doc.GGTITLE;
 //      return (
 //        <li 
 //          onClick={(e) => this.redirectUser(e, idx)}
 //          data-attr-group={group.groupValue} 
 //          data-attr-id={doc.RES_ID} 
 //          data-attr-qid={qid}
 //          key={group.groupValue+doc.RES_ID} 
 //          className="tt-suggestion tt-selectable" dangerouslySetInnerHTML={{__html: text}}></li>
 //      );
 //    });


	render() {
		const { metaDatatags } = this.props;

		const sampleSearchAlertTopics = [
			{
				topicName: "MacBook",
				toggleStatus: true
			},

			{
				topicName: "Smartphone",
				toggleStatus: true
			},

			{
				topicName: "Smart Home",
				toggleStatus: false
			},

			{
				topicName: "Bike",
				toggleStatus: false
			},
		];

		let searchResults = metaDatatags.filter((tag) => {
			// return (tag.text).indexOf((this.state.textValue).toLowerCase()) !== -1
			return (tag.text).startsWith(this.state.textValue) === true
		});

		console.log("@@@@ inside SearchResultPage metaDatatags", metaDatatags);
		console.log("@@@@ inside SearchResultPage searchResults", searchResults);

		return (
			<Container>
		    <Content style={{backgroundColor: 'white'}}>

	      	{/* <TextInput
	      		style={{
	      			borderWidth: 1, 
	      			borderRadius: 5, 
	      			borderColor: "#007aff", 
	      			flex: 1,
	      			marginRight: 10,
	      			marginLeft: 10,
	      			height: 50
	      		}}
      			onChangeText={(text) => this.setState({text})}
      			value={this.state.text}
      			placeholder="Search SwapTem"
      			inlineImageLeft='search_icon'
      		/> */}
      		<Fumi
				    label={'Search SwapTem'}
				    iconClass={MaterialIcons}
				    iconName={'search'}
				    iconColor={'#007aff'}
				    iconSize={22}
				    iconWidth={40}
				    inputPadding={16}
				    onChangeText={(text) => { this.setState({textValue: text}) }}
				    inputStyle={{
				    	color: '#007aff',
				    	fontWeight: '500'
				    }}
				    labelStyle={{
				    	color: 'black',
				    	fontWeight: '500'
				    }}
				    style={{
				    	backgroundColor: "#EAEAEA"
				    }}
				  />

				  {
				  	this.state.textValue !== "" && searchResults.length > 0 ?
				  	<View style={{flexDirection: 'column', margin: 10, borderBottomWidth: 1, borderBottomColor: "#959595", paddingBottom: 25}}>
				  		<Text style={{fontSize: 18, color: "#959595", marginBottom: 20}}>
				  			Suggested Searches
				  		</Text>

				  		{
				  			searchResults.map((result, index) => {
				  				let newText = this.highlightText(result.text, this.state.textValue, index);

				  				return (
				  					<TouchableOpacity key={index} style={{flexDirection: 'row', marginBottom: 15}}>
					  					<Text 
					  						style={{fontSize: 25, fontWeight: "500", letterSpacing: 2}}
					  						dangerouslySetInnerHTML={{__html: newText}}
					  					>
					  						{result.text}
					  					</Text>
					  					<Text 
					  						style={{
					  							fontSize: 16, 
					  							position: 'absolute', 
					  							right: 0, 
					  							alignSelf: 'center', 
					  							marginTop: 2, 
					  							letterSpacing: 2,
					  							color: "#959595"
					  						}}
					  					>
					  						{`${result.itemCount} searches`}
					  					</Text>
				  					</TouchableOpacity>
				  				)
				  			})
				  		}
				  	</View>
				  	: null
				  }


	      	<View style={{flexDirection: 'column', marginRight: 10, marginLeft:10, marginTop: 30}}>
	      		<Text style={{fontSize: 18, color: "#959595", marginBottom: 20}}>
	      			Search Alerts
	      		</Text>

	      		
	      		<View style={{flexDirection: 'column'}}>
	      			{
	      				sampleSearchAlertTopics.map((item, index) => {
	      					return (
	      						<View style={{flexDirection: 'row', marginBottom: 20}} key={index}> 
	      							<Text style={{fontSize: 25, fontWeight: '500', letterSpacing: 2, flex: 1}}>
	      								{item.topicName}
	      							</Text>

	      							<Switch
				                value={item.toggleStatus}
				                onValueChange={ (val) => this.handleSwitch(item.topicName, val)}
				                circleSize={25}
				                barHeight={25}
				                circleBorderWidth={1}
				                backgroundActive={'#3578e5'}
				                switchWidthMultiplier={2.2}
				                switchLeftPx={1.7}
				                switchRightPx={1.7}
				                style={{position: 'absolute', right: 0}}
				                // style={styles.tradeSelectionSwitch}
				              />
	      						</View>
	      					);
	      				})
	      			}
	      		</View>

	      		<TouchableOpacity style={{marginTop: 5}}>
	      			<Text style={{fontSize: 20, fontWeight: 'bold', color: "#007aff", letterSpacing: 2}}>
	      				Manage Notifications
	      			</Text>
	      		</TouchableOpacity>
	      	</View>
		    </Content>
		  </Container>
		);
	}
}
	
export default SearchResultPage;