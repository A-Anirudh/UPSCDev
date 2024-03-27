import React, {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../slices/usersApiSlice";
import toast from "react-hot-toast";

export const ChangePassword = () => {
  const { id, token } = useParams();
  const [form, setForm] = useState({
    data: { newPassword: "" },
    id: id,
    token: token,
    confirm: "",
  });

  const [reset] = useResetPasswordMutation();
  const [loading, setloading] = useState(false);
  const navigate=useNavigate()

  const handleChange = (e) => {
    
    const { name, value } = e.target;

    if (name === "password") {
      setForm({
        ...form,
        data: {
          ...form.data,
          newPassword: value,
        },
      });
    } else if (name === "confirm") {
      setForm({
        ...form,
        confirm: value,
      });
    }
  };


  const handleSubmit = async () => {
    if(form?.data?.newPassword===form.confirm){
    setloading(true);
    const { data, error } = await reset(form);

    setloading(false);
    if(data){
      navigate('/home')
    }
    else if(error?.data?.message ==='User validation failed: password: Enter atleast 6 charachters'){
      toast.error("Enter atleast 6 charachters")
    }

  }
else{
  toast.error('Passwords do not match')
}
};

  return (
    <div className="main-container  h-screen w-full flex items-center justify-center ">
      <div className="border px-6 py-4 rounded-md flex flex-col justify-between w-[350px] m-auto gap-9">
        <p className="text-2xl font-semibold">Change Password</p>
        <div className="flex flex-col justify-center">
          <div>
            <p className="m-2">Enter new password</p>
            <input
              placeholder="New password"
              name="password"
              value={form?.data?.newPassword}
              onChange={(e) => handleChange(e)}
              type="password"
              className="px-4 py-2 w-full bg-gray-100 rounded-md outline-none"
              disabled={loading}
            />
          </div>
          <div>
            <p className="m-2">Confirm password</p>
            <input
              placeholder="Confirm password"
              value={form?.confirm}
              onChange={(e) => handleChange(e)}
              name="confirm"
              type="password"
              className="px-4 py-2 w-full bg-gray-100 rounded-md outline-none"
              disabled={loading}
            />
          </div>

          <button
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-800 px-6 py-3 mt-4 rounded-md font-semibold text-lg text-white"
            disabled={loading}
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
