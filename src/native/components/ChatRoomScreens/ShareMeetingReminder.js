import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity, Dimensions }                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                                  from 'react-native-router-flux';
// import { Permissions, Contacts }                                           from 'expo';

import { MaterialIcons } from '@expo/vector-icons';
// import { connect }                                     from 'react-redux';


class ShareMeetingReminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNum: 1,
      name: "",
      phoneNumber: "",
      count: 0,
      remindType: ""
    };
  }

  componentWillMount = () => {
    const { selectedContactList } = this.props;
    const fullName = selectedContactList[0].fullName;
    const mobileNumber = selectedContactList[0].mobileNumber;

    this.setState({
      name: fullName,
      phoneNumber: mobileNumber
    });
  }

  handleRemindSelection = (remindType) => {
    this.setState({
      remindType: remindType
    });
  }

  handleSubmitButton = (buttonType) => {
    console.log("!!! handleSubmitButton buttonType", buttonType);
    const { selectedContactList } = this.props;
    let fullName = "";
    let mobileNumber = "";

    if(buttonType === "Next") {
      fullName = selectedContactList[this.state.count + 1].fullName;
      mobileNumber = selectedContactList[this.state.count + 1].mobileNumber;

      this.setState({
        pageNum: this.state.pageNum + 1,
        name: fullName,
        phoneNumber: mobileNumber,
        remindType: "",
        count: this.state.count + 1
      });
    } else if(buttonType === "Confirm") {
      Actions.trustedContactConfirmPage({selectedContactList: selectedContactList});
    }
  }


  render() {
    const { selectedContactList } = this.props;
    const { height, width } = Dimensions.get('window');

    console.log("@@@@@ selectedContactList", selectedContactList);

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <View style={{marginLeft: 20, marginRight: 20, marginTop: 40, marginBottom: 20, height: height*0.7}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16, marginBottom: 10}}>
                {`${this.state.pageNum} / ${selectedContactList.length}`}
              </Text>
              <Text style={{fontSize: 18, fontWeight: '500', lineHeight: 23, letterSpacing: 2}}>
                {`When would you like to be reminded to share meetings with ${this.state.name} ${this.state.phoneNumber}?`}
              </Text>
            </View>

            <View style={{flexDirection: 'column', marginTop: 35}}>
              <TouchableOpacity 
                style={{borderTopWidth: 1, borderTopColor: "#959595", flexDirection: 'row'}}
                onPress={() => { this.handleRemindSelection("remindEveryMeeting"); }}
              >
                <Text style={{fontSize: 16, paddingLeft: 5, paddingRight: 5, paddingTop: 25, paddingBottom: 25}}>
                  Automatically remind me before every meeting
                </Text>
                {
                  this.state.remindType === "remindEveryMeeting" ?
                  <MaterialIcons name="check" size={20} color="black" style={{position: 'absolute', right: 0, alignSelf: 'center'}}/>
                  : null
                }
              </TouchableOpacity>

              <TouchableOpacity 
                style={{borderTopWidth: 1, borderTopColor: "#959595", flexDirection: 'row'}}
                onPress={() => { this.handleRemindSelection("remindAtNight"); }}
              >
                <Text style={{fontSize: 16, paddingLeft: 5, paddingRight: 5, paddingTop: 25, paddingBottom: 25}}>
                  Remind me at night (3PM to 6AM)
                </Text>

                {
                  this.state.remindType === "remindAtNight" ?
                  <MaterialIcons name="check" size={20} color="black" style={{position: 'absolute', right: 0, alignSelf: 'center'}}/>
                  : null
                }
              </TouchableOpacity>

              <TouchableOpacity 
                style={{borderTopWidth: 1, borderTopColor: "#959595", borderBottomWidth: 1, borderBottomColor: "#959595", flexDirection: 'row'}}
                onPress={() => { this.handleRemindSelection("shareManually"); }}
              >
                <Text style={{fontSize: 16, paddingLeft: 5, paddingRight: 5, paddingTop: 25, paddingBottom: 25}}>
                  Don't remind me. I'll share manually
                </Text>

                {
                  this.state.remindType === "shareManually" ?
                  <MaterialIcons name="check" size={20} color="black" style={{position: 'absolute', right: 0, alignSelf: 'center'}}/>
                  : null
                }
              </TouchableOpacity>
            </View>

          </View>
          <TouchableOpacity
            style={{
              backgroundColor: this.state.remindType === "" ? "#DFDFDF" : '#007aff', 
              width: 250, 
              height: 50, 
              alignSelf: 'center', 
              borderRadius: 5, 
              marginTop: 30,
              position: 'absolute',
              bottom: 0
            }}
            disabled={ this.state.remindType === "" ? true : false}
            onPress={() => { this.handleSubmitButton(this.state.pageNum < selectedContactList.length ? 'Next' : 'Confirm'); }}
          >
            <Text 
              style={{
                color: this.state.remindType === "" ? "#A2A2A2" : 'white', 
                fontWeight: '500', 
                fontSize: 20, 
                flex: 1, 
                textAlign: 'center', 
                marginTop: 10
              }}
            >
              {this.state.pageNum < selectedContactList.length ? 'Next' : 'Confirm'}
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default ShareMeetingReminder;

