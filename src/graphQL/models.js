/* eslint no-param-reassign: 0 */
import Promise from 'bluebird';
import moment from 'moment';
import { has, findIndex, find, matchesProperty, isFinite, padStart } from 'lodash';

import {
  USERNAME_USE_BEFORE_SET,
  PASSWORD_USE_BEFORE_SET,
  TOKEN_USE_BEFORE_SET,
  USERMETA_USE_BEFORE_SET,
  API_FAILURE,
  MODEL_DONT_HAVE_THIS_FIELD,
  IMPORTANT_ID_NOT_PROVIDED,
} from './errorTypes';

export class Irrigator {
  constructor({ connector }) {
    this.connector = connector;
  }

  irrigaterOn(id, ip, port) {
    this.connector.setIOTIp(ip);
    this.connector.setIOTPort(port);
    return this.connector.control(`${padStart(String(id), 4, '0')}_relay0_open`)
      .then(() => true)
      .catch((err) => {console.log(err); return false});
  }

  irrigaterOff(id, ip, port) {
    this.connector.setIOTIp(ip);
    this.connector.setIOTPort(port);
    return this.connector.control(`${padStart(String(id), 4, '0')}_relay0_close`)
      .then(() => true)
      .catch(() => false);
  }

  async getSensorData(id, ip, port) {
    try {
      this.connector.setIOTIp(ip);
      this.connector.setIOTPort(port);
      const data = await this.connector.get(`${padStart(String(id), 4, '0')}_sensor`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}


export class FortuneCookie {
  async getFortuneCookie() {
    try {
      const response = await fetch('http://fortunecookieapi.com/v1/cookie');
      const [{ fortune: { message: fortuneCookie } }] = await response.json();
      return fortuneCookie;
    } catch (error) {
      return error.toString();
    }
  }
}
