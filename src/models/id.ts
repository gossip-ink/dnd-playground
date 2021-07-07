import { customAlphabet, urlAlphabet } from "nanoid";

const alphabet = [...urlAlphabet]
  .filter((c) => /^[a-zA-Z0-9]$/.test(c))
  .join("");

const nanoid = customAlphabet(alphabet, 8);

export default nanoid;
