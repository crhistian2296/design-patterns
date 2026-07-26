/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from "../helpers/colors.ts";

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

interface Meal {
  prepare(): void;
}

interface Drink {
  serve(): void;
}

class Salad implements Meal {
  prepare(): void {
    console.log("...Preparing a %cSalad", COLORS.green);
  }
}

class BeffBurger implements Meal {
  prepare(): void {
    console.log("...Preparing a %cBeff Burger", COLORS.red);
  }
}

class Water implements Drink {
  serve(): void {
    console.log("...Serving a %cWater", COLORS.cyan);
  }
}

class Coke implements Drink {
  serve(): void {
    console.log("...Serving a %cCoke", COLORS.black);
  }
}

interface MealFactory {
  cookOrder(): Meal;
  createDrink(): Drink;
}

class FastFoodFactory implements MealFactory {
  cookOrder(): Meal {
    return new BeffBurger();
  }
  createDrink(): Drink {
    return new Coke();
  }
}

class HealthyMealFactory implements MealFactory {
  cookOrder(): Meal {
    return new Salad();
  }
  createDrink(): Drink {
    return new Water();
  }
}

function main(factory: MealFactory) {
  console.log(
    "%c---> Welcome to the Restaurant:",
    COLORS.purple,
    factory.constructor.name,
  );
  const meal = factory.cookOrder();
  const drink = factory.createDrink();

  meal.prepare();
  drink.serve();
}
// Es importante destacar que el Abstract Factory permite cambiar la familia de objetos que se crean sin modificar el código cliente. Esto facilita la extensión y el mantenimiento del sistema, ya que se pueden agregar nuevas familias de productos sin afectar el código existente.
// Escoger la fabrica antes de ejecutar
main(new FastFoodFactory());
main(new HealthyMealFactory());
