// booking-processor.ts
import { interval, from, Subscription, Subject } from 'rxjs';
import { exhaustMap, concatMap, catchError, map, filter } from 'rxjs/operators';
import { Repository } from '../types/repository';

async function validateAndProcess(
  data: any,
  repository: Repository<any>,
): Promise<{
  updated?: any;
  notify?: any;
} | null> {
  if (data?.isExec) return null;
  const exist = await repository.exist(data._id);
  const result: any = {};
  data['_doc'].isExec = true;
  result.updated = data;
  result.notify = { ok: exist?.isExec ? false : true, id: data._id };
  return result;
}

export class Processor<T> {
  private repo: Repository<T>;
  private pollIntervalMs: number;
  private sub?: Subscription;
  private processorName = 'Processor';

  // Nuevo: Subject para emitir eventos de resultados procesados
  private subject = new Subject<{ id: string; result: any }>();

  constructor(
    repo: Repository<T>,
    processorName = 'Processor',
    pollIntervalMs = 1000,
  ) {
    this.repo = repo;
    this.pollIntervalMs = pollIntervalMs;
    this.processorName = processorName;
  }

  public get events$() {
    return this.subject.asObservable();
  }

  public start() {
    if (this.sub && !this.sub.closed) return;

    this.sub = interval(this.pollIntervalMs)
      .pipe(
        exhaustMap(() =>
          from(this.repo.getAllDataProcess()).pipe(
            catchError((err) => {
              console.error(
                `[${this.processorName}] Error al obtener la data:`,
                err,
              );
              return from([[] as T[]]);
            }),
          ),
        ),
        concatMap((data: T[]) => {
          if (!data || data.length === 0) return from([] as T[]);
          return from(data);
        }),
        concatMap((data: T) =>
          from(validateAndProcess(data, this.repo)).pipe(
            filter((res) => res !== null && res.notify.ok),
            map((res) => ({ data, result: res })),
            catchError((err) => {
              console.error(
                `[${this.processorName}] Error procesando la data`,
                data['_id'],
                err,
              );
              return from([] as T[]);
            }),
          ),
        ),
      )
      .subscribe({
        next: async (ctx: { data: T; result: any }) => {
          const { data, result } = ctx;

          if (result.updated) {
            try {
              this.subject.next({
                id: data['_id'],
                result:
                  (await this.repo?.updateData(data['_id'], result.updated)) ??
                  null,
              });
            } catch (err) {
              console.error(
                `[${this.processorName}] Error al actualizar la data`,
                data['_id'],
                err,
              );
            }
          }
        },
        error: (err) => {
          console.error(`[${this.processorName}] Error stream:`, err);
        },
        complete: () => {
          console.info(`[${this.processorName}] Stream complete`);
        },
      });

    console.info(
      `[${this.processorName}] started (interval: ${this.pollIntervalMs} ms)`,
    );
  }

  public stop() {
    if (this.sub) {
      this.sub.unsubscribe();
      console.info(`[${this.processorName}] stopped`);
    }
  }

  public isRunning() {
    return !!(this.sub && !this.sub.closed);
  }
}
