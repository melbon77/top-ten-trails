/**
 * Melanie Boncaro
 * ISTE.252 - Web App
 * 3/5/2024
 * 
 * Initialization for embedded Leaflet.js map
 */

// Set map focus location
let map = L.map('map').setView([43.15, -77.6], 10);

// Add attribution to map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Custom leaf icon for location markers
let leafIcon = L.icon({
    iconUrl: 'http://solace.ist.rit.edu/~mb2317/iste252/top_ten_trails/assets/images/leaf3.png',
    // iconUrl: '../images/leaf2.png',
    iconSize: [56, 50],
    iconAnchor: [28, 50],
    popupAnchor: [0, -50],
});

// Add location markers
let corbetts_glen = L.marker([43.137781721466865, -77.52655360266847], {icon: leafIcon}).addTo(map);
let channing_philbrick = L.marker([43.12712345979102, -77.48593694499844], {icon: leafIcon}).addTo(map);
let turning_point = L.marker([43.22762058193816, -77.6177222136724], {icon: leafIcon}).addTo(map);
let lehigh_valley = L.marker([43.0107598711398, -77.6237505738383], {icon: leafIcon}).addTo(map);
let webster_arbor = L.marker([43.24193311205704, -77.39224424040832], {icon: leafIcon}).addTo(map);
let tinker = L.marker([43.06763028493506, -77.5748317026712], {icon: leafIcon}).addTo(map);
let lock_32 = L.marker([43.09117646637895, -77.54490000267026], {icon: leafIcon}).addTo(map);
let mendon_ponds = L.marker([43.01646212666874, -77.56628737383808], {icon: leafIcon}).addTo(map);
let cobbs_hill = L.marker([43.14232694275801, -77.57261734499767], {icon: leafIcon}).addTo(map);
let genesee_riverway = L.marker([43.13271687113148, -77.63210970266866], {icon: leafIcon}).addTo(map);

// Location name popups when selected
corbetts_glen.bindPopup("Corbett's Glen").openPopup();
channing_philbrick.bindPopup("Channing H. Philbrick Park").openPopup();
turning_point.bindPopup("Turning Point Park").openPopup();
lehigh_valley.bindPopup("Lehigh Valley Trail").openPopup();
webster_arbor.bindPopup("Webster Arboretum").openPopup();
tinker.bindPopup("Tinker Nature Park").openPopup();
lock_32.bindPopup("Lock 32 Canal Park").openPopup();
mendon_ponds.bindPopup("Mendon Ponds Park").openPopup();
cobbs_hill.bindPopup("Cobb's Hill Park").openPopup();
genesee_riverway.bindPopup("Genesee Riverway Trail").openPopup();
