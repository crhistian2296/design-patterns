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
 */

import { COLORS } from "../helpers/colors.ts";

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    if (fields.length === 0) {
      this.fields = ["*"];
    } else {
      this.fields = fields;
    }
    return this;
    // throw new Error('Method not implemented.');
  }

  where(condition: string): QueryBuilder {
    if (!condition) {
      throw new Error("Condition cannot be empty.");
    }
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): QueryBuilder {
    if (!field || (direction !== "ASC" && direction !== "DESC")) {
      throw new Error(
        "Field cannot be empty and direction must be 'ASC' or 'DESC'.",
      );
    }

    this.orderFields.push(`${field} ${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    if (count <= 0) {
      throw new Error("Limit must be a positive number.");
    }
    this.limitCount = count;
    return this;
  }

  execute(): string {
    // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
    const selectClause = `SELECT ${this.fields.join(", ")} FROM ${this.table}`;

    const whereClause =
      this.conditions.length > 0
        ? `WHERE ${this.conditions.join(" AND ")}`
        : "";
    const orderByClause =
      this.orderFields.length > 0
        ? `ORDER BY ${this.orderFields.join(", ")}`
        : "";
    const limitClause = this.limitCount ? `LIMIT ${this.limitCount}` : "";

    return `${selectClause} ${whereClause} ${orderByClause} ${limitClause}`
      .replace(/\s+/g, " ")
      .trim()
      .concat(";");
  }
}

function main() {
  const usersQuery = new QueryBuilder("users")
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'") // Esto debe de hacer una condición AND
    .orderBy("name", "DESC")
    .limit(10)
    .execute();

  console.log("%cConsulta:\n", COLORS.blue);
  console.log(usersQuery);
}

main();
