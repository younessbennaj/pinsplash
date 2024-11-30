import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders the title', () => {
    render(<App />);
    const titleElement = screen.getByText(/hello world!/i); // Recherche insensible à la casse
    expect(titleElement).toBeInTheDocument(); // Vérifie que le titre est dans le DOM
  });
});
