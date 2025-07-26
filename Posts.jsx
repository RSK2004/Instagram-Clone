import React, { useEffect, useState } from 'react'

function Posts() {

    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:3000/posts")
        .then(response=>{
            return response.json()
        })
        .then(data=>{
            setPosts(data);
        })
        .catch((error)=>{
            console.log(error.message);
        })
    },[]);


    return (
        <div className='d-flex justify-content-center'>
            {posts.length > 0? (
                <div>
                    <div>
                        {posts.map((post)=>(
                            <div className='my-3' key={post.id}>
                                <div className='d-flex  gap-2'>
                                    <img className='dp rounded-circle' src={post.user.profilePic} alt='profpic'></img>
                                    <h5>{post.user.username}</h5>
                                </div>
                                <div>
                                    <img className='post' src={post.image} alt="post" />
                                </div>
                                <div>
                                    <i className="bi bi-heart"></i>
                                    <i className="bi bi-chat"></i>
                                    <i className="bi bi-send"></i>
                                </div>
                                <div>
                                    <strong>{post.likes} Likes</strong>
                                </div>
                                <div className='mb-3'>
                                    {post.caption}
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            ):(
                <div>
                    Loading Posts...
                </div>
            )}
        </div>
    );
}

export default Posts