import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity, Dimensions }                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
// import { connect }                                     from 'react-redux';


class SideBarMenu extends Component {


  render() {
    const { closeDrawer } = this.props;

    const { height, width } = Dimensions.get('window');

    return (
      <Container>
        <Content style={{backgroundColor: 'black', marginLeft: 1}}>
          <TouchableOpacity style={{flex: 1}} onPress={()=> closeDrawer()} activeOpacity={1}>
            <View 
              style={{
                flexDirection: 'column', 
                backgroundColor: 'black',
                height: height * 0.33,
                // shadowColor: '#000000', 
                // shadowOpacity: 2, 
                // shadowRadius: 3,
                // shadowOffset: {
                //   height: 1,
                //   width: 1
                // },
                // marginTop: 40
                borderBottomWidth: 0.5,
                borderBottomColor: 'white'
              }}>
              
              <View 
                // style={styles.profileHeadShot} 
                style={{
                  marginLeft: "4.27%",
                  marginTop: "18%",
                  width: 80, 
                  height: 80, 
                  backgroundColor:'#959595',
                  borderRadius: 50,
                }}
              />
              
              <View 
                // style={styles.profileHeaderContent}.
                style={{
                  flex: 1, 
                  flexDirection: 'column', 
                  marginLeft: 20, 
                  marginTop: 35
                }}
              >
                <Text 
                  // style={styles.profileName}
                  style={{
                    fontSize: 24, 
                    fontWeight: 'bold', 
                    color: 'white', 
                    lineHeight: 28
                  }}
                >
                  {/* {name} */}
                  Alexandria Zoltowski
                </Text>

                <Text 
                  // style={styles.profileDesc}
                  style={{
                    marginTop: 13, 
                    fontSize: 16, 
                    color: '#ECEBEB', 
                    lineHeight: 24
                  }}
                >
                  Head of UX @Yelp
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 31}}>
              <TouchableOpacity>
                <Text style={{fontSize: 20, letterSpacing: 1, margin: 10, color: 'white', fontWeight: '500', marginBottom: 32}}>
                  Safety Tips
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{fontSize: 20, letterSpacing: 1, margin: 10, color: 'white', fontWeight: '500', marginBottom: 32}}>
                  Block User
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{fontSize: 20, letterSpacing: 1, margin: 10, color: 'white', fontWeight: '500', marginBottom: 32}}>
                  Delete Chat
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{fontSize: 20, letterSpacing: 1, margin: 10, color: 'white', fontWeight: '500', marginBottom: 32}}>
                  Report User
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{fontSize: 20, letterSpacing: 1, margin: 10, color: 'white', fontWeight: '500'}}>
                  Mark as Swapped
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default SideBarMenu;

