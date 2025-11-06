/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import pizzas from '../data/pizzas.json';

export default {
	async fetch(request, env, ctx) {
		const urlObject = new URL(request.url);

		if (urlObject.pathname === '/admin') {
			return new Response('Hola admin');
		}

		if (urlObject.pathname == '/pizzas') {
			return new Response(JSON.stringify(pizzas), {
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		return new Response('Not found', { status: 404 });
	},
};
