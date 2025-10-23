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

type SearchResponse = {
  objectIDs?: number[];
  total: number;
};

const ITEMS_PER_PAGE = 15;

export function getSearchResults(
  query: string,
  page: number,
  departmentId?: string,
) {
  let url = `/search?hasImages=true&q=${query}`;
  if (departmentId) url += `&departmentId=${departmentId}`;
  return request<SearchResponse>(url).then((response) => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return response.objectIDs?.slice(start, end) || [];
  });
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

export type Department = {
  departmentId: number;
  displayName: string;
};

type DepartmentsResponse = {
  departments: Department[];
};

export function getDepartments() {
  return request<DepartmentsResponse>(`/departments`).then((response) => {
    return response.departments;
  });
}
