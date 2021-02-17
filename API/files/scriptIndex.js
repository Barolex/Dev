
const myID = "9923224";
const API_KEY = "6923581cdd306d8fef79f7008680386d";
const myEndpoint = "https://api.themoviedb.org/3/";
const imageURL = "https://image.tmdb.org/t/p/w500";

fetch(`${myEndpoint}authentication/token/new?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const myToken = data.request_token;

        fetch(`${myEndpoint}authentication/token/validate_with_login?api_key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": "Barolex",
                "password": "pHf7@3mBVxubbcs",
                "request_token": `${myToken}`
            })
        })
            .then(response => response.json())
            .then(data => {
                const validToken = data.request_token;
                fetch(`${myEndpoint}authentication/session/new?api_key=${API_KEY}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        request_token: validToken
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        // had to make it global to use it in the submit button
                        sessionID = data.session_id;
                    })
            })
    })

    // subimt button work on enter
const buttonTrigger = document.getElementById("myInput");
buttonTrigger.addEventListener("keyup", (event) => {
    if(event.keyCode === 13) {
        handleButton();
    }
})

function handleButton() {
    const movieName = document.getElementById("myInput").value;
    // removing the d-none display
    const myCardElement = document.getElementById("myCard");
    myCardElement.classList.remove("d-none")
    myCardElement.classList.add("d-flex")

    // replace the text error back to original if movie not found
    // const myDocTitle =  document.getElementById("insertMovie");
    // myDocTitle.textContent = "Please insert a movie:";
    // myDocTitle.classList.remove(myDocTitle)

    fetch(`${myEndpoint}search/movie?api_key=${API_KEY}&query=${movieName}`)
        .then(response => response.json())
        .then(data => {
            const myResult = data.results[0];

            // if movie not found display an error
            // if(myResult == undefined) {
            //     const myDocTitle = document.getElementById("insertMovie");
            //     myDocTitle.classList.add("text-danger")
            //     myDocTitle.textContent = "Movie not found, try again.";
            //     myCardElement.classList.remove("d-flex")
            //     myCardElement.classList.add("d-none")
            // }
            
            // to be used for rating
            const myRatingID = myResult.id;

            // finding and inserting the Tittle in the page
            const titlePath = myResult.original_title;
            const myTitleElement = document.getElementById("myTitle");
            myTitleElement.textContent = titlePath;

            // adding the poster to the card
            const posterPath = myResult.poster_path;
            const myPosterFullPath = `${imageURL}${posterPath}`;
            const myPosterElement = document.getElementById("myPoster");
            myPosterElement.setAttribute("src", myPosterFullPath)

            // adding a description to the card
            const descriptionPath = myResult.overview;
            const myDescriptionElement = document.getElementById("myDescription")
            myDescriptionElement.textContent = descriptionPath;

            // Account ID

            fetch(`${myEndpoint}account?api_key=${API_KEY}&session_id=${sessionID}`)
                .then(response => response.json())
                .then(data => {
                    const myID2 = data.id;

                    // Favorite
                    document.getElementById("myFavorite").addEventListener("click", function () {
                        fetch(`${myEndpoint}account/${myID2}/favorite?api_key=${API_KEY}&session_id=${sessionID}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "media_type": "movie",
                                "media_id": `${myResult.id}`,
                                "favorite": true
                            })
                        })
                    })

                    // Rating

                    // Rating to change stars to yellow needs improvement
                    let currentRating = 0;
                    function myRating(event) {
                        const myFirstDoc = document.getElementById(`myRating01`);
                        const mySecondDoc = document.getElementById("myRating02");
                        const myThirdDoc = document.getElementById("myRating03");
                        const myFourthDoc = document.getElementById("myRating04");
                        const myFifthDoc = document.getElementById("myRating05");
                        if (event.target.id == "myRating01}") {
                            myFirstDoc.setAttribute("src", "./images/stary.png");
                            mySecondDoc.setAttribute("src", "./images/star.png");
                            myThirdDoc.setAttribute("src", "./images/star.png");
                            myFourthDoc.setAttribute("src", "./images/star.png");
                            myFifthDoc.setAttribute("src", "./images/star.png");
                            currentRating = 2;
                            postRating();
                            document.getElementById("modalRatingMessage").textContent = `You gave this movie a ${currentRating}. Each star represents 2 points.`;
                        }
                        if (event.target.id == "myRating02") {
                            myFirstDoc.setAttribute("src", "./images/stary.png");
                            mySecondDoc.setAttribute("src", "./images/stary.png");
                            myThirdDoc.setAttribute("src", "./images/star.png");
                            myFourthDoc.setAttribute("src", "./images/star.png");
                            myFifthDoc.setAttribute("src", "./images/star.png");
                            currentRating = 4;
                            postRating();
                            document.getElementById("modalRatingMessage").textContent = `You gave this movie a ${currentRating}. Each star represents 2 points.`;
                        }
                        if (event.target.id == "myRating03") {
                            myFirstDoc.setAttribute("src", "./images/stary.png");
                            mySecondDoc.setAttribute("src", "./images/stary.png");
                            myThirdDoc.setAttribute("src", "./images/stary.png");
                            myFourthDoc.setAttribute("src", "./images/star.png");
                            myFifthDoc.setAttribute("src", "./images/star.png");
                            currentRating = 6;
                            postRating();
                            document.getElementById("modalRatingMessage").textContent = `You gave this movie a ${currentRating}. Each star represents 2 points.`;
                        }
                        if (event.target.id == "myRating04") {
                            myFirstDoc.setAttribute("src", "./images/stary.png");
                            mySecondDoc.setAttribute("src", "./images/stary.png");
                            myThirdDoc.setAttribute("src", "./images/stary.png");
                            myFourthDoc.setAttribute("src", "./images/stary.png");
                            myFifthDoc.setAttribute("src", "./images/star.png");
                            currentRating = 8;
                            postRating();
                            document.getElementById("modalRatingMessage").textContent = `You gave this movie an ${currentRating}. Each star represents 2 points.`;
                        }
                        if (event.target.id == "myRating05") {
                            myFirstDoc.setAttribute("src", "./images/stary.png");
                            mySecondDoc.setAttribute("src", "./images/stary.png");
                            myThirdDoc.setAttribute("src", "./images/stary.png");
                            myFourthDoc.setAttribute("src", "./images/stary.png");
                            myFifthDoc.setAttribute("src", "./images/stary.png");
                            currentRating = 10;
                            postRating();
                            document.getElementById("modalRatingMessage").textContent = `You gave this movie a ${currentRating}. Each star represents 2 points.`;
                        }

                    }
                    for (let i = 1; i < 6; i++) {
                        const myDoc = document.getElementById(`myRating0${i}`);
                        myDoc.onclick = myRating;
                    }

                    function postRating() {
                        fetch(`${myEndpoint}movie/${myRatingID}/rating?api_key=${API_KEY}&session_id=${sessionID}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "value": `${currentRating}`,
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log("Success!", data);
                            })
                    }

                })

        })

}

