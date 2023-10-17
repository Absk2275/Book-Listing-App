import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Cards(props) {


    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();

    const options = props.options;
    const price = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleCart = async () => {

        let book= [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                book= item;
                break;
            }
        }

        if (book!== []) {
            if (book.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
                return
            }
            else if (book.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, img: props.foodItem.img, price: finalPrice, name: props.foodItem.name, description: props.foodItem.description, qty: qty, size: size });
                // await console.log(data);
                return

            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, img: props.foodItem.img, price: finalPrice, name: props.foodItem.name, description: props.foodItem.description, qty: qty, size: size });

    }

    let finalPrice = qty * parseInt(options[size]);
   

    useEffect(() => {
        setSize(priceRef.current.value)
    }, []);



    return (
        <div>
            
            <div className=" card mt-3 m-auto helloHover" style={{ "width": "18rem" }}>               
             <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                <div className="card-body  ">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text " style={{ fontSize: ".7em" }}>{props.foodItem.description}</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded text-white' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded text-white' ref={priceRef} onChange={(e) => setSize(e.target.value)} >
                            {
                                price.map(data => {
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                        
                        {(localStorage.getItem("authToken")) ?
                        <div>
                        <hr>
                        </hr>
                            <button className='btn btn-success justify-center ms-2' onClick={handleCart}>Add to cart</button>
                           </div> : ""}


                    </div>

                </div>
            </div>
        </div>
    )
}


