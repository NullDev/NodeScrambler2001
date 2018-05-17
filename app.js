"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let fs        = require("fs");
let prompt    = require("prompts");
let pArg      = require("minimist")(process.argv.slice(2));;
let term      = require("terminal-kit").terminal;

let log       = require("./utils/logger");
let Scrambler = require("./utils/scrambler");
let pj        = require("./package.json");

term.clear();

console.log(
    "\n" +
    "  #####################\n" +
    "  #-------------------#\n" +
    "  # NodeScrambler2001 #\n" +
    "  # v" + pj.version + "            #\n" +
    "  #-------------------#\n" +
    "  #####################\n"
);

log("Copyright (c) " + (new Date()).getFullYear() + " NullDev\n");

function isset(obj){ return !!(obj && obj !== null && (typeof obj === 'string' && obj !== "")); }

function getRand(){
    let base = require("./data/alphabet")[0];
    let shuffled = "";
    base = base.split("");
    while (base.length > 0) shuffled +=  base.splice(base.length * Math.random() << 0, 1);
    return shuffled;
}

//This is where shit goes downhill

let init = async function(callback){
    let splash = require("./data/splash");
    log(splash[Math.floor(Math.random() * splash.length)] + "\n");

    let res = await prompt([{
        type: "text",
        name: "msgtxt",
        message: "Message"
    },{
        type: "text",
        name: "keytxt",
        message: "Key (optional)"
    },{
        type: "number",
        name: "ishift",
        message: "Initial Shift"
    },{
        type: "number",
        name: "vshift",
        message: "Shift Value"
    }]);

    term.singleLineMenu(["Encrypt", "Decrypt"], { selectedStyle: term.dim.blue.bgCyan }, function(err, call){
        if (err) return log(err, true);
        res["decrypt"] = call.selectedIndex;

        console.log("\n");
        log("Do you want to output the result as Base64?");

        //Callback hell...
        term.singleLineMenu(["No", "Yes"], { selectedStyle: term.dim.blue.bgCyan }, function(err, call){
            if (err) return log(err, true);
            res["b64"] = call.selectedIndex;
            return callback(res);
        });
    });
};

let main = function(res){
    console.log("\n");

    if (!isset(res.msgtxt)) return log("Oof... You didn't give me a text!", true);
    
    res.ishift = isset(res.ishift) ? res.ishift : 0;
    res.vshift = isset(res.vshift) ? res.vshift : 1;
    
    if (!isset(res.keytxt)){
        let newKey = getRand();
        res.keytxt = newKey;
        log("You haven't provided a key!");
        log("Therefore it has been set to: \"" + newKey + "\"\n");
    }

    let scrambler = new Scrambler(res.ishift, res.vshift, res.keytxt);

    scrambler.addOffset(res.vshift);

    let result = res.decrypt ? scrambler.decrypt(res.msgtxt) : scrambler.encrypt(res.msgtxt);

    result = res.b64 == 1 ? Buffer.from(result).toString("base64") : result;

    log("Result: " + result);
};

let start = function(){
    let args = process.argv.slice(2);

    if (args.length == 0){
        init(function(res){ 
            main(res); 
            end();
        });
    }

    else {
        log("Running in CLI mode...\n");
        
        if (!isset(pArg.m) && !isset(pArg.message)) return log("Please specify a message.\n", true);

        if (!("d" in pArg) && !("decrypt" in pArg) && !("e" in pArg) && !("encrypt" in pArg)) return log("Please specify whether to encrypt or decrypt the message.\n", true);

        end();
    }
};

function end(){
    //Cleanups
    console.log();
    process.exit(0);
}

start();
