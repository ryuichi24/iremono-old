import { Logger, LoggerFactory } from '@iremono/util';
import { SqliteDatabase } from '../sqlite-database';

export abstract class SqliteRepository<TEntity extends { id: string }> {
  protected readonly _logger: Logger;

  constructor(loggerFactory: LoggerFactory) {
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  public async save(entity: TEntity): Promise<TEntity> {
    const entityExists = !!(await this.findOneById(entity.id));

    if (!entityExists) await this._insert(entity);
    if (entityExists) await this._update(entity);

    return entity;
  }

  protected async _readOneQuery(query: string, values: any[]) {
    const result = (await SqliteDatabase.getConnection().get(query, values)) as any;
    this._logger.debug(`[query="${query}", \nvalues="[${values}]", \nresult="${JSON.stringify(result, null, '\t')}"]`);
    return result;
  }

  protected async _readQuery(query: string, values: any[]) {
    const result = (await SqliteDatabase.getConnection().all(query, values)) as any[];
    this._logger.debug(`[query="${query}", \nvalues="[${values}]", \nresult="${JSON.stringify(result, null, '\t')}"]`);
    return result;
  }

  protected async _writeQuery(query: string, values: any[]) {
    await SqliteDatabase.getConnection().run(query, values);
    this._logger.debug(
      `[query="${query}", \nvalues="[${values}]", \nresult="${JSON.stringify('no result', null, '\t')}"]`,
    );
  }

  public abstract findOneById(id: string): Promise<TEntity | null>;

  protected abstract _insert(entity: TEntity): Promise<TEntity | null>;

  protected abstract _update(entity: TEntity): Promise<TEntity | null>;

  protected abstract _toEntity(raw: any): TEntity;
}
