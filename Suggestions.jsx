import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Suggestions() {

  const [profile,setProfile] = useState(null);
  const [suggestions,setSuggestions] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/profile")
    .then(response=>{
      return response.json()
    })
    .then(data=>{
      setProfile(data)
    })
    .catch((error)=>{
      console.log(error.message);
    })

    fetch("http://localhost:3000/suggestions")
    .then(response=>{
      return response.json()
    })
    .then(data=>{
      setSuggestions(data)
    })
    .catch((error)=>{
      console.log(error.message);
    })
  })

  const handleFollow = async(id,username)=> {
    axios.post("http://localhost:3000/Following",{"id":id,"username":username})
    .then(alert('Followed'))
    .catch((error)=>{
      console.log(error.message);
    })
  }

  return(
  <>
    <div>
      <div className='sugg w-75 my-4'>
        {profile?
        <div className='d-flex gap-2'>
          <img className='dpp rounded-circle my-1' src={profile.profile_pic} alt='profpic'></img>
          <div>
          <h6 className='un'>{profile.username}</h6>
          <small className='uid text-muted'>{profile.insta_id}</small>
          </div>
          <div style={{color:"blue"}} className='ms-auto my-2'>
            <p>Switch</p>
          </div>
        </div> : <p>Loading...</p>}
      </div>
    </div>

    <div>
      <div className='sugg w-75'>
        <div className='d-flex gap-2'>
          <div>
          <small className='uid text-muted'>Suggestions For You</small>
          </div>
          <div style={{color:"black"}} className='ms-auto my-0'>
            <small><strong>See All</strong></small>
          </div>
        </div>
      </div>
    </div>

    <div>
      {suggestions.length >0? (
        <div>
        {suggestions.map((sugg)=>(
          <div key={sugg.id}>
            <div className='sugg w-75 my-2'>
              <div className='d-flex gap-2'>
                <img className='sdp rounded-circle my-1' src={sugg.profilePic} alt='prfpic'></img>
                <div>
                  <h6 className='un'>{sugg.username}</h6>
                  <small className='uid text-muted'>Followed by {sugg.mutualFollowers}</small>
                </div>
                <div style={{color:"blue"}} className='ms-auto my-2'>
                  <a style={{textDecoration: "None"}} onClick={()=>{handleFollow(sugg.id,sugg.username)}}>Follow</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>) : (
        <div>
          Loading...
        </div>)
      }
    </div>
  </>
  );
}

export default Suggestions