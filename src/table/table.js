import db from './db.json'

export default function initTable (){
    createTable();

    sortMethods[currentSort]();
    currentSort++;

    setInterval(() => {
        if (currentSort >= sortMethods.length) currentSort = 0;

        sortMethods[currentSort]();
        currentSort ++;
    },3000)
}
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

let currentSort = 0;

const tbody = document.createElement('tbody');

function createTable () {
    const table = document.createElement('table');

    db.forEach(item => {
        const tr = document.createElement('tr');
        tr.dataset.id = item.id;
        tr.dataset.title = item.title;
        tr.dataset.year = item.year;
        tr.dataset.imdb = item.imdb;

        tr.innerHTML = `
  <td>#${item.id}</td>
  <td>${item.title}</td>
  <td>(${item.year})</td>
  <td>imdb: ${item.imdb.toFixed(2)}</td>
`;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    document.body.appendChild(table);

}

function sortByIdAsc() {
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
            return Number(a.dataset.id) - Number(b.dataset.id);
    })

    tbody.append(...rows);
}

function sortByIdDesc() {
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        return Number(b.dataset.id) - Number(a.dataset.id);
    })

    tbody.append(...rows);
}

function sortByTitleAsc() {
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        return a.dataset.title.localeCompare(b.dataset.title)
    })

    tbody.append(...rows);
}

function sortByTitleDesc() {
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        return b.dataset.title.localeCompare(a.dataset.title)
    })

    tbody.append(...rows);
}


function sortByYearAsc() {
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        return Number(a.dataset.year) - Number(b.dataset.year);
    })

    tbody.append(...rows);
}

function sortByYearDesc() {
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        return Number(b.dataset.year) - Number(a.dataset.year);
    })

    tbody.append(...rows);
}

function sortByImdbAsc() {
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        return Number(a.dataset.imdb) - Number(b.dataset.imdb);
    })

    tbody.append(...rows);
}

function sortByImdbDesc() {
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        return Number(b.dataset.imdb) - Number(a.dataset.imdb);
    })

    tbody.append(...rows);
}




