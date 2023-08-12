import React from 'react'


const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
  return (
    <section className='w-full bg-richblack-500 py-5 my-9'>
        <div>
            <div className='flex justify-between lg:justify-around lg:gap-x-5'>
                {
                    Stats.map( (data, index) => {
                        return (
                            <div key={index} className='flex flex-col items-center gap-3'>
                                <h1 className='lg:text-2xl font-semibold text-white'>
                                    {data.count}
                                </h1>
                                <h2 className='text-richblack-700 font-semibold'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
