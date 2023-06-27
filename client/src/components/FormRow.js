import React from 'react'




const FormRow = ({type, name, value, handleChange, labelText  }) => {
  return (
    <div className="form-row">
       <label htmlFor={name} className='form-label'>{labelText || name}</label>
       <input type={type} value={value} name={name} onChange={handleChange} className='form-input'/>
    </div>
  )
}

export default FormRow


// // const FormRow = ({ type, name, labelText, defaultValue = '', onChange }) => {
//   return (
//     <div className='form-row'>
//       <label htmlFor={name} className='form-label'>
//         {labelText || name}
//       </label>
//       <input
//         type={type}
//         id={name}
//         name={name}
//         className='form-input'
//         defaultValue={defaultValue}
//         required
//         onChange={onChange}
//       />
//     </div>
//   );
// };

// export default FormRow;