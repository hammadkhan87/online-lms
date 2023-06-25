import React from 'react'
import "./quizes.scss"

const Quizes = ({sheduledquizes}) => {
  return (
    <div className='main-div-quizes'>

          {sheduledquizes.map((classItem, index) => (
          <div
            key={index}
            className="inner-class-div-a"
            
          >
            <div className="inner-class-bar-a">
              <p className="single-class-name-a">{classItem.lessonName}</p>
              <p className="show-student-text-a">
                Starts at : {classItem.start.replace("T", " ")}
              </p>
              <p className="show-student-text-b">
                End at : {classItem.end.replace("T", " ")}
              </p>
              
            </div>
            
          </div>
        ))}

    </div>
  )
}

export default Quizes