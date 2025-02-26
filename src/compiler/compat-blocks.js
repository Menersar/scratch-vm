/**
 * @fileoverview List of supported NATIVE blocks in the compiler compatibility layer.
 * (Extensions should not be included here.)
 */

// Important note: Elements of this list should be sorted alphabetically.

const stacked = [
    // 'control_clear_counter',
    // 'control_incr_counter',
    'looks_changestretchby',
    'looks_hideallsprites',
    'looks_say',
    'looks_sayforsecs',
    'looks_setstretchto',
    'looks_switchbackdroptoandwait',
    'looks_think',
    'looks_thinkforsecs',
    'motion_align_scene',
    'motion_glidesecstoxy',
    'motion_glideto',
    'motion_goto',
    'motion_pointtowards',
    'motion_scroll_right',
    'motion_scroll_up',
    'sensing_askandwait',
    'sensing_setdragmode',
    'sound_changeeffectby',
    'sound_changevolumeby',
    'sound_cleareffects',
    'sound_play',
    'sound_playuntildone',
    'sound_seteffectto',
    'sound_setvolumeto',
    'sound_stopallsounds'
];

const inputs = [
    // 'control_get_counter',
    'motion_xscroll',
    'motion_yscroll',
    'sensing_loud',
    'sensing_loudness',
    'sensing_userid',
    'sound_volume'
];

module.exports = {
    stacked,
    inputs
};
