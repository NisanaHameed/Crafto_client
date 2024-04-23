import { useEffect, useState } from "react"
import Navbar from "../../Components/common/Navbar"
import { getAllDesigns, likePost, savePost, unlikePost } from "../../Api/user"
import { jwtDecode } from "jwt-decode"
import { likePostbyProf, savePostbyProf, unlikePostbyProf } from "../../Api/professional"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

interface IRole {
  role: 'user' | 'professional'
}
interface IDesign {
  _id: string
  image: string
  caption: string
  profId: {
    _id?: string
    firstname: string
    lastname: string
    company: string
    image: string
    isVerified:boolean
  }
  likes: [string]
  saved: [string]
}

const Feed: React.FC<IRole> = ({ role }) => {

  const [posts, setPosts] = useState<IDesign[]>([])
  const [rerender, setRerender] = useState(false);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

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
      const res = await getAllDesigns();
      setPosts(res?.data?.posts);
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

  const handleComment = (id: string) => {
    if (role == 'user') {
      navigate(`/postDetail/${id}`);
    } else {
      navigate(`/professional/postDetail/${id}`);
    }
  }

  const profDetail = (id: string) => {
    if (role == 'user') {
      navigate(`/profDetails/${id}`);
    } else {
      navigate(`/professional/profDetails/${id}`);
    }
  }

  const handleUnsave = async (id: string) => {
    if (role == 'user') {
      const res = await savePost(id, 'false');
      if (res?.data.success) {
        setRerender(!rerender);
      }
    } else {
      const res = await savePostbyProf(id, 'false');
      if (res?.data.success) {
        setRerender(!rerender);
      }
    }
  }

  const handleSave = async (id: string) => {
    if (role == 'user') {
      const res = await savePost(id, 'true');
      if (res?.data.success) {
        setRerender(!rerender);
        toast.success('Post saved')
      }
    } else {
      const res = await savePostbyProf(id, 'true');
      if (res?.data.success) {
        setRerender(!rerender);
        toast.success('Post saved')
      }
    }
  }

  return (
    <>
      <Navbar role={role} />
      <div className="w-full max-w-md md:max-w-xl mt-10 bg-white mx-auto">
        {posts && posts.map((val, index) =>
        (
          <div key={index} className="border-b border-gray-200 mt-5">
            <img onClick={() => profDetail(val?.profId._id as string)} src={val.profId.image} className="inline w-7 h-7 object-cover rounded-full cursor-pointer" alt="" />
            <h2 onClick={() => profDetail(val?.profId._id as string)} className="inline ml-3 cursor-pointer text-sm font-semibold text-gray-600">{val.profId.firstname} {val.profId.lastname}</h2>
            {val.profId.isVerified && <img src="/verified.png" className="w-5 inline ml-[2px]" alt="" />}
            <img className="mt-4 rounded" src={val.image} />
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                {val.likes.includes(userId) ?
                  <img onClick={() => handleUnlike(val?._id)} src="/liked.png" className="w-[22px] h-[22px] mt-[10px] cursor-pointer" alt="" />
                  :
                  <img onClick={() => handleLike(val?._id)} src="/like.png" className="w-[22px] h-[22px] mt-[10px] cursor-pointer" alt="" />
                }
                <img onClick={() => handleComment(val?._id)} src="/comment.png" className="w-[26px] inline mt-2 ml-2 cursor-pointer" alt="" />
              </div>
              {val.saved.includes(userId) ?
                <img onClick={() => handleUnsave(val?._id)} src="/saved.png" className="w-5 h-5  mt-3 cursor-pointer justify-end" />
                :
                <img onClick={() => handleSave(val?._id)} src="/save.png" className="w-5 h-5  mt-3 cursor-pointer justify-end" />
              }
            </div>
            <p className="text-sm">{val.likes.length} likes</p>
            <h2 className="text-sm mt-2 text-gray-700 pb-5">{val.caption}</h2>
          </div>
        )
        )}
      </div>
    </>
  )
}

export default Feed