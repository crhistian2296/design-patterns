/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class DocFile {
  public title: string;
  public content: string;
  public author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  clone(): DocFile {
    return new DocFile(this.title, this.content, this.author);
  }

  displayInfo() {
    console.log(`%cTitle: ${this.title}`, "color: blue; font-weight: bold;");
    console.log(`%cContent: ${this.content}`, "color: gray;");
    console.log(`%cAuthor: ${this.author}`, "color: green;");
  }
}

function main() {
  const originalDocument = new DocFile(
    "Prototype Pattern",
    "El patrón Prototype permite crear nuevos objetos copiando instancias existentes.",
    "John Doe",
  );
  console.log("originalDocument:", originalDocument);
  originalDocument.displayInfo();

  const clonedDocument = originalDocument.clone();
  clonedDocument.title = "Cloned Prototype Pattern";
  console.log("clonedDocument:", clonedDocument);
  clonedDocument.displayInfo();
}

main();
