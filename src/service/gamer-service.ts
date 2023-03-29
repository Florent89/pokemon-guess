import GAMERS from "./mock-gamers";

export type Gamer = {
  id: number;
  score: number;
  pseudo: string;
  level: string;
  created: Date;
};

export default class GamerService {
  static gamers: Gamer[] = GAMERS;

  static isDev =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";

  static getGamers(): Promise<Gamer[]> {
    if (this.isDev) {
      return fetch("http://localhost:3001/gamers")
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    return new Promise((resolve) => {
      resolve(this.gamers);
    });
  }

  static addGamer(gamer: Gamer): Promise<Gamer> {
    gamer.created = new Date(gamer.created);
    if (this.isDev) {
      return fetch(`http://localhost:3001/gamers`, {
        method: "POST",
        body: JSON.stringify(gamer),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    return new Promise((resolve) => {
      this.gamers.push(gamer);
      resolve(gamer);
    });
  }

  static searchGamer(term: string): Promise<Gamer[]> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/gamers?q=${term}`)
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }

    return new Promise((resolve) => {
      const results = this.gamers.filter((gamer) => {
        gamer.pseudo.includes(term) || gamer.level.includes(term);
      });
      resolve(results);
    });
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}
