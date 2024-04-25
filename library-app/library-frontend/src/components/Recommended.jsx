import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'
import { useEffect, useState } from 'react'

const Recommended = ({ show, token }) => {
  const [genre, setGenre] = useState(null)

  const genreResult = useQuery(FAVORITE_GENRE)

  useEffect(() => {
    genreResult.refetch()
    if (genreResult.data) {
      if (genreResult.data.me) {
        setGenre(genreResult.data.me.favoriteGenre)
      } else {
        setGenre(null)
      }
    }
  }, [token, genreResult.data])

  const result = useQuery(ALL_BOOKS, { variables: { genre } })

  if (! show) {
    return null
  }

  if (!token) {
    return <div>not logged in</div>
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  const books = result.data.allBooks
  
  return (
    <div>
      <h2>recommendations</h2>

      {genre && <div>books in your favorite genre <b>{genre}</b></div>}

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
    </div>
  )
}

export default Recommended