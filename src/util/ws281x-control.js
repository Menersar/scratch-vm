/* eslint-disable require-jsdoc */
/* eslint-disable func-style */


// const sudoJS = require('sudo-js');
const ws281x = require('@simontaga/rpi-ws281x-native/lib/ws281x-native');


const args = {
    LED: 1,
    START: 1,
    END: 5,
    COLOR: '#0000ff'
};

// const ledStart = Cast.toNumber(args.START);
// const ledEnd = Cast.toNumber(args.END);
// const hexColor = Cast.toString(args.COLOR);

function hex2Decimal (hex) {
    return parseInt(hex, 16);
}

const ledStripNumber = (args.LED);
const ledStart = (args.START);
const ledEnd = (args.END);
const hexColor = (args.COLOR);
const hexColorShort = hexColor.slice(1);
const decimalColor = hex2Decimal(hexColorShort);

const NUM_LEDS = 63;
const NUM_LEDS_PER_STRIP = 7;
const GPIO = 12;
// const COLOR = this.rgb2Int(255, 0, 0);
const DMA = 10;
const FREQUENCY = 800000;
const INVERT = false;
const BRIGHTNESS = 125;
const STRIP_TYPE = 'ws2812';

const options = {
    dma: DMA,
    freq: FREQUENCY,
    gpio: GPIO,
    invert: INVERT,
    brightness: BRIGHTNESS,
    stripType: STRIP_TYPE
};


const ledStripNumberIndex = ledStripNumber - 1;
let ledStartIndex = ledStart - 1;
let ledEndIndex = ledEnd - 1;
ledStartIndex = ledStartIndex + (ledStripNumberIndex * NUM_LEDS_PER_STRIP);
ledEndIndex = ledEndIndex + (ledStripNumberIndex * NUM_LEDS_PER_STRIP);

// const ledStartIndex = ledStart - 1;
// const ledEndIndex = ledEnd - 1;

// console.info("COLOR: ")
// console.info("hexColor")
// console.info(hexColor)
// console.info("decimalColor")
// console.info(decimalColor)
// console.info("args.COLOR")
// console.info(args.COLOR)


function ws281xInitColorRender (ws281xNumLEDs, ws281xNumStartLEDs, ws281xNumEndLEDs, ws281xColorLEDs, ws281xOptions) {


    // ws281x = require(process.resourcesPath + "/static/rpi-ws281x-native/lib/ws281x-native");

    const channel = ws281x(ws281xNumLEDs, ws281xOptions);
    // var channel = ws281x1(ws281xNumLEDs, ws281xOptions);

    const pixelData = channel.array;

    let iterator = ws281xNumLEDs;
    while (iterator--) {
        pixelData[iterator] = 0;
    }

    for (let i = ws281xNumStartLEDs; i <= ws281xNumEndLEDs; i++) {
        pixelData[i] = ws281xColorLEDs;
    }

    ws281x.render();
    // ws281x1.render();

    // console.log('Press <ctrl>+C to exit.');


    // const ws281x = require(process.resourcesPath + "/static/rpi-ws281x-native/lib/ws281x-native");
    // event.returnValue = new ws281x.Channel
    // event.returnValue = -1;
}


ws281xInitColorRender(NUM_LEDS, ledStartIndex, ledEndIndex, decimalColor, options);


// process.exit();


// Signal yourself in Node.js:
// (Send SIGTERM, SIGINT, etc. to your own process.)
// process.kill(process.pid, "SIGINT");
// process.kill sends a signal (SIGINT in this case, provided by the second parameter), to a provided PID.
// (process.pid in this case, which is the PID of the running node process.)
// Source: https://nodejs.org/api/process.html#process_process_kill_pid_signal
// (Source: https://stackoverflow.com/questions/43401165/is-it-possible-to-signal-yourself-in-node-js)

// PID: Process ID (?)


// ---- trap the SIGINT and reset before exit
// process.on('SIGINT', function () {
//     ws281x.reset();
//     ws281x.finalize();
//     process.nextTick(function () { process.exit(0); });
// });

// setInterval(function () {
//     // for (var i = 0; i < NUM_LEDS; i++) {
//     //     pixelData[i] = colorwheel((offset + i) % 256);
//     // // }

//     // offset = (offset + 1) % 256;
//     // ws281x.render(pixelData);
//     if (process.uptime() >= 2)
//         process.kill(process.pid, "SIGINT");

// }, 1000 / 30);
