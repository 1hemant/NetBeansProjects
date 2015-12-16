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
    /*
    app.config([
    "$routeProvider",
    "$httpProvider",
    function($routeProvider, $httpProvider){
        $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
    }
])*/

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
    
    $http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"}; //you probably don't need this line.  This lets me connect to my server on a different domain
    $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('iostest@netlink.com' + ':' + 'test1234');
    
      $scope.pie = function () {
          //var urlLogin=encode_utf8("https://uat-analytics.thecarecloud.com/netlink/plugin/cda/api/doQuery?path=/public/UAT/Landing Page/Telecom Business Brain/Categories/Network Management/Network Insights.cda&dataAccessId=DonutChart&parampWeekEnd= '26-Apr-2015' &parampDate='All'&parampFlag='All'&parampDistrict='All'&parampCity='All'&parampHour='All'&parampBTS='All'&parampDonut='All'");
          $http({method: 'GET', url: 'http://localhost:3001/get_data' }).
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
            });
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close pie is done");
          pie(data);
        });
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

} 