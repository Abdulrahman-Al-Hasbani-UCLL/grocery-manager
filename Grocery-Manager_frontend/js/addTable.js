const mainTable = document.createElement("table");
mainTable.innerHTML = `
<thead>
    <tr>
        <th>Name</th>
        <th>List Name</th>
        <th>Description</th>
        <th>Author</th>
        <th>Bought</th>
    </tr>
</thead>
`
mainTable.className = "mainTable";
document.querySelector("main").appendChild(mainTable);

const tableBody = document.createElement("tbody");
tableBody.innerHTML = "";
tableBody.id = "items_table_body";
document.querySelector("table").appendChild(tableBody);

const statusDiv = document.createElement("div");
statusDiv.innerHTML = `<h3 class="mainStatus">Status</h3>`;
document.querySelector("main").appendChild(statusDiv);
statusDiv.addEventListener("mouseover", () => statusDiv.className = "focused");
statusDiv.addEventListener("mouseout", () => statusDiv.className = "");

let items = [];

const fetchItems = async () => {
    const response = await fetch("http://localhost:8080/items");
    const result = await response.json();
    items = result;
    renderItems(items);
};

const boughtItem = async (itemName) => {
    await fetch(`http://localhost:8080/items?name=${itemName}`, {
        method: "DELETE"
    });
    items = items.filter(item => item.name !== itemName);
    renderItems(items);
    statusDiv.innerHTML = `<h3 class="mainStatus">Status</h3><p class="mainStatusText">${itemName} has been deleted</p>`;
};

const renderItems = (itemsList) => {
    const propertiesToShow = ['name', 'listName', 'description', 'author'];
    tableBody.innerHTML = "";
    itemsList.forEach((item) => {
        const row = document.createElement("tr");
        tableBody.appendChild(row);

        

        propertiesToShow.forEach((prop) => {
            const cell = document.createElement("td");
            cell.textContent = item[prop];
            row.appendChild(cell);
        });

        const boughtCheckbox = document.createElement("input");
        boughtCheckbox.type = "checkbox";
        boughtCheckbox.id = `${item.id}`
        boughtCheckbox.addEventListener("change", () => {
            if (boughtCheckbox.checked) {
                boughtItem(item.name);
            }
        });

        const boughtCell = document.createElement("td");
        boughtCell.appendChild(boughtCheckbox);
        row.appendChild(boughtCell);
    });

    const inputRow = document.createElement("tr");
    inputRow.className = "inputRow";
    propertiesToShow.forEach((prop) => {
        const cell = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.id = `input_${prop}`;
        // Set placeholder text
        input.placeholder = `Example: Item ${prop}`;
        cell.appendChild(input);
        inputRow.appendChild(cell);
    });

    const submitCell = document.createElement("td");
    const submitButton = document.createElement("button");
    submitButton.textContent = "Add";
    submitButton.addEventListener("click", addItem);
    submitCell.appendChild(submitButton);
    inputRow.appendChild(submitCell);

    tableBody.appendChild(inputRow);
};

const addItem = async () => {
    const item = {
        name: document.getElementById("input_name").value,
        listName: document.getElementById("input_listName").value,
        description: document.getElementById("input_description").value,
        author: document.getElementById("input_author").value,
    };

    await fetch("http://localhost:8080/items", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });

    statusDiv.innerHTML = `<h3 class="mainStatus">Status</h3><p class="mainStatusText">${item.name} has been added</p>`;

    fetchItems();
};

fetchItems();

setInterval(fetchItems, 35000);