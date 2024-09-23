import { backend } from "declarations/backend";

document.addEventListener('DOMContentLoaded', async () => {
    const factList = document.getElementById('fact-list');
    const newFactForm = document.getElementById('new-fact-form');
    const newFactInput = document.getElementById('new-fact');

    // Function to render facts
    async function renderFacts() {
        const facts = await backend.getAllFacts();
        factList.innerHTML = '';
        facts.forEach(fact => {
            const factElement = document.createElement('div');
            factElement.className = 'fact';
            factElement.innerHTML = `
                <p>${fact.content}</p>
                <div class="votes">
                    <button class="upvote" data-id="${fact.id}">👍</button>
                    <span>${fact.votes}</span>
                    <button class="downvote" data-id="${fact.id}">👎</button>
                </div>
            `;
            factList.appendChild(factElement);
        });

        // Add event listeners for voting buttons
        document.querySelectorAll('.upvote, .downvote').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const isUpvote = e.target.classList.contains('upvote');
                await backend.voteFact(id, isUpvote);
                renderFacts();
            });
        });
    }

    // Initial render
    renderFacts();

    // Handle new fact submission
    newFactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = newFactInput.value.trim();
        if (content) {
            await backend.addFact(content);
            newFactInput.value = '';
            renderFacts();
        }
    });
});
