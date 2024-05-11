import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../feature/slice/userSlice";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { useState } from "react";
import { toast } from "react-toastify";
import { update } from "../../feature/slice/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [userVal, setUserVal] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    location: user?.location || "",
  });

  const profileFields = [
    {
      key: "name",
      id: "name",
      type: "text",
      labelText: "Name",
      value: userVal.name,
    },
    {
      key: "lastName",
      id: "lastName",
      type: "text",
      labelText: "Last Name",
      value: userVal.lastName,
    },
    {
      key: "email",
      id: "email",
      type: "email",
      labelText: "Email",
      value: userVal.email,
    },
    {
      key: "location",
      id: "location",
      type: "text",
      labelText: "Location",
      value: userVal.location,
    },
  ];

  const onChangeHandler = (e) => {
    const key = e.target.name;
    const val = e.target.value;
    setUserVal({ ...userVal, [key]: val });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, lastName, email, location } = userVal;
    if (!name || !lastName || !email || !location) {
      toast.warn("Fill out all fields!");
      return;
    }
    dispatch(update(user));
  };

  return (
    <Wrapper>
      <h3>Profile</h3>
      <div className="form-center">
        {profileFields.map((field) => (
          <FormRow
            key={field.key}
            id={field.id}
            value={field.value}
            labelText={field.labelText}
            type={field.type}
            handleChange={onChangeHandler}
          />
        ))}
        <button className="btn" onClick={onSubmitHandler} disabled={isLoading}>
          {isLoading ? "Please wait.." : "Save Changes"}
        </button>
      </div>
    </Wrapper>
  );
};

export default Profile;
