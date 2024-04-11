
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import DesignCards from '../../Components/User/DesignCards';
import { getCategory } from '../../Api/admin';
import { getAllDesigns } from '../../Api/user';
import Navbar from '../../Components/common/Navbar';

interface ICategory {
    name: string,
    image: string
}

const Search = ({role}) =>{
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });
const [categories,setCategories] = useState<ICategory[]>([])
const [filterData,setFilterData] = useState<ICategory[]>([])

  useEffect(() => {
    const fetchCategory = async () => {
        const res = await getCategory();
        setCategories(res?.data.categories);  
    }
    fetchCategory();
}, [])

  console.log(sidebarData);
  const [design, setDesign] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showMore, setShowMore] = useState(false);

  const location = useLocation();

//   const navigate = useNavigate();

  useEffect(() => {
    
    const fetchPosts = async () => {
    
      const res = await getAllDesigns()
      if (res?.data?.success) {  
        setDesign(res.data.posts);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e:any) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'all';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // const urlParams = new URLSearchParams(location.search);
    // urlParams.set('searchTerm', sidebarData.searchTerm);
    // urlParams.set('sort', sidebarData.sort);
    // urlParams.set('category', sidebarData.category);
    // const searchQuery = urlParams.toString();
    // navigate(`/search?${searchQuery}`);
    // if(sidebarData.category && sidebarData.category!=='all'){
    //     const arr = design.filter((val)=>{
    //          val.category === sidebarData.category;
    //     })
    //     if(sidebarData.sort=='desc'){
    //         arr.sort((a,b)=>b-a);
    //     }
    //     setFilterData(arr);
    // }
    const searchTermRegex = new RegExp(`^${sidebarData.searchTerm}`, 'i')
    const arr = design.filter((val)=>{
        return searchTermRegex.test(val.category);
    })
    setFilterData(arr)
  };

//   const handleShowMore = async () => {
//     const numberOfPosts = design.length;
//     const startIndex = numberOfPosts;
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set('startIndex', startIndex.toString());
//     const searchQuery = urlParams.toString();
//     const res = await fetch(`/api/post/getposts?${searchQuery}`);
//     if (!res.ok) {
//       return;
//     }
//     if (res.ok) {
//       const data = await res.json();
//       setDesign([...design, ...data.design]);
//       if (data.design.length === 9) {
//         setShowMore(true);
//       } else {
//         setShowMore(false);
//       }
//     }
//   };

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
              className='border border-green rounded'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select onChange={handleChange} className='h-9 md:w-full rounded' value={sidebarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
              className='h-9 md:w-full rounded'
            >
                <option value='all'>All</option>
                {categories && categories.map((val,index)=>
                <option key={index} value={val.name}>{val?.name}</option>
                )}
              
            </select>
          </div>
          <button onClick={handleSubmit} type='submit'className='bg-[#007562] py-3 md:w-full w-1/2 rounded text-white' >
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
                    
                
          {/* {!loading && design.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )} */}
          {/* {loading && <p className='text-xl text-gray-500'>Loading...</p>} */}
          {
            filterData.length ?
            filterData.map((val, index) => (
                <div key={index} className="max-w-full bg-white rounded-md">
                    <a>
                        <img className="rounded h-52 lg:h-80 w-full object-cover filter hover:brightness-75 cursor-pointer" src={val.image} alt="" />
                    </a>
                    <div className="py-2">
                        <a>
                            <h5 className="lg:text-base md:text-sm text-sm font-normal tracking-tight text-gray-900 cursor-pointer"><img src={val.profId.image} className="w-4 h-4 rounded-full inline object-cover mr-2" />{val.profId?.company}</h5>
                        </a>
                    </div>
                </div>
            )):
            design.map((val, index) => (
                <div key={index} className="max-w-full bg-white rounded-md">
                    <a>
                        <img className="rounded h-52 lg:h-80 w-full object-cover filter hover:brightness-75 cursor-pointer" src={val.image} alt="" />
                    </a>
                    <div className="py-2">
                        <a>
                            <h5 className="lg:text-base md:text-sm text-sm font-normal tracking-tight text-gray-900 cursor-pointer"><img src={val.profId.image} className="w-4 h-4 rounded-full inline object-cover mr-2" />{val.profId?.company}</h5>
                        </a>
                    </div>
                </div>
            ))
        }
            </div>
          {/* {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )} */}
        </div>
      </div>
    </div>
    </>
  );
}

export default Search;