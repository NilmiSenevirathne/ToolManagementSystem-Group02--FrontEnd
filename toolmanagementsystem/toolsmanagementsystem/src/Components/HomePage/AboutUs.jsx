import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import vision from '../../../src/images/vision_1.png';
import mission from '../../../src/images/mission.jpeg';
import about from '../../../src/images/aboutUS.jpeg';
import './about.css';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="about-us-content">

        {/*vision */}
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src={vision}/>
          <div className="card-body">
            <h5 className="card-title">Vision</h5>
            <p className="card-text">To become the leading reliable Engineering Solution provider in the Electromechanical field in Sri Lanka.</p>
          </div>
        </div>

        {/* Mission */}
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src={mission}/>
          <div className="card-body">
            <h5 className="card-title">Mission</h5>
            <p className="card-text">To provide an excellent qualitative level of professional and project management services with the high sense of responsibility to our clients and business associates.</p>
          </div>
        </div>
        

        {/* about us */}
        <div className="card-aboutus" style={{ width: "80rem", marginTop:"20px" }}>
          <img className="card-img-top" src={about}/>
          <div className="card-body">
            <h5 className="card-title">Dilum BMK in Brief</h5>
            <p className="card-text">Dilum BMK Engineers (Pvt) Ltd are experts in supplying better & sustainable engineering services to the nation. 
            It was established as a partnership business in June 2000 and incorporated as a Limited Liability Company in October 2002.
            Throughout its history, BMK cranes have been an industry Leader in both technological and product advancements, 
            Contributing to its long-standing reputation as a manufacturer of high-quality Material Handling Equipment. During these years of operations, 
            BMK CRANES has established itself as a trusted manufacturer of quality Material Handling Equipment.
            Dilum BMK Engineers has a strong reputation in key industries such as; Water Treatment Plant, 
            Wastewater Treatment Plant, Building Service Engineering, Steel Fabrication, Testing & Commissioning Works,
            Load Testing and General Engineering Industries Throughout Sri Lanka.
            During past period BMK Engineers (Pvt) Ltd has completed the successful
            installation of several water treatment plants for National Water Supply & Drainage Board (NWSDB), 
            Sri Lanka and in the process, BMK had joint working experience with companies overseas</p>
          </div>
        </div>
       

        {/* Corporate information */}
        <div className="card-information" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Corporate Information</h5>
            <p className="card-text">
             Name : Dilum BMK Engineers(Pvt)Ltd<br/>
             Business Register No: PV80685 <br/>
             Date of Incorporation: 16<sup>th</sup> August 2011
            </p>
          </div>
        </div>
          
        {/* manager details */}
        <div className="card-manager" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Managing Director</h5>
            <p className="card-text">
            Mr. Dilum Samaranayake<br/>
            Dilum is the Managing Director of Dilum BMK Engineers (Pvt) Ltd. 
            with well over 25 years’ experience in the industry. 
            He graduated from the University of Peradeniya, Sri Lanka, 
            and started his career as a Mechanical Engineer at the Bandaranayake Engineering Services in 1993.
            After two years experience as an Engineering Manager with the BMK Enterprises, 
            he spent nine years in BMK Project Engineers (Pvt) Ltd as Director.
            Having gained 18 years working experience in the industry, 
            he becomes a Managing director in Dilum BMK Engineers (Pvt) Ltd. 
            Presently it has become the leading overhead 
            travelling Cranes Manufacturing company  & Mechanical Contractors in Sri Lanka.
            </p>
          </div>
        </div>
       

        {/* director details */}
        <div className="card-director" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Director Operation</h5>
            <p className="card-text">
            Mr. Nimal Dharmasiri <br/>
            Dharmasiri is one of the founding members of the
            Dilum BMK Engineers (Pvt) Ltd and is an Executive Director
            of the company. Starting his career as an Engineer for 
            the Bandaranayake Engineering Services in 1991, 
            he left BMK Project Engineers (Pvt) Ltd in 2011 as
            a Director to join Dilum BMK Engineers (Pvt) Ltd.
            As of today, he counts more than 25 years of experience 
            in the Mechanical services industry and is an expert 
            in overhead crane manufacturing.
            </p>
          </div>
        </div>
        
          
        

       
        </div>
      </div>
    
  );
}

export default AboutUs;
