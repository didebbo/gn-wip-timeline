// Imports
import '../scss/main.scss'
import axios from 'axios';

// DOM 
const row = document.getElementById("row");
row.innerHTML = "";

// Vars
let data = {
    url: "https://swapi.dev/api/planets",
    results: [],
};

// Generate Dynamic Data
const init = (data) => {
    axios.get(data.url)
    .then((response) => {
        data.results = response.data.results;
        data.results.forEach(element => {

            const elName = element.name;
            const elDate = element.created.split("T")[0];
            const elTime = element.created.split("T")[1].split("Z")[0];
            console.log(elName, elDate, elTime);

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
    });
}

init(data);