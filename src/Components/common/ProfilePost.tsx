import { useEffect, useState } from "react"
import { getPosts, getPostsById } from "../../Api/professional"
import { useNavigate } from "react-router-dom"

interface IPost {
    _id?: string
    category: string
    caption: string
    image: string
}

interface IProf {
    professional: Boolean
    id: string
    postCount: Function
    role: 'user' | 'professional'
}

const ProfilePost: React.FC<IProf> = ({ professional, id, postCount, role }) => {

    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const fetchPost = async () => {
            if (professional) {
                const res = await getPosts();
                console.log(res)
                if (res?.data.posts) {
                    setPosts(res.data.posts);
                    postCount(res.data.posts.length);
                }
            } else {
                const res = await getPostsById(id);
                setPosts(res?.data?.posts);
                postCount(res?.data.posts.length);
            }
        }
        console.log(posts.length)
        fetchPost();
    }, [])

    const navigate = useNavigate();

    const designDetail = (id: string) => {
        if (role === 'user') {
            navigate(`/postDetail/${id}`)
        } else if (role === 'professional' && professional) {
            navigate(`/professional/postDetails/${id}`);
        } else {
            navigate(`/professional/postDetail/${id}`)
        }
    }

    return (
        <>
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2">
                {posts && posts.map((val, index) =>
                (
                    <div onClick={() => designDetail(val?._id as string)} key={index}>
                        <img className="h-40 md:h-48 w-full object-cover rounded cursor-pointer" src={val.image} alt="" />
                    </div>
                )
                )}
            </div>

        </>
    )
}

export default ProfilePost
