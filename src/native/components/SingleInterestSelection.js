import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity, Text}             from 'react-native';

class SingleInterestSelection extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectionSelected: false
    };

    this.selectionSelected = false;
  }

  handleSingleSelectionClick = (item) => {
    const { addSelection, deleteSelection } = this.props;

    this.setState({
      selectionSelected: !this.state.selectionSelected
    });

    this.selectionSelected = !this.selectionSelected;

    if(this.selectionSelected === true) {
      addSelection(item);
    } else if(this.selectionSelected === false) {
      deleteSelection(item);
    }
  }

  render() {
    const { item } = this.props;

    return (
      <TouchableOpacity 
        style={{
          flexDirection: 'column', 
          width: '50%', 
          borderWidth: 1, 
          height: 187,
          backgroundColor: this.state.selectionSelected === false ? 'white' : 'black'
        }}
        onPress={() => { this.handleSingleSelectionClick(item); }}
      >
        <Image 
          source={item.imageFile}
          style={{
            width: 100, 
            height: 100,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
        <Text style={{textAlign: 'center', marginTop: 10}}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default SingleInterestSelection;

