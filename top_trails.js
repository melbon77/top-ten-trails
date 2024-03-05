/**
 * Melanie Boncaro
 * ISTE.252 - Web App
 * 3/5/2024
 */

const xhr = new XMLHttpRequest();
const url = "assets/data/trails.json";

xhr.open("GET", url, true);
xhr.send();

xhr.addEventListener("load", function() {
    let output = "";
    if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(this.response);
        const Trails = JSON.parse(xhr.response);
        // console.log(Trails);

        for (let trail of Trails) {
            // Check if display mode is favorites or all, then show appropriate cards
            if (!sessionStorage.getItem("display") || sessionStorage.getItem("display") == "all") {
                output += createTrailCard(trail);
            } else if (sessionStorage.getItem("display") == "favorites") {
                if (localStorage.getItem("trail_" + trail.id + "_fav") == "true") {
                    output += createTrailCard(trail);
                    console.log(output);
                }
            }
        }
        addElement(output);
    }
})

/**
 * Converts a single trail object to an html trail card
 * @param {*} trail single parsed trail object
 * @returns template literal of trail card in html
 */
function createTrailCard(trail) {
    let className = "material-symbols-outlined favorite";

    // Check item has been favorited previously
    if (localStorage.getItem("trail_" + trail.id + "_fav") == "true") {
        className += " selected";
    }

    return `
    <div class="card">
        <img srcset="
        ${trail.img} 800w,
        ${trail.smallimg} 600w"
        sizes="(min-width: 600px)"
        alt="${trail.name}">

        <div class="card_header">
            <h3>${trail.name}</h3>
            <span title="Add to favorites" id="trail_${trail.id}" class="${className}" onclick="manageFavorite(this)">
                favorite
            </span>
        </div>
        <p class="tLocation">${trail.location}</p>

        <div class="trail_details">
            <p class="tDiff">${trail.difficulty} &#xb7; ${trail.distance}</p>
            <p class="tAddress">${trail.address}</p>
            <p class="tHours"><b>Hours: </b>${trail.hours}</p>
            <p class="tDesc">${trail.description}</p>
        </div>

        <span class="material-symbols-outlined dropdown" onclick="showDetails(this)">
            expand_more
        </span>
    </div>
    `
}

{/* <span class="material-symbols-outlined favorite">
    <a href="#" onclick="return false">favorite</a>
</span> */}

/**
 * Adds html trail cards to the page to be displayed
 * @param {string} data string of html card elements
 */
function addElement(data) {
    let holder = document.getElementById("card_holder");
    holder.insertAdjacentHTML("beforeend", data);
}


/**
 * Toggles favorited state of trail card
 * @param {*} trailCard current trail object
 */
function manageFavorite(trailCard) {
    console.log("TrailCard ID: " + trailCard.id);

    let favTrail = trailCard.id + "_fav";
    // let cardClassName = document.getElementById(trailCard.id).className;

    if (!localStorage.getItem(favTrail) || localStorage.getItem(favTrail) == "false") {
        localStorage.setItem(favTrail, "true");
        document.getElementById(trailCard.id).className += " selected";
    } else {
        localStorage.setItem(favTrail, "false");
        document.getElementById(trailCard.id).className = "material-symbols-outlined favorite";
    }
    
    console.log(trailCard.id + " class: " + document.getElementById(trailCard.id).className);
    console.log(localStorage.getItem(favTrail));

    // return false;
}

// async function changeDisplay() {
//     let output = "";
//     await requestFavorites()
//     .then(data => output=data.data.map(createTrailCard))
//     .then(output => addElement(output));
// }

/**
 * Toggles between displaying all trails and only favorited trails
 */
function changeDisplay() {
    console.log(sessionStorage.getItem("display"));

    if (!sessionStorage.getItem("display") || sessionStorage.getItem("display") == "all") {
        sessionStorage.setItem("display", "favorites");
        console.log("swapped to favorites " + sessionStorage.getItem("display"));
    } else {
        sessionStorage.setItem("display", "all");
        console.log("swapped to all " + sessionStorage.getItem("display"));
    }

    document.location.href='index.html';
}

/**
 * Toggles additional details displayed on trail card
 * @param {*} trail single trail object
 */
function showDetails(trail) {
    console.log(trail.parentElement.className);

    if (trail.parentElement.className.includes("open")) {
        trail.parentElement.className = "card";
    } else {
        trail.parentElement.className += " open";
    }
}
