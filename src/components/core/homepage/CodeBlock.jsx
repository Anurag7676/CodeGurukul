import React from 'react'
import CtaButton from "./Button"
import {TypeAnimation} from "react-type-animation"
import Typewriter from 'react-ts-typewriter';



const CodeBlock = ({position,heading,subheading,btn1,btn2,codechunk,bgGradient,codeColor,bdr} ) => 
{
  
 
  return (
    <div className={`lg:flex lg:${position} my-20 gap-5 justify-between lg:w-[90%] mx-auto`}>
        
        {/* first_block */}
          <div className='lg:w-[45%] flex flex-col gap-3 '>
             
               <p className='w-full'> {heading}</p> 

               <div className='font-bold text-richblue-300 w-full'>
                  {subheading}
               </div>

               <div className='flex gap-7 my-7'>
                  <CtaButton active={btn1.active} linkto={btn1.linkto} children={btn1.text} />
                  <CtaButton active={btn2.active} linkto={btn2.linkto} children={btn2.text}/>
               </div>
          </div>

          {/* second block */}
          <div className={`lg:w-[45%] text-[10px] flex relative
           lg:${bdr? "lg:border-t-2 lg:border-r-2" :"lg:border-b-2 lg:border-l-2"}  
          
          py-4 `}>
            
           <div className='absolute lg:w-[350px] lg:h-[250px] conical-gradient'>

           </div>
             <div className='text-center lg:text-base flex flex-col w-[10%] text-richblue-300 font-inter font-bold'>
                   
                      <p>1</p>
                      <p>2</p>
                      <p>3</p>
                      <p>4</p>
                      <p>5</p>
                      <p>6</p>
                      <p>7</p>
                      <p>8</p>
                      <p>9</p>
                      <p>10</p>
                      <p>11</p>
             </div>

             <div className={`flex lg:w-[40%]flex-col lg:text-base gap-2 font-mono pr-2 ${codeColor}`}>
                  <TypeAnimation
                    sequence={[codechunk,5000]}
                    repeat={Infinity}
                     speed={20}
                     wrapper="span"
                     cursor={true}
                    style={{
                      whiteSpace:"pre-line",
                      display:"block"
                    }}
                
                  />

                  

     
             </div>
          </div>
    </div>
  )
}

export default CodeBlock