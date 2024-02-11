const minilog = require('minilog');
minilog.enable();

module.exports = minilog('vm');

// const nanolog = require('sidekick-nanolog');
// nanolog.enable();

// module.exports = nanolog('vm');