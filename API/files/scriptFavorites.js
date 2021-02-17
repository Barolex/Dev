
const myID = "9923224";
const API_KEY = "6923581cdd306d8fef79f7008680386d";
const myEndpoint = "https://api.themoviedb.org/3/";
const imageURL = "https://image.tmdb.org/t/p/w500";

// Authorization and Session ID, Thank you Theo !!!

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
                // console.log("Login data", data);
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
                        // console.log("Session request data", data);
                        // had to make it global to use it in the submit button
                        sessionID = data.session_id;

                        fetch(`${myEndpoint}account/${myID}/favorite/movies?api_key=${API_KEY}&session_id=${sessionID}`)
                            .then(response => response.json())
                            .then(data => {
                                // const myResult = data.results[0];
                                for (let i = 0; i < data.results.length; i++) {
                                    const myResult = data.results[i];

                                    // creating the card
                                    const container = document.getElementById("myCard");
                                    const firstDiv = document.createElement("div"); // closes last
                                    const secondDiv = document.createElement("img"); // no closing
                                    const thirdDiv = document.createElement("div"); // inside first
                                    const fourthDiv = document.createElement("h5"); // inside third
                                    const fifthDiv = document.createElement("p"); //inside third

                                    firstDiv.classList.add("card", "col-8", "col-md-4", "col-lg-3", "ml-4", "ml-md-0", "mt-3");
                                    firstDiv.setAttribute("id", `myCard${i}`);
                                    container.appendChild(firstDiv);
                                    firstDiv.appendChild(secondDiv);
                                    secondDiv.setAttribute("id", `myPoster${i}`);
                                    secondDiv.classList.add("img", "img-fluid", "mt-2")
                                    firstDiv.appendChild(thirdDiv);
                                    thirdDiv.classList.add("card-body");
                                    thirdDiv.appendChild(fourthDiv);
                                    fourthDiv.setAttribute("id", `myTitle${i}`);
                                    fourthDiv.classList.add("card-title");
                                    thirdDiv.appendChild(fifthDiv);
                                    fifthDiv.setAttribute("id", `myDescription${i}`);
                                    fifthDiv.classList.add("card-text", "text-truncate");

                                    // finding and inserting the Tittle in the page
                                    const titlePath = myResult.original_title;
                                    const myTitleElement = document.getElementById(`myTitle${i}`);
                                    myTitleElement.textContent = titlePath;

                                    // adding the poster to the card
                                    const posterPath = myResult.poster_path;
                                    const myPosterFullPath = `${imageURL}${posterPath}`;
                                    const myPosterElement = document.getElementById(`myPoster${i}`);
                                    myPosterElement.setAttribute("src", myPosterFullPath);

                                    // adding a description to the card
                                    const descriptionPath = myResult.overview;
                                    const myDescriptionElement = document.getElementById(`myDescription${i}`);
                                    myDescriptionElement.textContent = descriptionPath;


                                }

                            })
                    })
            })
    })
