import { stringColorChanger } from './string-color-changer';
import { LoggingLevel } from './logging-level';

export class Logger {
  private _moduleName: string;
  private _minLevel: LoggingLevel;

  public get moduleName() {
    return this._moduleName;
  }

  constructor(moduleName: string, minLevel: LoggingLevel) {
    this._moduleName = moduleName;
    this._minLevel = minLevel;
  }

  public trace = (...object: any[]) => {
    this._log(LoggingLevel.Trace, ...object);
  };
  public debug = (...object: any[]) => {
    this._log(LoggingLevel.Debug, ...object);
  };
  public info = (...object: any[]) => {
    this._log(LoggingLevel.Info, ...object);
  };
  public warn = (...object: any[]) => {
    this._log(LoggingLevel.Warn, ...object);
  };
  public error = (...object: any[]) => {
    this._log(LoggingLevel.Error, ...object);
  };

  private _log = (level: LoggingLevel, ...object: any[]) => {
    if (level < this._minLevel) return;

    const loggingEntry = {
      moduleName: this._moduleName,
      message: object,
      level,
      location: this._getLoggingLocation(),
      dateTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };

    switch (level) {
      case LoggingLevel.Trace: {
        console.trace(
          stringColorChanger.toDARK_GRAY(loggingEntry.dateTime),
          stringColorChanger.toBLUE('[TRACE]'),
          `(${loggingEntry.moduleName})`,
          stringColorChanger.toDARK_GRAY(`${loggingEntry.location}`),
        );
        console.log(...loggingEntry.message);
        break;
      }

      case LoggingLevel.Debug: {
        console.debug(
          stringColorChanger.toDARK_GRAY(loggingEntry.dateTime),
          stringColorChanger.toGREEN('[DEBUG]'),
          `(${loggingEntry.moduleName})`,
          stringColorChanger.toDARK_GRAY(`${loggingEntry.location}`),
        );
        console.log(...loggingEntry.message);
        break;
      }

      case LoggingLevel.Info: {
        console.info(
          stringColorChanger.toDARK_GRAY(loggingEntry.dateTime),
          stringColorChanger.toCYAN('[INFOsss]'),
          ` (${loggingEntry.moduleName})`,
          stringColorChanger.toDARK_GRAY(`${loggingEntry.location}`),
        );
        console.log(...loggingEntry.message);
        break;
      }

      case LoggingLevel.Warn: {
        console.warn(
          stringColorChanger.toDARK_GRAY(loggingEntry.dateTime),
          stringColorChanger.toYELLOW('[WARN]'),
          ` (${loggingEntry.moduleName})`,
          stringColorChanger.toDARK_GRAY(`${loggingEntry.location}`),
        );
        console.log(...loggingEntry.message);
        break;
      }

      case LoggingLevel.Error: {
        console.error(
          stringColorChanger.toDARK_GRAY(loggingEntry.dateTime),
          stringColorChanger.toRED('[ERROR]'),
          `(${loggingEntry.moduleName})`,
          stringColorChanger.toDARK_GRAY(`${loggingEntry.location}`),
        );
        console.log(...loggingEntry.message);
        break;
      }

      case LoggingLevel.Fatal: {
        break;
      }
    }
  };

  private _getLoggingLocation() {
    const err = new Error();
    const stacks = err.stack!.split('\n');
    let index = 1;
    while (index < stacks?.length && stacks[index].includes(`at ${this.constructor.name}`)) index++;
    const loggingLocation = stacks[index].slice(stacks[index].indexOf('at ') + 3, stacks[index].length);
    return loggingLocation;
  }
}
