import "./requiredToolReports.css"

const RequiredToolReport = () => {
  return (
    <div className='Createp'>
      <div className="topbarcontainer">
<div className="topbartext">
      Required Tool Reports
       </div>
      
     </div>
     <div className="table">
     <table class="table caption-top">
  
  <thead>
    <tr>
      <th scope="col">Tool Id</th>
      <th scope="col">Allocated_quantity</th>
      <th scope="col">Description</th>
      <th scope="col">Saved Quantity</th>
      <th scope="col">Tool Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</div>
     </div>
  )
}

export default RequiredToolReport
