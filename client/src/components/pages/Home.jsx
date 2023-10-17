import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import Cards from '../Cards';
export default function Home(props) {
   

    const [search, setSearch] = useState("");
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
       
        let res = await fetch("https://bookapp-xrlg.onrender.com/foodData",
            {
                method: "POST",
                header: { "Content-type": "application/json" }
            })

        res = await res.json();
        setFoodItem(res[0]);
        setFoodCat(res[1]);

    }
    return (
        <>
        <div id="carouselExample" className="carousel"  style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id="carousel" >
        <div className='carousel-caption' style={{"zIndex":"10"}}>
            <div className="form-inline d-flex justify-content-center">
              <input className="form-control mr-sm-2" type="search" placeholder="Search Book..." aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
              
            </div>
          </div>
 
          <div className="carousel-item active">
          <img
              src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1512&q=80"
              style={{ objectFit: "contain", width: "100%", height: "100%", filter: "brightness(30%)" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
          <img
              src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1512&q=80"
              style={{ objectFit: "contain", width: "100%", height: "100%", filter: "brightness(30%)" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
          <img
              src="https://images.unsplash.com/photo-1521123845560-14093637aa7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
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

            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3 text-center text-danger fs-1'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />

                                    {foodItem !== [] ?
                                        foodItem.filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                                                        <Cards foodItem={filterItems} options={filterItems.options[0]} />
                                                    </div>
                                                )
                                            })
                                        : <div>No data Found</div>}

                                </div>

                            )
                        })
                        : ""
                }


            </div>

            <Footer />
        </>
    )
}
