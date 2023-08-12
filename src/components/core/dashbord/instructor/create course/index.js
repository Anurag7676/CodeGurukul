import StepRender from "./StepRender"

export default function AddCourse()
{
    return(
        <>
            <div className="w-full flex flex-col-reverse lg:flex-row mt-8 lg:px-5">
               <div className="lg:w-[70%]">
                 <h1 className="text-2xl font-bold  mt-7">Add course</h1>
                  <div>
                    <StepRender />
                  </div>
               </div>
                
                <div className="lg:w-[29%] border-[1px] h-fit px-5 py-2 border-richblack-700">
                     <p className="font-bold font-inter tracking-wider">⚡Course Upload Tips</p> 
                     <ul className="list-disc text-lg sm:text-xl lg:text-sm text-richblack-300">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}