import React from 'react';

const CreateToolbox = () =>{
     const fName="manji";
     const LName ="anusari";

     const getFullName =(f,n) =>{
          return `${f},${n}`;
     }

     const arr =["apple","orange","mango"];
    return(
      
         <div>
          <p>fullname :{getFullName("manuji" ,"jhon")}</p>
              <h1> Create Toolbox </h1>
          <p>{fName} like to eat {arr[0
               
          ]}</p>
         </div>
     
    );
};
export default CreateToolbox;