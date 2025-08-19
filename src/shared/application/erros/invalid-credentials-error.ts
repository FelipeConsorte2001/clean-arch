export class IvalidCredentialsError extends Error {
  constructor(public message: string) {
    super(message)
    this.name = 'IvalidCredentialsError'
  }
}
