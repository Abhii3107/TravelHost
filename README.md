# ✈️ TravelHost — Discover Unique Stays

## 🚀 Project Summary
TravelHost is an Airbnb-inspired platform where hosts can list their properties and users can explore and interact with these listings. Travelers can search and filter listings by location or category, view property details, and leave reviews to share their experiences. The platform ensures that only creators can edit or delete their own listings and reviews, providing a secure and intuitive user experience while fostering a vibrant community of hosts and explorers.

**Live Demo:** https://travelhost-yc0y.onrender.com/

![TravelHost Banner](./screenshots/banner.png)


## 📌 Key Features

**User Accounts**
- Signup, login, logout with secure session management.
- Passport.js for authentication; sessions stored in MongoDB.

**Listings**
 Only logged-in users can create, edit, or delete listings.
- View all listings without login.
- Categorized listings (beach, mountain, city, trending).
- Location-based search (case-insensitive)..

**Media & Maps**
- Image uploads via Cloudinary (URL + filename).
- Leaflet maps with markers and popups for each listing.
- Forward geocoding on create/update to store coordinates.

**Reviews & Ratings**
- Only logged-in users can post reviews.
- Users can post ratings .
- Only authors can delete their reviews.
- Reviews auto-delete when the listing is removed.


**UX Enhancements**
- Flash messages for feedback.
- Friendly error pages.
- Production-ready session management.

---

## 🛠️ Tech Stack & Architecture

- **Architecture:** MVC (Model-View-Controller) applied for clean, maintainable, and scalable code.
- **Backend:** Node.js, Express, Mongoose
- **Frontend:** EJS, EJS-Mate, Bootstrap/Custom CSS
- **Authentication:** Passport.js (local), connect-mongo
- **Database:** MongoDB Atlas
- **Image Storage:** Cloudinary
- **Maps & Geocoding:** Leaflet, MapTiler
- **Validation:** Joi


## 🖼️ Screenshots / Demo

### Home Page
![Home](./screenshots/home.png)

### Listing Page
![Listing](./screenshots/listing.png)

### Review & Map
![Reviews](./screenshots/review_map.png)

*(Add more screenshots or GIFs as needed)*

---

## 💻 Installation & Setup

1. Clone the repo:

git clone <repo-url>

2.Install dependencies:
npm install

3. Create a .env file:
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SECRET=your_session_secret
ATLASDB_URL=your_mongodb_atlas_url
MAPTILER_KEY=your_maptiler_key
NODE_ENV=development

4.Run locally:
node app.js

📂 Project Structure
.
├── app.js
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── middleware.js
├── utils/
└── init/  (DB seeding scripts)


## 🚀 Deployment
--Hosted on Render with MongoDB Atlas.
--Environment variables: ATLASDB_URL, CLOUD_*, SECRET, MAPTILER_KEY.
--Production-ready with secure session storage and external asset handling.




## 🎯 Future Enhancements

- **Owner Dashboard:** A dashboard for hosts to see who booked their listings, payment methods, and booking management.  
- **Booking System:** Integrate booking functionality with date selection, availability checks, and reservation tracking.  
- **Payment Integration:** Add secure online payment methods (Stripe/PayPal) for seamless transactions.  
- **Nearby & Map Filters:** Enable users to find listings near their location or within a selected area on the map.  
- **Favorites/Wishlist:** Allow users to save favorite listings for easy access later.  
- **Advanced Reviews:** Add photo reviews, ratings breakdown, and user profiles for reviews to improve trust and engagement.  



