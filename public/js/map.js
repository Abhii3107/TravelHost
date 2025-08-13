
//   let mapToken = mapToken; // coming from backend we cannot directly access <%= process.env.MAP_TOKEN %> in puclic folder , show we pass in ejs - show,ejs and store in mapTokenVariable(at starting)

  const coordinates = [28.6139, 77.2088]; // example location [lng,lat]

  const map = L.map('map').setView(coordinates, 12);

  L.tileLayer(`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${window.mapToken}`, {
    tileSize: 512,
    zoomOffset: -1,
    attribution: '&copy; OpenStreetMap contributors &copy; MapTiler'
  }).addTo(map);

  L.marker(coordinates)
    .addTo(map)
    .bindPopup("<h4>New York City</h4>");


/*map integrated by - Leaflet + MapTiler*/

// leaflet -an open-source JavaScript library
// for mobile-friendly interactive maps

/*
add Api keys in .env of MapTiler

step 1 = first we integrate leaflet css-link and js-link in head of biolerplatecode

step2- then in public/js/map.js - write - Maptiler code

in js, we directly cannot access a .env environmental codes
so in ejs -> script(env val save in any jsvariable (show.ejs-starting)) -> then access that js variable in public/js(ex-mapToken)

then put script of this file where we want to show map  in a div by id= map(applying styling in style.css)

show.ejs in last

*/

/*ejs trick not worked 

so we stored in window object where now , every script can access its object(ex window.maptokem)
*/