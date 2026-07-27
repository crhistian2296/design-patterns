/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean,
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  displayState() {
    console.log(`\tContent: ${this.content}`);
    console.log(`\tCursor Position: ${this.cursorPosition}`);
    console.log(`\tUnsaved Changes: ${this.unsavedChanges}`);
  }

  copyWith({
    content,
    cursorPosition,
    unsavedChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges,
    );
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1; // Índice del estado actual en el historial (-1 significa que no hay estados aún)

  save(state: CodeEditorState) {
    if (this.currentIndex < this.history.length - 1) {
      // Si hay estados "adelante" en el historial, eliminarlos
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    console.log("%cNo more states to undo.", COLORS.red);
    return null;
  }

  printState() {
    console.log(this.history);
  }
}

function main() {
  // let initialState = new CodeEditorState("initial state", 5, false);
  // console.log("%cEditorState before:", COLORS.cyan);
  // initialState.displayState();
  // initialState = initialState.copyWith({
  //   content: "final state!",
  //   cursorPosition: 4,
  //   unsavedChanges: true,
  // });
  // const history = new CodeEditorHistory();
  // history.save(initialState);
  // console.log("\n%cEditorState after:", COLORS.green);
  // initialState.displayState();
  // initialState = history.undo()!;
  // console.log("\n%cEditorState final undo:", COLORS.green);
  // initialState.displayState();
  const history = new CodeEditorHistory();
  let state: CodeEditorState | null = new CodeEditorState(
    "initial state",
    5,
    false,
  );
  history.save(state);
  console.log("%cEditorState before:", COLORS.cyan);
  state.displayState();

  state = state.copyWith({
    content: "EditorState after change",
    cursorPosition: 2,
    unsavedChanges: true,
  });
  console.log("\n%cEditorState after:", COLORS.green);
  state.displayState();

  state = state.copyWith({
    unsavedChanges: false,
  });
  history.save(state);
  console.log("SAVED!");

  state = history.undo();
  console.log("%cEditorState after ctrl + z:", COLORS.pink);
  if (state) state.displayState();

  // Sin haber guardado
  state = history.redo();
  console.log("%cEditorState after ctrl + y:", COLORS.pink);
  if (state) state.displayState();
}

main();
