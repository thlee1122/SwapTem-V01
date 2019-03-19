import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                                  from 'react-native-router-flux';
// import { Permissions, Contacts }                                           from 'expo';

import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { connect }                                     from 'react-redux';


class SingleContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactSelected: false
    };

    this.contactSelected = false;
  }

  handleSelect = (fullName, mobileNumber, index) => {
    const { handleSelectContact } = this.props;

    this.setState({
      contactSelected: !this.state.contactSelected
    });

    this.contactSelected = !this.contactSelected;

    handleSelectContact(fullName, mobileNumber, index, this.contactSelected);
  }

  render() {

    const { fullName, mobileNumber, handleSelectContact, index } = this.props;

    return (
      <TouchableOpacity
        key={index}
        style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#959595"}}
        onPress={() => { this.handleSelect(fullName, mobileNumber, index); }}
      >
        <MaterialCommunityIcons 
          name="check-circle-outline" size={25} color={this.state.contactSelected === false ? "#959595" : "#007aff"} 
          style={{alignSelf: 'center', marginLeft: 10}}
        />
        <View style={{flexDirection: 'column', marginTop: 10, marginBottom: 10, marginRight: 20, marginLeft: 10}}>
          <Text style={{fontSize: 20, fontWeight: '500', marginBottom: 5}}>
            {fullName}
          </Text>

          <Text>
            {mobileNumber}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SingleContact;

