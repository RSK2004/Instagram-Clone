import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Stories() {

  const [stories,setStories] = useState([]);
  const nav = useNavigate();
  let tot=0;

  useEffect(()=>{
    fetch("http://localhost:3000/stories")
    .then(response=>{
      return response.json()
    })
    .then(data=>{
      setStories(data)
    })
    .catch((error)=>{
      console.log(error.message);
    })
  },[])

  return (
    <div className='storyht d-flex gap-3'>
      <div className='d-none'>
        {tot = stories.length}
      </div>
      {stories.length > 0 ? (
        stories.map((story)=>(
          <div key={story.id} className='d-flex flex-column align-items-center my-2' onClick={()=>{nav(`/stories/${story.id}/${tot}`)}} >
            <div className='gradient-border'>
              <img src={story.user.profilePic} alt='dp' className='storydp rounded-circle'></img>
            </div>
            <p className='name mt-2 mb-0 text-center'>{story.user.username}</p>
          </div>
        ))
      ):(
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Stories