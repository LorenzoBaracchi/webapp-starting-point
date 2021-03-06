function AjaxClient(address, headers) {
    this._address = address;
    this._calls = [];
};
AjaxClient.prototype = {
    abort: function () {
        for (var i = 0; i < this._calls.length; ++i) {
            if (this._calls[i].readystate !== 4) {
                this._calls[i].abort();
            }
        };
        this._calls = [];
    },
    __performCall: function (callOpts) {
        var def = $.ajax(callOpts),
            self = this;
        this._calls.push(def);
        return def.always(function (result) {
            self._calls.remove(def);
            return result;
        });
    },
    __callMethod: function (methodName, parameters, type) {
        var method = null,
            address = this._address,
            self = this;
        if (address[address.length - 1] == '/') {
            method = address + methodName;
        } else {
            method = address + '/' + methodName;
        }
        return this.__performCall({
            url: method,
            type: type,
            data: parameters
        });
    },
    _callODataQuery: function (methodName, query) {
        var method = null,
            address = this._address,
            self = this;
        if (address[address.length - 1] == '/') { method = address + methodName; }
        else { method = address + '/' + methodName; }

        if (query) { method = method + '?' + query; }
        return this.__performCall({ url: method, dataType: "json", headers: self._headers });
    },

    _callGetMethod: function (methodName, parameters) {
        return this.__callMethod(methodName, parameters, 'GET');
    },
    _callPostMethod: function (methodName, parameters) {
        return this.__callMethod(methodName, parameters, 'POST');
    }
};

function UserClient(address, headers) {
    this.client = new AjaxClient(address, headers);
    
    function createAttendant(serverModel){
    	if(serverModel.cognome && serverModel.cognome !== 'null') {
    		return {
    			name: serverModel.nome,
    			surname: serverModel.cognome,
    			email: serverModel.email,
    			type: 'private'
            }
    	} else {
    		return {
    			name: serverModel.nome,
    			attendantsNumber: serverModel.numeroPartecipanti,
    			workaroundArray: (function(){
    				var arr = [];
    				for(i = 0; i < serverModel.numeroPartecipanti; ++i){
    					arr.push(i + 1);
    				}
    				return arr;
    			})(),
    			email: serverModel.email,
    			type: 'company'
    		}
    	}
    	
    }
    
    this.sendPrivateSubscription = function (course, privateAttendant) {
        return this.client._callPostMethod('api/attendands', {
        	idCorso: course,
            nome: privateAttendant.name(),
            cognome: privateAttendant.surname(),
            email: privateAttendant.email()
        });
    }
    this.sendCompanySubscription = function(course, companyAttendant) {
    	return this.client._callPostMethod('api/attendands', {
        	idCorso: course,
            nome: companyAttendant.name(),
            email: companyAttendant.email(),
            numeroPartecipanti: companyAttendant.attendandsNumber()
        });
    }
    this.getUsers = function (course) {
        return this.client._callGetMethod('api/attendands', null)
        .then(function (result) {
            var res = [];
            result = JSON.parse(result);
            for (var i = 0; i < result.length; i++) {
                if (result[i].idCorso === course) {
                    res.push(createAttendant(result[i]));
                }
            }
            return res;
        })
    }
    this.changeCourse = function(companyName, idCourseFrom, idCourseTo, numberOfAttendants){
    	return this.client._callPostMethod('api/attendands', {
        	nome: companyName,
            idCorsoDa: idCourseFrom,
            idCorsoA: idCourseTo,
            numeroPartecipanti: numberOfAttendants,
            method: 'move'
        });
    }
 
}

function CourseClient(address, headers) {
    var courses = [
        {
            id: 'id0',
            name: 'ScuolaXP',
            briefDescription: 'XP School - 5 giorni per diventare un team di agile developers',
            longDescription: 'Un buon team di sviluppo \xE8 come una band: combina le abilit\xE0 del singolo con le dinamiche di gruppo per realizzare insieme, ogni giorno, qualcosa di speciale. Un buon team di sviluppo pu\xF2 essere incredibilmente performante: risolvendo problemi complessi, costruendo software a prova di bomba o trovando soluzioni alternative che permettono di arrivare allo stesso obiettivo, con un percorso pi\xF9 agevole. Un eXtreme Programming team, ottiene questi risultati creando un contesto favorevole alla collaborazione, costruendo la fiducia reciproca grazie alla condivisione di principi, metodi e pratiche di buona programmazione, quali pair programming, test-driven development, continuous integration e non solo.',
            img: 'images/scuolaxp.png',
            date: {
                from: '9 Marzo 2015',
                to: '13 Marzo 2015'
            },
            detailsUrl: 'scuolaxp.html',
            location: 'Giussago',
            price: '300.00',
            teachers: ['Nome Cognome', 'Nome2 Cognome2'],
            achivments: ['Obiettivo1', 'Obiettivo2', 'Obiettivo3', 'Obiettivo4'],
            arguments: [{
                title: 'Argomento 1',
                description: "breve descrizione dell'argomento 1"
            }]
        },
        {
            id: 'id1',
            name: 'Organizzazione Sommosse',
            briefDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            longDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, odit velit cumque vero doloremque repellendus distinctio maiores rem expedita a nam vitae modi quidem similique ducimus! Velit, esse totam tempore.',
            img: 'images/sommossa.jpg',
            date: {
                from: '15 Maggio 2015',
                to: ' Da Decidere '
            },
            detailsUrl: 'sommosse.html',
            location: 'Luogo da decidere',
            price: '150.00',
            teachers: ['Brando'],
            achivments: ['Obiettivo1', 'Obiettivo2', 'Obiettivo3', 'Obiettivo4'],
            arguments: [{
                title: 'Argomento 1',
                description: "breve descrizione dell'argomento 1"
            }]
        },
        {
            id: 'id2',
            name: 'Tortelloni e Cappelletti',
            briefDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            longDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, odit velit cumque vero doloremque repellendus distinctio maiores rem expedita a nam vitae modi quidem similique ducimus! Velit, esse totam tempore.',
            img: 'images/cappelletti.jpg',
            date: {
                from: '20 Giugno 2015',
                to: ' Da Decidere '
            },
            detailsUrl: 'lasagna.html',
            location: 'Luogo da decidere',
            price: '150.00',
            teachers: ['La Signora Maria'],
            achivments: ['Obiettivo1', 'Obiettivo2', 'Obiettivo3', 'Obiettivo4'],
            arguments: [{
                title: 'Argomento 1',
                description: "breve descrizione dell'argomento 1"
            }]
        },
        {
            id: 'id3',
            name: 'Lasagne',
            briefDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            longDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, odit velit cumque vero doloremque repellendus distinctio maiores rem expedita a nam vitae modi quidem similique ducimus! Velit, esse totam tempore.',
            img: 'images/lasagne.jpg',
            date: {
                from: '20 Giugno 2015',
                to: ' Da Decidere '
            },
            detailsUrl: 'tortelloni.html',
            location: 'Luogo da decidere',
            price: '150.00',
            teachers: ['La Signora Maria'],
            achivments: ['Obiettivo1', 'Obiettivo2', 'Obiettivo3', 'Obiettivo4'],
            arguments: [{
                title: 'Argomento 1',
                description: "breve descrizione dell'argomento 1"
            }]
        }
    ];

    this.client = new AjaxClient(address, headers);

    this.getAll = function () {
        return {
            done: function (callback) {
                callback(courses);
                return this;
            },
            fail: function (callback) {
                //callback('Error');
                return this;
            }
        }
    }
    this.getFavourites = function () {
        return {
            done: function (callback) {
                callback(courses.slice(0, 3));
                return this;
            },
            fail: function (callback) {
                //callback('Error');
                return this
            }
        }
    }
    this.getById = function (courseId) {
        return {
            done: function (callback) {
                for (var i = 0; i < courses.length; i++) {
                    if (courses[i].id === courseId) {
                        callback(courses[i]);
                        return this;
                    }
                }
                callback(null);
                return this;
            },
            fail: function (callback) {
                return this;
            }
        };
        
    }
}
