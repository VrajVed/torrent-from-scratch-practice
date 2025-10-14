import {Buffer} from 'node:buffer';

const buf1 = Buffer.from("hello world", "utf-8");

console.log(buf1.toString('hex'));
console.log(buf1.toString('base64'));
console.log(Buffer.from("fhqwhgads", "utf-8"));
console.log(Buffer.from("fhqwhgads", "utf-16le"));

const buf2 = Buffer.from([1, 2, 3, 4]);
const uint32array = new Uint32Array(buf2); // So basically here you are copying the entire array and making it into two arrays
// any changes in the new array wont affect old array.
// Passing a Buffer to a <TypedArray> constructor will copy the Buffer's contents, interpreted as an array of integers
// and not as a byte sequence of the target type.
// if you change in the uint32array the buf2 array stays the same

console.log(uint32array);

const buf3 = Buffer.from('hello', 'utf16le');
const uint16array = new Uint16Array(
    buf3.buffer,
    buf3.byteOffset,
    buf3.length / Uint16Array.BYTES_PER_ELEMENT
);

// Here you are tying to just share the array contents so any changes in the new array will reflect in the array.
// if you change something in uint16array then it changes the buffer array as well.


console.log(uint16array);

// Passing the Buffer's underlying <ArrayBuffer> will create a <TypedArray> that shares its memory with the Buffer

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

const buff1 = Buffer.from(arr); //this is the usual
const buff2 = Buffer.from(arr.buffer); // this makes the shared thing

console.log(buff1);
console.log(buff2);

arr[0] = 4000;
arr[1] = 6000;

console.log(buff1);
console.log(buff2);

// OUTPUT here, see since buff2 is shared, it changes.
// <Buffer 88 a0>
// <Buffer 88 13 a0 0f>
// <Buffer 88 a0>
// <Buffer a0 0f 70 17>

const arr2 = new Uint16Array(20); 
// This array holds 20 integers so 2 bytes * 20 is 40 bytes total

const bufff = Buffer.from(arr2.buffer, 0, 16);
// Here we are making a shared array which holds 0-16 bytes only from those 40 bytes ka array

console.log(bufff.length);

// const buf2 = Buffer.from([1, 2, 3, 4]);
// Buffers can be iterated over by use of for-of loops
for (const b of buf2) {
    console.log(b);
}

