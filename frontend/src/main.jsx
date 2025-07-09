import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import './scss/styles.scss';
import store from './slices/index.js';

// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap';

// createRoot(document.getElementById('chat')).render(<App />);

const mountNode = document.getElementById('chat');
const root = createRoot(mountNode);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
