import '../styles/Home.css'
import { Link } from 'react-router-dom'
import FieldCards from '../components/FieldCards'

export default function HomePage() {
  return <>
    <div className="frontpage">
      <h1 className="title">Find the right path for you!</h1>
      <p className="mission">
        Our mission is to empower low-income and lower-middle-class students. We aim to help students discover diverse educational
        programs that lead to successful careers, ensuring they have the opportunities and resources needed to pursue
        fulfilling paths that align with their financial realities
      </p>
    </div>
    <div>
      <FieldCards />
    </div>
    <h3>Don't know what field to choose?</h3>
    <h4>Take this quiz!</h4>
    <Link to='/quiz'><button type='submit'>Take quiz!</button></Link>

  </>
}