import { createRoot } from 'react-dom/client';
import '../src/styles/index.css';
import '../src/styles/themes.css';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
