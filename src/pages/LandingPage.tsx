import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import SideNav from '../components/SideNav';

const LandingPage: React.FC = () => {
  return (
    <div className="p-5 w-full">
      <Navbar />
      <div className='pageContainer mt-24 md:flex md:flex-row md:mx-auto md:w-5/9 gap-10'>
        <SideNav></SideNav>
        <div className='xl:w-4/5'>
          <div className='landingHeaderContainer flex justify-between items-end'>
            <h1 className="text-md lg:text-2xl font-bold pl-6">FAVORITES</h1>
          </div>
          <div className='favoritesCardContainer mt-6 flex gap-4 overflow-x-auto p-2'>
            <Card children={undefined}></Card>
            <Card children={undefined}></Card>
          </div>
          <div className='landingHeaderContainer flex justify-between items-end pt-8'>
            <h1 className="text-md lg:text-2xl font-bold pl-6">YOUR BOARDS</h1>
            <Button className="bg-nurple text-white">Create</Button>
          </div>
          <div className="cardContainer mt-6 flex gap-4 overflow-x-auto p-2">
            <Card children={undefined}></Card>
            <Card children={undefined}></Card>
            <Card children={undefined}></Card>
            <Card children={undefined}></Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 