import { COLORS } from "../helpers/colors.ts";
/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

type Language = "es" | "en" | "fr";

function createGreeter(lang: Language) {
  return function (name: String) {
    const message = {
      es: `Hola %c${name}`,
      en: `Hi %c${name}`,
      fr: `Bonjour %c${name}`,
    };

    return console.log(message[lang], COLORS.cyan);
  };
}

function main() {
  const names = ["Marco", "Laura"];
  const langs: Language[] = ["es", "en", "fr"];
  for (const name of names) {
    for (const lang of langs) {
      createGreeter(lang)(name); //Currying
    }
  }
}

main();
