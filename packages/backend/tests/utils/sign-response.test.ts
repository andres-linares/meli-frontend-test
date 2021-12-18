import config from 'config';
import signResponse from "../../src/utils/sign-response";

describe('signResponse', () => {
  it('adds an author property to a given object', () => {
    const testResponse = { cats: 3 };
    const signedtestResponse = signResponse(testResponse);

    expect(signedtestResponse.author).toBeTruthy();
  });

  it('adds the author specified in the config file', () => {
    const testResponse = { cats: 3 };
    const signedtestResponse = signResponse(testResponse);

    expect(signedtestResponse.author.name).toEqual(config.get('author.name'));
    expect(signedtestResponse.author.lastname).toEqual(config.get('author.lastname'));
  });
});