"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let path = require("path");

const alphabetA = require(__dirname + "/../data/alphabet")[0];

class Scrambler {

    constructor(ishift, vshift, keytxt){
        this.initShift = ishift;
        this.shiftVals = vshift;
        this.keyTxtVal = keytxt;
    };

    addOffset(n){
        this.initShift += n;
        if (this.initShift < 0) this.initShift += alphabetA.length;
    };

    encrypt(msg){
        let res = "";
        for (let letter of msg) res += this.encryptLetter(letter);
        return res;
    };

    decrypt(msg){
        let res = "";
        for (let letter of msg) res += this.decryptLetter(letter);
        return res;
    };

    encryptLetter(letter) {
        let digest;
        let letterVal = 0;

        for (let i = 0; i < alphabetA.length; i++) if (letter == alphabetA.charAt(i)) letterVal = i;

        digest = this.keyTxtVal.charAt((letterVal + this.initShift) % this.keyTxtVal.length);
        this.addOffset(this.shiftVals);

        return digest;
    };

    decryptLetter(letter) {
        let digest;
        let shiftChar = 0;
        let letterVal = 0;

        for (let i = 0; i < this.keyTxtVal.length; i++) if (letter == this.keyTxtVal.charAt(i)) letterVal = i;

        shiftChar = letterVal - this.initShift;
        while (shiftChar < 0) shiftChar += alphabetA.length;

        digest = alphabetA.charAt(shiftChar);
        this.addOffset(this.shiftVals);

        return digest;
    };
}

module.exports = Scrambler;
