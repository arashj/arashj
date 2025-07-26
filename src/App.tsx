import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import Counter from './components/Counter';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

type TabType = 'users' | 'counter';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <header className="app-header">
            <h1>React Query + Redux Toolkit Demo</h1>
            <p>A complete integration example with modern state management</p>
          </header>

          <nav className="app-nav">
            <button
              className={`nav-button ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users & Posts (React Query)
            </button>
            <button
              className={`nav-button ${activeTab === 'counter' ? 'active' : ''}`}
              onClick={() => setActiveTab('counter')}
            >
              Counter (Redux)
            </button>
          </nav>

          <main className="app-main">
            {activeTab === 'users' && (
              <div className="users-section">
                <div className="users-layout">
                  <div className="users-list-panel">
                    <UserList />
                  </div>
                  <div className="user-detail-panel">
                    <UserDetail />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'counter' && (
              <div className="counter-section">
                <Counter />
              </div>
            )}
          </main>

          <footer className="app-footer">
            <div className="footer-content">
              <div className="tech-stack">
                <h3>Technologies Used:</h3>
                <ul>
                  <li>React Query (TanStack Query) - Server state management</li>
                  <li>Redux Toolkit - Client state management</li>
                  <li>TypeScript - Type safety</li>
                  <li>Axios - HTTP client</li>
                  <li>JSONPlaceholder API - Mock data</li>
                </ul>
              </div>
              <div className="features">
                <h3>Features Demonstrated:</h3>
                <ul>
                  <li>Data fetching with caching</li>
                  <li>Loading and error states</li>
                  <li>Redux state management</li>
                  <li>Component composition</li>
                  <li>TypeScript integration</li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;