var Subscription = (function (module, window) {
    function sendMail(email, name, surname, sender, courseName) {
        var link = "mailto:" + email
            + "?cc=" + sender
             + "&subject=" + escape("Iscrizione " + courseName)
             + "&body=" + escape('Il sottoscritto ' + name + ' ' + surname + " richiede l'iscrizione al corso: " + courseName);
        
        window.location.href = link;
    }
    
    function validate(viewModel){
        return true;
    };

    function PrivateAttendant(){
    	this.name = ko.observable('');
    	this.surname = ko.observable('');
    	this.email = ko.observable('');
    	
    	this.validate = function() {
    		return true;
    	}
    }
    function CompanyAttendant() {
    	this.name = ko.observable('');
    	this.attendandsNumber = ko.observable(1);
    	this.email = ko.observable('');
    	
    	this.validate = function(){
    		return true;
    	}
    }
    var ViewModel = function (config) {
    	this.config = config;
    	
    	this.privateAttendant = new PrivateAttendant();
    	this.companyAttendant = new CompanyAttendant();
        this.course = ko.observable(config.courseName);


        this.sendPrivateSubscription = function(){
        	var client = new UserClient(this.config.serviceAddress);
        	client.sendPrivateSubscription(this.course(), this.privateAttendant)
        		.done(this._registerPrivateAttendantCompleted)
        		.fail(this._registerPrivateAttendantFailed);
        }
        this.sendCompanySubscription = function(){
        	var client = new UserClient(this.config.serviceAddress);
        	client.sendCompanySubscription(this.course(), this.companyAttendant)
        		.done(this._registerCompanyAttendantCompleted)
        		.fail(this._registerCompanyAttendantFailed);
        }
        
        var self = this;
        this._registerPrivateAttendantCompleted = function (result) {
        	alert('OK - Private');
            sendMail(mailAddress, self.name(), self.surname(), self.email(), self.course());
        },
        this._registerPrivateAttendantFailed = function (error) {
            alert('Errore')
        }
        this._registerCompanyAttendantCompleted = function (result) {
        	alert('OK - Company');
            sendMail(mailAddress, self.name(), self.surname(), self.email(), self.course());
        },
        this._registerCompanyAttendantFailed = function (error) {
            alert('Errore')
        }
    }

    module.App = function (config) {
        this.config = config;
        this.init = function (course) {
            this.config.courseName = course;
            ko.applyBindings(new ViewModel(this.config), $('#private-subscription')[0]);
            ko.applyBindings(new ViewModel(this.config), $('#company-subscription')[0]);
        }
    }

    return module;
})(Subscription || {}, this);
