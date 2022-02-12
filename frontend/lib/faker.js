// shamelessly stolen from https://github.com/FakerPHP/Faker/tree/main/src/Faker/Provider
import data from "./words.json";

class faker {
  words = data;
  emailUser = { first: "", last: "" };

  randomElement(type) {
    const list = this.words[type];
    return list[Math.floor(Math.random() * list.length)];
  }

  randomChance(skew) {
    return Math.floor(Math.random() * skew + 1);
  }

  addPunctuation(word) {
    const chance = this.randomChance(20);

    if (chance === 20) {
      return `${word} ${this.randomElement("emjoji")}`;
    }

    if (chance > 17) {
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

      if (numWords > 5 && result.length > 10) {
        result += ` ${this.addPunctuation(word)}`;
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
    const first = this.emailUser.first
      ? this.emailUser.first
      : this.firstname();
    const last = this.emailUser.last ? this.emailUser.last : this.lastname();
    const chance = this.randomChance(30);

    if (chance > 5 && chance < 10) {
      return `${last}${this.randomChance(10)}`;
    }

    if (chance > 10 && chance < 20) {
      return `${first}.${last.substring(0, 1)}`;
    }

    if (chance > 20 && chance < 27) {
      return `${first}.${last}`;
    }

    return `${first.substring(0, 1)}${last}`;
  }

  email() {
    const user = this.username();
    const domainname = this.domain();

    this.emailUser = { first: "", last: "" };

    return `${user}@${domainname}`.toLocaleLowerCase();
  }
}

export default new faker();
