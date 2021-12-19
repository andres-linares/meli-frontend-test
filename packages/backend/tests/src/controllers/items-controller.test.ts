import redis from '../../../src/redis-client';
import { searchEndpoint, itemEndpoint } from '../../../src/controllers/items-controller';
import { Request, Response } from 'express';
import * as itemModel from '../../../src/models/items-model';

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
          expect(itemModel.searchItems).not.toHaveBeenCalled();
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
          expect(itemModel.searchItems).toHaveBeenCalled();
        });
      });
    });

    it('returns 400 when searchItems fails', async () => {
      mockRequest = { query: { q: 'test' } };
      mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockedItemModel = itemModel as jest.Mocked<typeof itemModel>;
      mockedItemModel.searchItems.mockRejectedValueOnce('');

      await searchEndpoint(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('returns the value obtained from searchItems', async () => {
      mockRequest = { query: { q: 'test' } };
      mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const searchItemsResponse = { author: { name: 'a', lastname: 'b' } }

      const mockedItemModel = itemModel as jest.Mocked<typeof itemModel>;
      mockedItemModel.searchItems.mockResolvedValueOnce(searchItemsResponse);

      await searchEndpoint(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(searchItemsResponse);
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
          expect(itemModel.getItemDetail).not.toHaveBeenCalled();
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
          expect(itemModel.getItemDetail).toHaveBeenCalled();
        });
      });
    });

    it('returns 400 when getItemDetail fails', async () => {
      mockRequest = { params: { id: 'test' } };
      mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockedItemModel = itemModel as jest.Mocked<typeof itemModel>;
      mockedItemModel.getItemDetail.mockRejectedValueOnce('');

      await itemEndpoint(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('returns the value obtained from getItemDetail', async () => {
      mockRequest = { params: { id: 'test' } };
      mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const getItemDetailResponse = { author: { name: 'a', lastname: 'b' } }

      const mockedItemModel = itemModel as jest.Mocked<typeof itemModel>;
      mockedItemModel.getItemDetail.mockResolvedValueOnce(getItemDetailResponse);

      await itemEndpoint(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(getItemDetailResponse);
    });
  });
});