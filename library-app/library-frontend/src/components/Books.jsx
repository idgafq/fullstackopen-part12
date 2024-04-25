import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from '../queries'
import { useEffect, useState } from 'react'
import { uniqById } from '../utils/uniqById'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  const allResult = useQuery(ALL_BOOKS)
  const filteredResult = useQuery(ALL_BOOKS, { variables: { genre } })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded
      window.alert(`${bookAdded.title} by ${bookAdded.author.name} was added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: uniqById(allBooks.concat(bookAdded)),
        }
      })
      client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: uniqById(allAuthors.concat(bookAdded.author))
        }
      })
      for (const genre of bookAdded.genres) {
        if (client.cache.readQuery({ query: ALL_BOOKS, variables: { genre } })) {
          client.cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, ({ allBooks }) => {
            return  {
              allBooks: uniqById(allBooks.concat(bookAdded))
            }
          })
        }
      }
    }
  })

  useEffect(() => {
    if (allResult.data) {
      setGenres([...new Set(allResult.data.allBooks.flatMap((b) => b.genres))])
    }
  }, [allResult.data])

  if (!props.show) {
    return null
  }

  if (allResult.loading || filteredResult.loading) {
    return <div>loading...</div>
  }
  
  const books = genre ? filteredResult.data.allBooks : allResult.data.allBooks
  
  return (
    <div>
      <h2>books</h2>

      {genre && <div>in genre <b>{genre}</b></div>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((g) => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      <button key={"all"} onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books