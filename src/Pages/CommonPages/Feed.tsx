import { useEffect, useState } from "react"
import Navbar from "../../Components/common/Navbar"
import { getAllDesigns } from "../../Api/user"

interface IRole {
  role: 'user' | 'professional'
}
interface IDesign {
  _id: string
  image: string
  caption:string
  profId: {
    firstname:string
    lastname:string
    company: string
    image: string
  }
}

const Feed: React.FC<IRole> = ({ role }) => {

  const [posts, setPosts] = useState<IDesign[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getAllDesigns();
      setPosts(res?.data?.posts);
    }
    fetchPosts();
  }, [])

  return (
    <>
      <Navbar role={role} />
      <div className="w-full max-w-md md:max-w-xl mt-10 bg-white mx-auto">
        {posts && posts.map((val, index) =>
        (
          <div key={index} className="border-b border-gray-200 mt-5"><img src={val.profId.image} className="inline w-6 h-6 object-cover rounded-full" alt="" />
            <h2 className="inline ml-3">{val.profId.firstname} {val.profId.lastname}</h2>
            <img className="mt-4 rounded" src={val.image} />
            <h2 className="text-sm mt-2 text-gray-700 pb-5">{val.caption}</h2>
          </div>
        )
        )}
      </div>
    </>
  )
}

export default Feed