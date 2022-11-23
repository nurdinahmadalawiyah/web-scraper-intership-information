const { nanoid } = require("nanoid");
const RequestPromise = require("request-promise");
const Cheerio = require("cheerio");

const getGlintsData = async () => {
  const uri = "https://glints.com/id/en/opportunities/jobs/explore?keyword=Informatika%2C+Programmer&country=ID&searchCity=29367&locationName=Bandung%2C+Indonesia&jobTypes=INTERNSHIP";

  let options = {
    uri,
    transform: function (body) {
      return Cheerio.load(body);
    },
  };

  const $ = await RequestPromise(options);
  
  let data = [];
  
  $(
    "div[class='JobCardsc__JobcardContainer-sc-1f9hdu8-0 hvpJwO CompactOpportunityCardsc__CompactJobCardWrapper-sc-1y4v110-0 dLzoMG compact_job_card']"
    ).each(function () {
    let glints = {
      id: nanoid(16),
      position: $(this).find("h2[class='CompactOpportunityCardsc__JobTitle-sc-1y4v110-7 cYZbCX']").text().trim(),
      company: $(this).find("a[class='CompactOpportunityCardsc__CompanyLink-sc-1y4v110-8 kCzMph']").text().trim(),
      image: $(this).find("img[src]").attr("src"),
      link: $(this).find("a[href]").attr("href"),
    };
    data.push(glints)
  });
  return {
    status: 'success',
      data,
  };
};

module.exports = {
  getGlintsData
};
