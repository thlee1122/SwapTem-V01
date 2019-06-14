import React                                        from "react";
import { connect }                                      from 'react-redux';
import { View, Dimensions, ActivityIndicator, 
         TouchableOpacity, StatusBar, 
         SafeAreaView, Image, TextInput }                            from 'react-native';
import { Text, Button }                             from 'native-base';
// import MentionsTextInput                            from 'react-native-mentions';
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
      hashTags: "",

      // predictions: {},

      recommendedHashTags: [],
      
      recommendedHashTagClicked: false,
      recommendedHashTagPillColor: 'white',
      recommendedHashTagPillTextColor: '#00529b',
    }
    
    this.recommendedHashTagIndx = [];
    this.hashTags = "";
  }

  componentDidMount() {
    const { getRecommendedHashTags } = this.props;

    getRecommendedHashTags();

    this.setState({
      hashTagSampleData: hashTagData.results
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.recommendedHashTags.recommendedHashTags !== nextProps.recommendedHashTags.recommendedHashTags) {
      this.setState({
        recommendedHashTags: nextProps.recommendedHashTags.recommendedHashTags
      });
    }

    // if(this.props.predictions !== nextProps.predictions) {
    //   this.setState({
    //     predictions: nextProps.predictions
    //   });
    // }
  }

  renderSuggestionsRow({ item }, hidePanel) {
    return (
      <TouchableOpacity 
        key={item.hashTagValue} 
        style={{marginTop: 13}}
        onPress={() => this.onSuggestionTap(item.hashTagValue, hidePanel)}
      >
        <View key={item.hashTagValue}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{left: 15, fontSize: 15}}>{item.hashTagValue}</Text>
            <Text style={{position: 'absolute', right: 15, fontSize: 15}}>{(item.numberOfPosts).toLocaleString('en')} posts</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onSuggestionTap = (hashTagValue, hidePanel) => {
    hidePanel();
    const comment = this.state.hashTags.slice(0, - this.state.keyword.length)

    this.setState({
      data: [],
      hashTags: this.state.hashTags + " "+ hashTagValue
    })

    this.hashTags = this.hashTags + " " + hashTagValue;
    this.props.handleTextChange("hashTagPageSelection", this.hashTags, null, true);
  }

  callback = (keyword) => {
    const { hashTagSampleData } = this.state;
    const regex = new RegExp(`${keyword.trim()}`, 'i');
    let newValue = hashTagSampleData.filter(hashTag => hashTag.hashTagValue.search(regex) >= 0);

    if (this.reqTimer) {
      clearTimeout(this.reqTimer);
    }

    this.reqTimer = setTimeout(() => {
      this.setState({
        keyword: keyword,
        data: [...newValue]
      })
    }, 200);
  }

  handleRecommendedHashTag = (index, singlePrediction, clicked) => {
    if(clicked === true) {
      this.recommendedHashTagIndx.push(singlePrediction);

    } else if(clicked === false) {
      this.recommendedHashTagIndx = this.recommendedHashTagIndx.filter(item => item !== singlePrediction);
    }

    this.props.handleTextChange("hashTagPageSelection", singlePrediction, clicked);
  }

  render() {
    const { hashTags, handleTextChange, callback, renderSuggestionsRow, 
            data, handleInputSubmit } = this.props;
    const { width } = Dimensions.get('window');
    const imageFile = require("../../../images/03.png");


    // console.log("@@@@@ inside HashTagSelectionPage this.props", this.props);
    // console.log("@@@@@ inside HashTagSelectionPage this.state", this.state);

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
                // Object.keys(this.state.predictions).length !== 0 && this.state.predictions.prediction.length !== 0 ?
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
                          />
                        );
                      })
                      
                    }
                  </View>
                </React.Fragment>
                : null
              }


              <View style={{marginTop: 40}}>
                <TextInput
                  style={{
                    height: 64, 
                    borderColor: 'black', 
                    borderBottomWidth: 1,
                    borderBottomColor: '#A3A3A2',
                    width: '100%',
                    // margin: 5,
                    // marginRight: 10,
                    alignSelf: 'center',
                    fontSize: 16,
                    lineHeight: 28,
                    color: 'black',
                    paddingLeft: 32
                    // marginTop: 60
                  }}
                  keyboardType="default"
                  placeholder='Type hashtag'
                  // onChangeText={(text) => this.setState({subCategorySearchText: text})}
                />
                <Ionicons size={28} name="ios-search" style={{position: 'absolute', left: 0, top: 16}}/>

                
              </View>
            </View>
          </View>
        </SafeAreaView>


        {/* <View style={styles.hashTagPage}>
          <Text style={styles.hashTagPageTitle}>Please Select Hashtags.</Text>
          <Text style={styles.hashTagPageSubTitle}>
            These hashtags will be used for categories as well as for the title.
          </Text>
          
          {
            // Object.keys(this.state.predictions).length !== 0 && this.state.predictions.prediction.length !== 0 ?
            this.state.recommendedHashTags.length !== 0 ?
            <React.Fragment>
              <Text style={{color: "#00529b", marginBottom: 10}}>
                Select to use <Text style={{fontWeight: 'bold', color: "#00529b"}}>Recommended Hash Tags. </Text>
              </Text>
              <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
                {
                  this.state.recommendedHashTags.map((item, index) => {
                    let singleItem = item

                    return (
                      <SingleRecommendedHashTag
                        key={index}
                        index={index}
                        handleRecommendedHashTag={this.handleRecommendedHashTag}
                        singlePrediction={singleItem}
                      />
                    );
                  })
                  
                }
              </View>
            </React.Fragment>
            : null
          }
          
          <View style={styles.hashTagPageContent}>
            <MentionsTextInput
              textInputStyle={{ 
                borderColor: '#E3E1E1', 
                borderWidth: 1, 
                padding: 5, 
                fontSize: 15, 
                marginBottom: 10, 
                paddingLeft: 15, 
                paddingTop: 10, 
                width: 330,
                alignSelf: 'center'
              }}
              suggestionsPanelStyle={{ backgroundColor: '#FBFBFB', borderWidth: 1, borderColor: "#E3E1E1", width: 330, alignSelf: 'center'}}
              loadingComponent={() => <View style={{ flex: 1, width, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>}
              textInputMinHeight={40}
              textInputMaxHeight={80}
              trigger={'#'}
              triggerLocation={'new-word-only'}
              value={hashTags}
              onChangeText={(text) => handleTextChange("hashTagPageSelection", text)}
              triggerCallback={this.callback.bind(this)}
              renderSuggestionsRow={this.renderSuggestionsRow.bind(this)}
              suggestionsData={this.state.data}
              keyExtractor={(item, index) => item.UserName}
              suggestionRowHeight={40}
              horizontal={false}
              MaxVisibleRowCount={2.6}
              placeholder="Type # tags"
            />
            <Button 
              style={styles.hashTagePageButton}
              onPress={(e) => handleInputSubmit("hashTagsInput")}
              disabled={hashTags !== "" && hashTags.length > 2 ? false : true}
            >
              <Text style={styles.hashTagePageButtonText}>Next</Text>
            </Button>
          </View>
        </View> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  // registerItem: state.registerItem || {},
  recommendedHashTags: state.recommendedHashTags || {}
});

const mapDispatchToProps = {
  // postItem: postItem,
  // getMetadata: getMetadata,
  // getItem: getItem,
  // detectImage: detectImage,
  getRecommendedHashTags: getRecommendedHashTags
};

export default connect(mapStateToProps, mapDispatchToProps)(HashTagSelectionPage);

// export default HashTagSelectionPage;
