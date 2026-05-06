import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { VideoEditor } from '@videoflow/react-video-editor';
import '@videoflow/react-video-editor/style.css';
import { createSampleVideo } from './sample-video.js';

const root = document.getElementById('root');
if (!root) throw new Error('#root not found');

// `createSampleVideo` compiles the VideoFlow builder graph into a VideoJSON.
// Top-level await is safe here because this file is an ES module loaded by Vite.
const video = await createSampleVideo();

createRoot(root).render(
	<StrictMode>
		<VideoEditor
			video={video}
			// Fires after every commit (drag, scrub, property edit, …).
			// Persist `v` to your backend / IndexedDB / localStorage here.
			onChange={(v) => {
				// eslint-disable-next-line no-console
				console.log('video changed', v);
			}}
			// When set, the titlebar shows a Save button. The editor flips an
			// internal `isSaved` flag back to `true` once this resolves.
			onSave={async (v) => {
				// eslint-disable-next-line no-console
				console.log('saving video', v);
			}}
			// Receives the rendered Blob from the built-in export modal.
			// Setting this disables the default browser download — the host
			// owns the file from here (upload it, save-as, preview, …).
			onExportComplete={(blob) => {
				// eslint-disable-next-line no-console
				console.log('export complete', blob);
			}}
		/>
	</StrictMode>
);
