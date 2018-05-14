"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let log = function(txt, err){
    let head = (err ? "[ERROR] " : "> ");
    console.log(head + txt);
};

module.exports = log;