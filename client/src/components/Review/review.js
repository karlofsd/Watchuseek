import React, {Fragment, useState, useEffect} from 'react'
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import {useDispatch, useSelector,connect} from 'react-redux'
import {getReviews} from '../../Redux/reviews'
import './review.css'

const Review = ({user, product,review,getReview})=>{
    
    const [value, setValue] = useState({
        comentarios:"",
        stars: parseInt(null),
    })
    useEffect(() => {
       getReview(product)
    },[])

    const enviar = async()=>{
        const dataValue = {
            comentarios: value.comentarios,
            stars: value.stars,
        }
     await axios.post(`http://localhost:3001/reviews/${product}/user/${user.id}`, dataValue)
     setValue({
        comentarios:"",
        stars: parseInt(null)
     })
     getReview(product)
    }
  const Onchange = (e)=>{
      setValue({
         ...value, 
        [e.target.name]:  e.target.value
      })
   
  }
  const deleteReview = async() => {
    await axios.delete(`http://localhost:3001/reviews/${user.id}`)
    getReview(product)
  }

    return(
        <div className='reviews'>
         
            <div>
                <div >
                    <div className='stars' >
                    <Rating name="stars" value={value["stars"]} size="large" onChange={(e)=> Onchange(e)} />
                    </div>
                    <div>
                    <h4 style={{fontSize: 'large'}}>{user.email.split('@')[0]}</h4>   
                    </div>
                </div>
                <div className='comment'>
                    <input className='coment' placeholder='Leave a comment...' type="text" name='comentarios' value={value["comentarios"]} onChange={(e)=> Onchange(e)}/>
                    <button type="button" class="btn btn-secondary" onClick={()=>enviar()} >Send</button>
                </div>
            </div>
            <div className='comentarios'>
                <label>Comments</label>
                {review && review.map(r =>{
                    let date =  r.createdAt.split('T')[0]
                    let time =  r.createdAt.split('T')[1].slice(0,5)
                    return <div className='rev'>
                        {user.isAdmin && <button className='del-rev btn btn-danger' onClick={()=>deleteReview()}>x</button>}
                        <div className='nameReview' >
                        <Rating name="stars" value={r.stars} size="medium" disabled className='starReview' /><label><b>{r.user.username}</b></label>
                        </div>
                        <p><i>"{r.comentarios}"</i></p>
                        <span style={{fontSize:'0.8em'}}>Date: {date} </span> <span style={{fontSize:'0.8em'}}>Hour: {time}</span>
                    </div>
                })}
            </div>
       </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getReview : (e) => dispatch(getReviews(e))
})

const mapStateToProps = (state) => ({
    review : state.reviews.allReviews
})
export default connect(mapStateToProps,mapDispatchToProps)(Review)

