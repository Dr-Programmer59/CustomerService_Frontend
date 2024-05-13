'use client';
import React, { useEffect, useState } from 'react';
import StepA from './StepA';
import StepB from './StepB';
import StepC from './StepC';
import StepD from './StepD';
import StepFinal from './StepFinal';
import axios from 'axios';
// This is the parent component.
// This component will control and manage steps and data

// Step A: Customer Identity Info
// Step B: Customer Business Info
// Step C: Customer Financial Info
// Step D: Confirm Form  Data

// Step Final: Succes Result
import { useDispatch } from 'react-redux'
import { login, register } from '@/lib/actions/user';
import Signup from '@/app/signup/page';
import Erorr from '@/components/Erorr';
const initialFormData = {
  profileImage:'',
  name: '',
  lastName: '',
  username: '',
  email: '',
  city:'',
  password:'',
  category:'',
  agreeToTerms: false,
};
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
  withCredentials: true,
})

 
const stepsArray = ['A', 'B', 'C', 'D'];

const SimpleMultiStepForm = ({ showStepNumber }) => {
  const [step, setStep] = useState('A');
  const [formData, setFormData] = useState(initialFormData);
  const dispatch=useDispatch();
  const [error, seterror] = useState(false)
  // We need a method to go to next step
  const handleNextStep = () => {
    seterror(false)
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('C');
    else if (step === 'C') setStep('D');
  };

  // We need a method to go to prev step
  const handlePrevStep = () => {
    seterror(false)
    if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };

  // We need a method to update our formData
  const handleChangeInput = (event) => {
    
    const fieldName = event.target.name;
    let fieldValue;
    if (fieldName === 'agreeToTerms') {
      fieldValue = event.target.checked;
    } else {
      console.log("handling")
      fieldValue = event.target.value;
    }
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };
  

  // We need a method to do final operation
  const handleSubmitFormData =  async () => {
    // Here You can do final Validation and then Submit Your form
    if (!formData.agreeToTerms) {
      alert('Error!!!!!!   You must agree to Terms of Services!!!!');
    } else {
      try {
      // Wait for the register function to complete 
      let res = await dispatch(register(formData));
      if(res){
        setStep('Final')
      }
      else{
        seterror(true)

      }
      } catch (error) {
        console.error('Error occurred during registration:', error);
      }
      

    
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Section for render StepNumbers
  const renderTopStepNumbers = () => {
    if (!showStepNumber || step === 'Final') {
      return null;
    }
    return (
      <section className='mt-2 mb-4 flex justify-between'>
       
        {stepsArray.map((item) => (
          <div
            key={item}
            className={`w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer ${
              item === step ? 'bg-blue-500' : ''
            }`}
            onClick={() => setStep(item)}
          >
            
            {item}
          </div>
        ))}
      </section>
    );
  };

  return (
    <div className='w-[600px] max-w-full px-6 py-1 mx-auto rounded-lg border-2 border-dotted border-sky-300'>
      
      {renderTopStepNumbers()}
      {
          error?
          <Erorr title={"Error"} message={"something went wrong :("}/>:""
        }
      {/* // Render Steps */}
      {step === 'A' ? (
        <StepA
          formData={formData}
          setFormData={setFormData}
          handleChangeInput={handleChangeInput}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === 'B' ? (
        <StepB
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === 'C' ? (
        <StepC
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === 'D' ? (
        <StepD
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleSubmitFormData={handleSubmitFormData}
        />
      ) : null}
      {step === 'Final' ? <StepFinal /> : null}
      
    </div>
  );
};

export default SimpleMultiStepForm;
