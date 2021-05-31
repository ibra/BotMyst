export function getUserMentioned(message) {
  let user = message.mentions.users.first()
    ? (user = message.mentions.users.first())
    : (user = message.author);

  return user;
}
