
interface Aboutprops{
    bio:string | undefined
    company:string | undefined
    city:string | undefined
}

const ProfileAbout:React.FC<Aboutprops> = ({bio,company,city}) => {
  return (
    <div className="container mx-auto px-4 py-8 border border-gray-200 rounded">
        <div className="grid grid-cols-5 gap-4 p-5">
            <div>
                <h2 className="text-[#9e4026] font-semibold">About</h2>
            </div>
            <div className="col-span-4 font-light">
                <p>{bio}</p>
            </div>
            <div>
                <h2 className="text-[#9e4026] font-semibold">Company</h2>
            </div>
            <div className="col-span-4 font-light">
                <p>{company}</p>
            </div>
            <div>
                <h2 className="text-[#9e4026] font-semibold">City</h2>
            </div>
            <div className="col-span-4 font-light">
                <p>{city}</p>
            </div>
        </div>
    </div>
  )
}

export default ProfileAbout
