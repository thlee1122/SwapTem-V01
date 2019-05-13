import React, { Component }                               from 'react';
import { connect }                                      from 'react-redux';
import { View, TouchableOpacity}                   from 'react-native';
import { Container, Content, Text }                 from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Actions }                                        from 'react-native-router-flux';
import { postLike }                       from '../../actions/singleProductActions';


class LikeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
  }

  componentDidMount() {
    const {itemCartUser, currentUserId} = this.props;
    let cartUserIdArray = [];

    for(let i = 0; i < itemCartUser.length; i++) {
      cartUserIdArray.push(itemCartUser[i].id);
    }

    if(cartUserIdArray.indexOf(currentUserId) !== -1) {
      this.setState({
        liked: true
      });

    } else {
      this.setState({
        liked: false
      });
    }
  }

  handleLike = () => {
    const { itemId } = this.props;

    this.setState({
      liked: !this.state.liked
    });

    const data = {
      itemId: itemId
    };

    this.props.postLike(data);
  }

  render() {
    return (
      <View 
        style={{
          position: 'absolute', 
          zIndex: 10, 
          right: '5%',
          marginTop: 15 
        }}
      >
        <TouchableOpacity
          onPress={() => this.handleLike()}
        >
          {
            this.state.liked === false ?
              <FontAwesomeIcon 
                name="heart-o" 
                size={25} 
                color="white"
              />
            :
              <FontAwesomeIcon 
              name="heart" 
              size={25} 
              color="white"
            />
          }
        </TouchableOpacity>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  singleItem: state.singleItem || {},
});

const mapDispatchToProps = {
  postLike: postLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeComponent);

