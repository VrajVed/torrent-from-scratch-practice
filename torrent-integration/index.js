import BencodeParser from './bencoder.js';
import fs from 'fs';
import crypto from 'crypto';
import bencode from "bencode";
import net from "net";
import dgram from "dgram";



console.log(fs.readFileSync('test.torrent').toString("utf8"));
console.log("=====================================");
// console.log(BencodeParser.decode(fs.readFileSync('test.torrent').toString("utf8")));
console.log("=====================================");
console.log(bencode.decode(fs.readFileSync('test.torrent')));

let torrent = fs.readFileSync("test.torrent");
let decoded_torrent = bencode.decode(torrent);


let decoded_torrent_info = decoded_torrent['info'];
console.log("===================================== DECODED TORRENT INFO");
console.log(decoded_torrent_info);

console.log("===================================== ENCODED TORRENT INFO");

let encoded_info = BencodeParser.encode(decoded_torrent_info);

console.log(encoded_info);

console.log("===================================== Calculating SHA-01 infohash");
let info_hash = crypto.createHash('sha1').update(encoded_info).digest('hex');
console.log(info_hash);

// let announce = decoded_torrent['announce'].toString('utf8');
// console.log(announce)

let announcelist = bencode.decode(torrent)['announce-list'];
console.log(announcelist);

console.log("===================================== Decoding announce-list");

// Convert each tier's URLs from Buffer to string
let decodedAnnounceList = announcelist.map(tier => {
    return tier.map(url => {
        // Convert the Uint8Array/Buffer directly to string
        return String.fromCharCode(...url);
    });
});

console.log(decodedAnnounceList);