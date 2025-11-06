document.querySelector('.circle-button').addEventListener('click', () => {
	const card = document.querySelector('.card');
	card.classList.toggle('active');
});

document.querySelector('.card-form').addEventListener('submit', (e) => {
	e.preventDefault();

	let buttonText = e.target.querySelector('button').textContent;
	e.target.querySelector('button').textContent = 'Generando...';

	const prompt = e.target.prompt.value;

	let content = userMessageTemplate(prompt);
	document.querySelector('.card-content').insertAdjacentHTML('beforeend', content);

	fetch('/pizzas/generate?prompt=' + prompt)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			let content = botMessageTemplate(data);
			// Insert last .card-content
			document.querySelector('.card-content').insertAdjacentHTML('beforeend', content);
			e.target.querySelector('button').textContent = buttonText;
		})
		.catch((error) => {
			console.error('Error:', error);
			e.target.querySelector('button').textContent = buttonText;
		});
});

function botMessageTemplate(data) {
	let template = `
        <div class='card-bot-message'>
            <strong>${data.pizza.name}</strong>
            <br>${data.pizza.description}
        </div>`;
	return template;
}

function userMessageTemplate(prompt) {
	let template = `
        <div class='card-user-message'>
            ${prompt}
        </div>`;
	return template;
}
