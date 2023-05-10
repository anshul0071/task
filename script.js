const prompt = require("prompt-sync")({ sigint: true, autocomplete: '' });
var destination = prompt("Enter destination");

var source = prompt("Enter origin");
const airports = [
  { iata: 'DEL', city: 'New Delhi' },
  { iata: 'HYD', city: 'Hyderabad' },
  { iata: 'BOM', city: 'Mumbai' },
  { iata: 'BLR', city: 'Bengaluru' },
  { iata: 'MAA', city: 'Chennai' },

  { iata: 'CCU', city: 'Kolkata' },
  { iata: 'COK', city: 'Kochi' },
  { iata: 'IXC', city: 'Chandigarh' },
  { iata: 'GOI', city: 'Goa' },
  { iata: 'JAI', city: 'Jaipur' },
  { iata: 'LKO', city: 'Lucknow' }
  // add more airports here...
];
const filteredDest = airports.filter((a) => {
  if (destination === a.city)
    return (a.iata)
})
var dest = filteredDest[0]?.iata

const filteredSource = airports.filter((a) => {
  if (source === a.city)
    return (a.iata)
})
var origin = filteredSource[0]?.iata

async function getData() {
  const url = `https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?origin=${origin}&page=None&currency=INR&destination=${dest}`;
  const options = {
    method: "GET",
    headers: {
      "X-Access-Token": "9aadc41fb7e034816063ddc1cae4fd4b",
      "X-RapidAPI-Key":
        "04fb310e0cmshd02034144da9f42p164e6bjsn19847a33f4e2",
      "X-RapidAPI-Host":
        "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
    },
  };

  var response = await fetch(url, options);
  const result = await response.json();
  const prices = result?.data[`${dest}`];
  const price1 = prices[0]?.price;
  const code1 = prices[0]?.airline;
  const price2 = prices[1]?.price;
  const code2 = prices[1]?.airline;


  const url1 =
    "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/data/en-GB/airlines.json";
  const options1 = {
    method: "GET",
    headers: {
      "X-Access-Token": "9aadc41fb7e034816063ddc1cae4fd4b",
      "X-RapidAPI-Key":
        "04fb310e0cmshd02034144da9f42p164e6bjsn19847a33f4e2",
      "X-RapidAPI-Host":
        "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
    },
  };

  var response = await fetch(url1, options1);
  var arr = await response.json();
  const fil = arr.filter((item) => {
    if (item.code === code1) return item.name_translations.en;
    else null;
  });
  fName1 = fil[0]?.name_translations.en;



  const fill = arr.filter((item) => {
    if (item.code === code2) return item.name_translations.en;
    else null;
  });
  fName2 = fill[0]?.name_translations.en;


  fetch("http://localhost:3006/employees", {
    method: "POST",
    body: JSON.stringify({
      [fil[0]?.name_translations.en]: `${"₹" + price1}`,
      [fill[0]?.name_translations.en]: `${"₹" + price2}`   
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())

}
getData();
console.log("Fetched Succesfully ,Check the server running on,http://localhost:3006/employees")