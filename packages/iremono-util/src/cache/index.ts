interface CacheItem {
  value: any;
  expiresAt: Date;
}

export class Cache {
  private readonly _cacheItems = new Map<string, CacheItem>();

  constructor() {
    this._watchTimeToLive();
  }

  public set(key: string, value: any, expiresIn: string | number) {
    const cacheItem = this._makeCacheItem(value, expiresIn);
    this._cacheItems.set(key, cacheItem);
  }

  public get(key: string) {
    const cacheItem = this._cacheItems.get(key);
    if (!cacheItem) return null;
    return cacheItem.value;
  }

  public delete(key: string) {
    this._cacheItems.delete(key);
  }

  private _watchTimeToLive() {
    setInterval(() => {
      this._cacheItems.forEach((cacheItem, key) => {
        if (new Date() > cacheItem.expiresAt) this._cacheItems.delete(key);
      });
    }, 1000 * 60);
  }

  private _makeCacheItem(value: any, expiresIn: string | number): CacheItem {
    const parsedExpiresIn = typeof expiresIn === 'number' ? expiresIn : parseInt(expiresIn);
    return { value, expiresAt: new Date(Date.now() + parsedExpiresIn) };
  }
}
