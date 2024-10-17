import '../styles/Home.css'
import ComputerScience from '../assets/ComputerScience.jpg'
import CatagoryCard from '../components/CatagoryContainer'

export default function HomePage() {
  return <>
    <div className="frontpage">
      <h1 className="title">Find the right path for you!</h1>
      {/* <img className="images" src={ComputerScience}></img> */}
      <p className="mission">
        Our mission is to empower low-income and lower-middle-class students. We aim to help students discover diverse educational
        programs that lead to successful careers, ensuring they have the opportunities and resources needed to pursue
        fulfilling paths that align with their financial realities
      </p>
    </div>
    <div>
      <CatagoryCard />
    </div>

  </>
}