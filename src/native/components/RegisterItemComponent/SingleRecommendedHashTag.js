import React                                        from "react";
import { View, TouchableOpacity }                                    from 'react-native';
import { Text }                             from 'native-base';
import MentionsTextInput                            from 'react-native-mentions';
import styles                                       from '../../styles/RegisterItemStyles';
import * as hashTagData                                 from '../../data/sampleHashTagData.json';

class SingleRecommendedHashTag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendedHashTagPillColor: 'white',
      recommendedHashTagPillTextColor: '#00529b'
    }

    this.recommendedHashTagClicked = false
  }

  handleHashTagClick = (index, singlePrediction) => {
    this.recommendedHashTagClicked = !this.recommendedHashTagClicked;

    if(this.recommendedHashTagClicked === true) {
      this.setState({
        recommendedHashTagPillColor: '#00529b',
        recommendedHashTagPillTextColor: 'white'
      });
    } else if(this.recommendedHashTagClicked === false) {
      this.setState({
        recommendedHashTagPillColor: 'white',
        recommendedHashTagPillTextColor: '#00529b'
      });
    }

    this.props.handleRecommendedHashTag(index, singlePrediction, this.recommendedHashTagClicked);
  }

  render() {
    const { index, singlePrediction, handleRecommendedHashTag, 
            recommendedHashTagPillColor, recommendedHashTagPillTextColor} = this.props;

    return (
      <React.Fragment>
        <TouchableOpacity
          key={index}
          style={{
            borderWidth: 1,
            borderColor: "#00529b",
            paddingTop: 8,
            paddingBottom: 8,
            paddingRight: 15,
            paddingLeft: 15,
            // backgroundColor: "#00529b",
            backgroundColor: this.state.recommendedHashTagPillColor,
            borderRadius: 5,
            marginRight: 15,
            marginBottom: 10
          }}
          onPress={(e) => this.handleHashTagClick(index, singlePrediction)}
        >
          <Text 
            style={{
              // color: 'white',
              color: this.state.recommendedHashTagPillTextColor,
              fontWeight: 'bold'
            }}
          >
            {`${singlePrediction}`}
          </Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}

export default SingleRecommendedHashTag;
