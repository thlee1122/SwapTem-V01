import React                                        from "react";
import { View, TextInput }                          from 'react-native';
import { Text, Button }                             from 'native-base';
import MaterialIcon                                 from 'react-native-vector-icons/MaterialIcons';
import styles                                       from '../../styles/RegisterItemStyles';

class HashTagSelectionSection extends React.Component {

  render() {
    const { hashTags, handleEdit } = this.props;

    console.log("inside hashTagSelectionSection", hashTags);

    let newHashTagArray = hashTags.filter(hashTag => hashTag !== "").map((item) => {
      return `#${item}`
    });


    console.log("inside hashTagSelectionSection", newHashTagArray);  

    return (
      <React.Fragment>
        <View style={styles.hashTagSection}>
          <Text style={styles.hashTagSectionTitle}><Text style={{color: 'red'}}>* </Text>HASHTAGS</Text>
          <Text style={styles.hashTagSectionSubtitle}>{newHashTagArray.join(", ")}</Text>
          <Button style={styles.hashTagEditButton}
            onPress={(e) => handleEdit("hashTagSelection")}
          >
            <MaterialIcon name="edit" size={20} color="#00529b" style={{marginTop: -15}}/>
          </Button>
        </View>
      </React.Fragment>
    );
  }
}

export default HashTagSelectionSection;
