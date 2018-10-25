import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image} from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';
// import { connect } from 'react-redux';

class SearchResultPage extends Component {
	render() {
		return (
			<Container>
		    <Content style={{backgroundColor: 'white'}}>		   				
		      <List>
		      	<View>
		      		<Text>Sample Search Result</Text>
		      	</View>
		      </List>
		    </Content>
		  </Container>
		);
	}
}
	
export default SearchResultPage;