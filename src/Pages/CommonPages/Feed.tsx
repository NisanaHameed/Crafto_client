import { useEffect, useState } from "react"
import Navbar from "../../Components/common/Navbar"
import { getAllDesigns, likePost, unlikePost } from "../../Api/user"
import { jwtDecode } from "jwt-decode"
import { likePostbyProf, unlikePostbyProf } from "../../Api/professional"

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
  likes: [string]
}

const Feed: React.FC<IRole> = ({ role }) => {

  const [posts, setPosts] = useState<IDesign[]>([])
  const [rerender, setRerender] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (role == 'user') {
      const { Id } = jwtDecode(JSON.parse(localStorage.getItem('userData') as string))
      setUserId(Id);
    } else if (role == 'professional') {
      const { Id } = jwtDecode(JSON.parse(localStorage.getItem('profData') as string))
      setUserId(Id);
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

  return (
    <>
      <Navbar role={role} />
      <div className="w-full max-w-md md:max-w-xl mt-10 bg-white mx-auto">
        {posts && posts.map((val, index) =>
        (
          <div key={index} className="border-b border-gray-200 mt-5"><img src={val.profId.image} className="inline w-6 h-6 object-cover rounded-full" alt="" />
            <h2 className="inline ml-3">{val.profId.firstname} {val.profId.lastname}</h2>
            <img className="mt-4 rounded" src={val.image} />
            {val.likes.includes(userId) ?
              <img onClick={() => handleUnlike(val?._id)} src="/liked.png" className="w-5 inline mt-2 cursor-pointer" alt="" />
              :
              <img onClick={() => handleLike(val?._id)} src="/like.png" className="w-5 inline mt-2 cursor-pointer" alt="" />
            }

            <img src="/comment.png" className="w-6 inline mt-2 ml-2" alt="" />
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