import React from 'react'

export default function Carousel() {
  return (
    <div>
      <div>
      <div id="carouselExample" className="carousel"  style={{objectFit:"contain !important"}}>
        
        <div className="carousel-inner" id="carousel" >
        <div className='carousel-caption' style={{"zIndex":"10"}}>
            <form className="form-inline d-flex">
              <input className="form-control mr-sm-2" type="search" placeholder="Search Food..." aria-label="Search" />
              <button className="btn btn-outline-success text-white mx-2 my-sm-0 " type="submit">Search</button>
            </form>
          </div>

          <div className="carousel-item active">
          <img
              src="https://framerusercontent.com/images/ids45lV7JhgVZGAKUCxhCMWwk.jpeg"
              style={{ objectFit: "contain", width: "100%", height: "100%", filter: "brightness(30%)" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
          <img
              src="https://source.unsplash.com/random/900×700/?pizza"
              style={{ objectFit: "contain", width: "100%", height: "100%", filter: "brightness(30%)" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
          <img
              src="https://source.unsplash.com/random/900×700/?barbeque"
              style={{ objectFit: "contain", width: "100%", height: "100%", filter: "brightness(30%)" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
    </div>
  )
}
