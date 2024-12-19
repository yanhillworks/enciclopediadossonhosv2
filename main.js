// File: main.js
let dataset = []; // Holds the dataset parsed from the CSV

// Function to fetch and parse the dataset
async function loadDataset() {
    try {
        const response = await fetch('dataset_pred_labeled_21703_objects_3.csv');
        const data = await response.text();

        // Parse the CSV data (tab-separated values)
        const rows = data.split('\n');
        const headers = rows[0].split('\t');

        // Find the index of the "index" column
        const indexColumn = headers.indexOf('index');
        if (indexColumn === -1) {
            throw new Error('"index" column not found in the dataset.');
        }

        // Extract the "index" column values
        dataset = rows.slice(1).map(row => row.split('\t')[indexColumn]).filter(value => value);

        // Load the first batch of cards
        loadBatch();

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
    } catch (error) {
        console.error('Error loading the dataset:', error);
    }
}

// Call the function after the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadDataset);
