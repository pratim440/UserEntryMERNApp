import React, { useState, useEffect } from "react";
import axios from "axios";
import { api, config } from "./../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  useEffect(async () => {
    await axios
      .post(
        `${api}/admin/checkAdmin`,
        { accessToken: Cookies.get("accessToken") },
        config
      )
      .then((res) => {
        navigate("/");
      })
      .catch((err) => navigate("/login"));
  }, []);

  const onSubmit = async (data) => {
    await axios
      .post(`${api}/admin/loginAdmin`, data, config)
      .then((res) => {
        console.log(res);
        Cookies.set("accessToken", res.data.accessToken, { expires: 0.00347 });
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch((error) => toast.error("Invalid credentials."));
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}>
      <div style={{ display: "grid", placeItems: "center", width: "30%" }}>
        <h2 style={{ marginBottom: "25px" }}>Login</h2>
        <div
          className='card'
          style={{
            width: "100%",
          }}>
          <div
            className='card-body'
            style={{
              marginTop: "28px",
            }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  name='email'
                  {...register("email", {
                    required: "Required field.",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email.",
                    },
                  })}
                />
                <p style={{ fontSize: "13px", color: "red" }}>
                  {errors?.email?.message}
                </p>
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  {...register("password", {
                    required: "Required field.",
                  })}
                />
                <p style={{ fontSize: "13px", color: "red" }}>
                  {errors?.password?.message}
                </p>
              </div>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
