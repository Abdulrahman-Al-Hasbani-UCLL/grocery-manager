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
};

const renderItems = (itemsList) => {
    document.querySelector(".mainList").innerHTML = "";
    document.querySelector(".specificList").innerHTML = "";

    const createTable = (items, listName, container) => {
        const tableContainer = document.createElement("div");
        const tableTitle = document.createElement("h3");
        tableTitle.textContent = listName;
        tableContainer.appendChild(tableTitle);

        const table = document.createElement("table");
        table.className = "mainTable";

        const tableHeader = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Author</th>
                    <th>Urgency</th>
                    <th>Bought</th>
                </tr>
            </thead>`;
        table.innerHTML = tableHeader;

        const tableBody = document.createElement("tbody");

        items.forEach((item) => {
            const row = document.createElement("tr");

            let rowClass;
            switch (item.importance) {
                case 1:
                    rowClass = 'low';
                    break;
                case 2:
                    rowClass = 'mid';
                    break;
                case 3:
                    rowClass = 'high';
                    break;
                default:
                    rowClass = '';
            }
            row.className = rowClass;

            ['name', 'description', 'author', 'importance'].forEach((prop) => {
                const cell = document.createElement("td");
                cell.textContent = item[prop];
                row.appendChild(cell);
            });

            const boughtCheckbox = document.createElement("input");
            boughtCheckbox.type = "checkbox";
            boughtCheckbox.id = `${item.id}-${Math.random(999999999999)}`;
            boughtCheckbox.addEventListener("change", () => {
                if (boughtCheckbox.checked) {
                    boughtItem(item.name);
                }
            });

            const boughtCell = document.createElement("td");
            boughtCell.appendChild(boughtCheckbox);
            row.appendChild(boughtCell);

            tableBody.appendChild(row);
        });
        
        const inputRow = document.createElement("tr");
        inputRow.className = "inputRow";

        ['name', 'description', 'author', 'importance'].forEach((prop) => {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = prop === 'importance' ? "number" : "text";
            input.id = `input_${prop}_${listName}`;
            input.placeholder = `Item ${prop}`;
            if (prop === 'author') {
                input.value = localStorage.getItem("userName");
            }
            input.autocomplete = false;
            input.spellcheck = false;
            cell.appendChild(input);
            inputRow.appendChild(cell);
        });

        const submitCell = document.createElement("td");
        const submitButton = document.createElement("button");
        submitButton.textContent = "Add";
        submitButton.addEventListener("click", () => addItem(listName));
        submitCell.appendChild(submitButton);
        inputRow.appendChild(submitCell);

        tableBody.appendChild(inputRow);

        table.appendChild(tableBody);
        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
    };

    createTable(itemsList, "All Items", document.querySelector(".mainList"));

    const groupedItems = itemsList.reduce((groups, item) => {
        (groups[item.listName] = groups[item.listName] || []).push(item);
        return groups;
    }, {});

    for (const [listName, items] of Object.entries(groupedItems)) {
        createTable(items, listName, document.querySelector(".specificList"));
    }
};

const addItem = async (listName) => {
    const item = {
        name: document.getElementById(`input_name_${listName}`).value,
        description: document.getElementById(`input_description_${listName}`).value,
        author: document.getElementById(`input_author_${listName}`).value,
        importance: parseInt(document.getElementById(`input_importance_${listName}`).value, 10),
        listName: listName
    };

    await fetch("http://localhost:8080/items", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });

    fetchItems();
};

const addItemSpecificList = async () => {
    const item = {
        name: document.getElementById(`input_name_general_X`).value,
        description: document.getElementById(`input_description_general_X`).value,
        author: localStorage.getItem("userName"), 
        importance: parseInt(document.getElementById(`input_importance_general_X`).value, 10),
        listName: document.getElementById(`inputListName_general_X`).value,
    };

    await fetch("http://localhost:8080/items", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });

    fetchItems();
};


fetchItems();
setInterval(fetchItems, 35000);
