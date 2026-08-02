/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

class DragonBalls {
  private static instance: DragonBalls;
  private ballsCollected = 0;

  private constructor() {
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log("%cBolas del dragon han sido creadas!!", COLORS.green);
    }

    return DragonBalls.instance;
  }

  collectBall(): void {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(`Bola recolectada. Total de esferas: ${this.ballsCollected}`);
      return;
    }

    console.log("%cYa tienes todas las bolas del dragon!!", COLORS.orange);
  }

  summonShenlong(): void {
    if (this.ballsCollected === 7) {
      console.log("%c¡Has invocado a Shenlong!", COLORS.purple, "🐉");
      this.ballsCollected = 0; // Reset after summoning
      return;
    }
    console.log("%cAún no tienes todas las bolas del dragon.", COLORS.red);
    console.log(`Aun faltan: ${7 - this.ballsCollected}`);
    return;
  }
}

// Código Cliente
function main() {
  const gokuBalls = DragonBalls.getInstance();
  for (let i = 0; i < 3; i++) {
    gokuBalls.collectBall();
  }
  const vegetaBalls = DragonBalls.getInstance();
  for (let i = 0; i < 2; i++) {
    vegetaBalls.collectBall();
  }
  const krilinBalls = DragonBalls.getInstance();
  for (let i = 0; i < 2; i++) {
    krilinBalls.collectBall();
  }
  gokuBalls.summonShenlong();
}

main();
