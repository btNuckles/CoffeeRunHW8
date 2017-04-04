(function (window) {
  'use strict';
  var App = window.App || {};

  var Validation = {
      isCompanyEmail: function (email) {
        return /.+@bignerdranch\.com$/.test(email);
      },

      isDecaf: function (order, slider) {
        var checker = new RegExp('decaf','g')
        if (slider > 20 && (checker.test(order) === true))
        {
          return true;
        }
          return false;
      },

      emailAlreadyExists: function(email) {
        var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
        var remoteDS = new App.RemoteDataStore(SERVER_URL);
        if (remoteDS.get(email, function() {}) !== undefined) {
          console.log("the email already exists");
          return;
        }
  }
};

  App.Validation = Validation;
  window.App = App;
})(window);
