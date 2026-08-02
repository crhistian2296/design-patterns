/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 */

import { configManager } from "./06.3-singleton-alternativo.ts";

function main() {
  const config1 = configManager;

  config1.setConfig("theme", "dark");
  config1.setConfig("language", "es");

  const config2 = configManager;

  console.log("Configuración desde config1:", config1.getAllConfigs());
  config2.setConfig("theme", "light");
  console.log("Configuración desde config2:", config2.getAllConfigs());
}

main();
