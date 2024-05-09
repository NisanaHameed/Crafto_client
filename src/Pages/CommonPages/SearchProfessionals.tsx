import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobrole, getProfessionals } from '../../Api/admin';
import Navbar from '../../Components/common/Navbar';

interface IProps {
    role: 'user' | 'professional',
  }
interface IJobrole {
    name: string
  }
  interface IProfs {
    _id: string
    firstname: string
    lastname: string
    email: string
    city: string
    job: string
    experience: number
    company: string
    bio: string
    image: string
    followers: number
    isVerified: boolean
  }

const SearchProfessionals:React.FC<IProps> = ({role}) => {

    const [jobrole, setJobrole] = useState<IJobrole[]>([])
    const [profs, setProfs] = useState<IProfs[]>([])
    const [filterData, setFilterData] = useState<IProfs[]>([])
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: '',
        category: 'all',
      });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobroles = async () => {
          const res = await getJobrole();
          if (res?.data.success) {
            setJobrole(res.data.jobroles);
          }
        }
        fetchJobroles();
      }, [])
    
      useEffect(() => {
        const fetchProfessionals = async () => {
          const res = await getProfessionals();
          if (res?.data.success) {
            setProfs(res.data.profs);
            setFilterData(res.data.profs)
          }
        }
        fetchProfessionals();
      }, [])

      const handleChange = (e: any) => {

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

      const handleSubmit = (e: any) => {
        e.preventDefault();
    
        const searchTermRegex = new RegExp(`${sidebarData.searchTerm}`, 'i')
        const arr = profs.filter((val: IProfs) => {
          const matchesSearchTerm = searchTermRegex.test(val.firstname) || searchTermRegex.test(val.lastname);
          const matchesCategory = sidebarData.category === 'all' || val.job === sidebarData.category;
          return matchesSearchTerm && matchesCategory ;
        })
        console.log('arr',arr)
        
        const arr2 = arr.filter((val:IProfs)=>{
            if(sidebarData.category=='all'){
                return val;
            }else{
                return val.job === sidebarData.category
            }
        })
        setFilterData(arr2)
      }

      const profDetail = (id: string) => {
        if(role=='user'){
            navigate(`/profDetails/${id}`);
        }else{
            navigate(`/professional/profDetails/${id}`);
        }
      }

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
            {/* <div className='flex items-center gap-2'>
              <label className='font-semibold'>Location</label>
              <input
                id='sort'
                type='text'
                className='border border-green rounded cursor-pointer'
                value={sidebarData.sort}
                onChange={handleChange}
              />
            </div> */}
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Job:</label>
              <select
                onChange={handleChange}
                value={sidebarData.category}
                id='category'
                className='h-9 md:w-full text-sm rounded cursor-pointer'
              >
                <option value='all'>All</option>
                {jobrole && jobrole.map((val, index) =>
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
            Professionals
          </h1>
          <div className='p-6 flex flex-wrap gap-4'>
            <div className="w-full space-y-3 max-w-md md:max-w-2xl bg-white">

              {
                filterData ?
                  filterData.map((val, index) => (
                    <div onClick={()=>profDetail(val._id)} key={index} className="grid grid-cols-3 border border-gray-200 py-4 rounded cursor-pointer">
                        <div className="col-span-1 mx-auto"><img src={val.image} className="rounded-full w-12 h-12 object-cover" alt="" /></div>
                        <div className="col-span-2">
                        
                            <h2 className="font-semibold text-sm inline">
                                {val.firstname} {val.lastname}
                                {val?.isVerified && <img src="/verified.png" className="w-6 inline ml-2" alt="" />}
                                </h2>
                            {/* <button className="border border-[#3f8377] text-[#3f8377] hover:text-white hover:bg-[#3f8377] inline ml-6 px-4 py-[2px] rounded">Message</button> */}
                            <h2 className="text-sm mt-1">{val.job} | {val.experience} years</h2>
                        </div>
                    </div>
                  )) :
                  profs.map((val, index) => (
                    <div onClick={()=>profDetail(val._id)} key={index} className="grid grid-cols-3 border border-gray-200 py-4 rounded cursor-pointer">
                        <div className="col-span-1 mx-auto"><img src={val.image} className="rounded-full w-12 h-12 object-cover" alt="" /></div>
                        <div className="col-span-2">
                        
                            <h2 className="font-semibold text-sm inline">
                                {val.firstname} {val.lastname}
                                {val?.isVerified && <img src="/verified.png" className="w-6 inline ml-2" alt="" />}
                                </h2>
                            {/* <button className="border border-[#3f8377] text-[#3f8377] hover:text-white hover:bg-[#3f8377] inline ml-6 px-4 py-[2px] rounded">Message</button> */}
                            <h2 className="text-sm mt-1">{val.job} | {val.experience} years</h2>
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
    )
}

export default SearchProfessionals
