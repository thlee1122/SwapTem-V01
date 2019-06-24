import React                                        from "react";
import { View, StatusBar,SafeAreaView, Text,
         TouchableOpacity, Image, Dimensions }              from 'react-native';
import FeatherIcon                                  from 'react-native-vector-icons/Feather';
import styles                                       from '../../styles/RegisterItemStyles';

class ConditionSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedConditionName: ""
    };
  }

  handleSelection = (conditionName) => {
    this.setState({
      selectedConditionName: conditionName
    });
  }

  render() {
    const { handleInputSubmit, handleBackButton } = this.props;
    const imageFile = require("../../../images/04.png");
    const { width } = Dimensions.get('window');

    const conditionContent = [
      {
        name: "New",
        description: "New with tags (NWT). Unopened package. Unused"
      },

      {
        name: "Like New",
        description: " New without tags (NWOT). No signs of wear. Unused."
      },

      {
        name: "Good",
        description: "Gently used One/few minor flaws. Functional."
      },

      {
        name: "Fair",
        description: "Used, functional, multiple flaws / defects."
      },
    ]

    return (
      <React.Fragment>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          style={{ color: 'white', zIndex: 10 }}
        />

        <SafeAreaView style={{marginTop: -20, backgroundColor: 'black'}}>
          <View style={{backgroundColor: 'black', height: 300}}>
            <TouchableOpacity 
              style={{ paddingLeft: 10, paddingTop: 32 }} 
              onPress={() => {handleBackButton("condition selection")}}
            >
              <FeatherIcon name="arrow-left" size={30} color={"white"}/>
            </TouchableOpacity>
            
            <View style={{flexDirection: 'row', marginLeft: 16, marginTop: 132, marginRight: 16}}>
              <Image 
                source={imageFile}
                style={{
                  width: 70,
                  height: 50,
                  alignSelf: 'center',
                  marginRight: 20,
                }}
              />
              <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', lineHeight: 30, width: width * 0.68, paddingTop: 10}}>
                Condition Selection
              </Text>
            </View>
          </View>

          <View style={{paddingTop: 31, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16, lineHeight: 24, fontWeight: 'bold'}}>
                Please select a condition for your item.
              </Text>

              <View 
                style={{
                  marginTop: 32,
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start'
                }}
              >
                {
                  conditionContent.map((singleContent, index) => {
                    return (
                      <TouchableOpacity 
                        key={index} 
                        style={{
                          borderWidth: 2,
                          width: '47%', 
                          marginRight: index % 2 === 1 ? 0 : 13,
                          marginBottom: 20,
                          padding: 16,
                          borderRadius: 20,
                          height: 155,
                          backgroundColor: this.state.selectedConditionName === singleContent.name ? 'black' : 'white'
                        }}
                        onPress={(e) => this.handleSelection(singleContent.name)} 
                      >
                        <Text 
                          style={{
                            fontWeight: 'bold', 
                            fontSize: 18, 
                            textAlign: 'center', 
                            marginBottom: 10,
                            color: this.state.selectedConditionName === singleContent.name ? 'white' : 'black'
                          }}
                        >
                          {singleContent.name}
                        </Text>

                        <Text 
                          style={{
                            fontSize: 14, 
                            lineHeight: 24, 
                            textAlign: 'center',
                            color: this.state.selectedConditionName === singleContent.name ? 'white' : 'black'
                          }}
                        >
                          {singleContent.description}
                        </Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>

            <View style={{alignSelf: 'center', marginTop: 50}}>
              <TouchableOpacity 
                style={{
                  flexDirection: 'row', 
                  borderWidth: 1,
                  borderRadius: 15,
                  width: 278,
                  height: 58,
                  marginBottom: 40,
                  borderColor: this.state.selectedConditionName !== "" ? "black" : '#CECECE',
                  backgroundColor: this.state.selectedConditionName !== "" ? "white" :'#CECECE'
                }}
                disabled={this.state.selectedConditionName !== "" ? false : true}
                onPress={(e) => handleInputSubmit("ConditionSelectionInput", this.state.selectedConditionName)}
              >
                <Text 
                  style={{
                    fontSize: 14, 
                    fontWeight: 'bold', 
                    lineHeight: 20,
                    flex: 1,
                    textAlign: 'center',
                    marginTop: 18,
                    color: this.state.selectedConditionName !== "" ? "black" : 'white'
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

export default ConditionSelection;
