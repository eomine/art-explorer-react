import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

function request<T>(endpoint: string) {
  return axios
    .get(`${API_BASE_URL}${endpoint}`)
    .then((response) => {
      return response.data as T;
    })
    .catch((error: AxiosError) => {
      return Promise.reject(error.message);
    });
}

type SearchResults = {
  objectIDs?: number[];
  total: number;
};

// TODO implement pagination
export function getSearchResults() {
  return request<SearchResults>('/search?hasImages=true&q=painting').then(
    (collection) => collection.objectIDs?.slice(0, 15) || [],
  );
}

export type ArtObject = {
  artistDisplayName: string;
  department: string;
  medium: string;
  objectDate: string;
  objectID: number;
  objectURL: string;
  primaryImage: string;
  primaryImageSmall: string;
  title: string;
};

export function getArtObject(objectID: number) {
  return request<ArtObject>(`/objects/${objectID}`);
}
