import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="p-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Your Boards</h1>
      <p>This is where your list of boards will appear.</p>
      <div className="mt-6">
        <Link to="/board/1" className="text-blue-500 underline hover:text-blue-700">Go to Board 1</Link>
      </div>
      <Button className="bg-blue-500 text-white">Create</Button>
    </div>
  );
};

export default LandingPage; 