import React                                        from "react";
import { View, TouchableOpacity, Text}                          from 'react-native';
import MaterialIcons                                  from 'react-native-vector-icons/MaterialIcons';

class SingleSwapSecondLevelCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      secondLevelClicked: false
    }

    this.secondLevelClicked = false;
  }

  componentWillMount() {
    const { selectedSwapCategoryObj, firstLevelCategory, singleSecondLevel } = this.props;

    if(selectedSwapCategoryObj[firstLevelCategory].indexOf(singleSecondLevel) !== -1) {
      this.setState({
        secondLevelClicked: true
      });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { singleSecondLevel, firstLevelCategory } = this.props;

    if(this.props.selectedSwapCategoryObj !== nextProps.selectedSwapCategoryObj) {
      if(nextProps.selectedSwapCategoryObj[firstLevelCategory].indexOf(singleSecondLevel) !== -1) {
        this.setState({
          secondLevelClicked: true
        });
      }
    }
  }

  handleSecondLevelCategoryClick = (firstLevelCategory, singleSecondLevel) => {
    const { addSwapCategory, removeSwapCategory } = this.props;

    this.setState({
      secondLevelClicked: !this.state.secondLevelClicked
    });

    this.secondLevelClicked = !this.secondLevelClicked;

    if(this.secondLevelClicked === true) {
      addSwapCategory(firstLevelCategory, singleSecondLevel);

    } else if(this.secondLevelClicked === false) {
      removeSwapCategory(firstLevelCategory, singleSecondLevel);
    }
  }

  render() {
    const { singleSecondLevel, firstLevelCategory } = this.props;

    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
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
            }}
          />
        }
      </View>
    );
  }
}

export default SingleSwapSecondLevelCategory;


