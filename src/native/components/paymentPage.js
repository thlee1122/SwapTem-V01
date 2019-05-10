import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity, Modal, WebView, Text }                   from 'react-native';
import { Container, Content }                 from 'native-base';
// import { Actions }                                        from 'react-native-router-flux';
// import { connect }                                     from 'react-redux';

// import styles                                             from '../styles/InboxStyles';

class PaymentPage extends Component {

  state = {
    showModal: false,
    status: 'Pending'
  };

  handleResponse = data => {
    if (data.title === "success") {
        this.setState({ showModal: false, status: "Complete" });
    } else if (data.title === "cancel") {
        this.setState({ showModal: false, status: "Cancelled" });
    } else {
        return;
    }
  };


  render() {
    return (
      <Container>
        <Content>
          <View style={{marginTop: 100}}>
            <Modal
              visible={this.state.showModal}
              onRequestClose={() => this.setState({showModal: false})}
            >
              <WebView
                source={{uri: 'http://localhost:3000'}}
                onNavigationStateChange={data =>
                  this.handleResponse(data)
                }
                injectedJavaScript={`document.f1.submit()`}
              />
            </Modal>
            <TouchableOpacity
              style={{width: 300, height: 100}}
              onPress={() => this.setState({showModal: true})}
            >
              <Text>Pay with Paypal</Text>
            </TouchableOpacity>

            <Text>
              Payment Status: {this.state.status}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default PaymentPage;

