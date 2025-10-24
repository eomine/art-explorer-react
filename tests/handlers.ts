import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const handlers = [
  http.get(`${API_BASE_URL}/search`, () => {
    return HttpResponse.json({
      total: 3,
      objectIDs: [1, 2, 3],
    });
  }),
  http.get(`${API_BASE_URL}/objects/:objectID`, () => {
    return HttpResponse.json({
      artistDisplayName: 'John Doe',
      department: 'Department 1',
      medium: 'Oil on canvas',
      objectDate: '2025',
      objectID: 1,
      objectURL: 'https://www.metmuseum.org/art/collection/search/123456',
      primaryImage: 'image.jpg',
      primaryImageSmall: 'image-small.jpg',
      title: 'Untitled',
    });
  }),
  http.get(`${API_BASE_URL}/departments`, () => {
    return HttpResponse.json({
      departments: [
        {
          departmentId: 1,
          displayName: 'Department 1',
        },
        {
          departmentId: 2,
          displayName: 'Department 2',
        },
        {
          departmentId: 3,
          displayName: 'Department 3',
        },
      ],
    });
  }),
];
