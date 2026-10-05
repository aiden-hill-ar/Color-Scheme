/* ---------------------------- Global Variables ---------------------------- */

const doc = document;

let precision = 0.001;

const colorControlRow = doc.querySelector(".control-row");
const rows = Array.from(doc.querySelectorAll(".row"));
const deleteButtonRow = doc.querySelector(".delete-button-row");

const ns = "http://www.w3.org/2000/svg";

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

    let inputArrows = doc.createElement("div");
    inputArrows.classList.add("top-input-arrow-wrapper");
    const path = doc.createElementNS(ns, "path");
    path.setAttribute("d", "m18 15-6-6-6 6");
    let path2 = doc.createElementNS(ns, "path");
    path2.setAttribute("d", "m18 15-6-6-6 6");

    let upArrow = doc.createElementNS(ns, "svg");
    upArrow.setAttribute("viewbox", "0 0 24 24");
    upArrow.classList.add("up-arrow");
    upArrow.classList.add("arrow");
    let downArrow = doc.createElementNS(ns, "svg");
    downArrow.setAttribute("viewbox", "0 0 24 24");
    downArrow.classList.add("down-arrow");
    downArrow.classList.add("arrow");
    upArrow.append(path);
    downArrow.append(path2);
    inputArrows.appendChild(upArrow);
    inputArrows.appendChild(downArrow);

    let inputArrows2 = doc.createElement("div");
    inputArrows2.classList.add("bottom-input-arrow-wrapper");
    const path3 = doc.createElementNS(ns, "path");
    path3.setAttribute("d", "m15 14-4-4-4 4");
    let path4 = doc.createElementNS(ns, "path");
    path4.setAttribute("d", "m13 14-4-4-4 4");

    let upArrow2 = doc.createElementNS(ns, "svg");
    upArrow2.setAttribute("viewbox", "0 0 20 20");
    upArrow2.classList.add("up-arrow");
    upArrow2.classList.add("arrow");
    let downArrow2 = doc.createElementNS(ns, "svg");
    downArrow2.setAttribute("viewbox", "0 0 24 24");
    downArrow2.classList.add("down-arrow");
    downArrow2.classList.add("arrow");
    upArrow2.append(path3);
    downArrow2.append(path4);
    inputArrows2.appendChild(upArrow2);
    inputArrows2.appendChild(downArrow2);

    colorControl.appendChild(inputArrows);
    colorControl.appendChild(inputArrows2);

    colorControlRow.insertBefore(colorControl, colorControlRow.lastElementChild);
};
addColorControlColumn();

function addDisplayColumn() {
    let display = doc.createElement("div");
    display.classList.add("display");
    display.setAttribute("data-column", `${rows[0].childElementCount + 1}`)
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

/* --------------------------- number input arrows -------------------------- */

colorControlRow.addEventListener("click", e => {
    const arrow = e.target.closest(".arrow");
    if (!arrow) return;
    const arrowParent = arrow.parentElement;
    let input;
    let value;
    if (arrow.parentElement.classList.contains("top-input-arrow-wrapper")) {
        input = 0;
        if (arrow.classList.contains("up-arrow")) {
            value = "stepUp";
        }
        if (arrow.classList.contains("down-arrow")) {
            value = "stepDown";
        }
    } else if (arrow.parentElement.classList.contains("bottom-input-arrow-wrapper")) {
        input = 1;
        if (arrow.classList.contains("up-arrow")) {
            value = "stepUp";
        }
        if (arrow.classList.contains("down-arrow")) {
            value = "stepDown";
        }
    }
    if (input === 0) {
        if (value === "stepUp") {
            arrowParent.parentElement.children[0].stepUp(1);
        } else {
            arrowParent.parentElement.children[0].stepDown(1);
        }
    } else {
        if (value === "stepUp") {
            arrowParent.parentElement.children[1].stepUp(1);
        } else {
            arrowParent.parentElement.children[1].stepDown(1);
        }
    }
});

/* ---------------------------- add column button --------------------------- */

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

/* -------------------------- remove column button -------------------------- */

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

/* ------------------------------- hsl to hex ------------------------------- */

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(8)}${f(4)}`;
}