import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from 'react-native-material-design';

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
mutation IrrigationControlOff ($id: Int!, $ip: String, $port: String) {
  closeIrrigator(id: $id, ip: $ip, port: $port)
}
`;

const queryConfig = {
  options: ({ id, ip, port }) => ({
    variables: { id, ip, port },
    pollInterval: 1000
  }),
  props: ({ ownProps, mutate }) => ({
    turnOff: () => mutate({ id: ownProps.id, ip: ownProps.ip, port: ownProps.port })
  })
};


@graphql(IrrigationControl, queryConfig)
export default class CloseBtn extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    turnOff: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.btn}>
        <Button raised primary={'paperPink'} style={{ height: 300 }} onPress={this.props.turnOff} text={`关闭灌溉器${this.props.id}`} />
      </View>
    );
  }
}
