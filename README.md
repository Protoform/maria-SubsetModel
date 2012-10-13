Maria-SubsetModel
=================

A model class for use with Maria. The class has a SetModel interface.
A SubsetModel object wraps a SetModel object and filters the contents
to appear as a subset.


Examples
--------

```
var myApp = {};

maria.Model.subclass(myApp, 'PersonModel', {
    properties: {
        _age: 0,
        getAge: function() {
            return this._age;
        },
        setAge: function(age) {
            age = +age;
            if (this._age !== age) {
                this._age = age;
                this.dispatchEvent({type: 'change'});
            }
        },
        isAdult: function() {
            return this._age >= 18;
        }
    }
});

maria.SubsetModel.subclass(myapp, 'AdultsModel', {
    properties: {
        predicate: function(personModel) {
            return personModel.isDone();
        }
    }
});

var alpha = new myApp.PersonModel();
alpha.setAge(20);

var beta = new myApp.PersonModel();
beta.setAge(17);

var peopleModel = new maria.SetModel();

var adultsModel = new myapp.AdultsModel(peopleModel);
```

Adding and deleting people from the peopleModel automatically
adds and removes them from the adultsModel as appropriate.
Modifying people in the peopleModel also adds and removes
them from the adultsModel as appropriate. All automatically.

```
peopleModel.add(alpha);
peopleModel.add(beta);
peopleModel.length;     // 2
adultsModel.length;     // 1
peopleModel.has(alpha); // true
peopleModel.has(beta);  // true
adultsModel.has(alpha); // true
adultsModel.has(beta);  // false
beta.setAge(18);
adultsModel.has(beta);  // true
adultsModel.length      // 2
beta.setAge(17);
adultsModel.has(beta);  // false
```

The ```adultsModel``` subset has the same interface as a set and
can be used as the model object of a maria.SetView, for example.


Downloads
---------

See http://peter.michaux.ca/downloads/maria-SubsetModel/


Status
------

Ready.


Browser Support
---------------

Tested working in IE6 and newer browsers by a variety of manufacturers.


Dependencies
------------

Just [Maria](https://github.com/petermichaux/maria).


Source Code
-----------

GitHub: https://github.com/petermichaux/maria-SubsetModel


Build
-----

To build the production ready files, you need [JSMin](http://www.crockford.com/javascript/jsmin.html) or any other tool with the same command line interface. Then just type "make" at the command line and look in the build directory for the results.

For the record, this is how I installed JSMin. Note that I have /Users/peter/bin in my PATH.

```sh
$ cd ~/tmp
$ curl -O https://raw.github.com/douglascrockford/JSMin/master/jsmin.c
$ gcc -o jsmin jsmin.c
$ mv jsmin ~/bin
$ rm jsmin.c
$ which jsmin
/Users/peter/bin/jsmin
```

Tests
-----

To run the automated tests, open tst/runner.html in a web browser.


Author
------

Peter Michaux<br>
petermichaux@gmail.com<br>
http://peter.michaux.ca/<br>
[@petermichaux](https://twitter.com/petermichaux)


License
-------

Simplified BSD License. See the included LICENSE file for details.
