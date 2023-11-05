import React from "react"
import musicIcon from "../../assets/icons/itunes.png"
import image1 from "../../assets/photos/RorysLK image1.png"
import "./landing.css"


const Landing = () => {


  return (
    <section id="landing">
      <div className="landing__page" >
        <div className="landing__text">
          <p id="landing__quote">LIVE <span className="landing__highlight">ACOUSTIC</span> KARAOKE</p>
          <p id="landing__info">750+ songs, full lyric projection. Taking bookings now for parties and business events. Singing along is a state of mind.</p>
          <div className="landing__btns">
            <button className="landing__btn" id="book__btn">Book</button>
            {/* add href for browse songs button to scroll to songs page */}

            <a href="#search" className="landing__browse">
              <div id="landing__btn"> 
                <img src={musicIcon} className="landing__icon"></img>
              </div>
              <div className="landing__btn" id="browse__btn">Browse Songs</div>
            </a>
          </div>
        </div>
      </div>
    </section>
    
  )
}

export default Landing
