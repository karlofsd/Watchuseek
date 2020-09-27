import React from 'react'
import './product.css'
import axios from 'axios'
import Review from '../Review/review'
import {useState,useEffect} from "react"; 
import {useDispatch,useSelector,connect} from 'react-redux'
import {getReviews} from '../../Redux/reviews'

const Product = ({ user, data,review,getReview}) => {
 /*  const dispatch = useDispatch()
  const review = useSelector(store => store.reviews.allReviews) */
  useEffect(() => {
    getReview(data[0].id)
    /* dispatch(getReviews(data[0].id)) */
  },[])

  const [addProduct, setAddProduct] = useState(false);

  const effectAddingToCart = () => {
    return setTimeout(() => {
      setAddProduct(false);
    }, 1000);
  }

  const handleClick = async () => {
    console.log(data[0])
    setAddProduct(true);
    const dataValue = {
      name: data[0].name.toLowerCase(),
      price: data[0].price,
      quantity: 1,
      productId: data[0].id
    };


    if (!localStorage.token) {
      if (!localStorage.carrito) {
        localStorage.setItem("carrito", JSON.stringify({ carrito: [dataValue] }));
        return effectAddingToCart();
      }
      const data = JSON.parse(localStorage.getItem("carrito"));
      data.carrito.push(dataValue);
      localStorage.setItem("carrito", JSON.stringify(data));
      setAddProduct(false);
        return effectAddingToCart();
    };

    await axios.post(`http://localhost:3001/user/${user.id}/carrito`, dataValue);
    return effectAddingToCart();
  }

  return (
      <div className='detail'>
        <div className="card text-center shadow col-10 p-0 mx-auto m-3" >
          <div>
          <div className="card-header p-0">
            <h2 className='title'>{data[0].name = data[0].name.substring(0,1).toUpperCase() + data[0].name.substring(1)}</h2>
            <a href="javascript:history.back(1)" className='btn1' >
            <div >
            <button type="button" className="btn btn-danger">X</button>
          </div></a>
          </div>
          <div className="card-body row">
            <div className='target-prod col-6'>
            <img className='card-img rounded-lg shadow w-50' src={data[0].image}/>
            <hr />
            <h5 className="card-title">Price: $USD {data[0].price}</h5>
            <p className="card-text">Description: {data[0].description = data[0].description.substring(0,1).toUpperCase() + data[0].description.substring(1)}</p>
            <button onClick={()=>handleClick()} className="btn btn-primary rounded-pill">Add to cart</button>
            </div>
            <div className = "col-6">
            <Review user={user} product={data[0].id} review={review} />
            </div>
          </div>
          <div className="card-footer text-muted">
            {data[0].stock} stock.
          </div>
          </div>
        </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getReview : (e) => dispatch(getReviews(e))
})

const mapStateToProps = (state) => ({
  review : state.reviews.allReviews
})
export default connect(mapStateToProps,mapDispatchToProps)(Product)
