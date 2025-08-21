const { type } = require("express/lib/response");

const sampleListings = [
{
title: "Palolem Beach Hut",
description: "Simple wooden hut steps from Palolem’s crescent bay with palm shade and a sandy sit-out.",
image: {
filename: "listingimage",
url: "https://www.global-gallivanting.com/wp-content/uploads/2019/01/art-prive-palolem-boat-deck.jpg",
},
price: 2200,
location: "Palolem, Goa",
country: "India",
type: "beach",
},
{
title: "Alleppey Backwater Houseboat",
description: "Traditional kettuvallam with sundeck cruising through coconut-lined Kerala backwaters.",
image: {
filename: "listingimage",
url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/f3/1b/4a/alleppey-backwater-cruise.jpg?w=1200&h=-1&s=1",
},
price: 4800,
location: "Alappuzha, Kerala",
country: "India",
type: "lake",
},
{
title: "Himalayan A‑Frame Cabin",
description: "Glass-fronted A-frame with cedar interiors facing snow peaks and starry skies.",
image: {
filename: "listingimage",
url: "https://curlytales.com/wp-content/uploads/2025/01/dhajji-house.jpg",
},
price: 3500,
location: "Manali, Himachal Pradesh",
country: "India",
type: "mountain",
},

{
title: "Jaisalmer Haveli Suite",
description: "Hand-carved sandstone suite in a restored haveli with jharokha windows and courtyard.",
image: {
filename: "listingimage",
url: "https://www.havelidharampura.com/assets/images/stay-at-haveli.webp",
},
price: 5200,
location: "Jaisalmer, Rajasthan",
country: "India",
type: "city",
},
{
title: "Indo‑Portuguese Villa with Pool",
description: "Pastel villa with balcao seating, patterned tiles, and a private plunge pool near beaches.",
image: {
filename: "listingimage",
url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-801205632042901220/original/288367a0-e0d9-4346-9359-ed0b395ca587.jpeg?im_w=720",
},
price: 6200,
location: "Assagao, Goa",
country: "India",
type: "Villa",
},
{
title: "Munnar Tea Estate Bungalow",
description: "Planter’s bungalow amidst rolling tea gardens with misty sunrise walks.",
image: {
filename: "listingimage",
url: "https://c.ndtvimg.com/2021-08/9v5l0n88_munnar_625x300_24_August_21.jpg",
},
price: 4100,
location: "Munnar, Kerala",
country: "India",
type: "camping",
},
{
title: "Lake Pichola View Studio",
description: "Sunny studio with shared terrace for sunset views over City Palace and Lake Pichola.",
image: {
filename: "listingimage",
url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/531243275.jpg?k=d5887a352d6481d70bd3e9e143c77b25be6375e7c33c48da69323ba54f3c654c&o=&hp=1",
},
price: 3000,
location: "Udaipur, Rajasthan",
country: "India",
type:"city",
},
{
title: "Dal Lake Houseboat Suite",
description: "Walnut-wood Kashmiri houseboat with ornate interiors and private shikara access.",
image: {
filename: "listingimage",
url: "https://wanderon-images.gumlet.io/blogs/new/2023/11/gondola-ride-in-autumn-in-kashmir-2023-11-03t164430.753-min.png",
},
price: 5400,
location: "Srinagar, Jammu & Kashmir",
country: "India",
type:"lake",
},
{
title: "Gokarna Cliffside Cottage",
description: "Sea-breeze cottage perched above a quiet cove with a short trail to the beach.",
image: {
filename: "listingimage",
url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/ef/41/93/zostel-gokarna.jpg?w=1200&h=-1&s=1",
},
price: 2600,
location: "Gokarna, Karnataka",
country: "India",
type:"beach",
},
{
title: "Kutch Bhunga Hut",
description: "Traditional mud bhunga with mirror-work details near the White Rann.",
image: {
filename: "listingimage",
url: "https://saachivillagio.com/wp-content/uploads/2022/03/Kutch_Bhunga_Standard_1.jpg",
},
price: 2400,
location: "Dhordo, Kutch",
country: "India",
type:"temple",
},
{
title: "Wayanad Bamboo Treehouse",
description: "Handcrafted bamboo treehouse nestled in rainforest canopy with a private deck.",
image: {
filename: "listingimage",
url: "https://3.imimg.com/data3/BQ/NV/MY-10533785/bamboo-tree-house.jpg",
},
price: 3200,
location: "Wayanad, Kerala",
country: "India",
type:"camping",
},
{
title: "Luxury Desert Tent",
description: "Ensuite tented suite with dune-view sit-out and starlit dinners in the Thar Desert.",
image: {
filename: "listingimage",
url: "https://media-cdn.tripadvisor.com/media/photo-s/17/4c/95/3a/exotic-luxury-camps.jpg",
},
price: 3600,
location: "Sam Sand Dunes, Jaisalmer",
country: "India",
type:"beach",
},
{
title: "Mukteshwar Stone Cottage",
description: "Cozy deodar-beamed stone cottage with terrace panorama of Himalayan peaks.",
image: {
filename: "listingimage",
url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/642179898.jpg?k=bc21c204e6bf4abdeb79ea1b2d7d53638dc2cf6742be8aef4d759a671ada5aa1&o=&hp=1",
},
price: 2800,
location: "Mukteshwar, Uttarakhand",
country: "India",
type:"mountain",
},
{
title: "Marine Drive Deco Studio",
description: "Industrial-chic studio near Chowpatty and the Art Deco oceanfront.",
image: {
filename: "listingimage",
url: "https://assets.architecturaldigest.in/photos/600822f8111eef0df0a1c613/4:3/w_1024,h_768,c_limit/interior-design-this-apartment-in-mumbai-offers-a-stunning-view-of-marine-drive11-1366x768.jpg",
},
price: 5200,
location: "Mumbai, Maharashtra",
country: "India",
type:"city"
},
{
title: "Puducherry French Townhouse",
description: "Colonial townhouse with pastel façade and wrought-iron balcony in White Town lanes.",
image: {
filename: "listingimage",
url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
},
price: 2600,
location: "Puducherry",
country: "India",
type:"city"
},
{
title: "Coorg Coffee Estate Homestay",
description: "Red-tiled estate home among Arabica plantations with bonfire nights.",
image: {
filename: "listingimage",
url: "https://a0.muscache.com/pictures/d302bc93-e553-4cfb-acbd-22f6e3cbc918.jpg",
},
price: 2300,
location: "Coorg, Karnataka",
country: "India",
type:"camping"
},
{
title: "Bengaluru Skyline Apartment",
description: "High-floor city apartment with skyline views near breweries and tech parks.",
image: {
filename: "listingimage",
url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b6/2b/apartment-hotels.jpg?w=1200&h=-1&s=1",
},
price: 3400,
location: "Bengaluru, Karnataka",
country: "India",
type:"city"
},
{
title: "Candolim Modern Pool Villa",
description: "Contemporary villa with courtyard pool and palm-fringed garden near the beach.",
image: {
filename: "listingimage",
url: "https://q-xx.bstatic.com/xdata/images/hotel/max500/326426643.jpg?k=f8e5ec5aa422ad73808f12a6eade388bd987fa393373eae90fd8009e958cfc3a&o=",
},
price: 9000,
location: "Candolim, Goa",
country: "India",
type:"Villa"
},
{
title: "Kasol Riverside A‑Frame",
description: "A‑frame cabin with floor-to-ceiling glass and a loft bedroom by the Beas River.",
image: {
filename: "listingimage",
url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202109181601421004-489a4a36186911ecbbd30a58a9feac02.jpg",
},
price: 3100,
location: "Kasol, Himachal Pradesh",
country: "India",
type:"mountain"
},
{
title: "Mahabaleshwar Glass Cottage",
description: "Glass-walled hill cottage with lush valley views and monsoon cloudscapes.",
image: {
filename: "listingimage",
url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/606841931.jpg?k=4dd3e71c8458993421804aa0254d85931c95e00bd375b940b6e9f3e125dbb7b6&o=&hp=1",
},
price: 2900,
location: "Mahabaleshwar, Maharashtra",
country: "India",
type:"mountain"
},
{
title: "Pushkar Aravali Stone Villa",
description: "Minimalist stone villa with plunge pool and rocky outcrop vistas.",
image: {
filename: "listingimage",
url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFNH8W82D4NLitiCVbxWEDi54F6ZXZ_wmag&s",
},
price: 7000,
location: "Pushkar, Rajasthan",
country: "India",
type:"Villa"
},
{
title: "Vagator Boho Beach Cottage",
description: "Bohemian cottage with hammocks a short stroll to the cove and cafés.",
image: {
filename: "listingimage",
url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/434757197.jpg?k=703c950ba47b72743530b71b6eb158fd0a1952fc4c65632ed5a32522138d3a40&o=&hp=1",
},
price: 3300,
location: "Vagator, Goa",
country: "India",
type:"beach"
},
{
title: "Varanasi Ghat Heritage Room",
description: "Riverside room with balcony to watch sunrise aarti and evening boats.",
image: {
filename: "listingimage",
url: "https://assets.architecturaldigest.in/photos/600823ad56e01e341bc35522/16:9/w_2560%2Cc_limit/Brijrama-Palace-Varanasi-featured-1366x768.jpg",
},
price: 2500,
location: "Varanasi, Uttar Pradesh",
country: "India",
type:"temple"
},
{
title: "Bir Hillside Homestay",
description: "Wood-and-stone homestay on terraced slopes with home-cooked pahadi meals.",
image: {
filename: "listingimage",
url: "https://a0.muscache.com/im/pictures/miso/Hosting-898859211387605512/original/f1f54de3-7eb6-4e01-ad1b-e8707673b81e.jpeg",
},
price: 2200,
location: "Bir Billing, Himachal Pradesh",
country: "India",
type:"mountain"
},
{
title: "Colaba Heritage Studio",
description: "Sunlit studio in a restored 1930s block, walkable to museums and harbor.",
image: {
filename: "listingimage",
url: "https://www.indiadesignworld.com/wp-content/uploads/2025/06/2.-AC_Colaba_Living-room.jpg",
},
price: 3100,
location: "Colaba, Mumbai",
country: "India",
type:"city"
},
{
title: "Kasauli Pineview Glasshouse",
description: "Panoramic glasshouse facing pine valleys; cloud rivers from the bed.",
image: {
filename: "listingimage",
url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2IXwUAv2x2JFec2kszJgW_oEI98Uaul1tCg&s",
},
price: 3600,
location: "Kasauli, Himachal Pradesh",
country: "India",
type:"mountain"
},
{
title: "Jodhpur Blue City Rooftop",
description: "Rooftop suite overlooking Mehrangarh and cobalt-blue lanes.",
image: {
filename: "listingimage",
url: "https://thumbs.dreamstime.com/b/blue-city-mehrangarh-fort-rooftop-cafe-view-to-hill-cloudy-sky-jodhpur-rajasthan-india-54026096.jpg",
},
price: 2100,
location: "Jodhpur, Rajasthan",
country: "India",
type:"city"
},
{
title: "Cherrapunji Cloud Cabin",
description: "Wooden hill cabin near living root bridges with mist-laden mornings.",
image: {
filename: "listingimage",
url: "https://media-cdn.tripadvisor.com/media/photo-s/15/bb/3c/77/front-porch-with-ramp.jpg",
},
price: 2700,
location: "Sohra (Cherrapunji), Meghalaya",
country: "India",
type:"mountain"
},
{
title: "Hyderabad Terrace Garden Penthouse",
description: "Airy penthouse with wraparound terrace garden and sunset dining.",
image: {
filename: "listingimage",
url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjgzNDkyOTY%3D/original/bec139a5-7eb2-4704-a803-472f347c876e.jpeg?im_w=720",
},
price: 8200,
location: "Hyderabad, Telangana",
country: "India",
type:"city"
},
{
title: "Udaipur Aravali Infinity Villa",
description: "Boutique villa with infinity pool over rocky Aravali outcrops.",
image: {
filename: "listingimage",
url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2j1EUXOtWmLz1nF2eq9aZuqgO2qvboT7CBQ&s",
},
price: 9500,
location: "Udaipur Outskirts, Rajasthan",
country: "India",
type:"Villa"
},
];

module.exports = { data: sampleListings };



