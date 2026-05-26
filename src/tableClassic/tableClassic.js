import db from "../table/db.json";

let data = [...db];

let currentSort = 0;

const sortMethods = [
    sortByIdAsc,
    sortByIdDesc,
    sortByTitleAsc,
    sortByTitleDesc,
    sortByYearAsc,
    sortByYearDesc,
    sortByImdbAsc,
    sortByImdbDesc,
];

const tbody = document.createElement('tbody');
const table = document.createElement('table');

table.appendChild(tbody);

export default function initTableClassic (){
    document.body.appendChild(table);

    renderTable(data);

    sortMethods[currentSort]();
    currentSort++;

    setInterval(() => {
        if (currentSort >= sortMethods.length) currentSort = 0;

        sortMethods[currentSort]();
        currentSort ++;
    },3000)
}

function renderTable (data) {
    tbody.innerHTML = '';

    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
  <td>#${item.id}</td>
  <td>${item.title}</td>
  <td>(${item.year})</td>
  <td>imdb: ${item.imdb.toFixed(2)}</td>
`;
        tbody.appendChild(tr);
    });
}


function sortByIdAsc() {
    data.sort((a, b) => a.id - b.id);
    renderTable(data);
}

function sortByIdDesc() {
    data.sort((a, b) => b.id - a.id);
    renderTable(data);
}

function sortByTitleAsc() {
    data.sort((a, b) => a.title.localeCompare(b.title));
    renderTable(data);
}

function sortByTitleDesc() {
    data.sort((a, b) => b.title.localeCompare(a.title))
    renderTable(data);
}

function sortByYearAsc() {
    data.sort((a, b) => a.year - b.year);
    renderTable(data);
}

function sortByYearDesc() {
    data.sort((a, b) => b.year - a.year);
    renderTable(data);
}

function sortByImdbAsc() {
    data.sort((a, b) => a.imdb - b.imdb);
    renderTable(data);
}

function sortByImdbDesc() {
    data.sort((a, b) => b.imdb - a.imdb);
    renderTable(data);
}
