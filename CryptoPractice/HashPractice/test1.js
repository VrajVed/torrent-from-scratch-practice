// Using hash objects as streams
import crypto, { createHash } from 'crypto';
import { create } from 'domain';
import fs, { createReadStream } from "fs";
import process from 'process';

const hash = crypto.createHash("sha256");

hash.on("readable", () => {

    // Only one element is produced by the hash stream
    const data = hash.read();

    if (data){
        console.log(data.toString('hex'));
    }
});

hash.write("some data to hash");
hash.end();


const hash2 = crypto.createHash("sha256");
const input = createReadStream('test.js');

input.pipe(hash2).setEncoding('hex').pipe(process.stdout);

const hash3 = crypto.createHash("sha256");

hash3.update("some data to hash");

console.log(hash3.digest('hex'));

const hash4 = createHash('sha256');

hash4.update('one');
console.log(hash4.copy().digest('hex'));

hash4.update('two');
console.log(hash4.copy().digest('hex'));

hash4.update('three');
console.log(hash4.copy().digest('hex'));

// Etc.