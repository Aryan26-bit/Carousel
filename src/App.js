import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 
import { FaSquareFull } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { RiArrowLeftSLine } from "react-icons/ri";
import { IoTriangleSharp } from "react-icons/io5";

const App = () => {
  const [plans, setPlans] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios
      .get('https://qa7.parentune.com/api/subscription/subscribe/v2/plans')
      .then((response) => {
        setPlans(response.data.data);
      })
      .catch((error) => console.error('Error fetching plans:', error));
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % plans.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
  };

  return (
    <div className="carousel-container">

      <header className='carousel-header'>
        <div className='top-header'>
<span><FaSquareFull /></span>
<span><FaCircle /></span>
<span><IoTriangleSharp /></span>

        </div>
        <div className='carousel-header-content'>
        <span><RiArrowLeftSLine /></span>
      
      <span className='header-title'>Choose your plan</span>
      </div>
      </header>
      <div className="carousel-wrapper">
        {plans.map((plan, index) => (
          <div
            key={plan.plan_id}
            className={`carousel-card ${index === activeIndex ? 'active' : ''}`}
          >
            <img src={plan.banner} alt={`${plan.plan_name} Plan`} className="plan-banner" />
            <div className="plan-content">
              <button className="plan-card-name" style={{
    backgroundImage: `url(${plan.button_background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}>
                
              <span style={{textAlign:"right"}} className='plan-tag'>{plan.tagged_as}</span>
      
               <span className="button-layouting">
               
                 <span className='button-title'>{plan.plan_name}</span>
                 <span>{plan.cost_per_day}</span>
                 
                 
                 </span>
                 
                 
                 </button>
              <h3 className='card-main-title'>{plan.claims}</h3>
              <ul className="plan-features">
                {plan.description.data_monthly.map((feature, idx) => (
                  <li key={idx} className={feature.isLocked === 'True' ? 'locked' : ''}>
                    {feature.text}
                  </li>
                ))}
              </ul>
              <button className="cta-button">{plan.cta}</button>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-button left" onClick={handlePrev}>
        &lt;
      </button>
      <button className="carousel-button right" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default App;
