import React, { Component }                                     from 'react';
import { View, TouchableOpacity, Dimensions, TextInput,
         FlatList, ScrollView }                                 from 'react-native';
import { Content, Text, ListItem }                              from 'native-base';
import MaterialIcon                                             from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon                                              from 'react-native-vector-icons/Feather'; 
import styles                                                   from '../styles/FilterPageStyles';

class FilterPage extends Component {
  constructor(props) {
    super(props);

    this.categories = [
      {id: "0", categoryName: 'All Categories'},
      {id: "1", categoryName: "Fashion"},
      {id: "2", categoryName: "Electronics"},
      {id: "3", categoryName: "Books"},
      {id: "4", categoryName: "Home & Kitchen"},
      {id: "5", categoryName: "Gaming & Entertainment"},
      {id: "6", categoryName: "Sports & Outdoors"}
    ]
    
    this.distanceTypes = [
      {id: "0", distanceType: 'Default'},
      {id: "1", distanceType: "Within 1 mile"},
      {id: "2", distanceType: "Within 5 miles"},
      {id: "3", distanceType: "Within 10 miles"},
      {id: "4", distanceType: "Within 20 miles"}
    ];

    this.sortBySelections = [
      {id: "0", sortBySelection: 'Relevance'},
      {id: "1", sortBySelection: "Newest first"},
      {id: "2", sortBySelection: "Closest first"},
      {id: "3", sortBySelection: "Price: low to high"},
      {id: "4", sortBySelection: "Price: high to low"}
    ];
  }

  state = {
    selectedCategory: 'All Categories',
    categorySectionClicked: false,
    userLocation: "10001, New York, NY",
    selectedDistance: 'Default',
    distanceSectionClicked: false,
    selectedSortBy: 'Relevance',
    sortBySectionClicked: false
  }

  handleCategoryClick = () => {
    this.setState({
      categorySectionClicked: !this.state.categorySectionClicked
    });
  }

  handleSingleCategory = (categoryName) => {
    this.setState({
      categorySectionClicked: false,
      selectedCategory: categoryName
    });
  }

  handleDistanceClick = () => {
    this.setState({
      distanceSectionClicked: !this.state.distanceSectionClicked
    });
  }

  handleSingleDistance = (distanceType) => {
    this.setState({
      distanceSectionClicked: false,
      selectedDistance: distanceType
    })
  }

  handleSortByClick = () => {
    this.setState({
      sortBySectionClicked: !this.state.sortBySectionClicked
    });
  }

  handleSingleSortBy = (sortBySelection) => {
    this.setState({
      sortBySectionClicked: false,
      selectedSortBy: sortBySelection
    })
  }

  render() {
    const { height, width } = Dimensions.get('window');

    return (
      <Content style={styles.filterPage}>
        <ScrollView 
          style={styles.filterPageScrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
          <Text style={styles.categorySectionTitle}>
            Categories
          </Text>

          <TouchableOpacity style={styles.dropDown} onPress={(e) => this.handleCategoryClick()}> 
            <Text style={styles.selectedText}>
              {this.state.selectedCategory}
            </Text>

            <MaterialIcon 
              name= {this.state.categorySectionClicked === false ? "keyboard-arrow-down" : "keyboard-arrow-up"}
              size={24} 
              color="#A3A3A2"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>

          {
            this.state.categorySectionClicked === true ?
            <FlatList
              style={styles.flatList}
              data={this.categories}
              keyExtractor={category=> category.id}
              renderItem={({ item }) => {
                return (
                  <ListItem style={{marginLeft: 0}}>
                    <TouchableOpacity style={styles.singleCategory}
                      onPress={(e) => this.handleSingleCategory(item.categoryName)}
                    >
                      <Text style={styles.singleCategoryName}>
                        {item.categoryName}
                      </Text>

                      {
                        this.state.selectedCategory === item.categoryName ?
                        <MaterialIcon 
                          name= "check"
                          size={24} 
                          color="black"
                          style={styles.checkIcon}
                        />
                        : null
                      }
                    </TouchableOpacity>
                  </ListItem>
                );
              }}
            /> : null
          }
          </View>

          <View>
            <Text style={styles.sectionTitleTwo}>
              Location
            </Text>

            <View style={styles.locationSection}> 
              <TextInput
                onChangeText={(text) => this.setState({userLocation: text})}
                value={this.state.userLocation}
                maxLength={40}
                underlineColorAndroid="transparent"
                style={styles.locationSectionTextInput}
              />
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitleTwo}>
              Distance
            </Text>

            <TouchableOpacity style={styles.dropDown} onPress={(e) => this.handleDistanceClick()}> 
              <Text style={styles.selectedText}>
                {this.state.selectedDistance}
              </Text>

              <MaterialIcon 
                name= {this.state.distanceSectionClicked === false ? "keyboard-arrow-down" : "keyboard-arrow-up"}
                size={24} 
                color="#A3A3A2"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>

            {
              this.state.distanceSectionClicked === true ?
              <FlatList
                style={styles.flatList}
                data={this.distanceTypes}
                keyExtractor={distanceType=> distanceType.id}
                renderItem={({ item }) => {
                  return (
                    <ListItem style={{marginLeft: 0}}>
                      <TouchableOpacity 
                        style={styles.singleCategory}
                        onPress={(e) => this.handleSingleDistance(item.distanceType)}
                      >
                        <Text style={styles.singleCategoryName}>
                          {item.distanceType}
                        </Text>

                        {
                          this.state.selectedDistance === item.distanceType ?
                          <MaterialIcon 
                            name= "check"
                            size={24} 
                            color="black"
                            style={styles.checkIcon}
                          /> : null
                        }
                      </TouchableOpacity>
                    </ListItem>
                  );
                }}
              /> : null
            }
          </View>

          <View>
            <Text style={styles.sectionTitleTwo}>
              Sort by
            </Text>

            <TouchableOpacity style={styles.dropDown} onPress={(e) => this.handleSortByClick()}> 
              <Text style={styles.selectedText}>
                {this.state.selectedSortBy}
              </Text>

              <MaterialIcon 
                name= {this.state.sortBySectionClicked === false ? "keyboard-arrow-down" : "keyboard-arrow-up"}
                size={24} 
                color="#A3A3A2"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>

            {
              this.state.sortBySectionClicked === true ?
              <FlatList
                style={styles.flatList}
                data={this.sortBySelections}
                keyExtractor={sortByType=> sortByType.id}
                renderItem={({ item }) => {
                  return (
                    <ListItem style={{marginLeft: 0}}>
                      <TouchableOpacity 
                        style={styles.singleCategory}
                        onPress={(e) => this.handleSingleSortBy(item.sortBySelection)}
                      >
                        <Text style={styles.singleCategoryName}>
                          {item.sortBySelection}
                        </Text>

                        {
                          this.state.selectedSortBy === item.sortBySelection ?
                          <MaterialIcon 
                            name= "check"
                            size={24} 
                            color="black"
                            style={styles.checkIcon}
                          /> : null
                        }
                      </TouchableOpacity>
                    </ListItem>
                  );
                }}
              /> : null
            }
          </View>
          
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.resetButton}>
              <FeatherIcon 
                name="arrow-right" 
                color="black" 
                size={24} 
                style={styles.arrowRightIcon}
              />

              <Text style={styles.resetButtonText}>
                Reset
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Content>
    );
  }
}

export default FilterPage;

