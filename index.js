// Dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const PORT = 8000;
const newPort = 5000;
const URL = "https://www.careers24.com/jobs/kw-web-developer/rmt-incl/";

// Initialize Express
const app = express();

// Call Data
axios(URL)
  // Handle response
  .then((res) => {
    const html = res.data;
    // Format HTML in Cheerio wrapper for JQuery syntax
    const $ = cheerio.load(html);

    // Create initial data to send back
    let articles = [];

    // find all elements with a class of job-card
    $(".job-card", html).each(function () {
      // Get title and url from each job-card
      const link = $(this).find("a").attr("href");
      const title = $(this).find("h2").text();
      // Add data to variable to push
      articles.push({
        title,
        link,
      });
    });
    // View data in console
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
