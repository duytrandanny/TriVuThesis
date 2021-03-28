import {Link} from 'react-router-dom';

function Header() {
  return(
    <span className="row mt-5 ">
        <span className="col-1" />
        <span className="col-1">
          <Link to='/start'>
            <img className="App-logo" alt="entropy logo" src={process.env.PUBLIC_URL + '/entropy-logo.png'} />
          </Link>
        </span>
        <span className="col-7" />
        <span className="col-1">
            <Link to="/howtoplay"><h6>HOW TO PLAY</h6></Link>
        </span>
        <span className="col-1">
            <Link to="/aboutus"><h6>ABOUT US</h6></Link>
        </span>
        <span className="col-1" />
    </span>)
};

export default Header;