import '@testing-library/dom';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from '../src/App';
import Providers from '../src/components/Providers';

test('with no favorites', async () => {
  window.history.pushState({}, 'Favorites', '/favorites');

  render(<App />, { wrapper: Providers });

  await waitForElementToBeRemoved(screen.getAllByTestId('loading'));

  expect(screen.getByText('There are no favorites yet')).toBeInTheDocument();
});

test('with favorites', async () => {
  localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));
  window.history.pushState({}, 'Favorites', '/favorites');

  render(<App />, { wrapper: Providers });

  await waitForElementToBeRemoved(screen.getAllByTestId('loading'));
  await waitForElementToBeRemoved(screen.getAllByTestId('loading'));

  expect(screen.getAllByText('Untitled').length).toBe(3);
});

test('remove a favorite', async () => {
  localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));
  window.history.pushState({}, 'Favorites', '/favorites');

  render(<App />, { wrapper: Providers });

  await waitForElementToBeRemoved(screen.getAllByTestId('loading'));
  await waitForElementToBeRemoved(screen.getAllByTestId('loading'));

  fireEvent.click(
    screen.getAllByRole('button', { name: /remove from favorites/i })[0],
  );

  await waitForElementToBeRemoved(screen.getAllByText('Untitled')[0]);

  expect(screen.getAllByText('Untitled').length).toBe(2);
});
