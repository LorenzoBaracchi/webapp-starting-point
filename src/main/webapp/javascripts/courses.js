var Courses = (function (module, window) {
    function ViewModel() {
        this.courses = ko.observable([]);
        this.currentCourse = ko.observable({});

        this.subscribeCourse = function (course, user) {

        }
    }

    module.ViewModel = ViewModel;
    return module;
})(Courses || {}, this);