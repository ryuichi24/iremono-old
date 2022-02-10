import { Logger } from './logger';
import { LoggerOptions } from './logger-options';

export class LoggerFactory {
  private _options: LoggerOptions;
  private _loggers: Logger[] = [];

  constructor(options: LoggerOptions) {
    this._options = options;
  }

  public createLogger = (moduleName: string) => {
    if (this._isAlreadyCreated(moduleName))
      throw new Error(`already created logger with the module name: ${moduleName}`);

    const logger = new Logger(moduleName, this._options.miniumLoggingLevel);
    this._loggers.push(logger);
    return logger;
  };

  private _isAlreadyCreated = (moduleName: string) =>
    this._loggers.find((logger) => logger.moduleName === moduleName) ? true : false;
}
