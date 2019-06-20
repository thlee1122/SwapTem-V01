import React                                        from "react";
import { Actions }                                      from 'react-native-router-flux';
import { View, TextInput, TouchableOpacity, 
         StatusBar, SafeAreaView }                          from 'react-native';
import { Text, Button, Container }                             from 'native-base';
import MaterialIcons                                  from 'react-native-vector-icons/MaterialIcons';
import SingleSwapSecondLevelCategory                  from './SingleSwapSecondLevelCategory';
// import SectionedMultiSelect                         from 'react-native-sectioned-multi-select';



class SingleSwapFirstLevelCategory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstLevelClicked: false,

      // secondLevelClicked: false
    }
  }

  handleFirstLevelCategoryClick = () => {
    this.setState({
      firstLevelClicked: !this.state.firstLevelClicked
    });
  }

  render() {
    const { firstLevelCategory, singleSwapCategory, addSwapCategory, removeSwapCategory } = this.props;

    return (
      <View style={{borderBottomWidth: 1, borderBottomColor: '#ECEBEB'}}>
        <TouchableOpacity 
          style={{borderTopWidth: 1, borderTopColor: '#ECEBEB'}}
          onPress={(e) => this.handleFirstLevelCategoryClick()}
        >
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', padding: 16}}>
                {firstLevelCategory}
              </Text>

              <MaterialIcons
                name={this.state.firstLevelClicked === true ? "keyboard-arrow-down" : "keyboard-arrow-up"}
                size={25}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 14
                }}
              />
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
                      <SingleSwapSecondLevelCategory
                        key={index}
                        singleSecondLevel={singleSecondLevel}
                        firstLevelCategory={firstLevelCategory}
                        addSwapCategory={addSwapCategory}
                        removeSwapCategory={removeSwapCategory}
                      />
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


