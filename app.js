"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let fs        = require("fs");
let prompt    = require("prompts");
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
        initial: 0,
        message: "Initial Shift"
    },{
        type: "number",
        name: "vshift",
        initial: 1,
        message: "Shift Value"
    }]);

    term.singleLineMenu(["Encrypt", "Decrypt"], { selectedStyle: term.dim.blue.bgCyan }, function(err, call){
        if (err) return log(err, true);
        res["decrypt"] = call.selectedIndex;
        return callback(res);
    });
};

let main = function(res){
    console.log("\n");

    if (!isset(res.msgtxt)) return log("Oof... You didn't give me a text!", true);
    
    res.keytxt = isset(res.keytxt) ? res.keytxt : "";
    res.ishift = isset(res.ishift) ? res.ishift : 0;
    res.vshift = isset(res.vshift) ? res.vshift : 1;
    
    let scrambler = new Scrambler(res.ishift, res.vshift, res.keytxt);
    let result = res.decrypt ? scrambler.decrypt(res.msgtxt) : scrambler.encrypt(res.msgtxt);

    log("Result: " + result);
};

function end(){
    //Cleanups
    console.log();
    process.exit(0);
}

init(function(res){ 
    main(res); 
    end();
});
