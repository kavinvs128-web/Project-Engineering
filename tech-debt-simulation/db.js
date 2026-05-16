let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
];

async function getAllUsers() {
  return users;
}

async function saveUser(user) {
  user.id = users.length + 1; // ❌ bad id generation
  users.push(user);
}

module.exports = {
  getAllUsers,
  saveUser
};
