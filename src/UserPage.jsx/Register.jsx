import React from 'react';
import { Link } from 'react-router';
import { use } from 'react';
import { AuthContext } from '../Firebase/AuthContext';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';







const Register = () => {
    const navigate = useNavigate();
    const {createUser}=use(AuthContext)

 

    const handleSubmit =(e)=>

    {
        e.preventDefault();
        const form =e.target;
        const email =form.email.value;
        const password =form.password.value;

        console.log(email,password)

        createUser(email,password)
        .then(result=>
            console.log(result),


               Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Registration Successful",
              showConfirmButton: false,
              timer: 1500
            }),
            navigate("/Login"),
        )
        .catch(error=>{console.log(error)})

    }
    return (
        <div>


            
    <div>
      <div>
        <div className="hero bg-base-200 min-h-screen items-center w-full">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left"></div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <form  onSubmit={handleSubmit}className="fieldset">
                  <h1 className="text-5xl font-bold">Register Now</h1>
                       <label className="label">Name</label>
                  <input type="text" name="name" className="input" placeholder="Name" required />

                       <label className="label">Photo</label>
                  <input type="text" name="photo" className="input" placeholder="URL" required />


                  <label className="label">Email</label>
                  <input type="email" name="email" className="input" placeholder="Email" required />


                  <label className="label">Password</label>
                 <input type="password" name="password" className="input" placeholder="Password" required pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must be ≥6 chars, 1 uppercase & 1 lowercase." />

                 
                  <p className="text-gray-300">
                    Already have an account?{" "}
                    <Link
                      to="/Login"
                      className="text-emerald-700 hover:underline"
                    >
                      Login
                    </Link>
                  </p>

                  <button className="btn btn-neutral mt-4">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
            
        </div>
    );
};

export default Register;