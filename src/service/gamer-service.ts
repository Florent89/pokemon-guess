export type Gamer = {
  id: number;
  score: number;
  pseudo: string;
  level: string;
  created: Date;
};

export default class GamerService {
  static gamers: Gamer[] = [];

  //   static isDev =
  //     !process.env.NODE_ENV || process.env.NODE_ENV === "development";

  static getGamers(): Promise<Gamer[]> {
    return fetch("http://localhost:3001/gamers")
      .then((response) => response.json())
      .catch((error) => this.handleError(error));

    // return new Promise((resolve) => {
    //   resolve(this.pokemons);
    // });
  }

  static addGamer(gamer: Gamer): Promise<Gamer> {
    gamer.created = new Date(gamer.created);

    return fetch(`http://localhost:3001/gamers`, {
      method: "POST",
      body: JSON.stringify(gamer),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));

    // return new Promise((resolve) => {
    //   this.pokemons.push(pokemon);
    //   resolve(pokemon);
    // });
  }

  static searchGamer(term: string): Promise<Gamer[]> {
    return fetch(`http://localhost:3001/gamers?q=${term}`)
      .then((response) => response.json())
      .catch((error) => this.handleError(error));

    // return new Promise((resolve) => {
    //   const results = this.pokemons.filter((pokemon) =>
    //     pokemon.name.includes(term)
    //   );
    //   resolve(results);
    // });
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}
