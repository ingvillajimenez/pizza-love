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

		if (urlObject.pathname === '/pizzas/generate') {
			const userPrompt = urlObject.searchParams.get('prompt');
			console.log(userPrompt);

			const llm_response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
				prompt: `
					Genera una pizza con las siguientes caracteristicas: ${userPrompt}.
					Devuelve el nombre, la descripcion y los ingredientes de la pizza.
					Prioriza pizzas existentes si no hay una similar, crea una nueva.
					Pizzas existentes: ${JSON.stringify(pizzas)}
					Ouput format should be a JSON object with the following properties:
					- name: string
					- description: string
					- ingredients: string[]

					Do not include any other text than the JSON object.
					Do not include \`\`\`json at the beginning or end of the response.
					Do not include white characters at the beginning or end of the response, jump lines, tabs, etc.
				`,
			});

			console.log(llm_response);

			const jsonResponse = {
				pizza: JSON.parse(llm_response.response),
			};

			return new Response(JSON.stringify(jsonResponse), {
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		return new Response('Not found', { status: 404 });
	},
};
