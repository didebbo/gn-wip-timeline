// Imports
import '../scss/main.scss'
import axios from 'axios';

// DOM
const orderBy = document.getElementById("order-by");

// Vars
let data = {
    url: "https://swapi.dev/api/planets",
    results: [],
    sorted: false,
};

// Init Data 
const init = (data) => {
    axios.get(data.url)
        .then((response) => {
            data.results = response.data.results;
            generateDataResults(data.results);
        });
}

// Generate Dynamic DOM
const generateDataResults = (results) => {
    console.log(data.sorted);
    const row = document.getElementById("row");
    row.innerHTML = "";
    results.forEach(element => {

        const elName = element.name;
        const elDate = element.created.split("T")[0];
        const elTime = element.created.split("T")[1].split("Z")[0];
        // console.log(elName, elDate, elTime);

        // DOM 
        const col = document.createElement("li");
        const item = document.createElement("div");
        const name = document.createElement("div");
        const created = document.createElement("div");
        const small = document.createElement("small");

        col.classList.add("col");
        item.classList.add("item");
        name.classList.add("name");
        created.classList.add("created");

        name.innerHTML = elName;
        small.innerHTML = elDate + " " + elTime.split(".")[0];

        created.appendChild(small);
        item.appendChild(name);
        item.appendChild(created);
        col.appendChild(item);
        row.appendChild(col);
    });
}

init(data);

orderBy.addEventListener('click', () => {
    data.results = data.results.sort((a, b) => {
        if(data.sorted) return new Date(a.created) - new Date(b.created);
        return new Date(b.created) - new Date(a.created);
    });
    data.sorted = !data.sorted;
    generateDataResults(data.results);
});