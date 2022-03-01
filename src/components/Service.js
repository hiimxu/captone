import React, { useEffect, useState } from "react";
import {api} from '../api/api.js'


export default function Service() {  
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    fetch(`${api}/customer/get/AllSalon`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts)
        console.log(posts);
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.salonId}>{post.nameSalon}</li>
        ))}
      </ul>
    </div>
  );
}
