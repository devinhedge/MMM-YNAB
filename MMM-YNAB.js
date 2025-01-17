Module.register("MMM-YNAB", {
    defaults: {
        token: "",
        categories: [ "Household", "Pets", "Grocery", "Lunch", "Kids Clothes", "Restaurants", "Spontaneous Fun" ]
    },

    start: function () {
        this.sendSocketNotification('SET_CONFIG', this.config);
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.classList = ["xsmall"];
	console.log('Data length: ' + this.data.items.length);
        if (this.data.items && this.data.items.length > 0) {
	    for (let i of this.data.items) {
                wrapper.innerHTML = this.data.items.map(a => "<span class='ynab-name'>" + a.name + "</span><span class='ynab-balance'>$" + (a.balance/1000).toFixed(2) + "</span>").join('');
            }
        }
        return wrapper;
    },

    socketNotificationReceived: function (notification, payload) {
        console.log("notification: " + notification);
        console.log("payload: " + payload);
        if (notification == "UPDATE") {
            this.data = payload;
            this.updateDom(0);
        }
    },
    
    getStyles: function() {
        return [
            this.file('MMM-YNAB.css')
        ]
    }
});
