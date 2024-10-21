


import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Update = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: "",
      number: "",
    }
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    const number = localStorage.getItem("number");
    
    setValue("name", name);
    setValue("number", number);
  }, [setValue]);

  const onSubmit = (data) => {
    const id = localStorage.getItem("id");
    axios.put(`https://670f8b553e715186165860d7.mockapi.io/crud-doctor/${id}`, data)
      .then(() => {
        navigate("/read");
      })
      .catch((error) => {
        console.error("There was an error updating the data!", error);
      });
  };

  return (
    <div>
      <h2>Update</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input style={{backgroundColor:"#D1E7DD",border:'2px solid black'}}
          
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Min Lenght should be Atleast 3 Letter",
              },
              maxLength: {
                value: 20,
                message: "Max Length should be Atmost 20 letters",
              },
            pattern:{value:/^[a-zA-Z\s]+$/,
            message:"Name Should be a Letter"} 
            })}
            type="text"
            className="form-control "
          />
          {errors.name && <p className="err-msg">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
          style={{backgroundColor:"#D1E7DD",border:'2px solid black'}}
            {...register("number", { 
              required: "Number is required",
              minLength:{ 
                value:10,
                message:"Should be a valid number"
              },
              maxLength:{
                value:10,
                message:"Should be a valid number"
              } ,


              },)}
            type="number"
            className="form-control"
           
            
          />
          {errors.number && <p className="err-msgn">{errors.number.message}</p>}
        </div>



        <button
          type="submit"
          className="btn btn-primary"
        >
          Add
        </button>
        <Link to="/read"> 
        <button className="btn btn-secondary m-2">Back</button>
        </Link>
      </form>
    </div>
  );
};

export default Update;