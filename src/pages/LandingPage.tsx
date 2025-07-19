import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';

const LandingPage: React.FC = () => {
  return (
    <div className="p-8 w-full">
      <Navbar />
      <div id='pageContainer' className='mt-20'>
        <div id='landingHeaderContainer' className='flex justify-between'>
          <h1 className="text-3xl font-bold mb-4">Your Boards</h1>
          <Button className="bg-blue-500 text-white">Create</Button>
        </div>
        <div id='sideNavContainer'>
          <p id='sideNavLink'> <span className='pr-2'><FontAwesomeIcon icon={faHouse} /></span>Home</p>
          <p id='sideNavLink'> <span className='pr-2'><FontAwesomeIcon icon={faWindowMaximize}/></span>Boards</p>
          <hr />
          <p id='sideNavLinkList'>Board A<span className='pl-2'><FontAwesomeIcon icon={faCaretRight}/></span></p>
          <div>
            <p id='sideNavLinkListItem'> <span className='pr-2'><FontAwesomeIcon icon={faPeopleGroup}/></span>Members</p>
            <p id='sideNavLinkListItem'> <span className='pr-2'><FontAwesomeIcon icon={faGear}/></span>Settings</p>
          </div>
          <p id='sideNavLinkList'> Board B <span className='pl-2'><FontAwesomeIcon icon={faCaretRight}/></span> </p>
        </div>
          <Link id='card' to="/board/1" className="text-blue-500 underline hover:text-blue-700">Go to Board 1</Link>
        <div id='cardContainer' className="mt-6 w-full">
          <Card children={undefined}></Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 