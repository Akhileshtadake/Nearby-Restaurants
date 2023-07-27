
    // Function to get the user's location
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(nearbyRestaurants);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    
    
    // Function to display nearby restaurants on the map
    function nearbyRestaurants(position) {
        var userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 14
        });

        var service = new google.maps.places.PlacesService(map);
        var request = {
            location: userLocation,
            radius: 100000, // This is the radius in meters
            type: 'restaurant'
        };

        service.nearbySearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var restaurantList = document.getElementById('restaurant-list');

                // Limiting the number of restaurants getting displayed
                var maxResults = Math.min(results.length, 100000);

                for (var i = 0; i < maxResults; i++) {
                    var restaurant = results[i];
                    var name = restaurant.name;
                    var address = restaurant.vicinity;
                    var location = restaurant.geometry.location;

                    // Adding a marker for each restaurant
                    var marker = new google.maps.Marker({
                        map: map,
                        position: location,
                        title: name
                    });

                    var listItem = document.createElement('div');
                    listItem.innerHTML = '<strong>' + name + '</strong><br>' + address + '<br><br>';
                    restaurantList.appendChild(listItem);
                }
            }
        });

        
    }
    getUserLocation();

    // Function to save the user's location in local storage
    function saveLocationToLocalStorage(location) {
        var locations = JSON.parse(localStorage.getItem('locations')) || [];
        locations.unshift(location);
        if (locations.length > 10) {
            locations = locations.slice(0, 10);
        }
        localStorage.setItem('locations', JSON.stringify(locations));
      }
      
      // Function to display the user's location history
      function showLocationHistory() {
        var locationHistory = JSON.parse(localStorage.getItem('locations'));
        var locationHistoryDiv = document.getElementById('location-history');
        locationHistoryDiv.innerHTML = '';
  
        if (locationHistory) {
            for (var i = 0; i < locationHistory.length; i++) {
                var location = locationHistory[i];
                var listItem = document.createElement('div');
                listItem.innerHTML = 'Lat: ' + location.lat.toFixed(6) + ', Lng: ' + location.lng.toFixed(6) + '<br>';
                locationHistoryDiv.appendChild(listItem);
            }
        }
      }

      // Display the user's location history
      showLocationHistory();


      // this is the code for Displaying the User's Location
      /*const x = document.getElementById("demo");
      function getLocation() {
      if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
    }

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
                    "<br>Longitude: " + position.coords.longitude;
    }

    getLocation();*/
    
    

