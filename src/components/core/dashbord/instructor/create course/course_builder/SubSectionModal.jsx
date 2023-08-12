import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import IconButton from '../../../../common/IconButton';
import { setCourse } from '../../../../../../Redux/slice/courseSlice';
import { updateSubSection,createSubSection } from '../../../../../../services/operations/courseDetailsAPIs';
import {RxCross1} from "react-icons/rx"
import Upload from './Upload';
import { useSelector } from 'react-redux';



const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const {
        register, 
        handleSubmit, 
        setValue,
        formState: {errors},
        getValues,
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        if(view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    },[]);

    //check sub-section edited or not   
    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl ) {
                return true;
            }
        else {
            return false;
        }

    }
    //for upadted sub-section
    const handleEditSubSection = async () => {
      
        const currentValues = getValues();
        const formData = new FormData();
        
        formData.append("courseID",course._id);
        formData.append("sectionID", modalData.sectionID);
        formData.append("subsectionID", modalData._id);

        if(currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if(currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if(currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);
        //API call
        const result  = await updateSubSection(formData, token);
        if(result) {
           dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async (data) => {
       console.log("in sub-modal");
        if(view)
            return;

        if(edit) {
            if(! isFormUpdated()) {
                toast.error("No changes made to the form")
            }
            else {
                //edit krdo store me 
                handleEditSubSection();
            }
            return;
        }         
         

        //ADD
        const formData = new FormData();
        formData.append("courseID",course?._id);
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);
        setLoading(true);
        //API CALL
        const result = await createSubSection(formData, token);

        if(result) {
            //TODO: check for updation
            dispatch(setCourse(result))
        }
        setModalData(null);
        setLoading(false);
    }


  return (
    <div className='w-full relative sm:w-[90%] mx-auto lg:w-full my-2'>
      
        <div className='modal-content'>
            <div>
                <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={() => setModalData(null)}>
                    <RxCross1 size={25} style={{color:"tomato"}} />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3'>

               <div >
                 <Upload 
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                 />
               </div>
                
                <div>
                    <label className='text-richblack-5 mb-2'>
                        Lecture Title <sup>*</sup>
                    </label>
                    <input 
                        id='lectureTitle'
                        placeholder='Enter Lecture Title'
                        {...register("lectureTitle", {required:true})}
                        className='w-full border-none outline-none bg-richblack-700 px-2 py-2 rounded-md mt-3 text-white'
                    />
                    {errors.lectureTitle && (<span>
                        Lecture Title is required
                    </span>)}
                </div>
                <div>
                    <label className='text-richblack-5'>Lecture Description</label>
                    <textarea 
                        id='lectureDesc'
                        placeholder='Enter Lecture Description'
                        {...register("lectureDesc", {required:true})}
                        className='w-full min-h-[130px] mt-3 bg-richblack-700
                        border-none outline-none px-2 py-2 rounded-md text-white'
                    />
                    {
                        errors.lectureDesc && (<span>
                            Lecture Description is required
                        </span>)
                    }
                </div>

                {
                    !view && (
                        <div>
                            <IconButton 
                               type={"submit"}
                               customClasses={'px-4 py-2 bg-yellow-100 rounded-md'}
                               text={loading ? "Loading...": edit ? "Save Changes" : "Save"}
                            />
                        </div>
                    )
                }
            </form>
        </div>

    </div>
  )
}

export default SubSectionModal
