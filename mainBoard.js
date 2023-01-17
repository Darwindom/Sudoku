const data = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null]
]
const err = document.getElementById("errors");
let numSelected = null;
let tileSelected = null;
let errors = 0;

const random = (max, min = 1) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// לוח מקשים

const addButtons = () => {
    for (let i = 1; i <= 9; i++) {
        const number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.classList.add("number");
        digits.appendChild(number);

    }
    digits.addEventListener("click", selectNumber);
}
function selectNumber(e) {
    if (e.target.id == this.id) return
    const but = document.querySelector('.number-selected');
    if (but !== null) {
        but.classList.remove("number-selected")
    }
    e.target.classList.add("number-selected");
    numSelected = +e.target.innerText
}

// הוספת קלסים למסגרות

const playSudoku = () => {
    data.forEach((arr, i) => {
        arr.forEach((num, index) => {
            const tile = document.createElement("div");
            tile.id = i.toString() + "-" + index.toString();
            if (data[i][index] != null) {
                tile.innerText = num;
                tile.classList.add("tile-start");
            }
            if (i == 2 || i == 5) {
                tile.classList.add("horizontal-line");
            }
            if (index == 2 || index == 5) {
                tile.classList.add("vertical-line");
            }
            tile.classList.add("tile");
            board.append(tile);
        })
    })
}

// בדיקת טעויות

const checkError = (isFirst = false) => {
    if (isFirst) {
        errors++;
        mistakes.innerText = `${errors} :טעויות`;
    }
}

// בדיקת שלבים לפי צירים
// 91
const checkStep = (index, i, numSelected, isFirst) => {
    const vertical = checkVertical(index, numSelected);
    const horizontal = data[i].includes(numSelected);
    const outsideIndex = getRuleFor(checkBox(i));
    const insideIndex = getRuleFor(checkBox(index));
    const boxRul = checkForBox(outsideIndex, insideIndex, numSelected);

    if (horizontal || vertical || boxRul) {
        checkError(isFirst)
        return false
    }
    return true
}

// הוספת מספר

board.addEventListener('click', e => {
    const box = e.target.innerText;
    if (box !== '' || e.target.id == 'board' || numSelected === null) return
    const id = e.target.id;
    const i = id[0];
    const index = id[2];


    if (checkStep(index, i, numSelected, true)) {
        e.target.innerText = numSelected;
        data[i][index] = numSelected;
    }
});

// מחירת מספר
board.ondblclick = e => {
    e.target.innerText = null
    const i = e.target.id[0];
    const index = e.target.id[2];
    data[i][index] = null;
}

// הגדרות בדיקה לריבוע פנימי
const checkForBox = (outsideIndex, insideIndex, numSelected) => {
    for (let index = outsideIndex.start; index <= outsideIndex.end; index++) {
        for (let i = insideIndex.start; i <= insideIndex.end; i++) {
            if (data[index][i] === numSelected) return true;
        }
    }
}

const getRuleFor = (rule) => {
    switch (rule) {
        case 1: return { start: 0, end: 2 }
        case 2: return { start: 3, end: 5 }
        case 3: return { start: 6, end: 8 }
    }
}

// 0-2;3-6;7-9
const checkBox = (index) => {
    switch (+index) {
        case 0:
        case 1:
        case 2:

            return 1
        case 3:
        case 4:
        case 5:
            return 2
        case 6:
        case 7:
        case 8:
            return 3
    }

}

// ולידצייה אנכית

const checkVertical = (index, numSelected) => {
    let isVertical = false;
    data.forEach(arr => {
        arr[index] == numSelected && (isVertical = true)
    })
    return isVertical
}

// ולידצייה לספרה רנדומית

const randomNum = (index, i, num) => data[index][i] = num
const randomCheck = () => {
    const index = random(8);
    const i = random(8);
    const num = random(9);

    if (checkStep(i, index, num)) {
        randomNum(index, i, num)
    }
}

// בחירת קושי

const randomField = (difficulty) => {
    let count = null;
    switch (difficulty) {
        case 'hard': count = 25;
            break
        case 'mid': count = 45;
            break
        case 'easy': count = 65;
            break
    }

    for (let i = 0; i <= count; i++) {
        randomCheck()
    }
}

// טעינת משחק

window.onload = function () {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);

    randomField(urlParams.get('difficulty'))
    playSudoku()
    addButtons()
}


