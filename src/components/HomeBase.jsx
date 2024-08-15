import { Link } from "react-router-dom"

const HomeBase = () => {
  return (
    <nav className='HomeBase'>
      <h2>
        <Link to={`/`}>Blog</Link>
      </h2>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to={`/cad`} className="btn-cadastro">Cadastro</Link>
        </li>
        <li>
          <Link to={`/edi`} className="btn-edit">Edit</Link>
        </li>
      </ul>
    </nav>
  )
}

export default HomeBase
