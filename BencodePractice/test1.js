import bencode from "bencode";
import buffer from "buffer";

const string = "hello";

console.log(bencode.byteLength(string));

let data = buffer.Buffer.from((('d6:string11:Hello World7:integeri12345e4:dictd3:key36:This is a string within a dictionarye4:listli1ei2ei3ei4e6:stringi5edeee')));

let result = bencode.decode(data);

console.log(data);
console.log(result);    

