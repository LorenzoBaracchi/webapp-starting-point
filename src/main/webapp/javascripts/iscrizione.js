var Subscription = (function (module, window) {
    var config = {
        mail: 'fittiziasrl@gmail.com',
        serviceAddress: 'http://mioserviceaddress.blablabla.com'
    };

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
                    .done(this._registerCompleted.bind(this))
                    .fail(this._registerFailed.bind(this));
            };
        }
        this._registerCompleted = function (result) {
            sendMail(this.name(), this.surname(), this.email(), this.course());
            alert('OK');
        },
        this._registerFailed = function (error) {
            alert('Nope')
        }
    }

    module.App = function () {
        this.init = function (course) {
            var config = {
                courseName: course
            }
            ko.applyBindings(new ViewModel(config), $('#iscrizione')[0]);
        }
    }

    return module;
})(Subscription || {}, this);
