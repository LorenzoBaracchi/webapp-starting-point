var Subscription = (function (module, window) {
    var config = {
        mail: 'fittiziasrl@gmail.com'
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
        this.name = ko.observable('');
        this.surname = ko.observable('');
        this.email = ko.observable('');
        this.course = ko.observable(config.courseName);

        this.isNameValid = ko.observable(true);
        this.isSurnameValid = ko.observable(true);
        this.isEMailValid = ko.observable(true);

        this.sendSubscription = function() {
            if(validate(this)){
                sendMail(this.name(), this.surname(), this.email(), this.course() );
            };
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

    function MyObj() {
        this.myMethod = function () { };
        this.myAttribute = 'attribute';
    }

    var obj = new MyObj();

    return module;
})(Subscription || {}, this);