import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image} from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';
// import { connect } from 'react-redux';

class SampleComponent extends Component {

	render() {
		return (
			<Container>
        <Content style={{backgroundColor: 'white'}}>
   				
         	<List>
           		
 						<View style={{marginLeft: 20, marginTop: 25}}>
	         		<View style={{flex: 1, flexDirection: 'row'}}>
	         			<View 
	          			style={{ width: 50, 
	                    height: 50, 
	                    backgroundColor:'#959595',
	                    marginTop: 5,
	                    borderRadius: 50 }}
	          		/>
	          		<View style={{flex: 1, flexDirection: 'column', marginLeft: 15}}>
	          			<View style={{flex: 1, flexDirection: 'row'}}>
	          				<Text style={{fontWeight: 'bold', marginBottom: 5}}>Gabriel</Text>
	          				<Text style={{position: 'absolute', right: 20, color: "#959595"}}>4 hours ago</Text>
	          			</View>

	          			<Text numberOfLines={2} style={{width: 280, overflow: 'hidden'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor felis mauris, et dignissim lorem sagittis non.</Text>
	          		</View>
	         		</View>

	         		<View style={{flex: 1, flexDirection: 'row', marginTop: 25}}>
	         			<View 
	          			style={{ width: 50, 
	                    height: 50, 
	                    backgroundColor:'#959595',
	                    marginTop: 5,
	                    borderRadius: 50 }}
	          		/>
	          		<View style={{flex: 1, flexDirection: 'column', marginLeft: 15}}>
	          			<View style={{flex: 1, flexDirection: 'row'}}>
	          				<Text style={{fontWeight: 'bold', marginBottom: 5}}>Nick</Text>
	          				<Text style={{position: 'absolute', right: 20, color: "#959595"}}>12 hours ago</Text>
	          			</View>
	          			<Text numberOfLines={2} style={{width: 280, overflow: 'hidden'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor felis mauris, et dignissim lorem sagittis non.</Text>
	          		</View>
	         		</View>

	         		<View style={{flex: 1, flexDirection: 'row', marginTop: 25}}>
	         			<View 
	          			style={{ width: 50, 
	                    height: 50, 
	                    backgroundColor:'#959595',
	                    marginTop: 5,
	                    borderRadius: 50 }}
	          		/>
	          		<View style={{flex: 1, flexDirection: 'column', marginLeft: 15}}>
	          			<View style={{flex: 1, flexDirection: 'row'}}>
	          				<Text style={{fontWeight: 'bold', marginBottom: 5}}>Max</Text>
	          				<Text style={{position: 'absolute', right: 20, color: "#959595"}}>1 day ago</Text>
	          			</View>
	          			<Text numberOfLines={2} style={{width: 280, overflow: 'hidden'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor felis mauris, et dignissim lorem sagittis non.</Text>
	          		</View>
	         		</View>

	         		<View style={{flex: 1, flexDirection: 'row', marginTop: 25}}>
	         			<View 
	          			style={{ width: 50, 
	                    height: 50, 
	                    backgroundColor:'#959595',
	                    marginTop: 5,
	                    borderRadius: 50 }}
	          		/>
	          		<View style={{flex: 1, flexDirection: 'column', marginLeft: 15}}>
	          			<View style={{flex: 1, flexDirection: 'row'}}>
	          				<Text style={{fontWeight: 'bold', marginBottom: 5}}>Christine</Text>
	          				<Text style={{position: 'absolute', right: 20, color: "#959595"}}>2 days ago</Text>
	          			</View>
	          			<Text numberOfLines={2} style={{width: 280, overflow: 'hidden'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor felis mauris, et dignissim lorem sagittis non.</Text>
	          		</View>
	         		</View>
           	</View>

           	
          </List>
        </Content>
     	</Container>
		);
	}
}

export default SampleComponent;

