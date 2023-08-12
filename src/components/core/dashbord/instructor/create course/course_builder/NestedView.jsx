import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt, BiDownArrow } from "react-icons/bi";
import {GrAddCircle} from "react-icons/gr";
import ConfirmationModal from "../../../../common/ConfirmationModal"
import { deleteSection ,deleteSubsection} from "../../../../../../services/operations/courseDetailsAPIs";
import SubSectionModal from "./SubSectionModal";
import { setCourse } from "../../../../../../Redux/slice/courseSlice";


const NestedView = ({ editHandler }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //flag for modal sub-section add/view/edit subsection
  const [addSubsection, setAddsubsection] = useState(null);
   const [editsubsection, setEditsubsection] = useState(null);
   const [viewsubsection, setViewsubsection] = useState(null);
  const [confirmationModal, setConfirmationmodal] = useState(null);


  //delete section
  const handelDeleteSection =async(sectionID) => {
    
      const formdata=new FormData();
      formdata.append("sectionID",sectionID);
      formdata.append("courseID",course?._id);

      let result =await deleteSection(formdata,token);
      if(result)
      {
        dispatch(setCourse(result));
      }
      setConfirmationmodal(null);
  };

  //delete subsection
 const handelDeleteSubsection=async (subsectionID,sectionID)=>{
     const formdata=new FormData();
      formdata.append("subsectionID",subsectionID);
      formdata.append("sectionID",sectionID);
      formdata.append("courseID",course._id);

    let result=await deleteSubsection(formdata,token);
    if(result)
    {
      dispatch(setCourse(result));
    }
    setConfirmationmodal(null);
 }
  return (
    <>
      <div className="relative w-full lg:w-[80%]">
        <div className="bg-richblack-700 py-6 px-8 text-richblack-5 mt-10 rounded-md mr-2 relative">

           {/* //FOR SHOW SECTION ****   */}
            {  course?.courseContent?.map((section) => (
            <div key={section._id} className="flex flex-col gap-y-3 relative">
              <details key={section._id} >
                <summary className="border-b-2 flex justify-between">

                  <div className="flex items-center gap-3 ">
                    <RxDropdownMenu size={25} style={{ cursor: "pointer" }} />
                    <p>{section.sectionName}</p>
                  </div>

                  <div className="flex  ">
                      
                     {/* ***EDIT SECTION BUTTON  */}
                  <div className="flex gap-3">
                     <button
                      className="text-richblack-50"
                      onClick={(e) => editHandler(section._id, section.sectionName) }
                    >
                      <BiEditAlt size={25} />
                    </button>
                    
                    {/* //DELETE SECTION BUTTON *** */}
                    <button
                      className=""
                      onClick={() => 
                        setConfirmationmodal({
                          text1: "Delete thsi section",
                          text2:
                            "All the lecture in this section will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "cancel",
                          btn1Handler: () => handelDeleteSection(section._id),
                          btn2Handler: () => setConfirmationmodal(null),
                        })
                      }
                    >
                      <AiOutlineDelete size={25} />
                    </button>
                  </div>
                   
                   {/* <div className="flex gpa-1 ml-3">
                      <span>|</span>
                      <BiDownArrow />
                   </div> */}
                   
                  </div>
                </summary>

                {/* //**show SUB_SECTION */}

                <div>
                  { section?.subSection?.map((data) => (
                    <React.Fragment key={data}>
                          {/* onClick={setViewsubsection(data)} changes*   */}
                      <div className="flex justify-between px-4 my-3">
                        <div className="flex gap-5 items-center cursor-pointer"
                          onClick={()=> setViewsubsection(data)}
                        >
                          <RxDropdownMenu />
                          <p>{data.title}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setEditsubsection({
                                ...data,
                                sectionID: section._id,
                              }) }
                            }
                          >
                            <BiEditAlt />
                          </button>
                          <button
                            onClick={() => {
                              setConfirmationmodal({
                                text1: "Delete this sub section",
                                text2:" the lecture in this sub-section will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "cancel",
                                btn1Handler: () => handelDeleteSubsection(data._id, section._id),
                                btn2Handler: () => setConfirmationmodal(null),
                              });
                            }}
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}


                  <div>
                     {/* //ADD SUB_SECTION */}
                    {/* the reason is to set addSubsection =Section_id 
                      add add sub-section under the section
                        EX:- Section = A
                             sub-section= A.a
                    */}
                    <button 
                     onClick={()=> setAddsubsection(section?._id)}
                     className="flex gap-2 text-yellow-100 items-center mt-2">
                        <span className="text-richblack-50">Add lecture</span> <GrAddCircle size={20} style={{color:"yellow"}}/>
                    </button>
                  </div>

                  
                </div>
              </details>
            </div>
          ))}
        </div>
          
          {
           
           addSubsection !==null ? 

           (<SubSectionModal
             modalData={addSubsection}
             setModalData={setAddsubsection}
             add={true}
           />) 
           : viewsubsection ? 
           (<SubSectionModal
             modalData={viewsubsection}
             setModalData={setViewsubsection}
             view={true}
           />
           )
           : editsubsection ? 
           (<SubSectionModal
             modalData={editsubsection}
             setModalData={setEditsubsection}
             edit={true}
           />
           )
           :
           (
            <div></div>
           )
        
          }

          {confirmationModal ? 
          <ConfirmationModal
           modalData={confirmationModal}
          /> :<></>}
      </div>
    </>
  );
};

export default NestedView;

