let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset"); // Changed to querySelector
let newGameBtn = document.querySelector("#new-btn"); // Changed to querySelector
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno = true; // Player X starts

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) { // Player O
            box.innerText = "O";
            turno = false;
        } else { // Player X
            box.innerText = "X";
            turno = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

const showDraw = () => {
    msg.innerText = "No one wins";
    msgContainer.classList.remove("hide");
};

const disableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const checkWinner = () => {
    let isDraw = true;

    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner", pos1val);
                showWinner(pos1val);
                return; // Exit loop on finding a winner
            }
        }
    }

    // Check if all boxes are filled
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        showDraw();
        disableboxes();
    }
};

const resetGame = () => {
    turno = true;
    enableboxes();
    msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
