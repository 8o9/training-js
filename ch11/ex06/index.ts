export function isEmailAddress(email: string): boolean {
  // WIP (..とdotが2つ来るところでテストエラーになる)
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]+)?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]+)?)*$/;
  return regex.test(email);
}
