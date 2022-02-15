// shamelessly stolen from https://github.com/FakerPHP/Faker/tree/main/src/Faker/Provider
import data from "./words.json";

class faker {
  words = data;
  emailUser = { first: "", last: "" };

  randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomElement(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  randomChance(chance) {
    return this.randomNumberBetween(0, 100) <= chance;
  }

  jargon() {
    const jargon = [];

    jargon.push(this.randomElement(this.words["adverb"]));
    jargon.push(this.randomElement(this.words["verb"]));
    jargon.push(this.randomElement(this.words["noun"]));
    jargon.push(this.randomElement(this.words["adjective"]));
    jargon.push(this.randomElement(this.words["buzz"]));

    return jargon
      .join(" ")
      .replace(/(?:^|\s+)([a-z])/g, (l) => l.toUpperCase());
  }

  punctuation(word) {
    const punc = this.randomElement(this.words["punctuation"]);

    if (punc === '"') {
      return `"${word}"`;
    }

    if (punc === "'") {
      return `${word}'s`;
    }

    if (punc === "(" || punc === ")") {
      return `(${word})`;
    }

    return `${word}${punc}`;
  }

  lorem(numWords) {
    let result = [];

    for (let i = 0; i < numWords; i++) {
      let word = this.randomElement(this.words["lorem"]);

      if (result.length >= 5 && this.randomChance(30)) {
        result.push(this.punctuation(word));
      } else {
        result.push(word);
      }

      if (this.randomChance(2)) {
        result.push(this.emoji());
      }
    }

    return result
      .join(" ")
      .replace(/\s+[,.?!]/, "")
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (l) => l.toUpperCase());
  }

  firstname() {
    return (this.emailUser.first = this.randomElement(this.words["first"]));
  }

  lastname() {
    return (this.emailUser.last = this.randomElement(this.words["last"]));
  }

  domain() {
    const domain = this.lastname().replace(/[^a-zA-Z]+/, "");
    const tld = this.randomElement(this.words["tld"]);

    return `${domain}.${tld}`.toLowerCase();
  }

  title() {
    const title = [];

    title.push(this.randomElement(this.words["noun"]));
    title.push(this.randomElement(this.words["verb"]));
    title.push(this.randomElement(this.words["title"]));

    return title.join(" ").replace(/(?:^|\s+)([a-z])/g, (l) => l.toUpperCase());
  }

  emoji() {
    return this.randomElement(this.words["emoji"]);
  }

  username() {
    let first = this.emailUser.first ? this.emailUser.first : this.firstname();
    let last = this.emailUser.last ? this.emailUser.last : this.lastname();

    if (this.randomChance(30)) {
      return `${first.substring(0, 1)}${last}`;
    }

    if (this.randomChance(30)) {
      return `${first}.${last.substring(0, 1)}`;
    }

    if (this.randomChance(30)) {
      return `${first.substring(0, 3)}${last.substring(0, 3)}`;
    }

    if (this.randomChance(10)) {
      first = this.randomElement(this.words["adjective"]);
      last = this.randomElement(this.words["noun"]);
    }

    if (this.randomChance(5)) {
      first = this.randomElement(this.words["badname"]);
      last = this.randomElement(this.words["verb"]);
    }

    if (this.randomChance(30)) {
      return `${last}.${first}${this.randomNumberBetween(5, 21)}`;
    }

    if (this.randomChance(30)) {
      return `${first}.${last}${this.randomNumberBetween(3, 75)}`;
    }

    return `${first}${last}`;
  }

  email() {
    const user = this.username();
    const domainname = this.domain();

    this.emailUser = { first: "", last: "" };

    return `${user}@${domainname}`.toLowerCase();
  }
}

export default new faker();
