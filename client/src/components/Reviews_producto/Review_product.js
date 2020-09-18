import React,{Fragment} from 'react'


const Review_product =({data, user})=>{



 console.log(data)   
 console.log(user)

 



    return(
     <div>
      {/* {data[0] && data.map(e=>(
          <div>
          <label>{e.userId ===user.id? user.email : null}</label>
          <div>{e.comentarios}</div>
          </div>
      ))} */}
     </div>
    )
}

export default Review_product