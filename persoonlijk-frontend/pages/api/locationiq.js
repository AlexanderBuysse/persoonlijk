export default async (req, res) => {
    try {
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }; 
  
        const success = (pos)=> {
            let crd = pos.coords;
            let lat = crd.latitude.toString();
            let lng = crd.longitude.toString();
            let coordinates = [lat, lng];
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
            getCity(coordinates);
            return;
        }
  
        const error = (err)=> {
            console.log(`ERROR(${err.code}): ${err.message}`);
        }
  
        navigator.geolocation.getCurrentPosition(success, error, options);
  
        const getCity = (coordinates) => {
        let xhr = new XMLHttpRequest();
        let lat = coordinates[0];
        let lng = coordinates[1];
      
        // Paste your LocationIQ token below.
        xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.22f3c538b9020272ffb667ec3f30797b&lat=" +
        lat + "&lon=" + lng + "&format=json", true);
        xhr.send();
        xhr.onreadystatechange = x => {
        let result = x.target;
          if(result.readyState == 4 && result.status == 200){         
              let response = JSON.parse(xhr.responseText);
              let city = response.address.city;
              res.status(500).city= city;
          }
        }
        }
    } catch (e) {
      res.status(500).end(`Something went wrong: ${e}`);
    }
};
