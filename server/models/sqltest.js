SELECT messages.id id, messages.contents contents, rooms.name roomname, users.name username
FROM messages
  INNER JOIN rooms
    ON messages.room_id = rooms.id
  INNER JOIN users
    ON messages.user_id = users.id