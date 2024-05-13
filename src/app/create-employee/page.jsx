import React from 'react';
import SimpleMultiStepForm from './components/SimpleMultiStepForm';

const page = () => {
  return (
    <div className='bg-white rounded-lg mx-4 p-4'>
      <h1 className='text-blue-400 text-2xl'>Create Employee</h1>
      <br />
      <br />
      <br />
      <SimpleMultiStepForm showStepNumber={true} />
    </div>
  );
};

export default page;
