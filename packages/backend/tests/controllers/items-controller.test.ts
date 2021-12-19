import redis from '../../src/redis-client';
import { searchEndpoint, itemEndpoint } from '../../src/controllers/items-controller';
import { Request, Response } from 'express';
import { getItemDetail, searchItems } from '../../src/models/items-model';

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

      describe('cache HIT', () => {
        beforeAll(() => {
          mockedRedis.get.mockResolvedValue(JSON.stringify({ ok: 'yes' }));
        });

        it('returns the cached response', async () => {  
          await searchEndpoint(mockRequest as Request, mockResponse as Response);
  
          expect(mockResponse.json).toHaveBeenCalledWith({ ok: 'yes' });
        });

        it('does not call redis.set nor searchItems', async() => {
          await searchEndpoint(mockRequest as Request, mockResponse as Response);
          
          expect(redis.set).not.toHaveBeenCalled();
          expect(searchItems).not.toHaveBeenCalled();
        });
      });

      describe('cache MISS', () => {
        beforeAll(() => {
          mockedRedis.get.mockResolvedValue(null);
        });

        it('does not return the null response from cache', async() => {
          await searchEndpoint(mockRequest as Request, mockResponse as Response);

          expect(mockResponse.json).not.toHaveBeenCalledWith(null);
        });

        it('calls searchItems and redis.set', async () => {
          await searchEndpoint(mockRequest as Request, mockResponse as Response);

          expect(redis.set).toHaveBeenCalled()
          expect(searchItems).toHaveBeenCalled();
        });
      });
    });
  });

  describe('itemEndpoint', () => {
    describe('redis', () => {
      beforeEach(() => {
        mockRequest = { params: { id: 'test' } };
        mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      });

      describe('cache HIT', () => {
        beforeAll(() => {
          jest.resetAllMocks();
          mockedRedis.get.mockResolvedValue(JSON.stringify({ ok: 'yes' }));
        });

        it('returns the cached response', async () => {  
          await itemEndpoint(mockRequest as Request, mockResponse as Response);
  
          expect(mockResponse.json).toHaveBeenCalledWith({ ok: 'yes' });
        });

        it('does not call redis.set nor getItemDetail', async() => {
          await itemEndpoint(mockRequest as Request, mockResponse as Response);
          
          expect(redis.set).not.toHaveBeenCalled();
          expect(getItemDetail).not.toHaveBeenCalled();
        });
      });

      describe('cache MISS', () => {
        beforeAll(() => {
          mockedRedis.get.mockResolvedValue(null);
        });

        it('does not return the null response from cache', async() => {
          await itemEndpoint(mockRequest as Request, mockResponse as Response);

          expect(mockResponse.json).not.toHaveBeenCalledWith(null);
        });

        it('calls getItemDetail and redis.set', async () => {
          await itemEndpoint(mockRequest as Request, mockResponse as Response);

          expect(redis.set).toHaveBeenCalled()
          expect(getItemDetail).toHaveBeenCalled();
        });
      });
    });
  });
});