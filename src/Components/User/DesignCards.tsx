import { useEffect } from "react"
import Card from "../common/Card"

const DesignCards = () => {

    useEffect(()=>{

    },[])

  return (
    <section className="max-w-7xl mx-auto px-3 pt-7 sm:px-16 lg:px-4 mb-12">
            <h1 className="text-xl font-semibold pb-6">Designs</h1>
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
        < Card />
        < Card />
        < Card />
        < Card />
        < Card />
        < Card />
    </div>
    </ section>
  )
}

export default DesignCards
