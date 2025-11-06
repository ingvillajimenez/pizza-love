fetch('/pizzas')
	.then((response) => response.json())
	.then((data) => {
		const pizzasContainer = document.getElementById('pizzas-container');
		if (data && data.length > 0) {
			const pizzasList = document.createElement('ul');
			pizzasList.className = 'pizza-list';

			data.forEach((pizza) => {
				const li = document.createElement('li');
				li.innerHTML = `
								<strong>${pizza.name}</strong>
								<br>${pizza.description}
								<br><span style="color: #e31837; font-weight: bold;">$${pizza.price.toFixed(2)}</span>
							`;
				pizzasList.appendChild(li);
			});

			pizzasContainer.innerHTML = '';
			pizzasContainer.appendChild(pizzasList);
		} else {
			pizzasContainer.innerHTML = '<p>Lo sentimos, no hay pizzas disponibles en este momento.</p>';
		}
	})
	.catch((error) => {
		console.error('Error:', error);
		document.getElementById('pizzas-container').innerHTML =
			'<p>Lo sentimos, hubo un error al cargar las pizzas. Por favor, intenta de nuevo más tarde.</p>';
	});
