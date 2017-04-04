var did_modal_pop = false;
var powerEmail = "";

(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '#emailInput', function(event) {
            var emailAddress = $("#emailInput").val();
            var message = '';
            var checker = fn(emailAddress);
            if (checker) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!'
                event.target.setCustomValidity(message);
            }
        });
    };
    FormHandler.prototype.addDecafHandler = function(fn) {
        this.$formElement.on('input', '#coffeeOrder, #strengthLevel', function(event) {
            var coffeePtr = $("#coffeeOrder");
            var coffee = $("#coffeeOrder").val();
            var strength = $("#strengthLevel").val();
            var message = '';
            var checker = fn(coffee, strength);
            if (checker === false) {
                message = '';
                coffeePtr.get(0).setCustomValidity('');
                return;
            }
            message = 'That is not a decaf caffeine level.';
            coffeePtr.get(0).setCustomValidity(message);
            return;

        });
    };

    FormHandler.prototype.addExistingEmailHandler = function(fn) {
        this.$formElement.on('input', '#emailInput', function(event) {
              var email = $("#emailInput");
              var emailVal = email.val();
              var message = '';
              if (fn(emailVal) === true)
              {
                message = 'The email already exists';
                email.get(0).setCustomValidity(message);
                return;
              }
              message = '';
              email.get(0).setCustomValidity(message);
              return;
        });
    };

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var strength = $("#strengthLevel").val();
            var flavor = $("#flavorshot").find(":selected").val();
            var size = $("input[name=size]:checked").val();
            if (strength > 66 && flavor != '' && size === 'bfc' && did_modal_pop === false) {
                //HANDLE MODAL
                console.log('Modal should be showing now');
                did_modal_pop = true;
                $("#myModal").modal('show');
            } else {
                var data = {};
                $(this).serializeArray().forEach(function(item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data).then(function() {this.reset();
                this.elements[0].focus();}.bind(this));
                did_modal_pop = false;
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);

$("#strengthLevel").change(function(event) {
    var label = document.getElementById("['range-label']");
    $("#range-label").empty();
    $("#range-label").append('Caffeine Rating: ' + this.value);
    if (this.value <= 33) {
        $("#range-label").css("color", "green");
    } else if (this.value > 33 && this.value <= 66) {
        $("#range-label").css("color", "yellow");
    } else {
        $("#range-label").css("color", "red");
    }
})

$("#claim-bonus").on("click", function() {
    $("#myModal").modal('hide');
    $("#powerBar").show();
})

$("#no-bonus").on("click", function() {
    $("#myModal").modal('hide');
})
