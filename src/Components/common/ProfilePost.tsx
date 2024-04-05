import { useEffect, useState } from "react"
import { getPosts, getPostsById } from "../../Api/professional"

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
}

const ProfilePost: React.FC<IProf> = ({ professional, id, postCount }) => {

    useEffect(() => {
        const fetchPost = async () => {
            if (professional) {
                const res = await getPosts();
                console.log(res)
                if (res?.data.posts) {
                    setPosts(res.data.posts);
                }
            } else {
                const res = await getPostsById(id);
                setPosts(res?.data?.posts);
            }
        }
        fetchPost();
        postCount(posts.length);
    }, [])

    const [posts, setPosts] = useState<IPost[]>([]);
    return (
        <>
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2">
                {posts && posts.map((val, index) =>
                (
                    <div key={index}>
                        <img className="h-40 md:h-48 w-full object-cover rounded" src={val.image} alt="" />
                    </div>
                )
                )}
            </div>

        </>
    )
}

export default ProfilePost
