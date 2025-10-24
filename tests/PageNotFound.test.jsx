import '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import PageNotFound from '../src/pages/PageNotFound';

test('render', async () => {
  render(<PageNotFound />);

  expect(screen.getByText('Page not found')).toBeInTheDocument();
});
