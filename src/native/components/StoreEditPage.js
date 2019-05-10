import React                                                    from 'react';
import get                                                      from 'lodash.get';
import { View, Image, TouchableOpacity, Dimensions,
         TextInput, FlatList }                                  from 'react-native';
import { Container, Content, List, ListItem, Body, 
         Left, Right, Text, Button, Tabs, Tab, 
         TabHeading, Card, CardItem, ScrollableTab }            from 'native-base';
import { Actions }                                              from 'react-native-router-flux';
import FeatherIcon                                              from 'react-native-vector-icons/Feather';
import MaterialIcon                                             from 'react-native-vector-icons/MaterialIcons';
import { Dropdown }                                             from 'react-native-material-dropdown';
import styles                                                   from '../styles/ProfileStyles';

class StoreEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.userItemNames = [];
    this.backgroundColors = [
      {color: "#E6F4FF", colorName: 'Aqua'},
      {color: "#A9A9A9", colorName: "Dark Gray"},
      {color: "#FAFAD2", colorName: "Light Golden Yellow"},
      {color: "#FFEBCD", colorName: "Blanched Almond"},
      {color: "#00BFFF", colorName: "Deep Sky Blue"}
    ];
  }

  state = {
    selectedBackgroundColorName: "Please select a color",
    selectedBackgroundColor: "",
    backgroundSectionClicked: false,
    storeTitle: "Welcome to Zoltowski's Shop",
    welcomeMessage: "One-of-a-kind unique items for every kind of men",
    selectedStandoutItem: "Please select a standout item."
  }

  componentWillMount() {
    const { userItems } = this.props;

    userItems.map((item, index) => {
      const hashTags = item.HashTags; 
      const tempHashTags = [];

      hashTags.map((item, index) => {
        tempHashTags.push(item.text);
      })

      let itemTitle = {value: tempHashTags.join(" ")};
      this.userItemNames.push(itemTitle);
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.selectedStandoutItem !== nextProps.selectedStandoutItem) {
      this.setState({
        selectedStandoutItem: nextProps.selectedStandoutItem
      });
    }
  }

  handleBackgroundClick = () => {
    this.setState({
      backgroundSectionClicked: !this.state.backgroundSectionClicked
    });
  };

  handleSingleBackground = (item) => {
    this.setState({
      backgroundSectionClicked: !this.state.backgroundSectionClicked,
      selectedBackgroundColorName: item.colorName,
      selectedBackgroundColor: item.color
    })
  };

  handleStandOutClick = () => {
    const { userItems } = this.props;
    Actions.standOutSelection({ userItems: userItems });
  }

  render() {
    const { height, width } = Dimensions.get('window');

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <View style={{paddingTop: 32, paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
            <View>
              <Text style={{fontSize: 14, lineHeight: 16, color: "#A3A3A2", marginBottom: 6}}>
                Background
              </Text>

              <TouchableOpacity 
                style={{
                  height: 56, 
                  // flex: 1, 
                  paddingTop: 14, 
                  paddingBottom: 14, 
                  borderBottomWidth: 1, 
                  borderBottomColor: "#A3A3A2",
                  flexDirection: 'row'
                }}
                onPress={(e) => this.handleBackgroundClick()}
              > 
                {
                  this.state.selectedBackgroundColorName !== "Please select a color" ?
                  <View
                    style={{
                      backgroundColor: this.state.selectedBackgroundColor,
                      borderRadius: 50, 
                      width: 32, 
                      height: 32,
                      marginRight: 10
                    }}
                  /> : null
                }

                <Text style={{fontSize: 18, marginTop: 4}}>
                  {this.state.selectedBackgroundColorName}
                </Text>

                <MaterialIcon 
                  name= {this.state.backgroundSectionClicked === false ? "keyboard-arrow-down" : "keyboard-arrow-up"}
                  size={24} 
                  color="#A3A3A2"
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginTop: 18
                  }}
                />
              </TouchableOpacity>

              {
                this.state.backgroundSectionClicked === true ?
                <FlatList
                  style={{borderColor: '#A3A3A2', borderWidth: 1, height: 165}}
                  data={this.backgroundColors}
                  keyExtractor={backgroundColor=> backgroundColor.color}
                  renderItem={({ item }) => {
                    return (
                      <ListItem style={{marginLeft: 0}}>
                        <TouchableOpacity 
                          style={{flex: 1, flexDirection: 'row'}}
                          onPress={(e) => this.handleSingleBackground(item)}
                        >
                          <View
                            style={{
                              borderRadius: 50,
                              width: 28, 
                              height: 28,
                              marginRight: 16,
                              backgroundColor: item.color,
                              marginLeft: 16
                            }}
                          />

                          <Text style={{paddingTop: 2, paddingBottom: 2, fontSize: 16}}>
                            {item.colorName}
                          </Text>
                        </TouchableOpacity>
                      </ListItem>
                    );
                  }}
                /> : null
              }
            </View>

            <View style={{marginTop: width * 0.0579}}>
              <Text style={{fontSize: 14, lineHeight: 16, color: "#A3A3A2", marginBottom: 6}}>
                Title
              </Text>

              <View
                style={{
                  height: 56, 
                  flex: 1, 
                  paddingTop: 14, 
                  paddingBottom: 14, 
                  borderBottomWidth: 1, 
                  borderBottomColor: "#A3A3A2",
                }}
              > 
                <TextInput
                  onChangeText={(text) => this.setState({storeTitle: text})}
                  value={this.state.storeTitle}
                  maxLength={40}
                  underlineColorAndroid="transparent"
                  style={{
                    paddingBottom: 0, 
                    fontSize: 18
                  }}
                />
              </View>
              <Text 
                style={{
                  fontSize: 14, 
                  color: this.state.storeTitle.length === 40 ? "red" : "#A3A3A2", 
                  marginTop: 5, 
                  textAlign: 'right'
                }}
              >
                {`${(this.state.storeTitle).length} / 40 characters`}
              </Text>
            </View>

            <View style={{marginTop: width * 0.0579}}>
              <Text style={{fontSize: 14, lineHeight: 16, color: "#A3A3A2", marginBottom: 6}}>
                Welcome message
              </Text>

              <TextInput
                onChangeText={(text) => this.setState({welcomeMessage: text})}
                value={this.state.welcomeMessage}
                multiline={true}
                maxLength={60}
                underlineColorAndroid="transparent"
                style={{
                  height: 128,
                  borderWidth: 1,
                  borderColor: "#A3A3A2",
                  fontSize: 18,
                  padding: 16,
                  paddingTop: 16
                }}
              />
              <Text 
                style={{
                  fontSize: 14, 
                  color: this.state.welcomeMessage.length === 60 ? "red" : "#A3A3A2", 
                  marginTop: 5, 
                  textAlign: 'right'
                }}
              >
                {`${(this.state.welcomeMessage).length} / 60 characters`}
              </Text>
            </View>

            <View style={{marginTop: width * 0.0579}}>
              <Text style={{fontSize: 14, lineHeight: 16, color: "#A3A3A2", marginBottom: 6}}>
                Standout item
              </Text>

              <TouchableOpacity 
                style={{
                  height: 56, 
                  flex: 1, 
                  paddingTop: 14, 
                  paddingBottom: 14, 
                  borderBottomWidth: 1, 
                  borderBottomColor: "#A3A3A2",
                  flexDirection: 'row'
                }}
                onPress={(e) => this.handleStandOutClick()}
              > 
                <Text style={{fontSize: 18, marginTop: 4}}>
                  {this.state.selectedStandoutItem}
                </Text>

                <FeatherIcon 
                  name="arrow-right" 
                  color="#A3A3A2" 
                  size={24} 
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginTop: 18
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: width * 0.24, flexDirection: 'row', alignSelf: 'center'}}>
              <TouchableOpacity 
                style={{
                  borderBottomWidth: 1, 
                  borderBottomColor: 'black', 
                  width: 80, 
                  height: 48,
                  flexDirection: 'row',
                  marginRight: width * 0.195
                }}
              >
                <Text style={{marginTop: 15}}>
                  Reset
                </Text>

                <FeatherIcon 
                  name="arrow-right" 
                  color="black" 
                  size={24} 
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginTop: 12
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{borderWidth: 1, borderColor: 'black', borderRadius: 50, width: 123, height: 48}}>
                <Text style={{textAlign: 'center', marginTop: 12}}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default StoreEditPage;


