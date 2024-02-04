export function checkForWhereClause(commands: string) {
  const commandsSplit = commands
    .split(/;/gi)
    .filter((c) => c.match(/(update)|(delete)/gi) && !c.startsWith("--"));

  let containsInvalidCommands: boolean | null = false;

  for (const command of commandsSplit) {
    containsInvalidCommands =
      !command.match(/where/gi) && (command.match(/(--)/gi)?.length ?? 0) === 0;

    if (containsInvalidCommands) {
      break;
    }
  }

  return containsInvalidCommands;
}
