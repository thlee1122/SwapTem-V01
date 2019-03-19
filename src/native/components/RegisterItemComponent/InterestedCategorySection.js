import React                                        from "react";
import { View, TouchableOpacity }                   from 'react-native';
import { Text, Button }                             from 'native-base';
import MaterialIcon                                 from 'react-native-vector-icons/MaterialIcons';
import styles                                       from '../../styles/RegisterItemStyles';

class InterestedCategorySection extends React.Component {

  render() {
    const { interestedCategories, handleEdit } = this.props;

    return (
      <View style={styles.interestedCategorySection}>
        <View style={styles.interestedCategoryTitleSection}>
          <Text style={styles.interestedCategoryTitle}>
            You have previously showed interests in following categories:
          </Text>

          <TouchableOpacity
            onPress={(e) => handleEdit("interestedCategoryEdit")}
            style={styles.interestedCategoryEditButton}
          >
            <MaterialIcon name="edit" size={20} color="#00529b" />
          </TouchableOpacity>
        </View>

        <Text style={styles.interestedCategoryInstruction}>
          Click on Edit icon to add or remove categories
        </Text>

        <Text style={styles.selectedInterestedCategories}>
          { interestedCategories.join(", ") }
        </Text>
      </View>
    );
  }
}

export default InterestedCategorySection;
