// shamelessly stolen from https://github.com/FakerPHP/Faker/tree/main/src/Faker/Provider
import data from "./words.json";

const randomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const randomChance = (skew) => {
  return Math.floor(Math.random() * skew + 1);
};

const addPunctuation = (word) => {
  const chance = randomChance(20);

  if (chance === 20) {
    return `${word} ${randomElement(data.emjoji)}`;
  }

  if (chance > 17) {
    const punc = randomElement(data.punctuation);

    if (punc === '"') {
      return `${punc}${word}${punc}`;
    }

    if (punc === "'") {
      return `${word}'s`;
    }

    if (punc === "(" || punc === ")") {
      return `(${word})`;
    }

    return `${word}${punc}`;
  }

  return word;
};

const lorem = (numWords) => {
  let result = "";

  for (let i = 0; i < numWords; i++) {
    let word = randomElement(data.lorem);

    if (numWords > 5 && result.length > 10) {
      result += ` ${addPunctuation(word)}`;
    } else {
      result += ` ${word}`;
    }
  }

  return result
    .trim()
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
      return c.toUpperCase();
    });
};

const firstname = () => {
  return randomElement(data.first);
};

const lastname = () => {
  return randomElement(data.last);
};

const domain = () => {
  const domain = lastname().replace(/[^a-zA-Z]+/, "");
  const tld = randomElement(data.tld);

  return `${domain}.${tld}`.toLocaleLowerCase();
};

const title = () => {
  return randomElement(data.title);
};

const userName = () => {
  const first = firstname();
  const last = lastname();

  const chance = randomChance(30);

  if (chance > 5 && chance < 10) {
    return `${last}${randomChance(10)}`;
  }

  if (chance >= 10 && chance < 20) {
    return `${first}.${last.substring(2)}`;
  }

  if (chance >= 20 && chance < 27) {
    return `${first}.${last}`;
  }

  return `${first.substring(1)}${last}`;
};

const email = () => {
  const domainname = domain();
  const user = userName();

  return `${user}@${domainname}`.toLocaleLowerCase();
};

export { lorem as default, lorem, firstname, lastname, email, domain, title };
