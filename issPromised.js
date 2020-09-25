const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  let data = JSON.parse(body);
  let lat = data.data.latitude;
  let lon = data.data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`);
}





  ;

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};




// const fetchCoordsByIP = function(ip, callback) {
//   request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
//       return;
//     }

//     const { latitude, longitude } = JSON.parse(body).data;
//     // console.log('lat/lng data:', { latitude, longitude });

//     callback(null, { latitude, longitude });
//   });
// };


// const fetchISSFlyOverTimes = function(coords, callback) {
//   const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

//   request(url, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
//       return;
//     }

//     const passes = JSON.parse(body).response;
//     callback(null, passes);
//   });
// };

// // Step 0b - Called from iss.js
// // const nextISSTimesForMyLocation = function(callback) {
// //   const fetchMyIP = request.get('https://api.ipify.org?format=json', function(err, response, body) {




// //   })
// //     .then((response) => JSON.parse(response).ip)
// //     .then(request.get(`https://ipvigilante.com/json/${ip}`, function(err, response, body) {




// //     })
// //       .then(request.get(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, function(err, response, body) {




// //       })
// //   });
// // };

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };