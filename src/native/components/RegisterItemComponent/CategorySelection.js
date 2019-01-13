import React                                        from "react";
import { View }                                     from 'react-native';
import { Text, Button }                             from 'native-base';
import MaterialIcon                                 from 'react-native-vector-icons/MaterialIcons';
import styles                                       from '../../styles/RegisterItemStyles';

class CategorySelection extends React.Component {

  render() {
    const { categories, handleEdit } = this.props;
    
    return (
      <React.Fragment>
        <View style={styles.categorySection}>
          <Text style={styles.categorySectionTitle}><Text style={{color: 'red'}}>* </Text>CATEGORY</Text>
          <Text style={styles.selectedCategory}>
            { `${categories.mainCategory}, ${categories.categoryLevelTwo}` }
          </Text>
          <Button
            style={styles.categoryEditButton}
            onPress={(e) => handleEdit("categorySelection")}
          >
            <MaterialIcon name="edit" size={20} color="#00529b" style={{marginTop: -15}}/>
          </Button>
        </View>
      </React.Fragment>
    );
  }
}

export default CategorySelection;
