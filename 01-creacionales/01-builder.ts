/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer {
  protected cpu = " cpu - not defined";
  protected ram = " ram - not defined";
  protected storage = " storage - not defined";
  protected gpu? = " gpu - not defined";

  displayConfig(color: string = "color: white"): void {
    console.log(`%cComputer configuration:`, `${color}; font-weight: bold;`);

    console.log(`    CPU: ${this.cpu}
    RAM: ${this.ram}
    Storage: ${this.storage}
    GPU: ${this.gpu}`);
  }
}

class ComputerBuilder extends Computer {
  setCPU(cpu: string): ComputerBuilder {
    this.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.gpu = gpu;
    return this;
  }

  build(): Computer {
    return this;
  }
}

// Uso del patrón Builder

function main() {
  const computer = new ComputerBuilder()
    .setCPU("Intel i9")
    .setRAM("32GB")
    .setStorage("1TB SSD")
    .setGPU("NVIDIA RTX 3090")
    .build();

  computer.displayConfig(COLORS.green);
}

main();
