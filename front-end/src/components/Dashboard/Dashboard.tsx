import './Dashboard.css';
import logo from '../../assets/logo512.png';
import Navbar from './Navbar';

export type DashboardProps = {
  children: any;
};

const Dashboard = (props: DashboardProps) => {
  return (
    <div className="dashboard--container dashboard--sidebar">
      <div className="dashboard-header--container">
        <div className="dashboard-header">
          <div className="dh__logo">
            <img src={logo} alt="logo" />
          </div>
          <p className="dh__text">WidaTech</p>
        </div>
      </div>
      <div className="dashboard-sidebar">
        <div className="ds__menu">
          <Navbar />
        </div>
      </div>
      <div className="dashboard-content">{props.children}</div>
    </div>
  );
};

export default Dashboard;
