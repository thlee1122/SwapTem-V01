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
      recommendedHashTagPillTextColor: 'black',
      recommendedHashTagPillBorder: '#A3A3A2'
    }

    this.recommendedHashTagClicked = false
  }

  componentWillMount() {
    const { newlyAddedHashTags, singlePrediction } = this.props;

    if(newlyAddedHashTags.indexOf(singlePrediction) !== -1) {
      this.setState({
        recommendedHashTagPillColor: 'black',
        recommendedHashTagPillTextColor: 'white',
        recommendedHashTagPillBorder: 'black'
      });

      this.recommendedHashTagClicked = true;
    }
  }

  handleHashTagClick = (index, singlePrediction) => {
    this.recommendedHashTagClicked = !this.recommendedHashTagClicked;

    if(this.recommendedHashTagClicked === true) {
      this.setState({
        recommendedHashTagPillColor: 'black',
        recommendedHashTagPillTextColor: 'white',
        recommendedHashTagPillBorder: 'black'
      });
    } else if(this.recommendedHashTagClicked === false) {
      this.setState({
        recommendedHashTagPillColor: 'white',
        recommendedHashTagPillTextColor: 'black',
        recommendedHashTagPillBorder: '#A3A3A2'
      });
    }

    this.props.handleRecommendedHashTag(index, singlePrediction, this.recommendedHashTagClicked);
  }

  render() {
    const { index, singlePrediction, handleRecommendedHashTag, 
            recommendedHashTagPillColor, recommendedHashTagPillTextColor, 
            newlyAddedHashTags } = this.props;

            // console.log("@#@#@#@#@ newlyAddedHashTags", newlyAddedHashTags);

    return (
      <React.Fragment>
        <TouchableOpacity
          key={index}
          style={{
            borderWidth: 1,
            borderColor: this.state.recommendedHashTagPillBorder, 
            // borderColor: "#00529b",
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 18,
            paddingLeft: 18,
            // backgroundColor: "#00529b",
            backgroundColor: this.state.recommendedHashTagPillColor,
            borderRadius: 20,
            marginRight: 20,
            marginBottom: 24
          }}
          onPress={(e) => this.handleHashTagClick(index, singlePrediction)}
        >
          <Text 
            style={{
              // color: 'white',
              color: this.state.recommendedHashTagPillTextColor,
              fontSize: 14,
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
