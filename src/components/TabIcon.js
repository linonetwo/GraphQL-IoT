
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  tabIcon: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  tabIconSelected: {
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


class TabIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const color = this.props.selected ? '#376C79' : '#606060';
    return (
      <View style={ this.props.selected ? styles.tabIconSelected : styles.tabIcon }>
        <Icon style={{ color }} name={this.props.iconName} size={30} />
        <Text style={{ color }}>{this.props.title}</Text>
      </View>
    );
  }
}

TabIcon.propTypes = {
  selected: PropTypes.bool.isRequired,
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

TabIcon.defaultProps ={
  selected: false,
};

export default TabIcon;

