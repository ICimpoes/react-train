import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello Vasea text', () => {
  render(<App name="Vasea"/>);
  const helloElement = screen.getByText(/hello Vasea/i);
  expect(helloElement).toBeInTheDocument();
});

test('renders hello stranger when name is empty', () => {
  render(<App name=""/>);
  const helloElement = screen.getByText(/hello stranger/i);
  expect(helloElement).toBeInTheDocument();
});
