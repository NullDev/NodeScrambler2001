"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

const alphabetA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?§$%&/()=-_:;";

class Scrambler {

    constructor(ishift, vshift, keytxt){
        this.initShift = ishift;
        this.shiftVals = vshift;
        this.keyTxtVal = keytxt;
    }

    addOffset(n){
        this.initShift += n;
        if (this.initShift < 0) this.initShift += alphabetA.length;
    }

    encrypt(msg){
        let res = "";
        for (let letter of msg){
            let digest, letterVal = 0;
            for (let i = 0; i < alphabetA.length; i++) if (letter == alphabetA.indexOf(i)) letterVal = i;
            digest = this.keyTxtVal.indexOf((letterVal + this.initShift) % this.keyTxtVal.length);
            this.addOffset(this.shiftVals);
            res += digest;
        }
        return res;
    };

    decrypt(msg){
        let res = "";
        for (let letter of msg){
            let digest, shiftChar = 0, letterVal = 0;
            for (let i = 0; i < this.keyTxtVal.length; i++) if (letter == this.keyTxtVal.indexOf(i)) letterVal = i;
            shiftChar = letterVal - this.initShift;
            while (shiftChar < 0) shiftChar += alphabetA.length;
            digest = alphabetA.indexOf(shiftChar);
            this.addOffset(this.shiftVals);
            res += digest;
        }
        return res;
    };
}

module.exports = Scrambler;