(function(window) {
        'use strict';
        var App = window.App || {};

        function Truck(truckId, db) {
            this.truckId = truckId;
            this.db = db;
        }

        function consoleLog(string) {
            console.log(string)
            return string;
        }

        Truck.prototype.createOrder = function(order) {
            var log = consoleLog('Adding order for ' + order.emailAddress);
            return this.db.add(order.emailAddress, order);
        };

        Truck.prototype.deliverOrder = function(customerId) {
            var log = consoleLog('Delivering order for ' + customerId);
            return this.db.remove(customerId);
        };

        Truck.prototype.printOrders = function(printFn) {
            return this.db.getAll()
                .then(function(orders) {
                    var customerIdArray = Object.keys(orders);
                    console.log('Truck #' + this.truckId + ' has pending orders:');
                    customerIdArray.forEach(function(id) {
                        if (printFn) {
                            printFn(orders[id]);
                        }
                    }.bind(this));
                }.bind(this));
                return log;
        };
        App.Truck = Truck; window.App = App;

})(window);
