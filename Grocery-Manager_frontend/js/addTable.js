// Create the table and its elements
const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
const trHead = document.createElement('tr');

// Define the headers with new names
const headers = ['Name', 'Description', 'Bought'];

// Append the headers to the table head
headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    trHead.appendChild(th);
});

// Append the head row to the thead
thead.appendChild(trHead);

// Sample data for the table body (excluding the 'Bought' column)
const data = [
    ['Item 1', 'Description of Item 1'],
    ['Item 2', 'Description of Item 2'],
    ['Item 3', 'Description of Item 3']
];

// Function to be called when an item is bought
function itemBought() {
    console.log('Item bought!');
}

// Append the data to the table body
data.forEach(rowData => {
    const tr = document.createElement('tr');
    rowData.forEach(cellData => {
        const td = document.createElement('td');
        td.textContent = cellData;
        tr.appendChild(td);
    });

    // Create a checkbox for the 'Bought' column
    const tdCheckbox = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            itemBought();
        }
    });
    tdCheckbox.appendChild(checkbox);
    tr.appendChild(tdCheckbox);

    tbody.appendChild(tr);
});

// Append the thead and tbody to the table
table.appendChild(thead);
table.appendChild(tbody);

// Find the first div within the main element and append the table to it
const mainDiv = document.querySelector('main div');
mainDiv.appendChild(table);

setInterval(function() {
    location.reload();
}, 10000);