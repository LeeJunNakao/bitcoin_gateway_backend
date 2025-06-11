export class UserAlreadyRegisteredException extends Error {
  constructor() {
    super('User already registered');
  }
}
