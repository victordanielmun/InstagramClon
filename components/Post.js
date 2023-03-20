import {
  EllipsisHorizontalIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import {
  addDoc,
  setDoc,
  doc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import Moment, { moment } from "react-moment";

function Post({ id, username, img, userImg, caption }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [currentUser] = useRecoilState(userState);


  // get comentarios de firebase
  useEffect(() => {
    async function fetchData() {
      try {
        const unsubscribe = await onSnapshot(
          query(
            collection(db, "posts", id, "comments"),
            orderBy("timestamp", "desc")
          ),
          (snapshot) => {
            setComments(snapshot.docs);
          }
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [db, id]);

  // Obtener likes
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  // Revisar si usuario dio like al post
  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1
    );
  }, [likes]);

    // envio like
  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
        username: currentUser?.username,
      });
    }
    
  }

  // envio comentario
  async function sendComment(event) {
    event.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: currentUser?.username,
      userImage: currentUser?.userImg,
      timestamp: serverTimestamp(),
    });
  }

  return (
    <div className="bg-white my-7 border rounded-md">
      {/* post header */}
      <div className="flex items-center p-5">
        <img
          className="h-12 rounded-full object-cover border p-1 mr-3"
          src={userImg}
          alt={username}
        />
        <p className="font-bold flex-1 "> {username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* post imagen */}
      <img className="object-cover w-full" src={img} alt="" />
      {/* post buttons */}

      {currentUser && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="text-red-400 btn"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatBubbleOvalLeftEllipsisIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

       {/* Post comments */}
      <p className="p-5 truncate">
        {likes.length > 0 && (<p className="font-bold mb-1 ">{likes.length} Likes</p>)}
        <span className=" font-bold mr-2 ">{username} </span>
        {caption}
      </p>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment) => (
            <div
              className="flex items-center space-x-2 mb-2"
              key={comment.data().id}
            >
              <img
                className="h-7 rounded-full object-cover"
                src={comment.data().userImage}
                alt="user-image"
              />
              <p className="font-semibold ">{comment.data().username}</p>
              <p className="flex-1 truncate ">{comment.data().comment}</p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}
      {currentUser && (
        <form className="flex items-center p-4 ">
          <FaceSmileIcon className="h-7" />
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className="border-none flex-1 focus:ring-0"
            type="text"
            placeholder="Enter your comment..."
          />
          <button
            type="submit"
            onClick={sendComment}
            disabled={!comment.trim()}
            className="text-blue-400 font-bold disabled:text-blue-200"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
