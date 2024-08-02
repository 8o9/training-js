export class UserIDLengthError extends Error {
  userId: string;
  constructor(userId: string) {
    super(
      `please enter a user id, at leat 4 char long. current id is ${userId}`,
    );
    this.userId = userId;
  }

  get name(): string {
    return "UserIDLengthError";
  }
}
