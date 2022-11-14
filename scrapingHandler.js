const RequestPromise = require("request-promise"),
  Cheerio = require("cheerio");

const getProspleData = async () => {
  const uri = "https://id.prosple.com/lowongan-magang-it";

  let options = {
    uri,
    transform: function (body) {
      return Cheerio.load(body);
    },
  };

  const $ = await RequestPromise(options);
  let dataScraping = [];
  $(
    "div[class='sc-iqHYGH Teaserstyle__Teaser-sc-egwky8-0 OpportunityTeaserstyle__OpportunityListing-sc-1vbfrdq-1 cTmJbI jYRkSI bIguzg']"
  ).each(function (i, elem) {
    let data = {
      position: $(this).find("h6[class='OpportunityTeaserstyle__OpportunityTitle-sc-1vbfrdq-0 iOBUUH']").text().trim(),
      description: $(this).find("div[data-testid='raw-html']").text().trim(),
      company: $(this).find("div[class='teaser__region teaser__region--header']").text().trim(),
      image: $(this).find("img[src]").attr("src"),
      location: $(this).find("div[class='sc-gsTCUz hAURsc']").text().trim(),
      link: $(this).find("a[href]").attr("href"),
    };
    dataScraping.push(data);
  });
  return dataScraping;
};

module.exports = {
  getProspleData,
};
