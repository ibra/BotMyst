export function getUserByMention(message) {
  let user;
  user = message.mentions.users.first()
    ? (user = message.mentions.users.first())
    : (user = message.author);
  return user;
}
