import React                                        from "react";
import { Actions }                                      from 'react-native-router-flux';
import { View, TextInput, TouchableOpacity, 
         StatusBar, SafeAreaView }                          from 'react-native';
import { Text, Button, Container }                             from 'native-base';
import MaterialIcons                                  from 'react-native-vector-icons/MaterialIcons';
// import SectionedMultiSelect                         from 'react-native-sectioned-multi-select';



class SingleSwapSecondLevelCategory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // firstLevelClicked: false,

      secondLevelClicked: false
    }

    // this.selectedCategoryObj = {
    //   firstLevelCategory: '',
    //   secondLevelCategory: []
    // };

    this.secondLevelClicked = false;
  }



  // handleFirstLevelCategoryClick = () => {
  //   this.setState({
  //     firstLevelClicked: !this.state.firstLevelClicked
  //   });
  // }

  handleSecondLevelCategoryClick = (firstLevelCategory, singleSecondLevel) => {

    const { addSwapCategory, removeSwapCategory } = this.props;

    console.log("!!!!! second level has been clicked", firstLevelCategory);

    // const selectedCategoryObj = {
    //   firstLevelCategory: '',
    //   secondLevelCategory: []
    // };

    // this.selectedCategoryObj["firstLevelCategory"] = firstLevelCategory;
    // this.selectedCategoryObj["secondLevelCategory"].push(singleSecondLevel);

    this.setState({
      secondLevelClicked: !this.state.secondLevelClicked
    });

    this.secondLevelClicked = !this.secondLevelClicked;

    if(this.secondLevelClicked === true) {
      addSwapCategory(firstLevelCategory, singleSecondLevel);
    } else if(this.secondLevelClicked === false) {
      removeSwapCategory(firstLevelCategory, singleSecondLevel);
    }

    // console.log("222222 selectedCategoryObj", this.selectedCategoryObj);
  }

  render() {
    const { singleSecondLevel, firstLevelCategory } = this.props;

    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          // key={index}
          style={{
            borderTopWidth: 1,
            borderTopColor: '#ECEBEB',
            width: '100%'
          }}
          onPress={(e) => this.handleSecondLevelCategoryClick(firstLevelCategory, singleSecondLevel)}
        >
          <Text style={{paddingTop: 16, paddingBottom: 16, color: '#A3A3A2'}}>
            {singleSecondLevel}
          </Text>
        </TouchableOpacity>

        {
          this.state.secondLevelClicked === true &&
          <MaterialIcons
            name="check"
            size={22}
            style={{
              position: 'absolute',
              right: 0,
              top: 16,
              // marginRight: 16
            }}
          />
        }
      </View>
    );
  }
}

export default SingleSwapSecondLevelCategory;


