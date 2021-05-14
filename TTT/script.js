// THE GAME BRAIN

let gameOver = false;
let firstSecondPlayer = [];


function playerVsPlayer() {
    document.getElementById("zero-message").style.display = "none";
    document.getElementById("first-message").style.display = "block";
    document.getElementById("1v1").style.display = "none";

    document.querySelector(".container").addEventListener("click", function (e) {

        if (gameOver == false &&
            firstSecondPlayer.length % 2 != 0) {
            document.getElementById(e.target.id).innerHTML = `<img src="candy.png" width="90px">`;
            firstSecondPlayer.push(e.target.id);


            document.getElementById("second-message").style.display = "none";
            document.getElementById("first-message").style.display = "block";

            // horizontal verification 
            function horizontalCandy(num) {
                if (document.getElementById(`${num}1`).innerHTML.includes("candy") &&
                    document.getElementById(`${num}2`).innerHTML.includes("candy") &&
                    document.getElementById(`${num}3`).innerHTML.includes("candy")) {
                    document.getElementById("win-message").textContent = "Congratulation Player 2 you won!";
                    document.getElementById("first-message").style.display = "none";
                    restartGame();
                }
            }
            // vertical verification
            function verticalCandy(num) {
                if (document.getElementById(`1${num}`).innerHTML.includes("candy") &&
                    document.getElementById(`2${num}`).innerHTML.includes("candy") &&
                    document.getElementById(`3${num}`).innerHTML.includes("candy")) {
                    document.getElementById("win-message").textContent = "Congratulation Player 2 you won!";
                    document.getElementById("first-message").style.display = "none";
                    restartGame();
                }

            }
            // diagional verification needs improvement
            function diagonalCandy() {
                if (document.getElementById(`11`).innerHTML.includes("candy") &&
                    document.getElementById(`22`).innerHTML.includes("candy") &&
                    document.getElementById(`33`).innerHTML.includes("candy")) {
                    document.getElementById("win-message").textContent = "Congratulation Player 2 you won!";
                    document.getElementById("first-message").style.display = "none";
                    restartGame()
                }
                if (document.getElementById(`31`).innerHTML.includes("candy") &&
                    document.getElementById(`22`).innerHTML.includes("candy") &&
                    document.getElementById(`13`).innerHTML.includes("candy")) {
                    document.getElementById("win-message").textContent = "Congratulation Player 2 you won!";
                    document.getElementById("first-message").style.display = "none";
                    restartGame()
                }
            }

            for (let i = 1; i < 4; i++) {
                horizontalCandy(i);
                verticalCandy(i);

            }
            diagonalCandy();

        } else if (gameOver == false &&
            firstSecondPlayer.length % 2 == 0) {
            document.getElementById(e.target.id).innerHTML = `<img src="tree.png" width="90px">`;
            firstSecondPlayer.push(e.target.id);

            document.getElementById("first-message").style.display = "none";
            document.getElementById("second-message").style.display = "block";

            // horizontal verification
            function horizontalTree(num) {
                if (document.getElementById(`${num}1`).innerHTML.includes("tree") &&
                    document.getElementById(`${num}2`).innerHTML.includes("tree") &&
                    document.getElementById(`${num}3`).innerHTML.includes("tree")) {
                    document.getElementById("win-message").textContent = "Congratulation Player 1 you won!";
                    document.getElementById("second-message").style.display = "none";
                    restartGame();
                }
            }

            // vertical verifiation
            function verticalTree(num) {
                if (document.getElementById(`1${num}`).innerHTML.includes("tree") &&
                    document.getElementById(`2${num}`).innerHTML.includes("tree") &&
                    document.getElementById(`3${num}`).innerHTML.includes("tree")) {
                    document.getElementById("win-message").textContent = "Congratulation Player 1 you won!";
                    document.getElementById("second-message").style.display = "none";
                    restartGame();
                }

            }
            // diagonal verification needs improvement
            function diagonalTree() {
                if (document.getElementById(`11`).innerHTML.includes("tree") &&
                    document.getElementById(`22`).innerHTML.includes("tree") &&
                    document.getElementById(`33`).innerHTML.includes("tree")) {
                    document.getElementById("win-message").textContent = "Congratulation Player 1 you won!";
                    document.getElementById("second-message").style.display = "none";
                    restartGame();
                }
                if (document.getElementById(`31`).innerHTML.includes("tree") &&
                    document.getElementById(`22`).innerHTML.includes("tree") &&
                    document.getElementById(`13`).innerHTML.includes("tree")) {
                    document.getElementById("win-message").textContent = "Congratulation Player 1 you won!";
                    document.getElementById("second-message").style.display = "none";
                    restartGame();
                }
            }
            for (let i = 1; i < 4; i++) {
                horizontalTree(i);
                verticalTree(i);
            }
            diagonalTree();
        }
        // message if there is no winner
        if(firstSecondPlayer.length == 9) {
            document.getElementById("win-message").textContent = "No winner baby, try again!";
            document.getElementById("first-message").style.display = "none";
            document.getElementById("second-message").style.display = "none";
            restartGame();
        }

        function restartGame() {
            gameOver = true;
            document.getElementById("1v1").style.display = "none";
            const myRestart = document.createElement("button");
            myRestart.setAttribute("onClick", "window.location.reload()");
            myRestart.setAttribute("class", "mt-2");
            myRestart.textContent = "Restart";
            const targetRestart = document.getElementById("btm-Btn");
            targetRestart.appendChild(myRestart);
        }
        console.log(firstSecondPlayer);
    })
}

// MY DARK THEME

const myToggler = document.getElementById("mySwitch");
myToggler.addEventListener("click", function () {
    document.body.classList.toggle("dark");
});