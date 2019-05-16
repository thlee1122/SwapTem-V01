import React, { Component } 																	from 'react';
import get                                                    from 'lodash.get';
import { connect }                                            from 'react-redux';
import { View, Image, TouchableOpacity, TextInput, 
				 Dimensions } 																				from 'react-native';
import { Container, Content, Text } 													from 'native-base';
import { getMetadata }                                     		from '../../actions/registerItemActions';
import { Switch }                                   					from 'react-native-switch';
import { Fumi } 																							from 'react-native-textinput-effects';
import MaterialIcons 																					from 'react-native-vector-icons/MaterialIcons';
import styles                                                 from '../styles/SearchResultPageStyles';

class SearchResultPage extends Component {
	constructor(props) {
    super(props);
    this.state = { 
      textValue: "",
      sampleSearchAlertTopics: [
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
			]
    };

    this.currentUserId = "";
  }

  componentWillMount() {
  	this.props.getMetadata();
  }

	handleSwitch = (item, value, idx) => {
		let newSearchAlertTopics = [...this.state.sampleSearchAlertTopics];
		newSearchAlertTopics[idx].toggleStatus = !newSearchAlertTopics[idx].toggleStatus;

		this.setState({
			sampleSearchAlertTopics: newSearchAlertTopics
		});
	}

	highlightText = (fullText, query, idx) => {
    let   newText = '';
    const reg     = new RegExp(query, 'gi');
    newText       = fullText.replace(reg, function(query) { 
      return `<mark class="tt-suggestion-mark" data-attr-idx=${idx}>${query}</mark>`;});

    return newText;
  }

	render() {
		const registerItem = get(this.props, "registerItem", {});
		const metadata = get(registerItem, "metadata", {});
    const metaDatatags = get(metadata, "tags", []);
    const { height, width } = Dimensions.get('window');

		let searchResults = metaDatatags.filter((tag) => {
			return ((tag.text).toLowerCase()).startsWith(this.state.textValue.toLowerCase()) === true
		});

		return (
			<Container>
		    <Content style={styles.searchResultPage}>
      		<Fumi
				    label={'Search'}
				    iconClass={MaterialIcons}
				    iconName={'search'}
				    iconColor={'#000000'}
				    iconSize={20}
				    inputPadding={16}
				    onChangeText={(text) => { this.setState({textValue: text}) }}
				    inputStyle={styles.searchBarInput}
				    labelStyle={styles.searchBarLabel}
				    style={styles.searchBarContainer}
				  />

				  {
				  	this.state.textValue !== "" && searchResults.length > 0 ?
				  	<View style={styles.suggestedSearchSection}>
				  		<Text style={styles.suggestedSearchSectionTitle}>
				  			{`Suggested Searches (${searchResults.length} results)`}
				  		</Text>

				  		{
				  			searchResults.map((result, index) => {
				  				let newText = this.highlightText(result.text, this.state.textValue, index);
				  				let newResultText = result.text.charAt(0).toUpperCase() + result.text.slice(1)

				  				return (
				  					<TouchableOpacity key={index} style={styles.singleSearchResult}>
					  					<Text 
					  						style={styles.singleSearchResultText}
					  						dangerouslySetInnerHTML={{__html: newText}}
					  					>
					  						{newResultText}
					  					</Text>
					  					<Text style={styles.singleSearchResultSubtext}>
					  						{`${result.itemCount} searches`}
					  					</Text>
				  					</TouchableOpacity>
				  				)
				  			})
				  		}
				  	</View> : null
				  }

				  {
				  	this.state.textValue === "" ?
				  	<View style={styles.searchAlertSection}>
		      		<Text style={styles.searchAlertSectionTitle}>
		      			Search Alerts
		      		</Text>
		      		
		      		<View style={{flexDirection: 'column'}}>
		      			{
		      				this.state.sampleSearchAlertTopics.map((item, index) => {
		      					return (
		      						<View style={styles.singleSearchAlert} key={index}> 
		      							<Text style={styles.singleSearchAlertText}>
		      								{item.topicName}
		      							</Text>

		      							<Switch
					                value={item.toggleStatus}
					                onValueChange={ (val) => this.handleSwitch(item, val, index)}
					                circleSize={25}
					                barHeight={25}
					                circleBorderWidth={1}
					                backgroundActive={'#000000'}
					                switchWidthMultiplier={2.2}
					                switchLeftPx={1.7}
					                switchRightPx={1.7}
					                style={styles.singleSearchAlertSwitch}
					              />
		      						</View>
		      					);
		      				})
		      			}
		      		</View>
		      	</View> : null
				  }
	      	
	      	{
	      		this.state.textValue === "" ?
	      		<View sytle={styles.buttonSection}>
			      	<TouchableOpacity style={styles.manageButton}>
		      			<Text style={styles.manageButtonText}>
		      				Manage Notifications
		      			</Text>
		      		</TouchableOpacity>
	      		</View> : null
	      	}
		    </Content>
		  </Container>
		);
	}
}

const mapStateToProps = state => ({
	registerItem: state.registerItem || {},
});

const mapDispatchToProps = {
  getMetadata: getMetadata
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultPage);

