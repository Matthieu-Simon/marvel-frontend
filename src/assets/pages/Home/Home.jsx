import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
// import Image from '../../img/Banner.jpg';
import Image1 from '../../img/Banner2.jpeg';
import Image2 from '../../img/Banner3.jpeg';
import Image3 from '../../img/IronMan.png';

export default function Home () {
    return (
        <>
            <div className="carousel-container">
                <Carousel
                    infiniteLoop
                >
                    {/* <div>
                        <img src={Image} alt="Banner 1" />
                    </div> */}
                    <div>
                        <img src={Image1} alt="Banner 2" />
                    </div>
                    <div>
                        <img src={Image2} alt="Banner 3" />
                    </div>
                    <div>
                        <img src={Image3} alt="Banner 4" />
                    </div>
                </Carousel>
            </div>
        </>
        
    )
};