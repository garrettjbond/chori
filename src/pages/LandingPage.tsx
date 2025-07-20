import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';

const LandingPage: React.FC = () => {
  return (
    <div className="p-5 w-full">
      <Navbar />
      <div id='pageContainer' className='mt-25'>
        <div id='landingHeaderContainer' className='flex justify-between items-end'>
          <h1 className="text-md font-bold pl-3">YOUR BOARDS</h1>
          <Button className="bg-nurple text-white">Create</Button>
        </div>
        <div className='sideNavContainer hidden lg:block'>
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
        <div className="cardContainer mt-6 w-full flex gap-4 overflow-x-auto p-2">
          <Card children={undefined}></Card>
          <Card children={undefined}></Card>
          <Card children={undefined}></Card>
          <Card children={undefined}></Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 