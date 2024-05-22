
import { useEffect, useState } from 'react';
import { getCategory } from '../../Api/admin';
import { searchDesigns } from '../../Api/user';
import Navbar from '../../Components/common/Navbar';
import { useNavigate } from 'react-router-dom';

interface ICategory {
  name: string,
  image: string
}
interface IProps {
  role: 'user' | 'professional',
}
interface IDesign {
  _id: string
  image: string
  caption: string
  category: string
  profId: {
    firstname: string
    lastname: string
    company: string
    image: string
  }
  likes: [string],
  createdAt: Date
}

const Search: React.FC<IProps> = ({ role }) => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: -1,
    category: '',
  });
  const [categories, setCategories] = useState<ICategory[]>([])
  const [design, setDesign] = useState<IDesign[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 8

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await getCategory();
      setCategories(res?.data.categories);
    }
    fetchCategory();
  }, [])

  useEffect(() => {

    const fetchPosts = async () => {

      const res = await searchDesigns(sidebarData.searchTerm, sidebarData.category, sidebarData.sort, currentPage, itemsPerPage)

      if (res?.data?.success) {
        setDesign(res.data.data.posts);
        setTotalItems(Math.ceil(res.data.data.total / itemsPerPage));
      }
    };
    fetchPosts();
  }, [currentPage > 1, itemsPerPage, sidebarData]);

  const handleChange = (e: any) => {

    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || -1;
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'all';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  const designDetail = (id: string) => {
    if (role == 'user') {
      navigate(`/postDetail/${id}`);
    } else {
      navigate(`/professional/postDetail/${id}`);
    }
  }

  const lastPage = Math.ceil(totalItems / itemsPerPage);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      < Navbar role={role} />
      <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-200'>
          <form className='flex flex-col gap-8' >
            <div className='flex   items-center gap-2'>
              <label className='whitespace-nowrap font-semibold'>
                Search
              </label>
              <input
                placeholder='Search...'
                id='searchTerm'
                type='text'
                className='border border-green rounded cursor-pointer text-sm'
                value={sidebarData.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Sort:</label>
              <select onChange={handleChange} className='h-9 md:w-full rounded cursor-pointer text-sm' value={sidebarData.sort} id='sort'>
                <option value={-1}>Latest</option>
                <option value={1}>Oldest</option>
              </select>
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Category:</label>
              <select
                onChange={handleChange}
                value={sidebarData.category}
                id='category'
                className='h-9 md:w-full rounded cursor-pointer text-sm'
              >
                <option value='all'>All</option>
                {categories && categories.map((val, index) =>
                  <option key={index} value={val.name}>{val?.name}</option>
                )}

              </select>
            </div>
            <button onClick={handleSubmit} type='submit' className='bg-[#007562] py-3 md:w-full w-1/2 rounded text-white' >
              Apply Filters
            </button>
          </form>
        </div>
        <div className='w-full'>
          <h1 className='text-xl font-semibold p-3 mt-5 '>
            Designs
          </h1>
          <div className='p-7 flex flex-wrap gap-4'>
            <div className="max-w-8xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-5 gap-4 mx-auto">
              {
                design.length ? design.map((val, index) => (
                  <div onClick={() => designDetail(val?._id)} key={index} className="max-w-full bg-white rounded-md">
                    <a>
                      <img className="rounded h-52 lg:h-80 w-full object-cover filter hover:brightness-75 cursor-pointer" src={val.image} alt="" />
                    </a>
                    <div className="py-2">
                      <a>
                        <h5 className="lg:text-base md:text-sm text-sm font-normal tracking-tight text-gray-900 cursor-pointer"><img src={val.profId.image} className="w-4 h-4 rounded-full inline object-cover mr-2" />{val.profId?.company}</h5>
                      </a>
                      <h2 className='text-sm font-thin ml-6'>{val.category}</h2>
                    </div>
                  </div>
                ))
                  :
                  <div className='flex flex-col items-center justify-center w-full'>
                    <img className='w-28' src="/emptybox.png" alt="" />
                    <h2 className='py-3 text-green-600'>No Data!</h2>
                  </div>
              }
            </div>
          </div>
          <div className="py-5 flex justify-center">
            <nav aria-label="Page navigation example">
              <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                  <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-2.5 h-2.5 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </button>
                </li>
                {Array.from({ length: totalItems }, (_, index) => index + 1).map((page) => (
                  <li key={page} >
                    <a
                      onClick={() => changePage(page)}
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                    >
                      {page}
                    </a>
                  </li>
                ))}

                <li>
                  <button
                    onClick={() => changePage(currentPage + 1)}
                    aria-disabled={currentPage === lastPage}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-2.5 h-2.5 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;