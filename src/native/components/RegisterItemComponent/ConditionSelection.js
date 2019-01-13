import React                                        from "react";
import { View, TextInput, ScrollView }              from 'react-native';
import { Text, Button }                             from 'native-base';
import styles                                       from '../../styles/RegisterItemStyles';

class ConditionSelection extends React.Component {

  render() {
    const { conditionSelectionError, conditionName, handleSelection, 
            conditionClicked, handleInputSubmit } = this.props;

    return (
      <React.Fragment>
        <View style={styles.conditionSection}>
          <Text style={{fontWeight: 'bold', fontSize: 25, marginBottom: 10}}>CONDITION</Text>
          
          <Text style={styles.tradeSectionSubTitle}>
            Please select a condition of your item.
          </Text>
          {
            conditionSelectionError === true ?
              <Text style={styles.courseNameSectionErrorMsg}>
                Please select a condition for your item.
              </Text>
            :
              null
          }

          <ScrollView
            showsHorizontalScrollIndicator={true}
            horizontal={true}
          >
            <View style={styles.conditionButtonSection}>
              <Button
                style={[ styles.conditionButton,
                      {backgroundColor: conditionClicked === true && conditionName === "New" ? "#3578e5" : "white",}]}
                onPress={(e) => handleSelection("conditionSelection", "New")}
              > 
                <View style={styles.conditionCardView}>
                  <Text style={{
                    textAlign: 'center', 
                    color: conditionClicked === true && conditionName === "New" ? "white" : "#3578e5",
                  }}>New</Text>
                  <Text 
                    style={[ styles.conditionButtonText,
                      {color: conditionClicked === true && conditionName === "New" ? "white" : "#3578e5",}]}>
                    New with tags {"\n"}
                    (NWT). Unopened {"\n"}
                    package. Unused.
                  </Text>
                </View>
              </Button>

              <Button
                style={[ styles.conditionButton,
                      {marginLeft: 10, backgroundColor: conditionClicked === true && conditionName === "Like New" ? "#3578e5" : "white"}]}
                onPress={(e) => handleSelection("conditionSelection", "Like New")} 
              > 
                <View style={styles.conditionCardView}>
                  <Text style={{
                    textAlign: 'center', 
                    color: conditionClicked === true && conditionName === "Like New" ? "white" : "#3578e5",
                  }}>Like New</Text>
                  <Text 
                    style={[ styles.conditionButtonText,
                      {color: conditionClicked === true && conditionName === "Like New" ? "white" : "#3578e5"}]}>
                    New without tags {"\n"}
                    (NWOT). No signs {"\n"}
                    of wear. Unused.
                  </Text>
                </View>
              </Button>

              <Button
                style={[ styles.conditionButton,
                      {marginLeft: 10, backgroundColor: conditionClicked === true && conditionName === "Good" ? "#3578e5" : "white"}]}
                onPress={(e) => handleSelection("conditionSelection", "Good")} 
              > 
                <View style={styles.conditionCardView}>
                  <Text style={{
                    textAlign: 'center', 
                    color: conditionClicked === true && conditionName === "Good" ? "white" : "#3578e5",
                  }}>Good</Text>
                  <Text 
                    style={[ styles.conditionButtonText,
                      {color: conditionClicked === true && conditionName === "Good" ? "white" : "#3578e5"}]}>
                    Gently used One/ {"\n"}
                    few minor flaws. {"\n"}
                    Functional.
                  </Text>
                </View>
              </Button>

              <Button
                style={[ styles.conditionButton,
                      {marginLeft: 10, backgroundColor: conditionClicked === true && conditionName === "Fair" ? "#3578e5" : "white"}]}
                onPress={(e) => handleSelection("conditionSelection", "Fair")} 
              > 
                <View style={styles.conditionCardView}>
                  <Text style={{
                    textAlign: 'center', 
                    color: conditionClicked === true && conditionName === "Fair" ? "white" : "#3578e5",
                  }}>Fair</Text>
                  <Text 
                    style={[ styles.conditionButtonText,
                      {color: conditionClicked === true && conditionName === "Fair" ? "white" : "#3578e5"}]}>
                    Used, functional, {"\n"}
                    multiple flaws / {"\n"}
                    defects
                  </Text>
                </View>
              </Button>

              <Button 
                style={[ styles.conditionButton,
                      {marginLeft: 10, backgroundColor: conditionClicked === true && conditionName === "Poor" ? "#3578e5" : "white"}]}
                onPress={(e) => handleSelection("conditionSelection", "Poor")} 
              > 
                <View style={styles.conditionCardView}>
                  <Text style={{
                    textAlign: 'center', 
                    color: conditionClicked === true && conditionName === "Poor" ? "white" : "#3578e5",
                  }}> Poor </Text>
                  <Text 
                    style={[ styles.conditionButtonText,
                      {color: conditionClicked === true && conditionName === "Poor" ? "white" : "#3578e5"}]}>
                    Major flaws, may {"\n"}
                    be damaged, {"\n"}
                    for parts
                  </Text>
                </View>
              </Button>
            </View>
          </ScrollView>

          <Button 
            style={[styles.hashTagePageButton, {marginTop: 30}]}
            onPress={(e) => handleInputSubmit("ConditionSelectionInput")}
            disabled={conditionClicked === true ? false : true}
          >
            <Text style={styles.hashTagePageButtonText}>Next</Text>
          </Button>
        </View>
      </React.Fragment>
    );
  }
}

export default ConditionSelection;
