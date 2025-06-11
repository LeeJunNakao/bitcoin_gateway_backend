export class UserAlreadyRegisteredException extends Error {
  constructor() {
    super('User already registered');
  }
}

export class InexistentUserException extends Error {
  constructor() {
    super('User does not exist');
  }
}
