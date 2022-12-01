const ScrapeProspleHandler = require('./scrapeProspleHandler')
const ScrapeGlintsHandler = require('./scrapeGlintsHandler')

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
      ScrapeProspleHandler.getProspleData()
    ),
  },
  {
    method: "GET",
    path: "/glints",
    handler: (request, h) => (
      ScrapeGlintsHandler.getGlintsData()
    ),
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      ScrapeGlintsHandler.getGlintsData()
    },
  },
];

module.exports = routes;
