

import VideoFlow from '@videoflow/core';
import type { VideoJSON } from '@videoflow/core';

export async function createSampleVideo(): Promise<VideoJSON> {
	// VideoFlow trailer — homepage hero animation.
	// Three acts: white-bg brand intro → fast-paced feature word list →
	// blendMode flip into the dark editor outro. Built entirely from VideoFlow
	// primitives (transitions, effects, blendMode, animate, group).
	const $ = new VideoFlow({
	name: 'VideoFlow trailer',
	width: 1920,
	height: 1080,
	fps: 30,
	backgroundColor: '#ffffff',
	});

	// ── Act 1: brand intro (white bg) ────────────────────────────────────────────

	const intro = $.addText(
	{
		text: 'Introducing',
		fontSize: 5,
		fontWeight: 500,
		color: '#52596a',
		position: [0.5, 0.5],
		letterSpacing: -0.05,
	},
	{
		transitionIn:  { transition: 'blurResolve', duration: '300ms' },
		transitionOut: { transition: 'fade',           duration: '450ms' },
	},
	);
	intro.animate(
		{ letterSpacing: -0.05 },
		{ letterSpacing: 0.20 },
		{duration: '1.7s', easing: 'easeOut', wait: false },
	);
	$.wait('1.6s');
	intro.remove({in: '100ms'});

	// Logo + "VideoFlow" wordmark composited in one group so a single
	// glitchResolve transition animates them together.
	const brand = $.group(
	{ position: [0.5, 0.5] },
	{
		transitionIn:  { transition: 'tilt3d', duration: '700ms' },
		transitionOut: { transition: 'blurResolve',   duration: '500ms' },
	},
	() => {
		$.addImage(
		{ fit: 'contain', scale: 0.22, position: [0.28, 0.5] },
		{ source: 'https://videoflow.dev/images/logo.png' },
		);
		$.addText({
		text: 'VideoFlow',
		fontSize: 9,
		fontWeight: 800,
		color: '#0c1018',
		position: [0.57, 0.5],
		letterSpacing: -0.04,
		});
	},
	{ waitFor: 0 },
	);

	$.wait('0.8s');

	const sub1 = $.addText(
	{
		text: 'A library to create and render videos programmatically',
		fontSize: 2.5,
		fontWeight: 500,
		color: '#3a4257',
		position: [0.5, 0.66],
	},
	{
		transitionIn:  { transition: 'slideUp', duration: '600ms', params: { distance: 0.04 } },
		transitionOut: { transition: 'fade',    duration: '400ms' },
	},
	);
	$.wait('1.8s');
	sub1.remove({in:'100ms'});

	const tagline = $.addText(
	{
		text: 'Turn JSON into Video',
		fontSize: 3.6,
		fontWeight: 800,
		color: '#FF5A1F',
		position: [0.5, 0.66],
		letterSpacing: -0.02,
	},
	{
		transitionIn:  { transition: 'overshootPop', duration: '600ms', params: { from: 0.7 } },
		transitionOut: { transition: 'blurResolve',  duration: '450ms' },
	},
	);
	$.wait('0.6s');

	const circle = $.addShape({
		width: 100,
		height: 100,
		fill: '#F3EFE7',
		blendMode: 'difference',
		scale: 0,
	}, {
		shapeType: 'ellipse',
	});
	circle.animate(
		{ scale: 0 },
		{ scale: 2.2 }, // sqrt((16/2)^2 + (9/2)^2) / (9/2) = 2.04 to cover the diagonal of the frame
		{ duration: '300ms', easing: 'easeIn' },
	);

	$.wait('750ms');
	tagline.remove();
	brand.remove();

	// ── Act 2: fast-paced feature words (still white bg) ─────────────────────────

	const FEATURES = [
	{ text: 'Open Source',           transition: 'overshootPop'    },
	{ text: 'Simple API',            transition: 'slideUp'         },
	{ text: 'Animations',            transition: 'lensSnap'        },
	{ text: 'Transitions',           transition: 'rotate3dY'       },
	{ text: 'VFX',                   transition: 'glitchResolve'   },
	{ text: 'Audio',                 transition: 'zoom'            },
	{ text: 'Render in the Browser', transition: 'sliceAssemble'   },
	{ text: 'Render on the Server',  transition: 'tilt3d'	         },
	{ text: 'Live Video Playback',   transition: 'lightSweepReveal' },
	];

	// Each word lives `SLOT` seconds; consecutive words overlap by 150ms because
	// remove({ in: '150ms' }) schedules the exit without advancing the playhead.
	const SLOT = '800ms';
	for (const f of FEATURES) {
	const layer = $.addText(
		{ text: f.text, fontSize: 7, fontWeight: 800, color: '#FFFFFF', position: [0.5, 0.5], letterSpacing: -0.03 },
		{
		transitionIn:  { transition: f.transition, duration: '280ms' },
		transitionOut: { transition: f.transition, duration: '300ms' },
		},
		{ waitFor: 0 },
	);
	$.wait(SLOT);
	layer.remove({ in: '150ms' });
	}
	// Let the last word's transitionOut finish before the flip section.
	$.wait('150ms');
	circle.remove();

	// ── Flip: difference-blend circle scales up to fill, inverting the canvas ────

	// Solid dark panel that becomes the new "background" once the flip lands.
	// Created hidden, swapped to opacity 1 the moment the inverted disc covers
	// the frame.
	const darkBg = $.addShape(
	{ width: 110 * 16/9, height: 110, fill: '#0c1018' },
	{ shapeType: 'rectangle' },
	);

	// ── Act 3: React Video Editor outro (dark bg via darkBg shape) ───────────────

	const editorTitle = $.addText(
	{
		text: 'React Video Editor',
		fontSize: 7,
		fontWeight: 800,
		color: '#f5f5f7',
		position: [0.5, 0.15],
		letterSpacing: -0.03,
		zIndex: 3,
	},
	{
		transitionIn:  { transition: 'overshootPop', duration: '600ms', params: { from: 0.85 } },
		transitionOut: { transition: 'blurResolve',  duration: '400ms' },
	},
	);
	const editorSub = $.addText(
	{
		text: '<VideoEditor />',
		fontSize: 2.2,
		fontWeight: 500,
		color: '#9aa3b8',
		fontFamily: 'JetBrains Mono',
		position: [0.5, 0.25],
		zIndex: 3,
	},
	{
		transitionIn:  { transition: 'slideDown', duration: '500ms', params: { distance: 0.02 } },
		transitionOut: { transition: 'slideDown', duration: '400ms', params: { distance: 0.02 } },
	},
	);
	$.wait('300ms');

	const editorImg = $.addImage(
	{
		scale: 0.65, position: [0.5, 0.65],
		rotation: [4, -10, 0], perspective: 100,
		borderRadius: 1.2,
		zIndex: 1,
	},
	{
		source: 'https://videoflow.dev/images/editor/react-video-editor.avif',
		transitionIn:  { transition: 'tilt3d',     duration: '700ms', params: { angle: 35 } },
		transitionOut: { transition: 'blurResolve', duration: '450ms' },
	},
	);
	editorImg.animate(
	{ rotation: [4, -10, 0], scale: 0.65 },
	{ rotation: [-2, 8, 0],  scale: 0.70 },
	{ duration: '4s', easing: 'linear', wait: false },
	);

	$.wait('1.5s');
	editorSub.remove({in: '400ms'});
	const editorCap = $.addText(
	{
		text: 'A full-fledged React-based video editor',
		fontSize: 2,
		fontWeight: 500,
		color: '#9aa3b8',
		position: [0.5, 0.25],
	},
	{
		transitionIn:  { transition: 'slideDown', duration: '400ms', params: { distance: 0.02 } },
		transitionOut: { transition: 'slideDown', duration: '400ms', params: { distance: 0.02 } },
	},
	);

	$.wait('1.5s');
	editorTitle.remove();
	editorImg.remove();
	editorCap.remove();
	$.wait('500ms');

	// ── CTA + install + footer ───────────────────────────────────────────────────

	const ctaPill = $.addShape(
	{
		width: 56, height: 11, fill: '#FF5A1F', cornerRadius: 5.5,
		position: [0.5, 0.42],
	},
	{
		shapeType: 'rectangle',
		transitionIn:  { transition: 'zoom', duration: '450ms', params: { from: 0.5 } },
		transitionOut: { transition: 'fade', duration: '400ms' },
	},
	);
	const ctaText = $.addText(
	{
		text: 'Get started now  →',
		fontSize: 2.5, fontWeight: 700, color: '#ffffff',
		position: [0.5, 0.42],
	},
	{
		transitionIn:  { transition: 'typewriter', duration: '500ms' },
		transitionOut: { transition: 'fade',       duration: '400ms' },
	},
	);

	$.wait('500ms');

	const installBg = $.addShape(
	{
		width: 64, height: 8, fill: '#1c2233',
		strokeColor: '#3a4257', strokeWidth: 0.1,
		cornerRadius: 1.2,
		position: [0.5, 0.56],
	},
	{
		shapeType: 'rectangle',
		transitionIn:  { transition: 'slideUp', duration: '450ms', params: { distance: 0.03 } },
		transitionOut: { transition: 'fade',    duration: '400ms' },
	},
	);
	const installText = $.addText(
	{
		text: '$  npm install @videoflow/core',
		fontSize: 1.85, fontWeight: 500, color: '#f5f5f7',
		fontFamily: 'JetBrains Mono',
		position: [0.5, 0.56],
	},
	{
		transitionIn:  { transition: 'scrambleDecode', duration: '700ms' },
		transitionOut: { transition: 'fade',           duration: '400ms' },
	},
	);

	$.wait('500ms');

	const footer = $.addText(
	{
		text: 'Learn more at  videoflow.dev',
		fontSize: 2.1, fontWeight: 500, color: '#6b7280',
		position: [0.5, 0.82],
	},
	{
		transitionIn:  { transition: 'fade', duration: '500ms' },
		transitionOut: { transition: 'fade', duration: '400ms' },
	},
	);

	$.wait('2.6s');
	return $.compile();
}
