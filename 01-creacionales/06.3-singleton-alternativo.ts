/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 */

class ConfigManager {
  private config: Record<string, string> = {};

  setConfig(key: string, value: string): void {
    console.log(`Estableciendo configuración: ${key} = ${value}`);
    this.config[key] = value;
  }

  getConfig(key: string): string | undefined {
    console.log(`Obteniendo configuración para la clave: ${key}`);
    return this.config[key];
  }

  getAllConfigs(): Record<string, string> {
    console.log("Configuraciones actuales:", this.config);
    return this.config;
  }
}

export const configManager = new ConfigManager();
