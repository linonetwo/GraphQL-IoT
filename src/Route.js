import { setGlobalHandler } from 'ErrorUtils'; /* eslint import/no-extraneous-dependencies: 0 */

import React, { Component } from 'react';
import { StyleSheet,
  AppRegistry,
  BackAndroid,
} from 'react-native';

import {
  Router,
  Scene,
  Switch,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import {
  Provider,
  connect,
} from 'react-redux';

import { ApolloProvider } from 'react-apollo';
import client from './graphQL/REST2GraphQLInterface';



import configureStore from './lib/configureStore';

import { setPlatform, setVersion } from './reducers/device/deviceActions';
import { setStore } from './reducers/global/globalActions';

import authInitialState from './reducers/auth/authInitialState';
import deviceInitialState from './reducers/device/deviceInitialState';
import globalInitialState from './reducers/global/globalInitialState';

import Main from './containers/Main/Main'; // 就是登陆之后进入的页面，有一个环形进度条和四个大按

import { version } from '../package.json';


// 防止闪退
setGlobalHandler((err) => console.warn(err)); // eslint-disable-line

function getInitialState() {
  const initState = {
    device: deviceInitialState().set('isMobile', true),
    global: globalInitialState(),
  };
  return initState;
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    borderTopWidth: 2,
    borderTopColor: '#EEEEEE',
    paddingBottom: 0,
    paddingTop: 0,
  },
});

const RouterWithRedux = connect()(Router);

// 用于将返回键定义为返回上一层级 https://github.com/aksonov/react-native-router-flux#production-apps-using-react-native-router-flux
export const handleBackAndroidDefault = () => { Actions.pop(); return true; };

export default function generateAppByPlatform(platform) {
  class Route extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentWillMount() {
      BackAndroid.addEventListener('hardwareBackPress', handleBackAndroidDefault);
    }

    render() {
      const store = configureStore(getInitialState());
      // configureStore will combine reducers from snowflake and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform));
      store.dispatch(setVersion(version));
      store.dispatch(setStore(store));

      return (
        <ApolloProvider client={client} store={store}>
          <RouterWithRedux sceneStyle={{ backgroundColor: 'white' }}>
            <Scene key="root" default="Main">
              <Scene
                key="Main"
                title="aaa"
                iconName={'home'}
                hideNavBar
                component={Main}
              />
            </Scene>
          </RouterWithRedux>
        </ApolloProvider>
      );
    }
  }
  AppRegistry.registerComponent('IrrigatorAPP', () => Route);
}
