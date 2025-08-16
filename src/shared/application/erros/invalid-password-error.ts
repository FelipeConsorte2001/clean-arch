export class IvalidPasswordError extends Error {
  constructor(public message: string) {
    super(message)
    this.name = 'IvalidPasswordError'
  }
}
