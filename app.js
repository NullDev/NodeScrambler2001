"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let fs     = require("fs");
let prompt = require("prompts");

let log = require("./utils/logger");
let pj  = require("./package.json");

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

//This is where shit goes downhill

let init = async function(){
    let res = await prompt([{
        type: "text",
        name: "msgtxt",
        message: "Message"
    },{
        type: "text",
        name: "keytxt",
        message: "Key"
    },{
        type: "number",
        name: "ishift",
        message: "Initial Shift"
    },{
        type: "number",
        name: "vshift",
        message: "Shift Value"
    }]);
};

init();