import Carousel from 'react-bootstrap/Carousel';
import { Image } from "react-bootstrap";

import bmw2 from '../../../assets/bmw2.jpg';
import bmw3 from '../../../assets/bmw3.jpg';
function Carseoul() {
  return (
    <Carousel>
      <Carousel.Item>
        <Image
          src={bmw2}
          alt="1 slide"
          className=" w-100"
          loading="eager"
          style={{ objectFit: "cover", height: "400px" }}
        />
        <div className="position-absolute w-100 p-2 text-left text-white"
          style={{ top: "100px" }} >
          <h1>Shift into Gear : </h1>
          <h1>Your Destinction</h1>
          <h1>for Car Excellence</h1>
          <h6 className='text-danger'>Drive Your Dream Find Your Car Perfect Today</h6>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src={bmw3}
          alt="2 slide"
          className=" w-100"
          loading="lazy"
          style={{ objectFit: "cover", height: "400px" }}
        />
        <div className="position-absolute w-100 p-2 text-left text-white"
          style={{ top: "100px" }}>
          <h1>Unlock Your Drive : </h1>
          <h1>Explore , Compare</h1>
          <h6 className='text-success'>Where Every Journey Begins with the Right Car</h6>
        </div>
      </Carousel.Item>
    </Carousel>
  );

}

export default Carseoul;