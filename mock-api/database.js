var dataExample = require('./data/example');

var loader = {
  db: {},

  init: function () {
    this.createDb('example', dataExample);

    return this;
  },

  createDb: function (key, data) {
    var dataById = {};

    data.forEach(function (d) {
      console.assert(d.id !== undefined && d.id !== null,
        'All items passed to the mock API must include an ID at the top level: ' + d.id);
      dataById[d.id] = d;
    });

    this.db[key] = dataById;
  },

  getDataById: function (db, id) {
    return this.db[db][id];
  }
};

module.exports = loader.init();
