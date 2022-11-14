const RequestPromise = require("request-promise"),
  Cheerio = require("cheerio");

const getProspleData = async () => {
  const uri = "https://id.prosple.com/search-jobs?opportunity_types=2&locations=9714%2C9714%7C24768&defaults_applied=1&study_fields=502";

  let options = {
    uri,
    transform: function (body) {
      return Cheerio.load(body);
    },
  };

  const $ = await RequestPromise(options);
  let dataScraping = [];
  $("li[class='SearchResultsstyle__SearchResult-sc-c560t5-1 hlOmzw']").each(function (_i, _elem) {
    let data = {
      position: $(this).find("a[class='JobTeaserstyle__JobTeaserTitleLink-sc-1p2iccb-2 eiICbF']").text().trim(),
      description: $(this).find("div[data-testid='raw-html']").text().trim(),
      company: $(this).find("header[class='Teaser__TeaserHeader-sc-129e2mv-1 JobTeaserstyle__JobTeaserHeader-sc-1p2iccb-1 iBnwQU bycdHT']").text().trim(),
      image: $(this).find("img[src]").attr("src"),
      location: $(this).find("div[class='sc-gsTCUz JobTeaserstyle__JobLocation-sc-1p2iccb-8 hAURsc jOLgFK']").text().trim(),
      link: $(this).find("a[href]").attr("href"),
    };
    dataScraping.push(data);
  });
  return dataScraping;
};

module.exports = {
  getProspleData
};
