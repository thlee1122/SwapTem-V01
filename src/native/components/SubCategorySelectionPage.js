import React, { Component }                         from 'react';
import { View, TouchableOpacity, SafeAreaView,
         StatusBar, Dimensions, TextInput }         from 'react-native';
import { Container, Content, Text }                 from 'native-base';
import { Actions }                                  from 'react-native-router-flux';
import Ionicons                                     from 'react-native-vector-icons/Ionicons';
import FeatherIcon                                  from 'react-native-vector-icons/Feather';
import styles                                       from '../styles/SubCategorySelectionPageStyles';

class SubCategorySelectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      subCategorySearchText: '',
      finalSelectedMainCategory: '',
      finalSelectedSubCategory: '',
    };
    this.subCategoryArray = [];
  }

  componentWillMount() {
    const { selectedMainCategory, selectedSubCategory, subCategoriesData } = this.props;

    this.setState({
      finalSelectedMainCategory: selectedMainCategory,
      finalSelectedSubCategory: selectedSubCategory,
    });
  }

  handleSubCategorySelection = (categoryName) => {
    this.setState({
      finalSelectedSubCategory: categoryName
    });
  }

  handleContinueButton = () => {
    this.props.handleCategoryContinue('sub category continue button', this.state.finalSelectedSubCategory);
    Actions.registerItem();
  }

  render() {
    const { selectedMainCategory } = this.props;
    let { subCategoriesData } = this.props;
    const { height, width } = Dimensions.get('window');

    if(this.state.subCategorySearchText !== "") {
      subCategoriesData = subCategoriesData.filter((item) => {
        return (
          ((item.name).toLowerCase()).startsWith(this.state.subCategorySearchText.toLowerCase()) === true
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
              style={styles.subCategorySearchInput}
              keyboardType="default"
              placeholder={`Search ${selectedMainCategory} Sub Category`}
              onChangeText={(text) => this.setState({subCategorySearchText: text})}
            />
            <Ionicons size={32} name="ios-search" style={{position: 'absolute', right: 24, top: 138}}/>
          </View>

          <View style={{marginTop: 63}}>
            <Text style={styles.subCategorySubTitle}>
              {`${selectedMainCategory} Sub Category`}
            </Text>
          </View>

          <View>
            {
              subCategoriesData.map((item, index) => {
                return (
                  <TouchableOpacity 
                    key={item.id}
                    style={{
                      backgroundColor: item.name === this.state.finalSelectedSubCategory ? 'black' : 'white', 
                      height: 56, 
                      padding: 16
                    }}
                    onPress={ () => this.handleSubCategorySelection(item.name)}
                  >
                    <Text 
                      style={{
                        color: item.name === this.state.finalSelectedSubCategory ? 'white' : '#A3A3A2', 
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

export default SubCategorySelectionPage;

