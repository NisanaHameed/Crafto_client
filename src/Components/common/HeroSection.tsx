import { useNavigate } from "react-router-dom";

interface IRole {
    role: 'user' | 'professional'
}

const HeroSection: React.FC<IRole> = ({ role }) => {

    const navigate = useNavigate();

    const browseDesigns = () => {

        if (role == 'user') {
            navigate('/allDesigns');
        } else {
            navigate('/professional/allDesigns');
        }
    }

    return (
        <>
            <div className='relative flex justify-center overflow-hidden '>
                <div className='absolute px-4 bg-[#0e3014] h-1/2 lg:h-80'>
                    <h2 className=' text-gray-400 mt-28 lg:mt-52 text-xl lg:text-3xl font-sans'>Find professionals for<br />your perfect space</h2>
                </div>
                <img src="/sofa.jpg" className='p-0 lg:h-[550px] w-full object-cover' alt="" />
            </div>
            <div>

                <section className="max-w-7xl mx-auto px-3 pt-14 sm:px-16 lg:px-4 mb-12">
                    <article>
                        <h2 className="text-xl lg:text-2xl py-3 font-semibold text-center text-gray-800">Here's what you can do on CRAFTO</h2>
                        <section className="mt-6 grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8">
                            <article onClick={browseDesigns} className="relative mx-auto w-full h-16 lg:h-20 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out cursor-pointer">
                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
                                <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                                    <img src="/icons8-home.png" className="w-12" alt="" />
                                    <h3 className="ml-3">
                                        <a className="text-white text-xl font-bold text-center">
                                            <span className="absolute inset-0"></span>
                                            Discover Design Ideas
                                        </a>
                                    </h3>
                                </div>
                            </article>
                            <article className="relative mx-auto w-full h-16 lg:h-20 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out cursor-pointer">
                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
                                <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                                    <img src="/icons8-professional.png" alt="" />
                                    <h3 className="ml-3">
                                        <a className="text-white text-xl font-bold text-center">
                                            <span className="absolute inset-0"></span>
                                            Browse Professionals
                                        </a>
                                    </h3>
                                </div>
                            </article>
                        </section>
                    </article>
                </section>

            </div>
        </>
    )
}

export default HeroSection;