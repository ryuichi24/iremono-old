import { Logger, LoggerFactory } from '@iremono/util';
import { MysqlDatabase } from '..';

export abstract class MysqlRepository<TEntity extends { id: string }> {
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

  protected async _query(query: string, values: any[]) {
    const result = await MysqlDatabase.getConnection().query(query, values);
    this._logger.debug(
      `[query="${query}", \nvalues="[${values}]", \nresult="${JSON.stringify(result[0], null, '\t')}"]`,
    );
    return result[0] as any[];
  }

  public abstract findOneById(id: string): Promise<TEntity | null>;

  protected abstract _insert(entity: TEntity): Promise<TEntity | null>;

  protected abstract _update(entity: TEntity): Promise<TEntity | null>;

  protected abstract _toEntity(raw: any): TEntity;
}
