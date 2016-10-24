import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { graphql } from 'react-apollo';
import { Column as Col, Row, Grid } from 'react-native-flexbox-grid';
import gql from 'graphql-tag';

import
{
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
}
from 'react-native';

import { InputGroup, Input, Icon } from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Map } from 'immutable';
import { Actions } from 'react-native-router-flux';
import NavigationBar from 'react-native-navbar';
import Drawer from 'react-native-drawer';

import SensorDisplay from '../../components/SensorDisplay';
import OpenBtn from '../../components/OpenBtn';
import CloseBtn from '../../components/CloseBtn';

import * as globalActions from '../../reducers/global/globalActions';


import styles from './styles';

const actions = [
  globalActions,
];



function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}


const SensorData = gql`
query Sense ($id: Int!, $ip: String, $port: String) {
  FortuneCookie
  AgricultureSensor(id: $id, ip: $ip, port: $port) {
    temprature
    humidity
    illumination
  }
}
`;

const queryConfig = {
  options: ({ id, ip, port }) => ({
    variables: { id, ip, port }
  }),
  // ↓ 类似 static defaultProps，此处提及的 props 会被用 ... spread 到组件的 props 里，但 Apollo 提供的 data 对象里没提到的属性会被拦截
  // 除了在这边提供默认值，也可以在组件里提供默认值，但那样有时难以发现错误; 在这提供默认值不利在于需求变更时需要改三处地方，query、这里、PropTypes
  props: ({ ownProps, data: { refetch, loading, AgricultureSensor } }) => ({
    refetch,
    loading,
    temprature: loading || !AgricultureSensor ? undefined : AgricultureSensor.temprature,
    humidity: loading || !AgricultureSensor ? undefined : AgricultureSensor.humidity,
    illumination: loading || !AgricultureSensor ? undefined : AgricultureSensor.illumination,
  })
};


@graphql(SensorData, queryConfig)
export default class Main extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    refetch: PropTypes.func.isRequired,
    temprature: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    illumination: PropTypes.number.isRequired,
  };

  static defaultProps = {
    temprature: 25.0,
    humidity: 70.0,
    illumination: 170,
  };

  constructor(props) {
    super(props);
    this.state = {
      ip: '192.168.31.254',
      port: '6318',
    };
  }



  render() {
    return (
      <RefreshControl
        style={styles.container}
        refreshing={this.props.loading || false}
        onRefresh={this.props.refetch}
        colors={['#ff0000', '#00ff00', '#0000ff', '#123456']}
        progressBackgroundColor={'#ffffff'}
      >
        <InputGroup borderType="underline" >
          <Input
            style={{ textAlign: 'center' }}
            defaultValue={this.state.ip + ':' + this.state.port}
            placeholder="请输入农业设备地址 ip:port"
            onChangeText={text => this.setState({ ip: text.split(':')[0], port: text.split(':')[1] })}
          />
        </InputGroup>
        <View style={styles.sensorDisplay} >
          <SensorDisplay
            id={3}
            temprature={this.props.temprature}
            humidity={this.props.humidity}
            illumination={this.props.illumination}
            ip={this.state.ip}
            port={this.state.port}
          />
        </View>
        <View style={styles.controlPanel}>
          <View style={styles.btnGloup}>
            <OpenBtn id={3} ip={this.state.ip} port={this.state.port} />
            <CloseBtn id={3} ip={this.state.ip} port={this.state.port} />
          </View>
          <View style={styles.btnGloup}>
            <OpenBtn id={8} ip={this.state.ip} port={this.state.port} />
            <CloseBtn id={8} ip={this.state.ip} port={this.state.port} />
          </View>
        </View >
      </RefreshControl >
    );
  }
}

