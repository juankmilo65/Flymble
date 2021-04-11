import React, {useContext, useEffect} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {  useHistory} from "react-router-dom";
import * as yup from "yup";
import { RoomContext } from "../contex";

const schema = yup.object().shape({
    firstName: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().test('len', 'Must be exactly 9 characters', val => val.length === 9),
    email: yup.string().required().email()
  });

export default function Payment() {
  const history = useHistory()
  const contex = useContext(RoomContext);
  const {booked} = contex;
    const { register, handleSubmit, formState:{ errors} } = useForm({
        resolver: yupResolver(schema)
      });
    
  const onSubmit = data => console.log(data);
   

  useEffect(() => {
    const { booked } = contex;

    if(booked.length === 0)
    {
      history.push('/');
    }
  }, [])

  return (
    booked.length === 0?
    <></>:
      <div className="payment-form">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="payment-file">
        <label>Name</label>
        <input {...register("firstName")} />
        </div>
        <div className="payment-file">
        <label>Address</label>
        <input {...register("address")} />
        </div>
        <div className="payment-file">
        <label>Phone</label>
        <input {...register("phone")} />
        </div>
        <div className="payment-file">
        <label>Email</label>
        <input {...register("email")} />
        </div>
          <p>{errors.firstName?.message}</p>
          <p>{errors.address?.message}</p>
          <p>{errors.phone?.message}</p>
          <p>{errors.email?.message}</p>
        <input type="submit" className={`btn-primary  ${(errors.firstName ||
        errors.address ||
        errors.phone ||
        errors.email)  ? "disabledbutton" : ""}` }/>
        </form>
    </div>
  );
}