import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import Quiz from './pages/Quiz';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import CommunityForum from './pages/CommunityForum';
import ProgramsList from './pages/programsList'
import ProgramInfo from './pages/ProgramInfo';
import AboutUs from './components/aboutUs'

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return <>
    <SiteHeadingAndNav />
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/community-forum' element={<CommunityForum />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/quiz' element={<Quiz />}></Route>
        <Route path='/About-us' element={<AboutUs/>}></Route>
        <Route path='/users/:id' element={<UserPage />} />
        <Route path="/programs/:fieldId" element={<ProgramsList />} />
        <Route path='/program/:id' element={<ProgramInfo />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
  </>;
}