import Post from "./Post"

function Posts() {
    const posts = [
        {
            id: "1",
            username: "victor",
            userImg: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
            img: "https://images.unsplash.com/photo-1678107658617-d20a773469e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
            caption: "Nice picture",
        },
        {
            id: "1",
            username: "other",
            userImg: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
            img: "https://images.unsplash.com/photo-1678031410792-6b68d9e0bbd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            caption: "picture x2",
        },
        
    ]

  return (
    <div>
        {posts.map(post=>(
        <Post 
        key={post.id} 
        id={post.id} 
        username={post.username} 
        userImg={post.userImg} 
        img={post.img} 
        caption={post.caption}
        />
        ))}
        
    </div>
  )
}

export default Posts