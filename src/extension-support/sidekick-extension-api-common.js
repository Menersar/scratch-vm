// !!!
const ArgumentType = require('./argument-type');
const BlockType = require('./block-type');
const TargetType = require('./target-type');
const Cast = require('../util/cast');
// const ws281x = require('../util/cast');
// const ws281x = require('@simontaga/rpi-ws281x-native/lib/ws281x-native');
// const ws281xControl = require('../util/ws281x-control');
const sudoJS = require('sudo-js');
const sudoPrompt = require('sudo-prompt');


const Scratch = {
    ArgumentType,
    BlockType,
    TargetType,
    Cast,
    // ws281x,
    // ws281xControl,
    sudoJS,
    sudoPrompt
};

module.exports = Scratch;
