import { useEffect, useState } from "react"
import Navbar from "../../Components/common/Navbar"
import { likePost, postComment, postDetail, unlikePost } from "../../Api/user"
import { jwtDecode } from "jwt-decode"
import { likePostbyProf, postCommentbyProf, unlikePostbyProf } from "../../Api/professional"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import {format} from 'timeago.js'

interface IRole {
  role: 'user' | 'professional'
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
  }
  likes: [string],
  comments: Array<comment>
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
  createdAt:Date
}

const PostDetail: React.FC<IRole> = ({ role }) => {

  const [post, setPost] = useState<IDesign | null>(null)
  const [rerender, setRerender] = useState(false);
  const [userId, setUserId] = useState('');
  const [comment, setComment] = useState('');
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

  return (
    <>
      <Navbar role={role} />
      <div className="max-w-6xl h-screen justify-center mt-24 mx-auto ">
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
                  <div className="py-2">
                    <img onClick={() => profDetail(val?.user._id as string)} src={val?.user.image} className="inline w-6 h-6 object-cover rounded-full border border-gray-400 cursor-pointer" alt="" />
                    {val.type == 'User' ?
                      <h2 onClick={() => profDetail(val?.user._id as string)} className="inline ml-2 text-sm cursor-pointer">{val?.user.name}</h2> :
                      <h2 onClick={() => profDetail(val?.user._id as string)} className="inline ml-2 text-sm cursor-pointer">{val?.user.firstname} {val?.user.lastname}</h2>
                    }
                    <p className="ml-8 text-sm">{val.text}</p>
                    <p className="ml-8 text-xs font-light">{format(val?.createdAt,'en-US')}</p>
                  </div>
                )
              })}

            </div>
            <div className="botttom-0 left-0 pl-2 border-t border-gray-200 sticky z-10">
              <img className=" rounded" src='' />
              {post?.likes.includes(userId) ?
                <img onClick={() => handleUnlike(post?._id)} src="/liked.png" className="w-5 inline mt-2 cursor-pointer" alt="" />
                :
                <img onClick={() => handleLike(post?._id as string)} src="/like.png" className="w-5 inline mt-2 cursor-pointer" alt="" />
              }

              {/* <img onClick={() => navigate('/postDetail')} src="/comment.png" className="w-6 inline mt-2 ml-2 cursor-pointer" alt="" /> */}
              <p className="text-sm">{post?.likes.length} likes</p>
              <div className="flex justify-between border-t border-slate-200 my-2">
                <input value={comment} onChange={(e) => setComment(e.target.value)} className=" w-2/3 h-8 border border-transparent appearance-none focus:outline-none" placeholder="Add a comment" />
                <a onClick={handleComment} className="mt-1 mr-2 cursor-pointer text-green-700">Post</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetail;