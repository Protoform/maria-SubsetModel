maria.SubsetModel = function(wsm) {
    maria.SetModel.call(this);
    // want events bubbling up through wsm to also bubble up through this set
    wsm.addParentEventTarget(this);
    // when wsm changes then may need to update this set
    maria.addEventListener(wsm, 'change', this, 'update');
    this._wrappedSetModel = wsm;
    this.handleAdd({addedTargets:wsm.toArray()});
};

maria.SubsetModel.prototype = maria.create(maria.SetModel.prototype);
maria.SubsetModel.prototype.constructor = maria.SubsetModel;

maria.SubsetModel.prototype.destroy = function() {
    this._wrappedSetModel.removeParentEventTarget(this);
    maria.removeEventListener(wsm, 'change', this);
};

maria.SubsetModel.prototype.update = function(evt) {
    // looking for changes on a model contained by the warped set model
    if (this._wrappedSetModel.has(evt.target)) {
        if (this.predicate(evt.target)) {
            this.add(evt.target);
        } else {
            this['delete'](evt.target);
        }
    }
    // looking for changes on the wrapped set model
    else if (evt.target === this._wrappedSetModel) {
        if (evt.addedTargets && evt.addedTargets.length) {
            this.handleAdd(evt);
        }
        if (evt.deletedTargets && evt.deletedTargets.length) {
            this.handleDelete(evt);
        }
    }
};

maria.SubsetModel.prototype.handleAdd = function(evt) {
    var childModels = evt.addedTargets;
    for (var i = 0, ilen = childModels.length; i < ilen; i++) {
        var childModel = childModels[i];
        if (this.predicate(childModel)) {
            this.add(childModel);
        }
    }
};

maria.SubsetModel.prototype.handleDelete = function(evt) {
    var childModels = evt.deletedTargets;
    for (var i = 0, ilen = childModels.length; i < ilen; i++) {
        this['delete'](childModels[i]);
    }
};

maria.SubsetModel.prototype.predicate = function() {
    return true;
};
