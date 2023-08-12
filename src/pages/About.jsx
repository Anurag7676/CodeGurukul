import React from 'react'
import ContactFrom from '../components/core/common/ContactFrom'

import BannerImage1 from "../assets/hero section/slide1.gif"
import BannerImage2 from "../assets/hero section/slide2.gif"
import BannerImage3 from "../assets/hero section/slide3.gif"
import Quote from '../components/core/aboutpage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from "../components/core/aboutpage/StatsComponent"
import LearningGrid from "../components/core/aboutpage/LearningGrid"
import Highligthyext from "../components/core/homepage/HighLightText"
import Footer from "../components/core/common/Footer"
import ReviewSlider from '../components/core/common/ReviewSlider'

const About = () => {
  return (
    <div className=' text-white'>
 
   {/* SECTION 1 */}
    <section className=' bg-richblack-800'>
        <div className='w-full lg:w-11/12 mx-auto pt-[50px]  lg:max-h-[510px] px-2'>
            <header className='text-2xl lg:text-4xl font-bold lg:text-center'>
                Driving Innovation in Online Education for a <br/>
                <Highligthyext text={"Brighter Future"} color={"text-richblue-100"}/>
                <p className='text-base text-richblack-400 font-semibold lg:w-[60%] mx-auto text-clip my-5 '>
                Studynotion is at the forefront of 
                driving innovation in online education. We're passionate about 
                creating a brighter future by offering cutting-edge courses, 
                leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>

            </header>
            <div className='hidden lg:flex justify-between mx-auto relative w-full'>
                <img className='rounded-md p-2  lg:w-[28%] object-center'
                 src={BannerImage1} alt='BannerImage1' 
                 loading='lazy'
                 />
                <img className=' p-2 lg:w-[28%] object-center' 
                src={BannerImage2} alt='BannerImage1'
                 loading='lazy'
                />
                <img className='rounded-md p-2 lg:w-[28%] object-center'
                src={BannerImage3} alt='BannerImage1'
                loading='lazy'
                />
            </div>
               
               {/* IMAGE RENDERINHG SCREEN */}
             <div className='visible lg:hidden'>

             <figure className='relative'>
              
              <img className='rounded-md relative w-full object-center' 
                src={BannerImage2} alt='BannerImage1'
                loading='lazy'
                />
                <figcaption className='absolute top-5 left-1 text-richblack-800'>
                  "Empowering Dreams Through Code and Learning" - 
                  <span className='text-richblack-300 font-semibold' >Code GuruKul</span>
                </figcaption>
             </figure>
              
            </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className=' mt-6 lg:mt-44 mb-4 lg:w-11/12 mx-auto'>
        <div className='lg:w-11/12 mx-auto'>
            <Quote/>
        </div>
      </section>

       <div className='w-full h-0.5 bg-richblack-800'></div>
      {/* SECTION 3 */}
      <section className='lg:mt-16 mt-5 px-2'>
        <div className='flex flex-col gap-14 j'>

            {/* foudning story wala div */}
            <div className='flex flex-col lg:flex-row lg:w-11/12 mx-auto gap-3 lg:justify-around'>
                {/* founding story left box */}
                <div className='lg:w-[50%]'>
                    <h1 className='lg:text-4xl text-3xl font-inter font-bold text-gradient'>
                      Our Founding Story
                    </h1>

                    <p className='text-richblack-500 mt-6'>
                    Our e-learning platform was born out of a 
                    shared vision and passion for transforming education. 
                    It all began with a group of educators, technologists,
                     and lifelong learners who recognized the need for accessible,
                      flexible, and high-quality learning opportunities in a rapidly
                       evolving digital world.
                   </p>

                    <p className='text-richblack-500 mt-3 '>
                      As experienced educators ourselves,
                     we witnessed firsthand the limitations and challenges of traditional education systems.
                      We believed that education should not be confined to
                       the walls of a classroom or restricted by geographical
                        boundaries. We envisioned a platform that could bridge
                         these gaps and empower individuals from all walks of
                          life to unlock their full potential.
                   </p>

                </div>
                {/* foudning story right box */}
                <div className='w-full lg:w-[40%] lg:flex items-center justify-center'>
                    <img  src={FoundingStory} 
                    alt='FoundingStory'
                    loading='lazy'
                     className='w-[90%] lg:w-full ' 
                    />
                </div>
            </div>

            {/* vision and mission wala parent div */}
            <div className='flex flex-col lg:flex-row lg:justify-around lg:w-11/12 mx-auto mt-9'>
                {/* left box */}
                <div className='flex flex-col gap-5 w-full lg:w-[45%]'>
                    <h1 className='lg:text-4xl text-3xl text-[#15CBFB] font-bold'>
                     Our Vision
                    </h1>

                    <p className='text-richblack-500 px-4 lg:px-0'>
                    With this vision in mind,
                     we set out on a journey to create 
                     an e-learning platform that would 
                     revolutionize the way people learn. 
                     Our team of dedicated experts worked
                    tirelessly to develop a robust and intuitive
                    platform that combines cutting-edge technology
                    with engaging content, fostering a dynamic and 
                    interactive learning experience.
                  </p>
                </div>

                {/* right box */}
                <div className='w-full lg:w-[45%] flex flex-col gap-3'>
                    <h1 className='text-3xl lg:text-4xl text-[#EA7407] font-bold'>
                        Our Mission
                    </h1>

                    <p className='text-richblack-500 px-4 lg:px-0'>Our mission goes beyond just
                     delivering courses online.
                      We wanted to create a vibrant 
                      community of learners, where individuals can connect,
                       collaborate, and learn from one another.
                        We believe that knowledge thrives in an environment 
                        of sharing and dialogue, and we foster this spirit of 
                        collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
        </div>
      </section>  

      {/* SECTION 4 */}
      <StatsComponent/> 

       {/* section 5 */}
      <section className='mx-auto flex flex-col items-center justify-between gap-5 mb-[140px]'>
        <LearningGrid />
         
         <div className='text-center text-2xl lg:text-4xl font-bold'>Get in the Touch
           <p className='text-base text-richblack-500 my-3'>
             We’d love to here for you, Please fill out this form.
           </p>
         </div>
        <ContactFrom />
      </section>
     
      {/*section 6 */}
       <section className='px-2 my-5'>
        <ReviewSlider/>
       </section>

       <Footer/>
    </div>
  )
}

export default About