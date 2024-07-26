import { App } from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './store';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const Root = () => {
  const navigate = useNavigate();

  return (
    <Provider store={store}>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        navigate={(to: string) => navigate(to)}
        path="/nice_gadget_store"
      >
        <App />
      </ClerkProvider>
    </Provider>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Root />
  </Router>,
);
