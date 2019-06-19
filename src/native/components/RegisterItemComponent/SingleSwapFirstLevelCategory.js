import React                                        from "react";
import { Actions }                                      from 'react-native-router-flux';
import { View, TextInput, TouchableOpacity, 
         StatusBar, SafeAreaView }                          from 'react-native';
import { Text, Button, Container }                             from 'native-base';
// import SectionedMultiSelect                         from 'react-native-sectioned-multi-select';



class SingleSwapFirstLevelCategory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstLevelClicked: false
    }
  }

  handleFirstLevelCategoryClick = () => {
    this.setState({
      firstLevelClicked: !this.state.firstLevelClicked
    });
  }

  render() {
    const { firtLevelCategory, singleSwapCategory } = this.props;

    return (
      <View style={{borderBottomWidth: 1, borderBottomColor: '#ECEBEB'}}>
        <TouchableOpacity 
          style={{borderTopWidth: 1, borderTopColor: '#ECEBEB'}}
          onPress={(e) => this.handleFirstLevelCategoryClick()}
        >
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', padding: 16}}>
                {firtLevelCategory}
              </Text>
            </View>

            {
              this.state.firstLevelClicked === true &&
              <View style={{
                  flexDirection: 'column', 
                  paddingLeft: 24, 
                  paddingRight: 24,
                }}
              >
                {
                  singleSwapCategory.secondLevel.map((singleSecondLevel, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          borderTopWidth: 1,
                          borderTopColor: '#ECEBEB'
                        }}
                      >
                        <Text style={{paddingTop: 16, paddingBottom: 16, color: '#A3A3A2'}}>
                          {singleSecondLevel}
                        </Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SingleSwapFirstLevelCategory;


