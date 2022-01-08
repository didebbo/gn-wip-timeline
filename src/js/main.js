// Imports
import axios from 'axios';

// DOM
const btnOrderBy = document.getElementById("order-by");
const inputFrom = document.getElementById("from");
const inputTo = document.getElementById("to");
const btnSearch = document.getElementById("search");
const errorLog = document.getElementById("error-log");


// Vars
let data = {
    url: "https://swapi.dev/api/planets",
    results: [],
    filteredResults: [],
    sorted: false,
};

// Init Data 
const init = (data) => {
    axios.get(data.url)
        .then((response) => {
            data.filteredResults = data.results = response.data.results;
            generateDataResults(data.filteredResults);
        });
}

// Generate Dynamic DOM
const generateDataResults = (results) => {
    const row = document.getElementById("row");
    row.innerHTML = "";
    let t = 0;
    results.forEach(element => {
        t++;
        const elName = element.name;
        const elDate = element.created.split("T")[0];
        const elTime = element.created.split("T")[1].split("Z")[0];

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
        setTimeout(() => {
            row.classList.add("show");
        }, 100);
        setTimeout(() => {
            col.classList.add("show");
        }, 200 * t);
    });
}

// Order By
btnOrderBy.addEventListener('click', () => {
    data.filteredResults = data.results.sort((a, b) => {
        if (data.sorted) return new Date(a.created) - new Date(b.created);
        return new Date(b.created) - new Date(a.created);
    });
    data.sorted = !data.sorted;
    generateDataResults(data.filteredResults);
});

// Search From => To
btnSearch.addEventListener('click', () => {
    const from = new Date(inputFrom.value).setHours(0,0,0,0);
    const to = new Date(inputTo.value).setHours(0,0,0,0);

    if (isNaN(from) && isNaN(to)) {
        generateDataResults(data.results);
    }
    else {
        data.filteredResults = data.results.filter(element => {
            const created = new Date(element.created).setHours(0,0,0,0);
            // created.setTime(("01:00:00"));
            // console.log(typeof created);
            console.log(created + " >= " + from + " : " + (created >= from));
            console.log(created + " <= " + to + " : " + (created <= to));
            return (created >= from && created <= to);
        });
        generateDataResults(data.filteredResults);
    }

    const state = (isNaN(from) && !isNaN(to)) || (!isNaN(from) && isNaN(to));
    showError(state, "Data range is invalid");

});

// Show error log
const showError = (state, msg) => {
    errorLog.innerHTML = "";
    errorLog.classList.remove("show");
    if (state) {
        errorLog.innerHTML = msg;
        errorLog.classList.add("show");
    }
}

init(data);