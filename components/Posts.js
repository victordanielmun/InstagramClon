import { db } from "../firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react"
import Post from "./Post"

function Posts() {
    const [posts, setPosts] = useState([]);
    const collectionRef = collection(db,"posts");

    // useEffect(() => {
    //   const unsubscribe = onSnapshot(
    //     query(collection(db, "posts"), orderBy("timestamp", "desc")),
    //     (snapshot) => {
    //       setPosts(snapshot.docs);
    //     }
    //   );
    //   return unsubscribe;
    // }, [db]);
    
useEffect(() => {
 
    const unsubscribe = onSnapshot(
         query(collection(db,"posts"), orderBy("timestamp", "desc")),
         (snapshot) => {
           setPosts(snapshot.docs);
         }
       );
  return unsubscribe
}, )

  

  return (
    <div>
        {posts.map(post=>(
        <Post 
        key={post.id} 
        id={post.id} 
        username={post.data().username} 
        userImg={post.data().profileImg} 
        img={post.data().image} 
        caption={post.data().caption}
        />
        ))}
        
    </div>
  );
}

export default Posts