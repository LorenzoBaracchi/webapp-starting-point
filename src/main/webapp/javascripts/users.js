var Users = (function (module, window) {
    var config = {
        mail: 'fittiziasrl@gmail.com',
        serviceAddress: 'http://localhost:8080'
    };

    var ViewModel = function (course) {
        var client = new UserClient(config.serviceAddress),
            self = this;;
        this.users = ko.observable([]);
        this._getUsersCompleted = function (result) {
            self.users(result);
        },
        this._getUsersFail = function (error) {
            alert('Errore');
            return;
        }
        client.getUsers(course)
            .done(this._getUsersCompleted)
            .fail(this._getUsersFail);

        
    }
    module.ViewModel = ViewModel;
    return module;
})(Users || {}, this);