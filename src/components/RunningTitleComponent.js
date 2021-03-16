import React from 'react';
import Marquee from 'react-smooth-marquee';

const RunningTitleComponent = ({ data }) => <div className="E-runningtitle">
  <Marquee velocity={0.05}>
    <h6>{data}</h6>
  </Marquee>
  <hr className="mt-0" />
</div>



export default RunningTitleComponent;