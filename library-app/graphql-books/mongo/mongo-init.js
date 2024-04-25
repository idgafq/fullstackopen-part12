db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});
db.createCollection('authors')

const author1 = db.authors.insertOne({ name: 'Robert Martin', born: 1952 })
const author2 = db.authors.insertOne({ name: 'Martin Fowler', born: 1963 })

db.createCollection('books')

db.books.insert({ title: 'Clean Code', published: 2008, author: author1.insertedId, genres: ['refactoring'] })
db.books.insert({ title: 'Refactoring, edition 2', published: 2018, author: author2.insertedId, genres: ['refactoring'] })

db.createCollection('users')

db.users.insert({ username: 'targetdummy', favoriteGenre: 'refactoring' })