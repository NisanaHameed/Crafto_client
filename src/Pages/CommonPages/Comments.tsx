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

const Comments: React.FC<IRole> = ({ role }) => {

  const [post, setPost] = useState<IDesign[]>([])
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
      <div className="w-full flex-col mt-10 bg-white mx-auto">
        <div className="w-1/2 flex"></div>
       <div className="w-1/2 flex"></div>
      </div>
    </>
  )
}

export default Comments;