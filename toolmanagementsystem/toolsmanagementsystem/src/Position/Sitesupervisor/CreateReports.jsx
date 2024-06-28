import "./createReports.css";
import Sbar from '../../Components/Sbar';
import { Link } from "react-router-dom";
import Navbr from '../../Components/Navbar/Navbr';
import HandymanIcon from '@mui/icons-material/Handyman';
import AssessmentIcon from '@mui/icons-material/Assessment';

const CreateReports = () => {
  return (
    <div className='create-reports'>
      <Sbar />
      <div className='reports-container'>
       
        <div className="button-container">
          <Link className="button" to="/ToolStatosRep">
            <div className="content">
              <HandymanIcon style={{ fontSize: 60 }} />
              <span>Tool Status Reports</span>
            </div>
          </Link>
          <Link className="button" to="/RequiredToolReport">
            <div className="content">
              <AssessmentIcon style={{ fontSize: 60 }} />
              <span>Required Tool Reports</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateReports;
