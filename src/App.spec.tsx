import { render, screen } from '@testing-library/react';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('App Component', () => {
  test('renders the title', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );
    const titleElement = screen.getByText(/Pinsplash/i); // Recherche insensible à la casse
    expect(titleElement).toBeInTheDocument(); // Vérifie que le titre est dans le DOM
  });
});
