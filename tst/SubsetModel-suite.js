(function() {

    var myApp = {};
    
    maria.Model.subclass(myApp, 'PersonModel', {
        constructor: function(age) {
            maria.Model.call(this);
            this._age = age;
        },
        properties: {
            _age: 0,
            getAge: function() {
                return this._age;
            },
            setAge: function(age) {
                this._age = age;
                this.dispatchEvent({type: 'change'});
            },
            isAdult: function() {
                return this._age >= 18;
            }
        }
    });

    maria.SubsetModel.subclass(myApp, 'AdultsModel', {
        properties: {
            predicate: function(personModel) {
                return personModel.isAdult();
            }
        }
    });

    var alpha, beta, gamma;

    buster.testCase('SubsetModel Suite', {

        "test trivial": function() {
            assert(true);
        },

        "setUp": function() {
            alpha = new myApp.PersonModel(20);
            beta = new myApp.PersonModel(17);
            gamma = new myApp.PersonModel(10);
            delta = new myApp.PersonModel(60);
        },

        "test creating a subset from an existing set adds correct element to subset": function() {
            var people = new maria.SetModel(alpha, beta);
            var adults = new myApp.AdultsModel(people);
            assert.same(true, people.has(alpha));
            assert.same(true, people.has(beta));
            assert.same(true, adults.has(alpha));
            assert.same(false, adults.has(beta));
        },

        "test adding elements to set adds correct elements to subset": function() {
            var people = new maria.SetModel();
            var adults = new myApp.AdultsModel(people);
            people.add(alpha);
            people.add(beta);
            assert.same(true, people.has(alpha));
            assert.same(true, people.has(beta));
            assert.same(true, adults.has(alpha));
            assert.same(false, adults.has(beta));
        },

        "test deleting elements from set deletes them from subset": function() {
            var people = new maria.SetModel();
            var adults = new myApp.AdultsModel(people);
            people.add(alpha);
            assert.same(true, adults.has(alpha));
            people['delete'](alpha);
            assert.same(false, adults.has(alpha));
        },
        
        "test length of subset only counts elements in subset": function() {
            var people = new maria.SetModel(alpha, beta);
            var adults = new myApp.AdultsModel(people);
            assert.same(2, people.length);
            assert.same(1, adults.length);
        },
        
        "test changing an element in set so it belongs in subset does add it to the subset": function() {
            var people = new maria.SetModel();
            var adults = new myApp.AdultsModel(people);
            people.add(beta);
            assert.same(false, adults.has(beta));
            beta.setAge(18);
            assert.same(true, adults.has(beta));
            beta.setAge(17);
            assert.same(false, adults.has(beta));
        },
        
        "test forEach only iterates over elements in the subset": function() {
            var people = new maria.SetModel();
            var adults = new myApp.AdultsModel(people);
            people.add(alpha);
            people.add(beta);
            people.add(gamma);
            people.add(delta);
            var count = 0;
            adults.forEach(function() {
                count++;
            });
            assert.same(2, count);
        },

        "test events bubble through subset": function() {
            var people = new maria.SetModel();
            var adults = new myApp.AdultsModel(people);
            var groups = new maria.SetModel(adults);
            var bubbled = false;
            maria.addEventListener(groups, 'change', function() {
                bubbled = true;
            });

            bubbled = false;
            assert.same(false, bubbled);
            people.add(alpha);
            assert.same(true, bubbled);

            bubbled = false;
            assert.same(false, bubbled);
            alpha.setAge(23);
            assert.same(true, bubbled);
        }

    });

}());
