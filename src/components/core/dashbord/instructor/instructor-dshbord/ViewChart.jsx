import React, { useState } from 'react'
import "./style.css"
import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const ViewChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("Students");

    if(currChart==="Students")
    {
      courses.sort((a, b) => b.totalStudentEnrolled - a.totalStudentEnrolled);
    }
    else{
      courses.sort((a, b) => b.totalEarning - a.totalEarning)
    }

    //function to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses.slice(0,5).map((course)=> course.courseName),
        datasets: [
            {
                data: courses.slice(0,5).map((course)=> course.totalStudentEnrolled),
                backgroundColor: getRandomColors(5),
            }
        ]
    }


    //create data for chart displaying iincome info
    const chartDataForIncome = {
        labels:courses.slice(0,5).map((course)=> course.courseName),
        datasets: [
            {
                data: courses.slice(0,5).map((course)=> course.totalEarning),
                backgroundColor: getRandomColors(5),
            }
        ]
    }


    //create options
    const options = {
      plugins: {
        legend: {
          display: true,
          position: 'center',
          labels: {
            color: 'green',
            font: {
              size: 14,
              weight: 'bold'
            },
            align: 'start' // Align labels to the start (left)
          }
        }
      }
    };


  return (
    <div className='p-2 pi-box-shadow'>
      <p className='text-xl font-semibold text-richblack-200'>Visualise top 5 course {" "}
        <span className='lowercase text-richblack-50'>{currChart}</span> 
      </p>
      <div className='flex gap-x-5 my-3'>
        <button
        className={`${currChart ==="Students" ?"bg-richblack-700 text-richblack-25" :"bg-yellow-100 text-richblack-800"} px-2 py-1 rounded-md`}
        onClick={() => setCurrChart("Students")}
        >
            Students
        </button>

        <button
         className={`${currChart ==="Earning" ?"bg-richblack-700 text-richblack-25" :"bg-yellow-100 text-richblack-800"} px-2 py-1 rounded-md`}
        onClick={() => setCurrChart("Earning")}
        >
            Earning
        </button>
      </div>
      <div>
        <Pie 
            data={currChart === "Students" ? chartDataForStudents : chartDataForIncome}
            options={options}
        />
      </div>
    </div>
  )
}

export default ViewChart;
