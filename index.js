const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const PORT = 8000;
const URL = "https://www.careers24.com/jobs/kw-web-developer/rmt-incl/";

const app = express();

axios(URL)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    let articles = [];

    $(".job-card", html).each(function () {
      const link = $(this).find("a").attr("href");
      const title = $(this).find("h2").text();
      articles.push({
        title,
        link,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
