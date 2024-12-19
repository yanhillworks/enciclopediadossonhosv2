let currentIndex = 0; // Tracks the current index of the cards to be displayed
const batchSize = 20; // Number of cards to display in each batch
let isLoading = false; // Flag to prevent duplicate loading
let lastScrollPosition = 0; // Tracks the last scroll position

// Function to load a batch of cards gradually
function loadBatch() {
    if (isLoading) return; // Prevent duplicate calls to loadBatch
    isLoading = true;

    const container = document.querySelector('.grid-container');
    const startIndex = currentIndex; // Save the start index of the current batch
    const endIndex = Math.min(dataset.length, currentIndex + batchSize); // Calculate the end index for the current batch

    currentIndex = endIndex; // Update currentIndex immediately to prevent duplicates

    // Add cards one by one with a small delay
    const addCard = (i) => {
        if (i >= endIndex) {
            isLoading = false; // Reset the loading flag after finishing the batch
            return;
        }

        const indexValue = dataset[i];

        // Create a card element
        const card = document.createElement('div');
        card.className = 'card';

        // Assign a unique id to the card
        card.id = `card-${i}`;

        // Add content to the card
        const paragraph = document.createElement('p');
        paragraph.textContent = `${indexValue}`;
        card.appendChild(paragraph);

        // Append the card to the container
        container.appendChild(card);

        // Add the next card after a small delay
        setTimeout(() => addCard(i + 1), 50);
    };

    addCard(startIndex);
}

// Infinite scroll event handler (Scroll Down Only)
function handleScroll() {
    const currentScrollPosition = window.scrollY;

    // Check if the user is scrolling down and near the bottom of the page
    if (
        currentScrollPosition > lastScrollPosition && // Ensure scrolling down
        window.innerHeight + currentScrollPosition >= document.body.offsetHeight - 100
    ) {
        loadBatch(); // Load more cards when near the bottom
    }

    // Update the last scroll position
    lastScrollPosition = currentScrollPosition;
}

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial load
loadBatch();
