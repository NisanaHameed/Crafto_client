import { useEffect, useState } from "react"
import { getPosts } from "../../Api/professional"

interface IPost {
    _id?: string
    category: string
    caption: string
    image: string
}

const ProfilePost = () => {

    useEffect(() => {
        const fetchPost = async () => {
            const res = await getPosts();
            console.log(res)
            if (res?.data.posts) {
                setPosts(res.data.posts);
            }
        }
        fetchPost();
    }, [])

    const [posts, setPosts] = useState<IPost[]>([]);
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
