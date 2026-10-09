/* ---------------------------- Global Variables ---------------------------- */

const doc = document;

const colorControlRow = doc.querySelector(".control-row");
let rows = Array.from(doc.querySelectorAll(".row"));
function updateRows() {
    rows = Array.from(doc.querySelectorAll(".row"));
}
const deleteButtonRow = doc.querySelector(".delete-button-row");

const ns = "http://www.w3.org/2000/svg";

const middleControls = doc.querySelector(".middle-controls");
let numOfRows = rows.length;
function setNumOfRows() {
    numOfRows = rows.length;
};

let deleteRowButtons = Array.from(doc.querySelectorAll(".delete-row"));
function updateDeleteRowButtons() {
    deleteRowButtons = Array.from(doc.querySelectorAll(".delete-row"));
};
let le;
let lInput;

let hueInputs = Array.from(doc.querySelectorAll(".hue"));
let lightnessInputs = Array.from(doc.querySelectorAll(".lightness"));
let chromaInputs = Array.from(doc.querySelectorAll(".chroma"));
function updateInputs() {
    hueInputs = Array.from(doc.querySelectorAll(".hue"));
    lightnessInputs = Array.from(doc.querySelectorAll(".lightness"));
    chromaInputs = Array.from(doc.querySelectorAll(".chroma"));
    hueInputs.forEach(input => {
        input.addEventListener("input", e => {
            rows[e.target.parentElement.dataset.row - 1].style.setProperty("--hue", `${e.target.value}`);
        });
    });
    lightnessInputs.forEach(input => {
        input.addEventListener("input", e => {
            le = e;
            lInput = e.target.parentElement.dataset.column;
            rows.forEach(row => {
                row.children[lInput - 1].style.setProperty("--lightness", `${le.target.value}`);
            });
        });
    });
    chromaInputs.forEach(input => {
        input.addEventListener("input", e => {
            const cInput = e.target.parentElement.dataset.column;
            rows.forEach(row => {
                row.children[cInput - 1].style.setProperty("--chroma", `${e.target.value}`);
            });
        });
    });
};

/* ------------------------------- add column ------------------------------- */

const addColumnButton = doc.querySelector(".add-column");

function addColorControlColumn() {
    let colorControl = doc.createElement("div");
    colorControl.classList.add("color-controls");
    colorControl.setAttribute("data-column", `${rows[0].children.length}`);

    let lightnessInput = doc.createElement("input");
    lightnessInput.type = "number";
    lightnessInput.name = "lightness";
    lightnessInput.classList.add("lightness");
    lightnessInput.min = "0";
    lightnessInput.max = "1";
    lightnessInput.step = 0.01;
    colorControl.appendChild(lightnessInput);

    let chromaInput = doc.createElement("input");
    chromaInput.type = "number";
    chromaInput.name = "chroma";
    chromaInput.classList.add("chroma");
    chromaInput.min = "0";
    chromaInput.max = "0.37";
    chromaInput.step = 0.01;
    colorControl.appendChild(chromaInput);

    colorControlRow.insertBefore(colorControl, colorControlRow.lastElementChild);
};
addColorControlColumn();

function addDisplayColumn() {
    for (let i = 0; i < rows.length; i++) {
        let display;
        if (rows[i].children[0].dataset.row > 1) {
            display = doc.createElement("div");
            display.classList.add("display");
            updateRows();
            display.setAttribute("data-column", `${rows[0].childElementCount}`)
            display.setAttribute("data-row", `${rows[i].children[0].dataset.row}`)
            rows[i].insertBefore(display, rows[i].lastChild);
        } else {
            display = doc.createElement("div");
            display.classList.add("display");
            updateRows();
            display.setAttribute("data-column", `${rows[0].childElementCount + 1}`)
            display.setAttribute("data-row", `1`)
            rows[i].appendChild(display);
        }
        let svg = doc.createElementNS(ns, "svg");
        let path1 = doc.createElementNS(ns, "path");
        path1.setAttribute("d", "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71");
        let path2 = doc.createElementNS(ns, "path");
        path2.setAttribute("d", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71");
        svg.appendChild(path1);
        svg.appendChild(path2);

        display.append(svg);
    }
};

function addDeleteColumn() {
    let deleteButton = doc.createElement("button");
    deleteButton.classList.add("delete-column");
    deleteButton.setAttribute("data-column",  `${rows[0].children.length}`);

    let deleteSvg = doc.createElementNS(ns, "svg");
    let path1 = doc.createElementNS(ns, "path");
    path1.setAttribute("d", "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21");
    let path2 = doc.createElementNS(ns, "path");
    path2.setAttribute("d", "m5.082 11.09 8.828 8.828");
    deleteSvg.appendChild(path1);
    deleteSvg.appendChild(path2);

    deleteButton.appendChild(deleteSvg);
    deleteButtonRow.appendChild(deleteButton);
}

/* --------------------------------- add row -------------------------------- */

const leftControls = doc.querySelector(".left-controls");
const addRowButton = doc.querySelector(".add-row");

function addColorControlRow() {
    let colorControl = doc.createElement("div");
    colorControl.classList.add("color-controls");
    colorControl.setAttribute("data-row", `${numOfRows}`)

    let hueInput = doc.createElement("input");
    hueInput.type = "number";
    hueInput.name = "hue";
    hueInput.classList.add("hue");
    hueInput.setAttribute("data-column", `${0}`);
    hueInput.min = "0";
    hueInput.max = "360";
    hueInput.step = 1;
    colorControl.appendChild(hueInput);


    leftControls.insertBefore(colorControl, leftControls.lastElementChild);
};
addColorControlRow();


function addDisplayRow() {
    let createdRow = doc.createElement("div");
    createdRow.classList.add("row");

    for (let i = 0; i < rows[0].childElementCount; i++) {
        if (rows[0].childElementCount > 0) {
            const column = rows[0].childElementCount;
            let rowDisplay = doc.createElement("div");
            rowDisplay.setAttribute("data-column", `${column}`);
            rowDisplay.setAttribute("data-row", `${numOfRows + 1}`);
            rowDisplay.classList.add("display");

            let svg = doc.createElementNS(ns, "svg");
            let path1 = doc.createElementNS(ns, "path");
            path1.setAttribute("d", "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71");
            let path2 = doc.createElementNS(ns, "path");
            path2.setAttribute("d", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71");
            svg.appendChild(path1);
            svg.appendChild(path2);

            rowDisplay.append(svg);
            createdRow.append(rowDisplay);
        } else {
            return;
        }
    };
    middleControls.insertBefore(createdRow, middleControls.lastElementChild);
    updateRows();
    setNumOfRows();
};

function addDeleteRow() {
    let deleteButton = doc.createElement("button");
    deleteButton.classList.add("delete-row");
    deleteButton.setAttribute("data-row",  `${numOfRows}`);

    let deleteSvg = doc.createElementNS(ns, "svg");
    let path1 = doc.createElementNS(ns, "path");
    path1.setAttribute("d", "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21");
    let path2 = doc.createElementNS(ns, "path");
    path2.setAttribute("d", "m5.082 11.09 8.828 8.828");
    deleteSvg.appendChild(path1);
    deleteSvg.appendChild(path2);

    deleteButton.appendChild(deleteSvg);
    updateRows();
    const allButFirstRow = rows.slice(1);
    allButFirstRow.forEach(row => {
        row.appendChild(deleteButton);
    });
};

function setColumnDisplayColor() {
    let controlRow = Array.from(colorControlRow.children);
    for (let i = 0; i < controlRow.length - 1; i++) {
        let control = controlRow[i];
        let controlLightness = control.querySelector(`.lightness`);
        let controlChroma = control.querySelector(`.chroma`);
        for (let j = 0; j < rows.length; j++) {
            rows[j].children[`${control.dataset.column - 1}`].style.setProperty("--lightness", `${controlLightness.value}`);
            rows[j].children[`${control.dataset.column - 1}`].style.setProperty("--chroma", `${controlChroma.value}`);
        };
    };
};

addRowButton.addEventListener("click", () => {
    addDisplayRow();
    addColorControlRow();
    addDeleteRow();
    updateDeleteRowButtons();
    updateInputs();
    setColumnDisplayColor();
});

/* ------------------------------- remove row ------------------------------- */

function deleteRow(row) {
    middleControls.removeChild(middleControls.children[row]);
    leftControls.removeChild(leftControls.children[row]);
};

function adjustRowShift(row) {
    let adjustRows = rows.slice(row, rows.lastElementChild);
    for (let i = 0; i < adjustRows.length; i++) {
        let adjustChildren = Array.from(adjustRows[i].children);
        adjustChildren.forEach(child => {
            child.dataset.row -= 1;
        });
    };
};

middleControls.addEventListener("click", e => {
    const button = e.target.closest(".delete-row");
    if (!button) return;
    deleteRow(button.dataset.row);
    adjustRowShift(button.dataset.row);
});

/* ------------------------------- add column ------------------------------- */

addColumnButton.addEventListener("click", () => {
    addDisplayColumn();
    addColorControlColumn();
    addDeleteColumn();
    updateInputs();
});

/* ------------------------------ remove column ----------------------------- */

function adjustColumnShift(column, row) {
    let shiftChildren;
    if (row === colorControlRow) {
        shiftChildren = Array.from(row.children).slice(column - 1, -1);
    } else {
        shiftChildren = Array.from(row.children).slice(column - 1);
    };
    shiftChildren.forEach(child => {
        child.dataset.column -= 1;
        for (let i = 0; i < child.childElementCount; i++) {
            child.children[i].dataset.column -= 1;
        };
    });
}

function removeColumn(column) {
    colorControlRow.removeChild(colorControlRow.children[column - 1]);
    rows.forEach(row => {
        row.removeChild(row.children[column - 1]);
    });
    deleteButtonRow.removeChild(deleteButtonRow.children[column - 1]);

    adjustColumnShift(column, colorControlRow);
    rows.forEach(row => {
        adjustColumnShift(column, row);
    });
    adjustColumnShift(column, deleteButtonRow);
};

deleteButtonRow.addEventListener("click", e => {
    const button = e.target.closest("button.delete-column");
    if (!button) return;
    removeColumn(button.dataset.column);
});

/* --------------------------------- inputs --------------------------------- */

middleControls.addEventListener("click", e => {
    const button = e.target.closest(".display")
    if (!button) return;
    const color = window.getComputedStyle(button).getPropertyValue("background-color");
    navigator.clipboard.writeText(color);
});

updateInputs();