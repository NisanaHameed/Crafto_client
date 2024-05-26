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
    isVerified: boolean
  }
  likes: Array<ILikes>
  saved: [string]
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

const Feed: React.FC<IRole> = ({ role }) => {

  const [posts, setPosts] = useState<IDesign[]>([])
  const [userId, setUserId] = useState('');
  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState<ILikes[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (role == 'user') {
      const decoded: any = jwtDecode(JSON.parse(localStorage.getItem('userData') as string))
      setUserId(decoded.Id);
    } else if (role == 'professional') {
      const decoded: any = jwtDecode(JSON.parse(localStorage.getItem('profData') as string))
      setUserId(decoded.Id);
    }
  }, [role, posts])
  const limit = 4;

  useEffect(() => {
    console.log('page...', page, limit)
    const fetchPosts = async () => {
      const res = await getAllDesigns(page, limit);
      console.log(res)
      setLoading(false);
      if (res?.data?.posts) {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p._id));
          const newPosts = res.data.posts.filter((post: IDesign) => !existingIds.has(post._id));
          return [...prev, ...newPosts];
        });
      }
    }
    fetchPosts();
  }, [page])

  const handleInfiniteScroll = async () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight) {
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll)
    return () => window.removeEventListener('scroll', handleInfiniteScroll)
  }, [])

  const handleLike = async (id: string) => {
    console.log('submitting like')
    if (role === 'user') {
      const res = await likePost(id)
      if (res?.data?.success) {
        setPosts((currentPosts) =>
          currentPosts.map((post: any) =>
            post._id === id
              ? { ...post, likes: [...post.likes, { user: { _id: userId } }] }
              : post
          )
        );
      }
    } else {
      const res = await likePostbyProf(id);
      if (res?.data?.success) {
        setPosts((currentPosts) =>
          currentPosts.map((post: any) =>
            post._id === id
              ? { ...post, likes: [...post.likes, { user: { _id: userId } }] }
              : post
          )
        );
      }
    }
    console.log('userId', userId)
  }

  const handleUnlike = async (id: string) => {
    console.log('submitting unlike')
    if (role === 'user') {
      const res = await unlikePost(id);
      if (res?.data?.success) {
        setPosts(currentPosts =>
          currentPosts.map(post =>
            post._id === id
              ? { ...post, likes: post.likes.filter(like => like.user._id !== userId) }
              : post
          )
        );
      }
    } else {
      const res = await unlikePostbyProf(id);
      if (res?.data?.success) {
        setPosts(currentPosts =>
          currentPosts.map(post =>
            post._id === id
              ? { ...post, likes: post.likes.filter(like => like.user._id !== userId) }
              : post
          )
        );
      }
    }
    console.log('userId', userId)
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
        setPosts(currentPosts =>
          currentPosts.map((post: any) =>
            post._id === id
              ? { ...post, saved: post.saved.filter((val: any) => val !== userId) }
              : post
          )
        );
      }
    } else {
      const res = await savePostbyProf(id, 'false');
      if (res?.data.success) {
        setPosts(currentPosts =>
          currentPosts.map((post: any) =>
            post._id === id
              ? { ...post, saved: post.saved.filter((val: any) => val !== userId) }
              : post
          )
        );
      }
    }
  }

  const handleSave = async (id: string) => {
    if (role == 'user') {
      const res = await savePost(id, 'true');
      if (res?.data.success) {
        setPosts((currentPosts) =>
          currentPosts.map((post: any) =>
            post._id === id
              ? { ...post, saved: [...post.saved, userId] }
              : post
          )
        );
        toast.success('Post saved')
      }
    } else {
      const res = await savePostbyProf(id, 'true');
      if (res?.data.success) {
        setPosts((currentPosts) =>
          currentPosts.map((post: any) =>
            post._id === id
              ? { ...post, saved: [...post.saved, userId] }
              : post
          )
        );
        toast.success('Post saved')
      }
    }
  }

  const handleShowLikes = (likes: any) => {
    setLikes(likes);
    console.log('Likes', likes)
    setShowLikes(true)
  }

  return (
    <>
      <Navbar role={role} />
      <div className="w-full max-w-md md:max-w-xl mt-10 bg-white mx-auto">
        {posts && posts.map((val) =>
        (
          <div key={val._id} className="border-b border-gray-200 mt-5">
            <img onClick={() => profDetail(val?.profId._id as string)} src={val.profId.image} className="inline w-7 h-7 object-cover rounded-full cursor-pointer border border-gray-200" alt="" />
            <h2 onClick={() => profDetail(val?.profId._id as string)} className="inline ml-3 cursor-pointer text-sm font-semibold text-gray-600">{val.profId.firstname} {val.profId.lastname}</h2>
            {val.profId.isVerified && <img src="/verified.png" className="w-5 inline ml-[2px]" alt="" />}
            <img className="mt-4 rounded" src={val.image} />
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                {val.likes.some(like => like?.user?._id === userId) ?
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
            <p onClick={() => handleShowLikes(val?.likes)} className="text-[13px] cursor-pointer">{val.likes.length} likes</p>
            <h2 className="text-sm mt-2 text-gray-700 pb-5">{val.caption}</h2>
          </div>
        )
        )}
        {loading &&

          <div role="status" className="flex w-full justify-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-green-700"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>


        }
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
                        <img className="w-9 h-9 rounded-full border border-gray-400 object-cover" src={like.user.image} alt="" />
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
    </>
  )
}

export default Feed