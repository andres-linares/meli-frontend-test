import redis from '../../src/redis-client';
import { searchEndpoint, itemEndpoint } from '../../src/controllers/items-controller';
import { Request, Response } from 'express';

jest.mock('../../src/redis-client');
jest.mock('../../src/models/items-model');

const mockedRedis = redis as jest.Mocked<typeof redis>;

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

describe('ItemsController', () => {
  describe('searchEndpoint', () => {
    describe('redis', () => {
      beforeEach(() => {
        mockRequest = { query: { q: 'test' } };
        mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      });

      it('returns the cached response when the query exists in cache', async () => {
        mockedRedis.get.mockResolvedValueOnce(JSON.stringify({ success: 'yeah' }));

        await searchEndpoint(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.json).toHaveBeenCalledWith({ success: 'yeah' });
      });

      it('sets the result on cache when query does not exist', async () => {
        mockedRedis.get.mockResolvedValueOnce(null);

        await searchEndpoint(mockRequest as Request, mockResponse as Response);

        expect(mockedRedis.set).toHaveBeenCalled();
      });

      it('does not call set nor searchItems when query is in cache', () => {

      });
    });
  });

  describe('itemEndpoint', () => {
    describe('redis', () => {
      it('returns the cached response when the id exists in cache', () => {

      });

      it('sets the item on cache when it does not exist', () => {

      });

      it('does not call set nor getItemDetail when item is in cache', () => {

      });
    });
  });
});