import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$lib: './src/lib'
		}
	}

	// package: {
	// 	dir: 'dist',
	// 	emitTypes: true,
	// 	exports: (filepath) => {
	// 		return filepath === 'index.js' || filepath.endsWith('/index.js');
	// 	},
	// 	excludeDefaults: false
	// }
};

export default config;
