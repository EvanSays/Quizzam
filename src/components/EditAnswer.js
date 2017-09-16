import React from 'react'

const EditAnswer = ({ answers }) => {

  const answer = answers.map(single => {
    return <div><input type="radio" id="text" value={single.answer_text} />
      <label for="text">{single.answer_text}</label></div>
    
  })
  return(
    <div>
      {answer}
      
    </div>
  )
}

export default EditAnswer;

// input type= "radio" id= "genderChoice1"
// name = "gender" value= "male" >
//   <label for="genderChoice1">Male</label>