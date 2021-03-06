angular
    .module('MyApp', [
      'ngMaterial'
  ])
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */


    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  })
  .controller('LeftCtrl', function ($scope, $http, $timeout, $mdSidenav, $log) {
    
    //$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"}; //you probably don't need this line.  This lets me connect to my server on a different domain
    $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('iostest@netlink.com' + ':' + 'test1234');
    
      $scope.pie = function () {
          var urlLogin=encode_utf8("https://uat-analytics.thecarecloud.com/netlink/plugin/cda/api/doQuery?path=/public/UAT/Landing Page/Telecom Business Brain/Categories/Network Management/Network Insights.cda&dataAccessId=DonutChart&parampWeekEnd= '26-Apr-2015' &parampDate='All'&parampFlag='All'&parampDistrict='All'&parampCity='All'&parampHour='All'&parampBTS='All'&parampDonut='All'");
        /*  $http({method: 'GET', url: 'http://localhost:3001/get_data' }).
            success(function(data, status, headers, config) {
                $scope.pets = data;
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                alert(data);
                //Note: Here we have to route it to some dummy data.
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });*/
        
    var cat = [];
    var data = []
    $.get(urlLogin).done(function (e) {
        console.log(e);
        $mdSidenav('left').close();
        for(i = 0; i < e.resultset.length; ++i){
            cat.push(e.resultset[i][3]);
            data.push(e.resultset[i][0]);
        }
        line(cat, data);
    });
//    // Using XMLHttpRequest
//    var xhr = new XMLHttpRequest();
//    xhr.open("GET", urlLogin, true);
//    xhr.onload = function () {
//    //console.log(xhr.responseText);
//};
//      
      
//        .then(function () {
//          $log.debug("close pie is done");
//          //pie(data);
//          pie(xhr.responseText);
//          //console.log("result1",xhr.responseText);
//          console.log(xhr.responseText);
//          var d,cat,data;
//          d = xhr.responseText;
//          for(i = 0; i < d.resultset.length; ++i){
//	
//	cat.push(d.resultset[i][3]);
//	data.push(d.resultset[i][0]);
//        console.log(cat);
//	
//};
//        });
    };
    
    $scope.line = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close line is done");
          line();
        });
    };
    /**   
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };**/
    })
    
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  })
  .controller('demoSwipeCtrl', function($scope) {
    $scope.onSwipeLeft = function(ev) {
      alert('You swiped left!!');
    };
  });
  
  window.shouldRotateToOrientation = function(degrees) {
 return true;
};

function encode_utf8(s) { 

 return unescape(encodeURIComponent(s)); 

};





// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  var url = urlLogin;

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}