import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello, Vasea text', () => {
  render(<App name="Vasea"/>);
  const helloElement = screen.getByText(/Hello, Vasea/i);
  expect(helloElement).toBeInTheDocument();
});

test('renders Hello, stranger when name is not set', () => {
  render(<App/>);
  const helloElement = screen.getByText(/Hello, stranger/i);
  expect(helloElement).toBeInTheDocument();
});

test('renders Hello, stranger when name is empty', () => {
  render(<App name=""/>);
  const helloElement = screen.getByText(/Hello, stranger/i);
  expect(helloElement).toBeInTheDocument();
});
