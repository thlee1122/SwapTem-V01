import React                                        from "react";
import { connect }                                      from 'react-redux';
import { View, Dimensions, ActivityIndicator, 
         TouchableOpacity, StatusBar, 
         SafeAreaView, Image, TextInput }                            from 'react-native';
import { Text, Button }                             from 'native-base';
import styles                                       from '../../styles/RegisterItemStyles';
import * as hashTagData                                 from '../../data/sampleHashTagData.json';
import Ionicons                                     from 'react-native-vector-icons/Ionicons';
import SingleRecommendedHashTag                     from './SingleRecommendedHashTag';
import { getRecommendedHashTags }                       from '../../../actions/recommendedHashTagsActions';

class HashTagSelectionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      hashTagSampleData: [],
      data: [],

      hashTags: [],
      hashTagText: "",

      // predictions: {},

      recommendedHashTags: [],
      
      recommendedHashTagClicked: false,
      recommendedHashTagPillColor: 'white',
      recommendedHashTagPillTextColor: '#00529b',


      showSuggestionSection: false,

      finalHashTags: [],


      currentHashTagText: ''
    }
    
    // this.recommendedHashTagIndx = [];
    

    this.hashTagText = "";



    this.hashTagSampleData = [];


    this.finalHashTags = [];


    this.newlyAddedHashTags = [];
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
    }
  }

  handleRecommendedHashTag = (index, singlePrediction, clicked) => {
    if(clicked === true) {
      // debugger;
      // this.recommendedHashTagIndx.push(singlePrediction);

      // this.setState({
      //   hashTags: this.recommendedHashTagIndx
      // });

      const tempState = this.state.finalHashTags;
      tempState.push(singlePrediction);

      this.setState({
        finalHashTags: [...tempState],
        hashTagText: this.state.hashTagText.concat(` ${singlePrediction}`)
      });

      this.finalHashTags.push(singlePrediction);

    } else if(clicked === false) {
      // debugger;
      // this.recommendedHashTagIndx = this.recommendedHashTagIndx.filter(item => item !== singlePrediction);

      // this.setState({
      //   hashTags: this.recommendedHashTagIndx
      // });

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
      tempHashTagText = tempHashTagText.replace(singlePrediction, '');

      // tempState.push(singlePrediction);

      this.setState({
        finalHashTags: [...tempState],

        hashTagText: tempHashTagText
      });

      // this.finalHashTags.filter
    }

    console.log("44444 this.finalHashTags", this.finalHashTags);
  }

  handleHashTagTextInput = (hashTag) => {
    // const hashTag = event.nativeEvent.text;
    console.log("121212121212121 hashTag", hashTag);
    // console.log("&&&&&&&& event.nativeEvent", event.nativeEvent);

    // *** find the last space from hashTag string

    // var lastslashindex = uri.lastIndexOf('/');
    // var result= uri.substring(lastslashindex  + 1).replace(".png","");

    let tempCurrentHashTagText = hashTag.substring((hashTag.lastIndexOf(" "))+1);
    console.log("666666 tempCurrentHashTagText", tempCurrentHashTagText);
    console.log("777777 tempCurrentHashTagText.indexOf()", tempCurrentHashTagText.indexOf(" "));

    this.setState({
      hashTagText: hashTag,


      showSuggestionSection: true,



      // currentHashTagText: hashTag
      currentHashTagText: tempCurrentHashTagText
    });

    this.hashTagText = hashTag;

    // console.log("666666 this.hashTagText", this.hashTagText);
    // console.log("777777 this.hashTagText.indexOf()", this.hashTagText.indexOf(" "));

    //Check if the hashTag contains space
    //*** Check this.state.currentHashTagText length
    //*** Check if this.state.currentHashTagText contains space

    //*** if tempCurrentHashTagText.length > 1 && e.space === true

    if(tempCurrentHashTagText.indexOf(" ") !== -1) {
      debugger;
      let currentHashTag = tempCurrentHashTagText.trim();

      this.finalHashTags.push(currentHashTag);

      const tempFinalHashTagState = this.state.finalHashTags;
      tempFinalHashTagState.push(currentHashTag);

      // this.setState({
      //   finalHashTags: [...tempState]
      // });


      const tempState = this.state.recommendedHashTags;
      tempState.push(currentHashTag);

      this.setState({
        recommendedHashTags: [...tempState],
        finalHashTags: [...tempFinalHashTagState],

        currentHashTagText: ''
      });

      this.newlyAddedHashTags.push(currentHashTag);
    }

    // if(this.hashTagText.indexOf(" ") !== -1) {
    //   let currentHashTag = hashTag.trim();

    //   this.finalHashTags.push(currentHashTag);

    //   const tempFinalHashTagState = this.state.finalHashTags;
    //   tempFinalHashTagState.push(currentHashTag);

    //   // this.setState({
    //   //   finalHashTags: [...tempState]
    //   // });


    //   const tempState = this.state.recommendedHashTags;
    //   tempState.push(currentHashTag);

    //   this.setState({
    //     recommendedHashTags: [...tempState],
    //     finalHashTags: [...tempFinalHashTagState],

    //     currentHashTagText: ''
    //   });

    //   this.newlyAddedHashTags.push(currentHashTag);
    // }
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

    console.log("1111111 tempHashTagText", tempHashTagText);
    tempHashTagText = tempHashTagText.replace(this.state.currentHashTagText, hashTagValue);

    console.log("2222222 tempHashTagText", tempHashTagText);
    console.log("3333333 this.state.currentHashTagText", this.state.currentHashTagText);
    console.log("4444444 hashTagValue", hashTagValue);

    this.setState({
      recommendedHashTags: [...tempState],
      finalHashTags: [...tempFinalHashTagState],


      // hashTagText: hashTagValue,

      hashTagText: tempHashTagText
    });

    this.finalHashTags.push(hashTagValue);

    this.newlyAddedHashTags.push(hashTagValue);
  }

  handleTextInputKeyPress = (e) => {
    console.log("~~~~~~~~~~~~~~~ e", e.nativeEvent);
  }

  render() {
    const { hashTags, handleTextChange, callback, renderSuggestionsRow, 
            data, handleInputSubmit } = this.props;
    const { width } = Dimensions.get('window');
    const imageFile = require("../../../images/03.png");

    this.hashTagSampleData = hashTagData.results;

    console.log("5555 this.finalHashTags", this.finalHashTags);

    if(this.state.hashTagText.startsWith("#") && this.state.hashTagText.length > 1) {
      if((this.state.hashTagText[1].toUpperCase() !== this.state.hashTagText[1].toLowerCase())) {
        this.hashTagSampleData = this.hashTagSampleData.filter((sampleHashTag) => {
          return (
            ((sampleHashTag.hashTagValue).toLowerCase()).startsWith(this.state.hashTagText.toLowerCase()) === true
          ); 
        });
      } 
    }

    return (
      <React.Fragment>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          style={{
            color: 'white',
            zIndex: 10
          }}
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
              <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', lineHeight: 26, width: 260, marginTop: 10}}>
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
                this.state.recommendedHashTags.length !== 0 ?
                <React.Fragment>
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
                            newlyAddedHashTags={this.newlyAddedHashTags}
                          />
                        );
                      })
                      
                    }
                  </View>
                </React.Fragment>
                : null
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
                  keyboardType="default"
                  placeholder='Type hashtag'
                  // value={this.state.finalHashTags.join(" ")}
                  // value={this.state.hashTags.join(" ")}
                  value={this.state.hashTagText}
                  onChangeText={(text) => this.handleHashTagTextInput(text)}

                  onKeyPress={(e) => this.handleTextInputKeyPress(e)}


                  // onChange={(event) => this.handleHashTagTextInput(event)}
                />
                <Ionicons size={28} name="ios-search" style={{position: 'absolute', left: 0, top: 16}}/>
              </View>

              {
                this.state.hashTagText.startsWith("#") && this.state.hashTagText.length > 1 && 
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
                // onPress={ () => handlePageContinueButton("category selection", this.finalCategories) }
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
