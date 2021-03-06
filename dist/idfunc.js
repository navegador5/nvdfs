"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen_id = exports.update_nj_ids = exports.update_one_njid = exports.is_id = exports.calc_next_id = void 0;
var cmmn = __importStar(require("./cmmn"));
function calc_next_id(sdfs) {
    var ids = sdfs.map(function (nj) { return nj._id; });
    return (Math.max.apply(Math, ids) + 1);
}
exports.calc_next_id = calc_next_id;
function is_id(n) {
    var cond = ((n !== null) && (n !== undefined));
    return (cond);
}
exports.is_id = is_id;
function update_one_njid(nj, idplus) {
    nj._id = nj._id + idplus;
    nj._tree = nj._tree + idplus;
    if (is_id(nj._fstch)) {
        nj._fstch = nj._fstch + idplus;
    }
    if (is_id(nj._lsib)) {
        nj._lsib = nj._lsib + idplus;
    }
    if (is_id(nj._rsib)) {
        nj._rsib = nj._rsib + idplus;
    }
    if (is_id(nj._parent)) {
        nj._parent = nj._parent + idplus;
    }
    return (nj);
}
exports.update_one_njid = update_one_njid;
function update_nj_ids(sdfs0, sdfs1) {
    var next_id = calc_next_id(sdfs0);
    for (var i = 0; i < sdfs1.length; i++) {
        sdfs1[i] = update_one_njid(sdfs1[i], next_id);
    }
    return (sdfs1);
}
exports.update_nj_ids = update_nj_ids;
function gen_id(d) {
    if (d.mode === 'numid') {
        if (d._id === undefined) {
            return (0);
        }
        else {
            return (d._id);
        }
    }
    else {
        return (cmmn.gen_guid());
    }
}
exports.gen_id = gen_id;
