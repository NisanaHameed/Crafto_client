
const Card = () => {

    return (
        <div className="max-w-full bg-white border border-gray-200 rounded-md shadow-md">
            <a href="#">
                <img className="rounded-t-md" src="/bedroom2.jpg" alt="" />
            </a>
            <div className="p-2">
                <a href="#">
                    <h5 className="text-center lg:text-base md:text-sm text-sm font-normal tracking-tight text-gray-900">Bedroom</h5>
                </a>
            </div>
        </div>
    )
}

export default Card
