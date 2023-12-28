const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const axios = require('axios');

const options =async () => {
    const options = {
  method: 'GET',
  url: 'https://open-weather13.p.rapidapi.com/city/landon',
  headers: {
    'X-RapidAPI-Key': '5f42956c95mshfd32c2e0af06c1fp16dd0djsn3878a3c4d571',
    'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
};



module.exports = router;