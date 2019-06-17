import React                                        from "react";
import { connect }                                      from 'react-redux';
import { View, Dimensions, TouchableOpacity, 
         StatusBar, SafeAreaView, Image, TextInput }                            from 'react-native';
import { Text }                             from 'native-base';
import * as hashTagData                                 from '../../data/sampleHashTagData.json';
import Ionicons                                     from 'react-native-vector-icons/Ionicons';
import SingleRecommendedHashTag                     from './SingleRecommendedHashTag';
import { getRecommendedHashTags }                       from '../../../actions/recommendedHashTagsActions';

class HashTagSelectionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hashTags: [],
      hashTagText: "",
      recommendedHashTags: [],
      showSuggestionSection: false,
      finalHashTags: [],
      currentHashTagText: '',
      newlyAddedHashTags: []
    }
    
    this.hashTagText = "";
    this.hashTagSampleData = [];
    this.finalHashTags = [];
    this.firstRecommendedHashTagsLength = 0;
  }

  componentDidMount() {
    const { getRecommendedHashTags } = this.props;

    getRecommendedHashTags();
    this.hashTagSampleData = hashTagData.results;
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.recommendedHashTags.recommendedHashTags !== nextProps.recommendedHashTags.recommendedHashTags) {
      this.setState({
        recommendedHashTags: nextProps.recommendedHashTags.recommendedHashTags
      });

      this.firstRecommendedHashTagsLength = (nextProps.recommendedHashTags.recommendedHashTags).length;
    }
  }

  handleRecommendedHashTag = (index, singlePrediction, clicked) => {
    if(clicked === true) {
      const tempState = this.state.finalHashTags;
      tempState.push(singlePrediction);

      this.setState({
        finalHashTags: [...tempState],
        hashTagText: this.state.hashTagText.concat(` ${singlePrediction}`)
      });

      this.finalHashTags.push(singlePrediction);

    } else if(clicked === false) {
      this.finalHashTags = this.finalHashTags.filter((singleFinalHashTag) => {
        return (
          singleFinalHashTag !== singlePrediction
        ); 
      });

      let tempState = this.state.finalHashTags;

      tempState = tempState.filter((singleFinalHashTag) => {
        return (
          singleFinalHashTag !== singlePrediction
        ); 
      });

      let tempHashTagText = this.state.hashTagText;
      if(this.state.hashTagText.startsWith(" ") === false) {
        tempHashTagText = tempHashTagText.replace(`${singlePrediction}`, '');  
      } else {
        tempHashTagText = tempHashTagText.replace(` ${singlePrediction}`, '');
      }

      //When recommended prediction pill has been "unselected",
      //remove that recommended prediction pill from this.state.recommendedHashTags
      let tempRecommendedHashTags = this.state.recommendedHashTags;

      if(this.state.newlyAddedHashTags.indexOf(singlePrediction) !== -1) {
        tempRecommendedHashTags = tempRecommendedHashTags.filter((singleTempRecommend) => {
          return (
            singleTempRecommend !== singlePrediction
          ); 
        });
      }

      let tempNewlyAdded = this.state.newlyAddedHashTags;

      tempNewlyAdded = tempNewlyAdded.filter((singleNewlyAdded) => {
        return (
          singleNewlyAdded !== singlePrediction
        ); 
      });

      this.setState({
        finalHashTags: [...tempState],
        hashTagText: tempHashTagText,
        recommendedHashTags: [...tempRecommendedHashTags],
        newlyAddedHashTags: [...tempNewlyAdded]
      });
    }
  }

  handleHashTagTextInput = (hashTag) => {
    // *** find the last space from hashTag string
    let tempCurrentHashTagText = hashTag.substring((hashTag.lastIndexOf(" "))+1);
    
    this.setState({
      hashTagText: hashTag,
      showSuggestionSection: true,
      currentHashTagText: tempCurrentHashTagText
    });

    this.hashTagText = hashTag;
  } 

  handleTextInputKeyPress = (e) => {
    if(e.nativeEvent.key === " " && this.state.currentHashTagText.startsWith("#") &&
       this.state.currentHashTagText.length > 1) {

      let tempCurrentHashTagText = this.state.currentHashTagText.substring((this.state.currentHashTagText.lastIndexOf(" "))+1);
      let currentHashTag = tempCurrentHashTagText.trim();

      this.finalHashTags.push(currentHashTag);

      const tempFinalHashTagState = this.state.finalHashTags;
      tempFinalHashTagState.push(currentHashTag);

      const tempState = this.state.recommendedHashTags;
      tempState.push(currentHashTag);

      const tempNewlyAdded = this.state.newlyAddedHashTags;
      tempNewlyAdded.push(currentHashTag);

      this.setState({
        recommendedHashTags: [...tempState],
        finalHashTags: [...tempFinalHashTagState],
        currentHashTagText: '',
        newlyAddedHashTags: [...tempNewlyAdded]
      });

    } else if(e.nativeEvent.key === "Backspace") {
      if(this.state.recommendedHashTags.length > this.firstRecommendedHashTagsLength) {
        for(let i = this.firstRecommendedHashTagsLength; i < this.state.recommendedHashTags.length; i++) {
          if(this.state.hashTagText.indexOf(this.state.recommendedHashTags[i]) === -1) {
            let tempState = this.state.recommendedHashTags;

            tempState = tempState.filter((singleRecommended) => {
              return (
                singleRecommended !== this.state.recommendedHashTags[i]
              ); 
            });

            this.setState({
              recommendedHashTags: [...tempState]
            });
          }
        }
      }
    }
  }

  onSuggestionTap = (hashTagValue) => {
    this.setState({
      showSuggestionSection: false
    });

    const tempState = this.state.recommendedHashTags;
    tempState.push(hashTagValue);

    const tempFinalHashTagState = this.state.finalHashTags;
    tempFinalHashTagState.push(hashTagValue);

    let tempHashTagText = this.state.hashTagText;
    tempHashTagText = tempHashTagText.replace(this.state.currentHashTagText, hashTagValue);

    const tempNewlyAdded = this.state.newlyAddedHashTags;
    tempNewlyAdded.push(hashTagValue);

    this.setState({
      recommendedHashTags: [...tempState],
      finalHashTags: [...tempFinalHashTagState],
      hashTagText: tempHashTagText,
      newlyAddedHashTags: [...tempNewlyAdded],
      currentHashTagText: '',
    });

    this.finalHashTags.push(hashTagValue);
  }

  render() {
    const { handlePageContinueButton } = this.props;
    const { width } = Dimensions.get('window');
    const imageFile = require("../../../images/03.png");

    this.hashTagSampleData = hashTagData.results;

    if(this.state.currentHashTagText.startsWith("#") && this.state.currentHashTagText.length > 1) {
      if((this.state.currentHashTagText[1].toUpperCase() !== this.state.currentHashTagText[1].toLowerCase())) {
        this.hashTagSampleData = this.hashTagSampleData.filter((sampleHashTag) => {
          return (
            ((sampleHashTag.hashTagValue).toLowerCase()).startsWith(this.state.currentHashTagText.toLowerCase()) === true
          ); 
        });
      } 
    }

    return (
      <React.Fragment>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          style={{ color: 'white', zIndex: 10 }}
        />

        <SafeAreaView style={{marginTop: -20, backgroundColor: 'black'}}>
          <View
            style={{backgroundColor: 'black', height: 300}}
          >
            <View style={{flexDirection: 'row', marginLeft: 16, marginTop: 180, marginRight: 16}}>
              <Image 
                source={imageFile}
                style={{
                  width: 70,
                  height: 50,
                  alignSelf: 'center',
                  marginRight: 20,
                }}
              />
              <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', lineHeight: 26, width: width * 0.68, marginTop: 10}}>
                Please select hashtags
              </Text>
            </View>
          </View>

          <View style={{paddingTop: 31, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16, lineHeight: 24, fontWeight: 'bold'}}>
                Recommended hashtags
              </Text>

              {
                this.state.recommendedHashTags.length !== 0 &&
                <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginTop: 30}}>
                {
                    this.state.recommendedHashTags.map((item, index) => {
                    let singleItem = item

                    return (
                        <SingleRecommendedHashTag
                        key={index}
                        index={index}
                        handleRecommendedHashTag={this.handleRecommendedHashTag}
                        singlePrediction={singleItem}
                        newlyAddedHashTags={this.state.newlyAddedHashTags}
                        />
                    );
                    })
                    
                }
                </View>
              }

              <View style={{marginTop: 24}}>
                <TextInput
                  style={{
                    height: 64, 
                    borderColor: 'black', 
                    borderBottomWidth: 1,
                    borderBottomColor: '#A3A3A2',
                    width: '100%',
                    alignSelf: 'center',
                    fontSize: 16,
                    lineHeight: 28,
                    color: 'black',
                    paddingLeft: 32
                  }}
                  multiline={true}
                  keyboardType="default"
                  placeholder='Type hashtag'
                  value={this.state.hashTagText}
                  onChangeText={(text) => this.handleHashTagTextInput(text)}
                  onKeyPress={(e) => this.handleTextInputKeyPress(e)}
                />
                <Ionicons size={28} name="ios-search" style={{position: 'absolute', left: 0, top: 16}}/>
              </View>

              {
                this.state.currentHashTagText.startsWith("#") && this.state.currentHashTagText.length > 1 && 
                this.state.showSuggestionSection === true ?
                <View>
                  {
                    this.hashTagSampleData.map((item) => {
                      return(
                        <TouchableOpacity 
                          key={item.hashTagValue} 
                          style={{
                            paddingTop: 16, 
                            paddingBottom: 16,
                            borderBottomColor: '#ECEBEB',
                            borderBottomWidth: 1
                          }}
                          onPress={() => this.onSuggestionTap(item.hashTagValue)}
                        >
                          <View key={item.hashTagValue}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{left: 8, fontSize: 14, color: '#A3A3A2', lineHeight: 24}}>{item.hashTagValue}</Text>
                              <Text style={{position: 'absolute', right: 8, fontSize: 14, color: '#A3A3A2', lineHeight: 24}}>{(item.numberOfPosts).toLocaleString('en')} posts</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })
                  }
                </View> : null
              }
            </View>

            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity 
                disabled={ this.state.finalHashTags.length === 0 ? true : false }
                style={{
                  flexDirection: 'row', 
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 278,
                  height: 58,
                  marginTop: 50,
                  borderColor: this.state.finalHashTags.length === 0 ? "#CECECE" : "black",
                  backgroundColor: this.state.finalHashTags.length === 0 ? "#CECECE" : "white",
                }}
                onPress={ () => handlePageContinueButton("hashTag selection", this.finalHashTags) }
              >
                <Text 
                  style={{
                    fontSize: 14, 
                    fontWeight: 'bold', 
                    lineHeight: 20,
                    flex: 1,
                    textAlign: 'center',
                    marginTop: 18,
                    color: this.state.finalHashTags.length === 0 ? "white" : "black",
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  recommendedHashTags: state.recommendedHashTags || {}
});

const mapDispatchToProps = {
  getRecommendedHashTags: getRecommendedHashTags
};

export default connect(mapStateToProps, mapDispatchToProps)(HashTagSelectionPage);
