const mongoose = require("mongoose");

const environmental = [
    {
      location: "Tulkarm",
      temperature: 24,
      humidity: 87,
      waterQuality: 7,
    },
    {
      location: "Nablus",
      temperature: 23,
      humidity: 57,
      waterQuality: 7,
    },
    {
      location: "Ramallah",
      temperature: 18,
      humidity: 75,
      waterQuality: 7,
    },
    {
      location: "Hebron",
      temperature: 17,
      humidity: 73,
      waterQuality: 6.7,
    },
  ];
  

  
  const resources = [
    {
   
         title :"Silent Spring",
         publisher:"Rachel Carson",
         description :"This classic book is credited with helping to launch the modern enviro…"
    },
    {
      title :"Climate Reality Leadership Corps",
      publisher:"Mr. Al Gore",
      description :"Workshops offered by Climate Reality to teach participants about the challenges related to climate change."
    },
    
  ];
  
  
  
  module.exports = {
    environmental,
    resources
  };