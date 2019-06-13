import React, { Component }                             from 'react';
import { View, TouchableOpacity, SafeAreaView,
         StatusBar, Dimensions, TextInput }             from 'react-native';
import { Container, Content, List, Text }               from 'native-base';
import { Actions }                                      from 'react-native-router-flux';
import Ionicons                                         from 'react-native-vector-icons/Ionicons';
import FeatherIcon                                      from 'react-native-vector-icons/Feather';
import styles                                           from '../styles/MainCategorySelectionPageStyles';

class MainCategorySelectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mainCategorySearchText: '',
      finalSelectedMainCategory: ''
    };
  }

  componentWillMount() {
    const { selectedMainCategory } = this.props;

    this.setState({
      finalSelectedMainCategory: selectedMainCategory
    });
  }

  handleMainCategorySelection = (categoryName) => {
    this.setState({
      finalSelectedMainCategory: categoryName
    });
  }

  handleContinueButton = () => {
    this.props.handleCategoryContinue("main catogory continue button", this.state.finalSelectedMainCategory);
    Actions.registerItem();
  }

  render() {
    const { selectedMainCategory } = this.props;
    let { mainCategoriesData } = this.props;
    const { height, width } = Dimensions.get('window');

    if(this.state.mainCategorySearchText !== "") {
      mainCategoriesData = mainCategoriesData.filter((item) => {
        return (
          ((item.name).toLowerCase()).startsWith(this.state.mainCategorySearchText.toLowerCase()) === true
        );
      })
    }

    return (
      <React.Fragment>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          style={styles.statusBar}
        />
        
        <Content style={{backgroundColor: 'white'}}>
          <SafeAreaView>
          <View> 
            <TouchableOpacity style={styles.backButton} onPress={() => {Actions.registerItem()}}>
              <FeatherIcon name="arrow-left" size={30} />
            </TouchableOpacity>

            <TextInput
              style={styles.mainCategorySearchInput}
              keyboardType="default"
              placeholder="Search main category"
              onChangeText={(text) => this.setState({mainCategorySearchText: text})}
            />
            <Ionicons size={32} name="ios-search" style={{position: 'absolute', right: 24, top: 138}}/>
          </View>

          <View style={{marginTop: 63}}>
            <Text style={styles.mainCategorySubTitle}>
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
              style={styles.continueButton}
              onPress={ () => this.handleContinueButton()}
            >
              <Text style={styles.continueButtonText}>
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

