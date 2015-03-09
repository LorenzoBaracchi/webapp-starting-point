var Subscription = (function (module, window) {
    function sendMail(name, surname, sender, courseName) {
        var link = "mailto:" + config.mail
            + "?cc=" + sender
             + "&subject=" + escape("Iscrizione " + courseName)
             + "&body=" + escape('Il sottoscritto ' + name + ' ' + surname + " richiede l'iscrizione al corso: " + courseName);
        
        window.location.href = link;
    }
    
    function validate(viewModel){
        return true;
    };

    var ViewModel = function (config) {
        var client = new UserClient(config.serviceAddress);
        this.name = ko.observable('');
        this.surname = ko.observable('');
        this.email = ko.observable('');
        this.course = ko.observable(config.courseName);

        this.isNameValid = ko.observable(true);
        this.isSurnameValid = ko.observable(true);
        this.isEMailValid = ko.observable(true);

        this.sendSubscription = function() {
            if(validate(this)){
                client.registerUser(this.course(), this.name(), this.surname(), this.email())
                    .done(this._registerCompleted)
                    .fail(this._registerFailed);
            };
        }
        
        var self = this;
        this._registerCompleted = function (result) {
        	alert('OK');
            sendMail(self.name(), self.surname(), self.email(), self.course());
        },
        this._registerFailed = function (error) {
            alert('Errore')
        }
    }

    module.App = function (config) {
        this.config = config;
        this.init = function (course) {
            this.config.courseName = course;
            ko.applyBindings(new ViewModel(this.config), $('#iscrizione')[0]);
        }
    }

    return module;
})(Subscription || {}, this);
