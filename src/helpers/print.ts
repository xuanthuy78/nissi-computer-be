import chalk from "chalk";

const OutputType: { [index: string]: string } = {
  INFORMATION: "INFORMATION",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

const print = (message: string, outputType: string) => {
  switch (outputType) {
    case OutputType.INFORMATION:
      console.log(chalk.white(message));
      break;
    case OutputType.SUCCESS:
      console.log(chalk.green(message));
      break;
    case OutputType.WARNING:
      console.log(chalk.yellow(message));
      break;
    case OutputType.ERROR:
      console.log(chalk.red(message));
      break;
    default:
      console.log(chalk.white(message));
  }
};
export { OutputType, print };
