import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const editorRoot = resolve(__dirname, '../..');
const videoflowRoot = resolve(editorRoot, '../VideoFlow/src');

/**
 * Vite config for the playground. We alias the editor package and the
 * VideoFlow packages directly to their TypeScript sources so edits in
 * either tree hot-reload without a rebuild step.
 */
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@videoflow/react-video-editor/style.css': resolve(editorRoot, 'src/style.css'),
			'@videoflow/react-video-editor': resolve(editorRoot, 'src/index.ts'),
			'@videoflow/core/types': resolve(videoflowRoot, 'core/types.ts'),
			'@videoflow/core/utils': resolve(videoflowRoot, 'core/utils.ts'),
			'@videoflow/core': resolve(videoflowRoot, 'core/index.ts'),
			'@videoflow/renderer-dom': resolve(videoflowRoot, 'renderer-dom/index.ts'),
			'@videoflow/renderer-browser': resolve(videoflowRoot, 'renderer-browser/index.ts'),
		},
	},
	server: {
		port: 5173,
		fs: {
			// Allow vite to serve files from the editor and VideoFlow source trees.
			allow: [editorRoot, videoflowRoot],
		},
	},
});
