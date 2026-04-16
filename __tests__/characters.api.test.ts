/**
 * @file __tests__/characters.api.test.ts
 * @description Unit tests for the characters API service functions.
 */

import {
  fetchCharacterById,
  fetchCharacters,
  fetchCharactersByIds,
} from '../src/api/characters';
import type { Character, PaginatedResponse } from '../src/shared/types/api';

/** Mock the Axios client */
jest.mock('../src/api/client', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

import apiClient from '../src/api/client';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

const mockPage: PaginatedResponse<Character> = {
  info: { count: 826, pages: 42, next: 'https://rickandmortyapi.com/api/character?page=2', prev: null },
  results: [mockCharacter],
};

describe('characters API', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('fetchCharacters', () => {
    it('calls /character with page param', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockPage });

      const result = await fetchCharacters(1);

      expect(apiClient.get).toHaveBeenCalledWith('/character', { params: { page: 1 } });
      expect(result.results).toHaveLength(1);
      expect(result.info.pages).toBe(42);
    });

    it('appends filters to params when provided', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockPage });

      await fetchCharacters(2, { name: 'Rick', status: 'Alive', gender: 'Male', species: '' });

      expect(apiClient.get).toHaveBeenCalledWith('/character', {
        params: { page: 2, name: 'Rick', status: 'Alive', gender: 'Male' },
      });
    });

    it('omits empty filter strings from params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockPage });

      await fetchCharacters(1, { name: '', status: '', gender: '', species: '' });

      const call = (apiClient.get as jest.Mock).mock.calls[0];
      expect(call[1].params).not.toHaveProperty('name');
      expect(call[1].params).not.toHaveProperty('status');
    });
  });

  describe('fetchCharacterById', () => {
    it('calls /character/:id and returns character', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCharacter });

      const result = await fetchCharacterById(1);

      expect(apiClient.get).toHaveBeenCalledWith('/character/1');
      expect(result.id).toBe(1);
    });
  });

  describe('fetchCharactersByIds', () => {
    it('returns empty array when ids is empty', async () => {
      const result = await fetchCharactersByIds([]);
      expect(result).toEqual([]);
      expect(apiClient.get).not.toHaveBeenCalled();
    });

    it('calls single endpoint for one id', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCharacter });

      const result = await fetchCharactersByIds([1]);

      expect(apiClient.get).toHaveBeenCalledWith('/character/1');
      expect(result).toHaveLength(1);
    });

    it('calls batch endpoint for multiple ids', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: [mockCharacter, mockCharacter] });

      const result = await fetchCharactersByIds([1, 2]);

      expect(apiClient.get).toHaveBeenCalledWith('/character/1,2');
      expect(result).toHaveLength(2);
    });
  });
});
