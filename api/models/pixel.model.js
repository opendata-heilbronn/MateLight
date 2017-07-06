const Color = require('./color.model');
const Position = require('./position.model');

module.exports = function (options) {
   if (options === undefined)
      options = {};

   this.position = new Position(options.position);
   this.color = new Color(options.color);
};
