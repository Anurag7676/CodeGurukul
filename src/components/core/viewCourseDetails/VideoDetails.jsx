import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import {AiFillPlayCircle} from 'react-icons/ai'
import IconButton from '../common/IconButton'
import { markLectureCompleted } from "../../../services/operations/studentFeaturesAPIs";
import { updateCompletedLectures } from '../../../Redux/slice/viewCourseSlice'
import {BiSkipNextCircle,BiSkipPreviousCircle} from "react-icons/bi"

const VideoDetails = () => {

  const { courseID, sectionID, subSectionID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideodata] = useState([]);
  const [isVideoEnded, setIsvideoended] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if (!courseSectionData?.length) return;

      if (!courseID && !sectionID && !subSectionID) {
        navigate("dashboard/enrolled-courses");
      } 
      else {
        //assume that all 3 slice viewCourse filed are present

        //filer the section on courseContent
        const filterData = courseSectionData?.filter(
          (section) => section._id === sectionID
        );

        //filter out the exact video data from section->sub-section->video
        const filteredVideoData = filterData?.[0]?.subSection.filter(
          (data) => data._id === subSectionID
        );

       console.log(filteredVideoData);
        
        setVideodata(filteredVideoData);
    
        setIsvideoended(false);
       
        
      }
    };

    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionID
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionID);

    return currentSectionIndex === 0 && currentSubsectionIndex === 0;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionID
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionID);
    const noOfSubsection =
      courseSectionData[currentSectionIndex]?.subSection?.length;

    return (
      currentSectionIndex === courseSectionData?.length - 1 &&
      currentSubsectionIndex === noOfSubsection - 1
    );
  };

  const gotoNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionID
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionID);

    const noOfSubsection =
      courseSectionData[currentSectionIndex]?.subSection?.length;

    // it mean it's not last video of a [section]
    //then we go to next video of a section [1 -[1.a -> 1.b]]
    if (currentSubsectionIndex !== noOfSubsection - 1) {
      const nextSubsectionID =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubsectionIndex+1 
        ]?._id;

      navigate(
        `/view-course/${courseID}/section/${sectionID}/sub-section/${nextSubsectionID}`
      );
    }

    //that is the case when you stand at last video of section and want to watch next video
    //the we jump to next section first video
    //like section[1->[1.e]] -> section[2->[2.a]] // here assume e is last video
    else {
      const nextSectionID = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubsectionID =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseID}/section/${nextSectionID}/sub-section/${nextSubsectionID}`
      );
    }
  };

  const gotoPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionID
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionID);

    const noOfSubsection =
      courseSectionData[currentSectionIndex - 1]?.subSection?.length;

    // its mean it's not a first video of a section , then we process current video to previous video on same section
    //section [1->[1.b]] -> section [1-> [1.a]]
    if (currentSubsectionIndex !== 0) {
     
      const prevSubsectionID =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubsectionIndex - 1
        ]._id;

      navigate(
        `/view-course/${courseID}/section/${sectionID}/sub-section/${prevSubsectionID}`
      );
    }

    // we stant at 1st video of a section then we go to last video of previous section
    //section[2->[2.a]] -> section[1->[1.e]] //assume "a" is first video and "e" is last video
    else {
      const prevSectionID = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubsectionID =
        courseSectionData[currentSectionIndex - 1].subSection[
          noOfSubsection - 1
        ]._id;

      navigate(
        `/view-course/${courseID}/section/${prevSectionID}/sub-section/${prevSubsectionID}`
      );
    }
  };

  const handelLectureCompletion = async() => {
    
    //here api was writen mark lecture completed 
    //and implement courseProgess controler
    const formdata=new FormData();

    formdata.append("courseID",courseID);
    formdata.append("subSectionID",subSectionID)
     
    setLoading(true);
    const res=await markLectureCompleted(formdata,token);
     
    if(res)
    {
      console.log("call gose and set updated complete lecture");
      dispatch(updateCompletedLectures(subSectionID));
    }
    

    setLoading(false)
  };

  return (
    <div className="w-full mx-auto mt-10 relative">
     <div className="lg:w-[80%] mx-auto mb-5 relative">
      {
        !videoData ?( <div className="text-white text-3xl">No data found </div>)
        :
        (
           <div className="bg-richblack-100 relative">
           
                <Player
                ref={playerRef}
                src={videoData[0]?.videoUrl}
                playsInline
                onEnded={()=>setIsvideoended(true)}
                fluid="true" 
                aspectRatio="16:9"
                
                >
          
                 
                 {
                  isVideoEnded &&(
                    
                    <div className="absolute left-[25%] top-[25%] lg:left-[35%] lg:top-[35%] z-50 ">
                      {
                        !completedLectures.includes(subSectionID) &&(
                          <IconButton
                            text="Mark as completed"
                            customClasses={"bg-yellow-100 lg:font-semibold text-richblack-800 px-1 py-2  lg:px-4 lg:py-3 lg:text-lg rounded-md mr-3"}
                            onClick={()=> handelLectureCompletion()}
                          />
                        )
                      }

                      <IconButton
                        text={"Watch again"}
                        onClick={()=>{
                           if(playerRef.current)
                           {
                            playerRef.current.seek(0);

                            setIsvideoended(false);
                           }
                        }}

                        customClasses={'bg-yellow-100 text-richblack-800 lg:font-semibold px-1 py-2 lg:px-4 lg:py-3 lg:text-lg rounded-md'}
                      />

                       <div className="flex gap-2 mt-4">
                        {
                          !isFirstVideo() &&(
                            <button
                            disabled={loading}
                            onClick={gotoPreviousVideo}
                            className="text-xl bg-yellow-100 h-10 w-10
                            flex justify-center items-center
                             text-richblack-900  rounded-full"
                            >
                              <BiSkipPreviousCircle size={25}/>
                            </button>
                          )
                        }
                        {
                          !isLastVideo() &&(
                            <button
                             disabled={loading}
                             onClick={gotoNextVideo}
                             className="text-xl bg-yellow-100 
                             flex justify-center items-center w-10 h-10
                              text-richblack-900 rounded-full"
                            >
                              <BiSkipNextCircle size={25}/>
                            </button>
                          )
                        }
                      </div>
                    </div>
                  )
                 }
                </Player>
           </div>
        )
      }

        <p className="text-richblack-5 mt-6 text-xl font-semibold">{videoData[0]?.title}</p>
        <p className="text-richblack-100">{videoData[0]?.description}</p>
     </div>
        
  </div>
  );
};

export default VideoDetails;
