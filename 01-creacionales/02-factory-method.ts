/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";

interface Hamburger {
  prepare(): void;
}

class CheeseBurger implements Hamburger {
  prepare(): void {
    console.log("...Preparing a %cCheese Burger", COLORS.yellow);
  }
}

class VeggieBurger implements Hamburger {
  prepare(): void {
    console.log("...Preparing a %cVeggie Burger", COLORS.green);
  }
}

abstract class BurgerFactory {
  protected abstract createBurger(): Hamburger;

  async orderBurger(): Promise<Hamburger> {
    console.log("Ordering a burger...");
    await sleep(1000);
    const burger = this.createBurger();
    burger.prepare();
    return burger;
  }
}

class CheeseBurgerFactory extends BurgerFactory {
  override createBurger(): Hamburger {
    return new CheeseBurger();
  }
}

class VeggieBurgerFactory extends BurgerFactory {
  override createBurger(): Hamburger {
    return new VeggieBurger();
  }
}

async function main() {
  let factory: BurgerFactory | undefined = undefined;

  const burguerType = prompt(
    "What type of burger would you like? (cheese/veggie)",
  )
    ?.trim()
    .toLowerCase();
  console.log("Selected burger: ", burguerType);

  if (burguerType !== "cheese" && burguerType !== "veggie") {
    throw new Error("Invalid burger type. Must be 'cheese' or 'veggie'.");
  }

  if (burguerType === "veggie") {
    factory = new VeggieBurgerFactory();
  }
  if (burguerType === "cheese") {
    factory = new CheeseBurgerFactory();
  }

  if (!factory) {
    throw new Error("Factory is undefined. Cannot create burger.");
  }

  const burger = await factory.orderBurger();

  if (burger) {
    console.log(
      `%c${burguerType} 🍔 ready to go! Enjoy your meal!`,
      COLORS.purple,
    );
  }
}

main();
