import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  plugins: {
    'postcss-mixins': {
      mixinsFiles: [
        path.join(__dirname, 'src', 'styles', 'design-system.css'),
        path.join(__dirname, 'src', 'styles', 'mixins.css'),
      ],
    },
  },
};
