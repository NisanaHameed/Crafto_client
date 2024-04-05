
interface ICard{
    image:string
    title:string
}

const Card:React.FC<ICard> = ({image,title}) => {

    return (
        <div className="max-w-full bg-white rounded-md shadow-md hover:shadow-gray-700">
            <a>
                <img className="rounded-t-md h-32 lg:h-40 w-full object-cover" src={image} alt="" />
            </a>
            <div className="p-2">
                <a>
                    <h5 className="text-center lg:text-base md:text-sm text-sm font-normal tracking-tight text-gray-900">{title}</h5>
                </a>
            </div>
        </div>
    )
}

export default Card
