import React from "react";
import axios from "axios";
import { api } from "./../api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function Form({ formData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post(`${api}/user/new`, data)
      .then((res) => {
        formData(data);
        toast.success("User added successfully!");
        reset();
      })
      .catch((e) => toast.error("Something went wrong!"));
  };
  return (
    <div className='card' style={{ padding: "30px", width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            className='form-control'
            id='username'
            autoComplete='new-off'
            name='username'
            {...register("username", {
              required: "Required field.",
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: "Only alphanumeric charaters. No space allowed.",
              },
            })}
          />
          <p style={{ fontSize: "13px", color: "red" }}>
            {errors?.username?.message}
          </p>
        </div>
        <div className='form-group'>
          <label htmlFor='mobile'>Mobile Number</label>
          <input
            type='number'
            className='form-control'
            id='mobile'
            length={6}
            autoComplete='new-off'
            name='mobile'
            {...register("mobile", {
              required: "Required field.",
              minLength: { value: 10, message: "Must be 10 digits." },
              maxLength: { value: 10, message: "Must be 10 digits." },
            })}
          />
          <p style={{ fontSize: "13px", color: "red" }}>
            {errors?.mobile?.message}
          </p>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='text'
            className='form-control'
            id='email'
            autoComplete='new-off'
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
          <label htmlFor='exampleFormControlTextarea1'>Address</label>
          <textarea
            className='form-control'
            id='exampleFormControlTextarea1'
            name='address'
            {...register("address", { required: "Required field." })}
            rows='3'></textarea>
          <p style={{ fontSize: "13px", color: "red" }}>
            {errors?.address?.message}
          </p>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
