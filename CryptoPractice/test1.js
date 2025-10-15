import { createHmac, Certificate, createHash } from "crypto";
import { create } from "domain";
import { createReadStream } from "fs";
import { argv } from "process";


// HMAC stands for Hash-based message authentication code


const secret = "abcdefg"; // Secret helps safeguard our hash because
//  hackers can create the hash wihtout the secret and change the message
// Without a secret the server has no way to know if the hash was changed or not


// HMAC is secure because people with the secret key can only open it


const hash = createHmac("sha256", secret).update("I love cupcakes").digest("hex");

console.log(hash);

// Spkac stands for Signed public key and challenge 

// This is just to show for the exportChallenge()

// const spkac = getSpkacSomehow();
// const challenge = Certificate.exportChallenge(spkac);
// console.log(challenge.toString('utf8'));


// Creating hashes here
const filename = argv[2];

const hash2 = createHash("sha256");

const input = createReadStream(filename);   

input.on("readable", () => {
    // Only one element should be produced by the hash stream

    const data = input.read();
    if (data)
        hash2.update(data);
    else {
        console.log(`${hash2.digest('hex')} ${filename}`);
    }
});
