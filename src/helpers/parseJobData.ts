import { Instruction } from '../services/PrinterService';

interface ParsedJob {
  error?: string;
  instructions?: Instruction[];
}

const instructionRegex = /(".*?")|([^ ]+)/g

export function parseJobData(data: string) {
  const instructions = data.split('\n');

  if (instructions.length == 0) {
    return { error: `No instructions in the Job` };
  }

  const parsedInstructions: Instruction[] = new Array<Instruction>();

  instructions.forEach(instruction => {
    const parts = instruction
      .match(instructionRegex)
      .map((arg: string) => arg.replace(/^\"|\"$/g, ''));

    const command = parts[0];
    const args = parts.splice(1);

    // @TODO Validate

    parsedInstructions.push({ command, args })
  })

  return { instructions: parsedInstructions };
}
