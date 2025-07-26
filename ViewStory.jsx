import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'

function ViewStory() {

    const {id,tot} = useParams();
    const [stories,setStories] = useState(null);
    const nav = useNavigate();

    useEffect(()=>{
        fetch(`http://localhost:3000/stories/${id}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setStories(data);
        })
        .catch((error)=>{
            console.log(error.message);
        })
    },[id]);

    if(id>tot || id<=0){
        nav('/');
    }

  return (
    <div>
        {stories? <div className='d-flex justify-content-center align-items-center'>
            <Link to={`http://localhost:5173/stories/${Number(id)-1}/${tot}`}><i className='bi bi-arrow-left-circle-fill'></i></Link>
            <img className='vh-100' src={stories.storyImage} alt='img'></img>
            <Link to={`http://localhost:5173/stories/${Number(id)+1}/${tot}`}><i className='bi bi-arrow-right-circle-fill'></i></Link>
            </div>: <div>Loading...</div>}
    </div>
  )
}

export default ViewStory