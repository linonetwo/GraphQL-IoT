import Promise from 'bluebird';


import {
  API_FAILURE,
  NO_TOKEN,
} from './errorTypes';

export default class IrrigationConnector {
  constructor() {
    this.ip = '';
    this.port = 0;
  }

  isValidIP(ip) {
    return /^(\d{1,3}|\*)\.(\d{1,3}|\*)\.(\d{1,3}|\*)\.(\d{1,3}|\*)$/g // 模糊匹配IP地址
      .test(ip);
  }

  isValidPort(port) {
    return Number(port) > 0
      && Number(port) < 65536
      && /^(\d{1,5}|\*)$/g.test(port);
  }

  setIOTIp(ip) {
    if (ip === undefined) {
      return this.ip;
    }
    if (this.isValidIP(ip)) {
      this.ip = ip;
      return ip;
    }
    throw new Error('invalid-webconfig  you are using an invalid ip: ' + ip);
  }

  setIOTPort(port) {
    if (port === undefined) {
      return this.port;
    }
    if (this.isValidPort(port)) {
      this.port = port;
      return port;
    }
    throw new Error('invalid-webconfig  you are using an invalid port: ' + port);
  }

  control(route) {
    if (!this.isValidIP(this.ip) || !this.isValidPort(this.port)) {
      throw new Error(`invalid-webconfig  connector is having an invalid webconfig: ${ip}:${port} maybe ip or port is not properly setted`);
    }

    return Promise.try(() =>
      fetch(`http://${this.ip}:${this.port}/${route}`, {
        method: 'GET',
        headers: {},
      })
    )
  }

  get(route) {
    if (!this.isValidIP(this.ip) || !this.isValidPort(this.port)) {
      throw new Error(`invalid-webconfig  connector is having an invalid webconfig: ${ip}:${port} maybe ip or port is not properly setted`);
    }

    return Promise.try(() =>
      fetch(`http://${this.ip}:${this.port}/${route}`, {
        method: 'GET',
        headers: {},
      })
    )
      .then(response => response.json())
  }

  post(route, data) {
    return Promise.try(() =>
      fetch(`http://${this.ip}:${this.port}/${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })
    )
      .then(response => response.json())
  }
}
