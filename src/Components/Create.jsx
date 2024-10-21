import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useNavigate();

  const header = { "Access-Control-Allow-Origin": "*" };

  const handleSubmitAdd = (data) => {
    console.log("clicked", data);
 
    axios
      .post("https://670f8b553e715186165860d7.mockapi.io/crud-doctor", {
        name: data.name,
        number:data.number,
        header,
      })
      .then(history("/read"));
  };



  return (
    <>
    
      <div className="d-flex justify-content-between m-2">
      
        <h2 className="text-decoration-underline">Patient Details</h2>
        <Link to="/read">
          <button className="btn btn-light fw-semibold p-3 mb-2 bg-body-secondary">All Patient</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit(handleSubmitAdd)}>
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
      </form>
    </>
  );
};

export default Create;
