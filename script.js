/* ---------------------------- Global Variables ---------------------------- */

const doc = document;

let precision = 0.001;

const colorControlRow = doc.querySelector(".control-row");
const rows = Array.from(doc.querySelectorAll(".row"));
const deleteButtonRow = doc.querySelector(".delete-button-row");

const ns = "http://www.w3.org/2000/svg";

const middleControls = doc.querySelector(".middle-controls");
let numOfRows;

/* ---------------------------- precision buttons --------------------------- */

const preciseButton = doc.querySelector(".precise");
const wideButton = doc.querySelector(".wide");

function setControlPrecision() {
    const controllers = Array.from(colorControlRow.children);
    for (let i = 0; i < controllers.length - 1; i++) {
        const controllerChildren = Array.from(controllers[i].children);
        for (let i = 0; i < controllerChildren.length; i++) {
            controllerChildren[i].step = precision;
        }
    }
}

preciseButton.addEventListener("click", () => {
    preciseButton.classList.add("clicked");
    if (wideButton.classList.contains("clicked") === true) {
        wideButton.classList.remove("clicked");
    };
    precision = 0.001;
    setControlPrecision();
});
wideButton.addEventListener("click", () => {
    wideButton.classList.add("clicked");
    if (preciseButton.classList.contains("clicked") === true) {
        preciseButton.classList.remove("clicked");
    };
    precision = 0.01;
    setControlPrecision();
});

/* ------------------------------- add column ------------------------------- */

const addColumnButton = doc.querySelector(".add-column");

function addColorControlColumn() {
    let colorControl = doc.createElement("div");
    colorControl.classList.add("color-controls");
    colorControl.setAttribute("data-column", `${rows[0].children.length + 1}`);

    let lightnessInput = doc.createElement("input");
    lightnessInput.type = "number";
    lightnessInput.name = "lightness";
    lightnessInput.classList.add("lightness");
    lightnessInput.setAttribute("data-column", `${rows[0].children.length + 1}`);
    lightnessInput.min = "0";
    lightnessInput.max = "1";
    lightnessInput.step = precision;
    colorControl.appendChild(lightnessInput);

    let chromaInput = doc.createElement("input");
    chromaInput.type = "number";
    chromaInput.name = "chroma";
    chromaInput.classList.add("chroma");
    chromaInput.setAttribute("data-column", `${rows[0].children.length + 1}`);
    chromaInput.min = "0";
    chromaInput.max = "0.37";
    chromaInput.step = precision;
    colorControl.appendChild(chromaInput);

    colorControlRow.insertBefore(colorControl, colorControlRow.lastElementChild);
};
addColorControlColumn();

function addDisplayColumn() {
    let display = doc.createElement("div");
    display.classList.add("display");
    display.setAttribute("data-column", `${rows[0].childElementCount + 1}`)
    display.setAttribute("data-row", `${numOfRows}`)
    rows.forEach(row => {
        row.appendChild(display.cloneNode(true));
    });
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

function addColorControlRow() {
    let colorControl = doc.createElement("div");
    colorControl.classList.add("color-controls");
    colorControl.setAttribute("data-column", `${0}`);
    colorControl.setAttribute("data-column", `${numOfRows}`)

    let hueInput = doc.createElement("input");
    hueInput.type = "number";
    hueInput.name = "hue";
    hueInput.classList.add("hue");
    hueInput.setAttribute("data-column", `${0}`);
    hueInput.min = "0";
    hueInput.max = "1";
    hueInput.step = precision;
    colorControl.appendChild(hueInput);


    leftControls.insertBefore(colorControl, leftControls.lastElementChild);
};
addColorControlRow();

/* ------------------------------- add column ------------------------------- */

function addNewColumn() {
    // hide button after set amount of colors
    if (rows[0].children.length >= 7) {
        addColumnButton.classList.add("max");
    }
    if (rows[0].children.length < 8) {
        addColorControlColumn();
        addDisplayColumn();
        addDeleteColumn();
    }
};

addColumnButton.addEventListener("click", () => {
    addNewColumn();
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
    })
    adjustColumnShift(column, deleteButtonRow);

    if (rows[0].children.length < 8) {
        addColumnButton.classList.remove("max");
    }
};

deleteButtonRow.addEventListener("click", e => {
    const button = e.target.closest("button.delete-column");
    if (!button) return;
    removeColumn(button.dataset.column);
});

/* --------------------------------- add row -------------------------------- */

function setNumOfRows() {
    numOfRows = rows.length;
};
setNumOfRows();

const addRowButton = doc.querySelector(".add-row");

function addDisplayRow() {
    let createdRow = doc.createElement("div");
    createdRow.classList.add("row");

    let rowDisplay = doc.createElement("div");
    rowDisplay.setAttribute("data-column", "1");
    rowDisplay.setAttribute("data-row", "2");
    rowDisplay.classList.add("display");

    createdRow.append(rowDisplay);
    middleControls.insertBefore(createdRow, middleControls.lastElementChild);
};
addDisplayRow();