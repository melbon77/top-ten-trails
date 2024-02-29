/**
 * Melanie Boncaro
 * ISTE.252 - Web App
 * 3/5/2024
 */

const xhr = new XMLHttpRequest();
const url = "assets/data/trails.json";
let output = "";

xhr.open("GET", url, true);
xhr.send();

xhr.addEventListener("load", function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(this.response);
        const Trails = JSON.parse(xhr.response);
        // console.log(Trails);


        for (let trail of Trails) {
            // console.log(trail);
            output += createTrailCard(trail);
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
        <div class="card_header">
            <h3>${trail.name}</h3>
            <span id="trail_${trail.id}" class="${className}" onclick="manageFavorite(this)">
                favorite
            </span>
        </div>
        <p>${trail.location}</p>
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


function showFavorites() {}

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