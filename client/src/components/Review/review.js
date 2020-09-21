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
    return(
        <div className='reviews'>
            <div>
                <div className='stars'>
                    <Rating name="stars" value={value["stars"]} size="large" onChange={(e)=> Onchange(e)} />
                    <h4 style={{fontSize: 'large'}}>{user.email.split('@')[0]}</h4>   
                </div>
                <div className='comment'>
                    <input placeholder='Comente algo...' type="text" name='comentarios' value={value["comentarios"]} onChange={(e)=> Onchange(e)}/>
                    <button onClick={()=>enviar()} >Enviar</button>
                </div>
            </div>
            <div className='comentarios'>
                <label>Comentarios</label>
                {review && review.map(r =>{
                    let date =  r.createdAt.split('T')[0]
                    let time =  r.createdAt.split('T')[1].slice(0,5)
                    return <div className='rev'>
                        <label>{r.user.username}___(<span>{`${date}  ${time}`}</span>)</label>
                        <p><i>"{r.comentarios}"</i></p>
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

