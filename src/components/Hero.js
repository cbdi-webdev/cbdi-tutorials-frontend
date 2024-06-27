import logo from '../assets/images/cbdilogo.png';



function Hero(){
     return(
          <div className="hero-container">
               <div className="herologo-img-container">
                    <img src={logo} className="herologo-img-container" />
               </div>
               <div className="hero-gradient"></div>
          </div>
     );
}

export default Hero;