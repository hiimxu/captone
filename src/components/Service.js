import React, { useEffect, useState } from "react";
import {api} from '../api/api.js'


export default function Service() {  
  const [posts, setPosts] = useState({});
  

  useEffect(() => {
    fetch(`${api}api/account/`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts)
        console.log(posts);
      });
  }, []);

  return (
    <div>
      {/* <ul>
        {posts.data.map((post) => (
          <li key={post.account_id}>{post.account_name}</li>
        ))}
      </ul> */}
    </div>
  );
}
