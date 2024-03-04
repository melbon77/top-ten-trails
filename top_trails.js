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
            // console.log(trail);
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

function createTrailCard(trail) {
    let className = "material-symbols-outlined favorite";
    if (localStorage.getItem("trail_" + trail.id + "_fav") == "true") {
        className += " selected";
    }

    return `
    <div class="card">
        <img src="${trail.img}">
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


function addElement(data) {
    let holder = document.getElementById("card_holder");
    holder.insertAdjacentHTML("beforeend", data);
}


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

async function changeDisplay() {
    console.log(sessionStorage.getItem("display"));
    // let output = "";
    // await requestFavorites()
    // .then(data => output=data.data.map(createTrailCard))
    // .then(output => addElement(output));

    if (!sessionStorage.getItem("display") || sessionStorage.getItem("display") == "all") {
        sessionStorage.setItem("display", "favorites");
        console.log("swapped to favorites " + sessionStorage.getItem("display"));
    } else {
        sessionStorage.setItem("display", "all");
        console.log("swapped to all " + sessionStorage.getItem("display"));
    }

    document.location.href='index.html';
}

async function requestFavorites() {}



function showDetails(trail) {
    console.log(trail.parentElement.className);

    if (trail.parentElement.className.includes("open")) {
        trail.parentElement.className = "card";
    } else {
        trail.parentElement.className += " open";
    }
}
