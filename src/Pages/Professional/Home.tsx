import Navbar from '../../Components/common/Navbar'

const Home = () => {
    return (
        <>
            <Navbar role={'professional'}/>

            <div className='relative flex justify-center overflow-hidden '>
                <div className='absolute px-4 bg-[#0e3014] h-1/2 lg:h-80'>
                    <h2 className=' text-gray-400 mt-28 lg:mt-52 text-xl lg:text-3xl font-sans'>Find professionals for<br />your perfect space</h2>
                </div>
                <img src="sofa.jpg" className=' p-0 lg:h-[550px] w-full object-cover' alt="" />
            </div>
        </>
    )
}

export default Home;
