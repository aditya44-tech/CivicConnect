const fs = require("fs");
const https = require("https");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const keywords = [
  "pothole,road",
  "streetlight,dark",
  "graffiti,playground",
  "construction,night",
  "garbage,overflowing",
  "water,leak,pipe",
  "crosswalk,broken",
  "cracked,asphalt",
  "abandoned,van",
  "cracked,kerb",
  "flooded,street",
  "broken,park,bench",
  "rubble,dump,waste",
  "faded,road,markings"
];

function fetchUrl(target, dest) {
  return new Promise((resolve, reject) => {
    const client = target.startsWith("https") ? https : http;
    client.get(target, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        const redirectUrl = new URL(response.headers.location, target).toString();
        resolve(fetchUrl(redirectUrl, dest));
      } else {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
        file.on("error", (err) => reject(err));
      }
    }).on("error", (err) => reject(err));
  });
}

async function download() {
  for (let i = 0; i < keywords.length; i++) {
    const kw = keywords[i];
    const num = i + 1;
    const dest = path.join(__dirname, "public", "images", `c${num}.jpg`);
    const url = `https://loremflickr.com/800/500/${kw}?lock=1`;
    
    console.log(`Downloading c${num}.jpg...`);
    await fetchUrl(url, dest);
  }
  console.log("All done.");
}

download();
