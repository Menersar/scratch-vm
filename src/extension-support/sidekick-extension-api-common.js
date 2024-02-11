// !!!
const ArgumentType = require('./argument-type');
const BlockType = require('./block-type');
const TargetType = require('./target-type');
const Cast = require('../util/cast');
// const ws281x = require('../util/cast');
const ws281x = require("@simontaga/rpi-ws281x-native/lib/ws281x-native");


const Scratch = {
    ArgumentType,
    BlockType,
    TargetType,
    Cast,
    ws281x
};

module.exports = Scratch;
