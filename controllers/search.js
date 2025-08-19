// controllers/search.js
// Location-focused search with optional type filter
// - Navbar search: /search?location=Jaipur
// - Icon filters:  /search?type=beach (must match your enum values)

const Listing = require("../models/listing");

// Utility: escape user input for safe regex usage
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// GET /search
// Supports:
// - location substring match (case-insensitive)
// - type exact match (enum value)
// Either or both can be provided
module.exports.search = async (req, res, next) => {
  try {
    const location = (req.query.location || "").trim();
    const type = (req.query.type || "").trim();

    // Optional debug:
    // console.log("Search params:", { location, type });

    if (!location && !type) {
      return res.render("search/results.ejs", { q: "", type, results: [] });
    }

    const filters = {};
    if (location) {
      const safe = escapeRegex(location);
      filters.location = { $regex: safe, $options: "i" };
    }
    if (type) {
      filters.type = type;
    }

    const results = await Listing.find(filters).limit(100);
    // Pass q for display purposes on the page (shows the location query)
    res.render("search/results.ejs", { q: location, type, results });
  } catch (err) {
    next(err);
  }
};

// Optional: GET /search/suggest?q=...
// Returns a small list of unique location suggestions by prefix
module.exports.suggest = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json([]);

    const safe = escapeRegex(q);
    const data = await Listing.find(
      { location: { $regex: "^" + safe, $options: "i" } },
      { location: 1 }
    ).limit(10);

    // Deduplicate locations (case-insensitive)
    const seen = new Set();
    const out = [];
    for (const d of data) {
      if (d.location && !seen.has(d.location.toLowerCase())) {
        seen.add(d.location.toLowerCase());
        out.push({ value: d.location });
      }
    }

    res.json(out);
  } catch (err) {
    next(err);
  }
};



//-----------------------
// // controllers/search.js
// // CHANGED/ADDED: Location-focused search with optional type filter

// const Listing = require("../models/listing");

// module.exports.search = async (req, res, next) => {
//   try {
//     // Prefer 'location' param from navbar; allow 'type' from icon filters
//     const location = (req.query.location || "").trim(); // ADDED
//     const type = (req.query.type || "").trim();         // ADDED

//     // Debug (optional): verify incoming params
//     // console.log("Search params:", { location, type }); // ADDED

//     if (!location && !type) {
//       // Nothing to filter: render empty results
//       return res.render("search/results.ejs", { q: "", type, results: [] }); // ADDED
//     }

//     const filters = {}; // ADDED
//     if (location) {
//       // Safe, case-insensitive substring match on location
//       const safe = location.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // ADDED
//       filters.location = { $regex: safe, $options: "i" };          // ADDED
//     }
//     if (type) {
//       filters.type = type; // ADDED
//     }

//     const results = await Listing.find(filters).limit(100); // ADDED
//     // Pass q as the location string for display in the results page
//     res.render("search/results.ejs", { q: location, type, results }); // ADDED
//   } catch (err) {
//     next(err);
//   }
// };

// // (Optional) Autocomplete suggestions by location prefix
// module.exports.suggest = async (req, res, next) => {
//   try {
//     const q = (req.query.q || "").trim();
//     if (!q) return res.json([]);

//     const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     const data = await Listing.find(
//       { location: { $regex: "^" + safe, $options: "i" } },
//       { location: 1 }
//     ).limit(10);

//     const seen = new Set();
//     const out = [];
//     for (const d of data) {
//       if (d.location && !seen.has(d.location.toLowerCase())) {
//         seen.add(d.location.toLowerCase());
//         out.push({ value: d.location });
//       }
//     }
//     res.json(out);
//   } catch (err) {
//     next(err);
//   }
// };
