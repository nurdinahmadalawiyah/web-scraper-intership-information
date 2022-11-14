const request = require("request"),
ScrapingHandler = require('./scrapingHandler')

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Homepage";
    },
  },
  {
    method: "GET",
    path: "/prosple",
    handler: (request, h) => (
        ScrapingHandler.getProspleData()
    ),
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      return "Halaman tidak ditemukan";
    },
  },
];

module.exports = routes;
