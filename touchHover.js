console.log('event running')
document.addEventListener("DOMContentLoaded", () => {
    // Detect touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        const container = document.querySelector('.grid-container');
        let activeCard = null; // Track the currently active card

        // Function to activate hover effect on a card
        const activateCard = (card) => {
            if (activeCard) {
                activeCard.classList.remove('active'); // Remove the effect from the previously active card
            }
            card.classList.add('active'); // Add the effect to the tapped card
            activeCard = card; // Update the active card
        };

        // Use event delegation to handle dynamically added cards
        container.addEventListener('pointerdown', (event) => {
            const card = event.target.closest('.card'); // Check if the clicked element is a card
            if (card) {
                event.preventDefault(); // Prevent default touch behavior
                activateCard(card);
            }
        });
    }
});
