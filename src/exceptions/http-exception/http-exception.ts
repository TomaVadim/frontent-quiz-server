export class HttpException extends Error {
  public status: number;
  public message: string;
  public errorCode: string;

  constructor(status: number, message: string, errorCode?: string) {
    super(message);
    this.message = message;
    this.status = status;
    this.errorCode = errorCode || "GENERAL_ERROR";
  }
}
