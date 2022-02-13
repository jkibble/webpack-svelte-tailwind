// shamelessly stolen from https://github.com/FakerPHP/Faker/tree/main/src/Faker/Provider
import data from "./words.json";

class faker {
  words = data;
  emailUser = { first: "", last: "" };

  randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomElement(type) {
    const list = this.words[type];
    return list[Math.floor(Math.random() * list.length)];
  }

  randomChance(chance) {
    return this.randomNumberBetween(0, 100) <= chance;
  }

  jargon() {
    const jargon = [];

    jargon.push(this.randomElement("adverb"));
    jargon.push(this.randomElement("verb"));
    jargon.push(this.randomElement("noun"));
    jargon.push(this.randomElement("adjective"));
    jargon.push(this.randomElement("buzz"));

    return jargon
      .join(" ")
      .replace(/(?:^|\s+)([a-z])/g, (l) => l.toUpperCase());
  }

  addPunctuation(word) {
    if (this.randomChance(10)) {
      return `${word} ${this.randomElement("emjoji")}`;
    }

    if (this.randomChance(30)) {
      const punc = this.randomElement("punctuation");

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
  }

  lorem(numWords) {
    let result = "";

    for (let i = 0; i < numWords; i++) {
      const word = this.randomElement("lorem");

      if (result.length > 10 && this.randomChance(50)) {
        result += ` ${this.addPunctuation(word)}`;
      } else {
        result += ` ${word}`;
      }
    }

    return result
      .trim()
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (l) => l.toUpperCase());
  }

  firstname() {
    return (this.emailUser.first = this.randomElement("first"));
  }

  lastname() {
    return (this.emailUser.last = this.randomElement("last"));
  }

  domain() {
    const domain = this.lastname().replace(/[^a-zA-Z]+/, "");
    const tld = this.randomElement("tld");

    return `${domain}.${tld}`.toLocaleLowerCase();
  }

  title() {
    return this.randomElement("title");
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
      first = this.randomElement("adjective");
      last = this.randomElement("noun");
    }

    if (this.randomChance(5)) {
      first = this.randomElement("badname");
      last = this.randomElement("verb");
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

    return `${user}@${domainname}`.toLocaleLowerCase();
  }
}

export default new faker();
