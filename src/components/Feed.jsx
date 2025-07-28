import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';


const Feed = () => {

      const feed=useSelector((store)=>store.feed);

     const dispatch=useDispatch();

    const getFeed= async()=>{

            if(feed) return;


        const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});

        // console.log(res);

        dispatch(addFeed(res.data.user));

       
    };
 
    useEffect(()=>{
        getFeed();
    },[]);


  return (

   feed && <div className='flex justify-center m-10'>
        
       <UserCard user={feed[0]} />
      
    </div>
  )
}

export default Feed
