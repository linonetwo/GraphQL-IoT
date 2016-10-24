import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Button } from 'react-native-material-design';

import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  OpenBtn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  OpenBtnSelected: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 0,
    width: 300,
    borderTopColor: '#376C79',
    borderTopWidth: 0,
  },
});


const IrrigationControl = gql`
mutation IrrigationControlOn ($id: Int!, $ip: String, $port: String) {
  openIrrigator(id: $id, ip: $ip, port: $port)
}
`;

const queryConfig = {
  options: ({ id, ip, port }) => ({
    variables: { id, ip, port },
    pollInterval: 1000
  }),
  props: ({ ownProps, mutate }) => ({
    turnOn: (id) => mutate({ id, ip: ownProps.ip, port: ownProps.port })
  })
};


@graphql(IrrigationControl, queryConfig)
export default class OpenBtn extends Component {
  static propTypes = {
    turnOn: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.btn}>
        <Button raised primary={'paperBlue'} style={{ fontSize: 300 }} onPress={this.props.turnOn} text={`开启灌溉器${this.props.id}`} />
      </View>
    );
  }
}
