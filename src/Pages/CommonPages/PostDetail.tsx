import { useEffect, useState } from "react"
import Navbar from "../../Components/common/Navbar"
import { likePost, postComment, postDetail, savePost, unlikePost } from "../../Api/user"
import { jwtDecode } from "jwt-decode"
import { deletePost, likePostbyProf, postCommentbyProf, savePostbyProf, unlikePostbyProf } from "../../Api/professional"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { format } from 'timeago.js'
import ConfirmationModal from "../../Components/common/ConfirmationModal"

interface IRole {
  role: 'user' | 'professional'
  feedPage: boolean
}
interface IDesign {
  _id: string
  image: string
  caption: string
  profId: {
    firstname: string
    lastname: string
    company: string
    image: string
    isVerified: boolean
  }
  likes: Array<ILikes>,
  comments: Array<comment>
  saved: [string]
}
interface comment {
  user: {
    _id?: string
    name?: string,
    firstname?: string,
    lastname?: string,
    image: string,
  },
  type: string
  text: string
  createdAt: Date
}
interface ILikes {
  user: {
    _id?: string
    name?: string,
    firstname?: string,
    lastname?: string,
    image: string,
  },
  type: string
}

const PostDetail: React.FC<IRole> = ({ role, feedPage }) => {

  const [post, setPost] = useState<IDesign | null>(null)
  const [rerender, setRerender] = useState(false);
  const [userId, setUserId] = useState('');
  const [comment, setComment] = useState('');
  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState<ILikes[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (role == 'user') {
      const decoded: any = jwtDecode(JSON.parse(localStorage.getItem('userData') as string))
      setUserId(decoded.Id);
    } else if (role == 'professional') {
      const decoded: any = jwtDecode(JSON.parse(localStorage.getItem('profData') as string))
      setUserId(decoded.Id);
    }
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await postDetail(id as string);
      console.log(res?.data)
      setPost(res?.data?.post);
    }
    fetchPosts();
  }, [rerender])

  const handleLike = async (id: string) => {
    if (role == 'user') {
      const res = await likePost(id)
      if (res?.data?.success) {
        setRerender(!rerender);
      }
    } else {
      const res = await likePostbyProf(id);
      if (res?.data?.success) {
        setRerender(!rerender);
      }
    }
  }

  const handleUnlike = async (id: string) => {
    if (role == 'user') {
      const res = await unlikePost(id);
      if (res?.data?.success) {
        setRerender(!rerender);
      }
    } else {
      const res = await unlikePostbyProf(id);
      if (res?.data?.success) {
        setRerender(!rerender);
      }
    }

  }

  const handleComment = async (e: any) => {
    e.preventDefault();
    if (!comment.trim().length) {
      return;
    }
    if (role == 'user') {
      const res = await postComment(id as string, comment);
      if (res?.data.success) {

        toast.success('Comment posted!');
        setComment('');
        setRerender(!rerender);
      }
    } else {
      const res = await postCommentbyProf(id as string, comment);
      if (res?.data.success) {

        toast.success('Comment posted!');
        setComment('');
        setRerender(!rerender);
      }
    }
  }
  const profDetail = (id: string) => {
    if (role == 'user') {
      navigate(`/profDetails/${id}`);
    } else {
      navigate(`/professional/profDetails/${id}`);
    }
  }

  const handleDelete = async () => {
    setShowConfirmation(true);
  }
  const onCancel = () => {
    setShowConfirmation(false);
  }
  const onConfirm = async () => {
    let res = await deletePost(post?._id as string);
    if (res?.data.success) {
      navigate('/professional/profile');
    }
  }

  const handleShowLikes = (likes: any) => {
    setLikes(likes);
    setShowLikes(true);
  }

  const handleUnsave = async (id: string) => {
    console.log('clicked save button')
    if (role === 'user') {
      const res = await savePost(id, 'false');
      if (res?.data?.success) {
        setRerender(!rerender);
      }
    } else {
      const res = await savePostbyProf(id, 'false')
      if (res?.data?.success) {
        setRerender(!rerender);
      }
    }
  }

  const handleSave = async (id: string) => {
    console.log('clicked save button')
    if (role == 'user') {
      const res = await savePost(id, 'true');
      if (res?.data?.success) {
        setRerender(!rerender);
      }
    } else {
      const res = await savePostbyProf(id, 'true')
      if (res?.data?.success) {
        setRerender(!rerender);
      }
    }

  }

  return (
    <>
      <Navbar role={role} />
      <div className="max-w-6xl h-screen flex flex-col justify-center mx-auto ">
        <div className="w-full flex flex-row gap-4 bg-white">
          <div className="w-3/5 flex hidden md:block"><img src={post?.image} alt="" className="w-full object-contain" /></div>
          <div className="md:w-2/5 w-full mx-6 md:mx-0 flex flex-col border border-b-4 ">
            <div className="top-0 left-0 bg-white w-full sticky pl-2 z-10 border-b py-2 border-gray-200">
              <img src={post?.profId.image} className="inline w-6 h-6 object-cover rounded-full" alt="" />
              <h2 className="inline ml-2">{post?.profId.firstname} {post?.profId.lastname}</h2>
              <p className=" ml-8 text-sm ">{post?.caption}</p>
            </div>
            <div className="overflow-y-scroll ml-2 h-56 flex-grow">
              {post?.comments && post.comments.map((val) => {
                return (
                  <div key={val?.user._id} className="py-2">
                    <img onClick={() => profDetail(val?.user._id as string)} src={val?.user.image} className="inline w-6 h-6 object-cover rounded-full border border-gray-400 cursor-pointer" alt="" />
                    {val.type == 'User' ?
                      <h2 onClick={() => profDetail(val?.user._id as string)} className="inline ml-2 text-sm cursor-pointer">{val?.user.name}</h2> :
                      <h2 onClick={() => profDetail(val?.user._id as string)} className="inline ml-2 text-sm cursor-pointer">{val?.user.firstname} {val?.user.lastname}</h2>
                    }
                    <p className="ml-8 text-sm">{val.text}</p>
                    <p className="ml-8 text-xs font-light">{format(val?.createdAt, 'en-US')}</p>
                  </div>
                )
              })}

            </div>
            <div className="botttom-0 left-0 pl-2 border-t border-gray-200 sticky z-10">
              <img className=" rounded" src='' />
                <div className="flex flex-row justify-between">
                  {post?.likes.some(like => like?.user?._id === userId) ?
                    <img onClick={() => handleUnlike(post?._id)} src="/liked.png" className="w-6 inline mt-2 cursor-pointer" alt="" />
                    :
                    <img onClick={() => handleLike(post?._id as string)} src="/like.png" className="w-6 inline mt-2 cursor-pointer" alt="" />
                  }
                  {post?.saved.includes(userId) ?
                    <img onClick={() => handleUnsave(post?._id as string)} src="/saved.png" className="w-5 h-5 mr-2 mt-3 cursor-pointer justify-end" />
                    :
                    <img onClick={() => handleSave(post?._id as string)} src="/save.png" className="w-5 h-5 mr-2 mt-3 cursor-pointer justify-end" />
                  }
                </div>
              <p onClick={() => handleShowLikes(post?.likes)} className="text-sm cursor-pointer">{post?.likes.length} likes</p>
              <div className="flex justify-between border-t border-slate-200 my-2">
                <input value={comment} onChange={(e) => setComment(e.target.value)} className=" w-2/3 h-8 border border-transparent appearance-none focus:outline-none" placeholder="Add a comment" />
                <a onClick={handleComment} className="mt-1 mr-2 cursor-pointer text-green-700">Post</a>
              </div>
            </div>
          </div>
        </div>
        {!feedPage && <button onClick={handleDelete} className="w-1/2 mx-auto border border-[#2e9474] px-4 py-2 hover:bg-[#2e9474] hover:text-white tracking-wide mt-10">Delete Post</button>}
      </div>
      {showLikes &&
        <div
          id="popup-modal"
          tabIndex={-1}
          className=" bg-gray-950 bg-opacity-60 my-auto fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded shadow mb-5">
              <button
                onClick={() => setShowLikes(false)}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded text-sm w-6 h-6 ms-auto inline-flex justify-center items-center "
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="text-center mt-10">
                <h2 className="font-medium py-2 rounded-t bg-gray-200 text-green-900">{likes.length ? 'Likes' : 'No Likes'}</h2>
                <ul className="p-4 md:p-5 my-4 space-y-3 overflow-y-auto max-h-52">
                  {likes.map((like, ind) =>
                  (
                    <li key={ind}>
                      <a className="flex items-center p-1 font-medium text-sm text-gray-900 rounded-lg hover:bg-gray-100 group hover:shadow">
                        <img className="w-9 h-9 rounded-full border border-gray-400" src={like.user.image} alt="" />
                        {like.type === 'User' ?
                          <span className="flex-1 ms-3 whitespace-nowrap">{like.user.name}</span>
                          :
                          <span className="flex-1 ms-3 whitespace-nowrap">{like.user.firstname} {like.user.lastname}</span>
                        }
                      </a>
                    </li>
                  )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
      {showConfirmation && <ConfirmationModal onConfirm={onConfirm} onCancel={onCancel} message="Are you sure you want to delete this post?" />}
    </>
  )
}

export default PostDetail;