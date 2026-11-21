/**
 * Concurrency Queue Limiter
 * Ensures server memory and bandwidth remain protected during concurrent audio proxying & ZIP streams.
 */

class ConcurrencyQueue {
  private activeCount = 0;
  private maxConcurrent: number;

  constructor(maxConcurrent = 10) {
    this.maxConcurrent = maxConcurrent;
  }

  get currentActive(): number {
    return this.activeCount;
  }

  /**
   * Acquire a slot or reject if server queue is at max capacity
   */
  public tryAcquire(): boolean {
    if (this.activeCount >= this.maxConcurrent) {
      return false;
    }
    this.activeCount++;
    return true;
  }

  /**
   * Release an acquired slot
   */
  public release(): void {
    if (this.activeCount > 0) {
      this.activeCount--;
    }
  }

  /**
   * Wrap an async streaming operation with concurrency tracking
   */
  public async run<T>(fn: () => Promise<T>): Promise<T> {
    if (!this.tryAcquire()) {
      throw new Error("QUEUE_FULL");
    }
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

const maxDownloads = Number(process.env.MAX_CONCURRENT_DOWNLOADS) || 12;
export const streamQueue = new ConcurrencyQueue(maxDownloads);

