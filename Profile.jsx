import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Profile() {

    const nav = useNavigate();

    const [profile,setProfile] = useState(null);
    const [Following,setFollowing] = useState(null);
    const [unFollowing,setUnFollowing] = useState(0);

    useEffect(()=>{
        axios.get("http://localhost:3000/profile")
        .then(data=>{setProfile(data.data)})
        .catch((error)=>{
            console.log(error.message);
        })

        axios.get("http://localhost:3000/Following")
        .then(data=>{setFollowing(data.data)})
        .catch((error)=>{
            console.log(error.message);
        })
    },[unFollowing]);

    function HandleonChange(e){
        setProfile(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    } //...prev is a spread method used to keep the previous values intact, e.target.name: e.target.value is used to update
    // the corresp value alone which we are changing in the input...we are applying the changes to the state variable using
    // the onChange function


    const handleUpdate = async () =>{
        axios.put("http://localhost:3000/profile",profile) //post is used to create new data...put is used to update the exisiting data in the API
        .then(console.log("Updated"))
        .catch((error)=>{
            console.log(error.message);
        })
    } //async is used to handle the promise that happens when updating the data in the server

    const handleUnfollow = async(id)=>{
        axios.delete(`http://localhost:3000/Following/${id}`)
        .then(alert("Unfollow"))
        .then(setUnFollowing(!unFollowing))
        .catch((error)=>{
            console.log(error.message);
        })
    }

  return (
    <>
    <div>
        <button className='btn btn-primary m-2' onClick={()=>(nav('/'))}>Back Home</button>
    </div>
    <div>{profile? (
        <div className='m-5'>
            <img src={profile.profile_pic} alt='prf' className='prof rounded-circle gradient-border'></img>
            <h5 className='uprof'>{profile.username}</h5>

            <input type='text'
            value={profile.username}
            name='username'
            className='form-control my-4'
            onChange={HandleonChange} />

            <input type='text'
            name='profile_pic'
            value={profile.profile_pic}
            className='form-control'
            onChange={HandleonChange} />

            <button className='btn btn-primary my-4' onClick={handleUpdate}>Update</button>

            {Following.length > 0? (
                    Following.map((following)=> (
                        <div key={following.id} className='d-flex my-2'>
                            {following.username}
                            <button className='btn btn-secondary ms-auto' onClick={()=>{handleUnfollow(following.id)}}>UnFollow</button>
                        </div>
                    ))
                ):(
                <div>Loading Followers</div>
                )
            }

        </div>
    ) : (
        <div>Loading...</div>
    )}</div>
    </>
  )
}

export default Profile