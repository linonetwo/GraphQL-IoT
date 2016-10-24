import { expect, should } from 'chai';
import { describe, it } from 'mocha';
import ApolloClient from 'apollo-client';
import 'whatwg-fetch';

import REST2GraphQLInterface from '../REST2GraphQLInterface';

const apolloClient = new ApolloClient({
  REST2GraphQLInterface,
  shouldBatch: true,
});

describe('Check basic usage', () => {

  it('put in a query, apollo-client should return a json containing what I want', () => {
    const query = `
      query UserInfos {
        currentUser {
          ...NameAndID
        }
      }
      fragment NameAndID on User {
        name
        id
      }
    `;

    return expect(
      apolloClient.query({ query })
    ).to.be.deep.equal(
      {}
    );
  });
});
