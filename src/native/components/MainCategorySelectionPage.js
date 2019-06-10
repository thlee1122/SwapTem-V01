import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity, SafeAreaView,
         StatusBar, ScrollView, Dimensions, TextInput }                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import Ionicons                                                     from 'react-native-vector-icons/Ionicons';
import FeatherIcon          from 'react-native-vector-icons/Feather';
// import { connect }                                     from 'react-redux';

class MainCategorySelectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mainCategorySearchText: '',
      // mainCategoriesData: []
      finalSelectedMainCategory: ''
    };
  }

  componentWillMount() {
    // const { mainCategoriesData } = this.props;
    const { selectedMainCategory } = this.props;

    this.setState({
      finalSelectedMainCategory: selectedMainCategory
    });

    // this.setState({
    //   mainCategoriesData
    // });
  }

  handleMainCategorySelection = (categoryName) => {
    this.setState({
      finalSelectedMainCategory: categoryName
    });
  }

  render() {
    const { selectedMainCategory } = this.props;
    let { mainCategoriesData } = this.props;
    const { height, width } = Dimensions.get('window');

    if(this.state.mainCategorySearchText !== "") {
      // let searchResults = metaDatatags.filter((tag) => {
      //   return ((tag.text).toLowerCase()).startsWith(this.state.textValue.toLowerCase()) === true
      // });

      mainCategoriesData = mainCategoriesData.filter((item) => {
        console.log("@#@#@#@#@# item", item.name.toLowerCase());
        console.log("2222", this.state.mainCategorySearchText.toLowerCase())
        return (
          ((item.name).toLowerCase()).startsWith(this.state.mainCategorySearchText.toLowerCase()) === true
        );
      })
    }
    
    
    console.log("~~~ Main Category Selection page, this.props", this.props);

    console.log("****** mainCategoriesData", mainCategoriesData);

    return (
      <React.Fragment>
        <StatusBar
          // backgroundColor="blue"
          barStyle="dark-content"
          translucent={true}
          style={{
            color: 'white',
            zIndex: 10
          }}
        />
        
        <Content style={{backgroundColor: 'white'}}>
          <SafeAreaView>

          <View 
            // style={{position: 'absolute', alignSelf: 'flex-end', top: 30, width: '100%'}}
          > 
            <TouchableOpacity
              style={{
                marginLeft: 10,
                marginTop: 32
              }}
              onPress={() => {Actions.registerItem()}}
            >
              <FeatherIcon name="arrow-left" size={30} />
            </TouchableOpacity>

            <TextInput
              // editable={false}
              style={{
                height: 64, 
                borderColor: 'black', 
                borderBottomWidth: 1,
                borderBottomColor: '#A3A3A2',
                width: '90%',
                // flex: 1,
                margin: 5,
                marginRight: 10,
                alignSelf: 'center',
                fontSize: 24,
                lineHeight: 28,
                color: 'black',

                marginTop: 60
              }}
              keyboardType="default"
              placeholder="Search main category"
              onChangeText={(text) => this.setState({mainCategorySearchText: text})}
            />
            <Ionicons size={32} name="ios-search" style={{position: 'absolute', right: 24, top: 138}}/>
          </View>

          <View style={{marginTop: 63}}>
            <Text style={{fontSize: 12, color: "#A3A3A2", lineHeight: 16, padding: 16}}>
              Main Category
            </Text>
          </View>

          <View>
            {
              mainCategoriesData.map((item, index) => {
                return (
                  <TouchableOpacity 
                    key={item.id}
                    style={{
                      backgroundColor: item.name === this.state.finalSelectedMainCategory ? 'black' : 'white', 
                      height: 56, 
                      padding: 16
                    }}
                    onPress={ () => this.handleMainCategorySelection(item.name)}
                    // onPress={ () => this.handleScheduleMeetUpButton(swapCard) }
                  >
                    <Text 
                      style={{
                        color: item.name === this.state.finalSelectedMainCategory ? 'white' : '#A3A3A2', 
                        fontSize: 16, 
                        lineHeight: 24
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>

          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity 
              style={{
                flexDirection: 'row', 
                
                // right: 0,
                borderWidth: 1,
                borderRadius: 30,
                width: 278,
                height: 58,
                marginTop: 50,
                marginBottom: 50
              }}
              // onPress={ () => { Actions.mainCategorySelection({ 
              //   mainCategoryData: mainCategories, 
              //   selectedMainCategory: this.state.selectedMainCategory
              //   // locationCoordinates: locationCoordinates 
              // }) }}
            >
              <Text 
                style={{
                  fontSize: 14, 
                  fontWeight: 'bold', 
                  lineHeight: 20,
                  flex: 1,
                  textAlign: 'center',
                  marginTop: 18,
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>

          </SafeAreaView>
        </Content>
        
      </React.Fragment>
    );
  }
}

export default MainCategorySelectionPage;

