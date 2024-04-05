import { useEffect, useState } from "react"
import { getCategory } from "../../Api/admin"
import { useNavigate } from "react-router-dom"

interface ICategory {
  _id: string
  name: string
  image: string
}
interface IRole {
  role: 'user' | 'professional'
}
const DesignCards: React.FC<IRole> = ({ role }) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  useEffect(() => {
    let fetchCategories = async () => {
      const res = await getCategory();
      if (res?.data.categories) {
        setCategories(res.data.categories);
      }
    }
    fetchCategories();
  }, [])
  const navigate = useNavigate();

  const handleClick = async (category: string) => {
    if (role == 'user') {
      navigate(`/designs/${category}`);
    } else {
      navigate(`/professional/designs/${category}`);
    }
  }
  
  return (
    <section className="max-w-7xl mx-auto px-3 pt-7 sm:px-16 lg:px-4 mb-12">
      <h1 className="text-xl font-semibold pb-6">Designs</h1>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((val, index) =>
        (
          <div onClick={() => handleClick(val.name)} key={index} className="max-w-full bg-white rounded-md shadow-md hover:shadow-xl cursor-pointer">
            <a>
              <img className="rounded-t-md h-32 lg:h-40 w-full object-cover" src={val.image} alt="" />
            </a>
            <div className="p-2">
              <a>
                <h5 className="text-center lg:text-base md:text-sm text-sm font-normal tracking-tight text-gray-900">{val.name}</h5>
              </a>
            </div>
          </div>
        )
        )}
      </div>
    </ section>
  )
}

export default DesignCards
