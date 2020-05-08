export interface FluxAction<Payload> {
  type: string;
  payload: Payload;
  error?: boolean;
  meta?: Object;
}
