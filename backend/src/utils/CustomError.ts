export class CustomError extends Error {
  code: string | undefined;

  constructor(
    message: string,
    public statusCode: number,
    public publicMessage: string
  ) {
    super(message);
  }
}
