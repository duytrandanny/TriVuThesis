import {Link} from 'react-router-dom';

function Header() {
  return(
    <span className="d-flex ">
        <span className="">
          <Link to='/start'>
            <img className="App-logo" alt="entropy logo" src={process.env.PUBLIC_URL + '/entropy-logo.png'} />
          </Link>
        </span>
        <span className="d-flex ml-auto">
            <Link to="/about" className="pr-2"><h6>ABOUT</h6></Link>
            <Link to="/contact"><h6>CONTACT</h6></Link>
        </span>
    </span>)
};

export default Header;