export const typeDefinitions = [`schema {
  query: RootQuery
  mutation: RootMutation
}

type RootMutation {
  openIrrigator(id: Int!, ip: String, port: String): Boolean
  closeIrrigator(id: Int!, ip: String, port: String): Boolean
}

type AgricultureSensorDataType {
  temprature: Float!,
  humidity: Float!,
  illumination: Int!
}

type RootQuery {
  FortuneCookie: String
  AgricultureSensor(id: Int!, ip: String, port: String): AgricultureSensorDataType!
}
`];

import { property, isEmpty, find, matchesProperty, flatten } from 'lodash';
import moment from 'moment';

export const resolvers = {
  RootMutation: {
    openIrrigator(root, { id, ip, port }, context) {
      return context.IOT.irrigaterOn(id, ip, port);
    },
    closeIrrigator(root, { id, ip, port }, context) {
      return context.IOT.irrigaterOff(id, ip, port);
    },
  },
  RootQuery: {
    FortuneCookie(root, args, context) {
      return context.FortuneCookie.getFortuneCookie();
    },
    AgricultureSensor(root, { id, ip, port }, context) {
      return context.IOT.getSensorData(id, ip, port);
    },
  },
};
