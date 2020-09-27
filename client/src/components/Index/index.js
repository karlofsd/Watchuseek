import React, { useEffect } from 'react'
import './index.css'
import {validation} from '../../Redux/users'
import {useDispatch} from 'react-redux'

const Index =()=>{
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(validation())
    },[])

    return(
        <div style = {{position: "relative", height: '96vh'}}>
            <div  className='divindex'>
                <video className='videoindex' src="https://content.rolex.com/dam/new-watches-2020/hub/videos/cover/new-watches-2020-new-datejust-cover.mp4" type="video/mp4" autoplay="true" playsinline="" loop="true" preload="auto" ></video> 
                <div className='block-bg'></div>
                <h3 className='welcome'>NEW COLLECTION 2020</h3>
            </div>
        </div>
    )
}

//"https://content.rolex.com/dam/new-watches-2020/hub/videos/cover/new-watches-2020-new-datejust-cover.mp4"



export default Index
