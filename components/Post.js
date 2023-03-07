import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"

function Post({id, username, img, userImg, caption}) {
  return (
    <div className="bg-white my-7 border rounded-md">
    {/* post header */}
    <div className="flex items-center p-5">
        <img className="h-12 rounded-full object-cover border p-1 mr-3" src={userImg} alt={username}  />
        <p className="font-bold flex-1 "> {username}</p>
        <EllipsisHorizontalIcon className="h-5" />
    </div>
    <img className="object-cover w-full" src={img} alt="" />


    </div>
  )
}

export default Post
