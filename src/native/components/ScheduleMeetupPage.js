import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, PanResponder, Linking, Platform } from 'react-native';
import { Button, Container, Content, Tabs, Tab, TabHeading, Card, CardItem, List, ListItem } from 'native-base';
// import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import DateTimePicker from 'react-native-modal-datetime-picker';
import gmoment from '../../lib/gmoment/index';
import { userSelectedMeetupLocation } from '../data/sampleScheduleMeetupData';
import styles                                       from '../styles/ScheduleMeetupPageStyles';

class ScheduleMeetupPage extends Component {
	constructor(props) {
    super(props);

    this.state = {
      disableSendButton: true,
      isDatePickerVisible: false,
      pickerType: "date",
      dateSelectionText: "Select a date",
      timeSelectionText: "Select a time",
      currentIndex: "",
    }

    this.meetingSchedule = {
      locationName: "",
      address: "",
      date: "",
      time: ""
    }
  }

  openMap = (latitude, longitude) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  }

  handleLocationCardSelection = (index, location) => {
    this.setState({
      currentIndex: index
    })

    let newAddress = location.address + ", " + location.city + " " + location.state + " " + location.zipCode;

    this.meetingSchedule.locationName = location.name;
    this.meetingSchedule.address = newAddress;
  }

  renderCarouselCard = (locations) => {
    let singleLocation = locations.item;
    let index = locations.index;

    return (
      <TouchableOpacity onPress={() => this.handleLocationCardSelection(index, singleLocation)}>
        <View 
          style={[styles.locationCard,
            {borderWidth: this.state.currentIndex === index ? 5 : 1,
            borderColor: this.state.currentIndex === index ? "#007aff" : "#9E9E9E"}]} 
          key={index}
        >
          <TouchableOpacity onPress={() => this.openMap(singleLocation.latitude, singleLocation.longitude)}>
            <Image 
              source={{uri: "https://s3.amazonaws.com/tinycards/image/2092b7025b4b09d5d5df576f15c631aa"}}
              style={[styles.locationImage, {width: this.state.currentIndex === index ? 210 : 220}]}
            />
          </TouchableOpacity>
          <Text style={styles.locationName}>
            {singleLocation.name}
          </Text>

          <Text style={styles.locationAddress}>
            {`${singleLocation.address}, ${singleLocation.city}, ${singleLocation.state} ${singleLocation.zipCode}`}
          </Text>

          <Text style={styles.locationSelectButton}>
            SELECT
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  showDateTimePicker = (pickerType) => {
    if(pickerType === "datePicker") {
      this.setState({
        isDatePickerVisible: true,
        pickerType: "date"
      });

    } else if(pickerType === "timePicker") {
      this.setState({
        isDatePickerVisible: true,
        pickerType: "time"
      });
    }
  }

  hideDateTimePicker = () => {  
    this.setState({
      isDatePickerVisible: false
    });
  }

  handleDateTimePicked = (date, pickerType) => {
    if(this.state.pickerType === "date") {
      let splitted = (JSON.stringify(date).substring(1,11)).split("-");
      let splittedArray = [];
      
      for(let i = 0; i < splitted.length; i++) {
        if(i !== 2) {
          splittedArray.push(splitted[i]);

        } else if(i === 2) {
          let newValue = Number(splitted[i])-1;
          splittedArray.push(newValue !== 0 ? newValue : 1);
        }
      }

      let newDate = gmoment(splittedArray.join("-")).format("MMMM DD YYYY");

      this.meetingSchedule.date = newDate;

      this.setState({
        dateSelectionText: newDate
      });

    } else if(this.state.pickerType === "time") {
      let stringTime = date.toLocaleTimeString();
      let amPM = stringTime.split(" ")[1];
      let timePart = (((stringTime.split(" ")[0]).split(":")).slice(0,2)).join(":");
      let newTime = timePart + " " + amPM;

      this.meetingSchedule.time = newTime;

      this.setState({
        timeSelectionText: newTime
      });
    }

    this.hideDateTimePicker();
  }

	render() {
    const { swapCard } = this.props;

		return (
			<Container>
        <Content style={styles.scheduleMeetupPage}>          
          <View style={styles.scheduleMeetupPageContent}>
            <View>
              <Text style={styles.scheduleMeetupPageTitle}>
                Select a Location
              </Text>

              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={userSelectedMeetupLocation}
                renderItem={this.renderCarouselCard}
                sliderWidth={360}
                itemWidth={230}
                containerCustomStyle={{ marginRight: 20 }}
                contentContainerCustomStyle={{ marginLeft: -65 }}
              />
            </View>

            <View style={styles.dateSection}>
              <Text style={styles.dateSectionTitle}>Date</Text>
              <TouchableOpacity onPress={(e) => this.showDateTimePicker("datePicker")}>
                <Text style={styles.dateSectionText}>
                  {this.state.dateSelectionText}
                </Text>
              </TouchableOpacity>

              <DateTimePicker
                isVisible={this.state.isDatePickerVisible}
                onConfirm={(date) => this.handleDateTimePicked(date, "datePicker")}
                onCancel={(e) => this.hideDateTimePicker()}
                mode={this.state.pickerType}
                datePickerModeAndroid="calendar"
                titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
                datePickerContainerStyleIOS={{ marginBottom: 30 }}
                reactNativeModalPropsIOS={{ style:{marginBottom: 0} }}
              />
            </View>

            <View style={styles.timeSection}>
              <Text style={styles.timeSectionTitle}>Time</Text>
              <TouchableOpacity onPress={(e) => this.showDateTimePicker("timePicker")}>
                <Text style={styles.timeSectionText}>
                  {this.state.timeSelectionText}
                </Text>
              </TouchableOpacity>
            </View>

            <Button 
              style={styles.sendMeetingButton}
              disabled={
                this.meetingSchedule.address !== "" && this.meetingSchedule.date !== "" && this.meetingSchedule.time !== "" ? false
                : true
              }>
              <Text style={styles.sendMeetingButtonText}>
                Send meeting
              </Text>
            </Button>
          </View>
        </Content>
     	</Container>
		);
	}
}

export default ScheduleMeetupPage;

