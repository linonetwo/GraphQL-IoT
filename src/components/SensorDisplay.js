import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Bar } from 'react-native-progress';

import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 60,
    paddingBottom: 30,
  },
  percentage: {
    color: 'gray',
  },
  progressBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  progressBarText: {
    textAlign: 'center',
    marginTop: -22,
    color: 'black',
  },
});

const getRate = (current, total) => {
  if (!(total > 0)) {
    return '-';
  }
  if (!(current >= 0)) {
    return '-';
  }
  return current / total;
};


export default class SensorDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.loading;
  }

  render() {
    const temperatureTotal = 40;
    const humidityTotal = 140;
    const illuminationTotal = 400;
    return (
      <View style={styles.container}>
        <View style={styles.progressBar}>
          <Bar progress={getRate(this.props.temprature, temperatureTotal) === '-' ? 0 : getRate(this.props.temprature, temperatureTotal)} width={(width - 20) / 3} color={'#66CCFF'} height={20} />
          <Text style={styles.progressBarText}> { `温度 ${this.props.temprature}°C` } </Text>
        </View>
        <View style={styles.progressBar}>
          <Bar progress={getRate(this.props.humidity, humidityTotal) === '-' ? 0 : getRate(this.props.humidity, humidityTotal)} width={(width - 20) / 3} color={'#66CCFF'} height={20} />
          <Text style={styles.progressBarText}> { `湿度 ${this.props.humidity}` } </Text>
        </View>
        <View style={styles.progressBar}>
          <Bar progress={getRate(this.props.illumination, illuminationTotal) === '-' ? 0 : getRate(this.props.illumination, illuminationTotal)} width={(width - 20) / 3} color={'#66CCFF'} height={20} />
          <Text style={styles.progressBarText}> { `亮度 ${this.props.illumination}` } </Text>
        </View>
      </View>
    );
  }
}
