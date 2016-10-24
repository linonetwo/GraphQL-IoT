import ApolloClient, { printAST, addTypename, addQueryMerging } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { graphql } from 'graphql';

import { merge, mapValues } from 'lodash';
import { makeExecutableSchema } from './schemaGenerator';

import { typeDefinitions as rootSchema, resolvers as rootResolvers } from './schema';
import { Irrigator, FortuneCookie } from './models';
import IrrigationConnector from './IrrigationConnector';

const typeDefs = [...rootSchema];
const resolvers = merge(rootResolvers);

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

const IOTConnector = new IrrigationConnector();

const REST2GraphQLInterface = {
  query(GraphQLRequest) {
    return graphql(
      executableSchema, // schema: GraphQLSchema
      printAST(GraphQLRequest.query), // requestString: string
      undefined, // rootValue?: ?any
      { // contextValue?: ?any,
        IOT: new Irrigator({ connector: IOTConnector }),
        FortuneCookie: new FortuneCookie(),
      },
      GraphQLRequest.variables, // variableValues?: ?{[key: string]: any}
      undefined // operationName?: ?string
    );
  }
};

const client = new ApolloClient({
  networkInterface: addQueryMerging(REST2GraphQLInterface),
  queryTransformer: addTypename,
  shouldBatch: true,
});

export default client;
