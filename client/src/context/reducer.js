async function reducer(prev, action) {
  if (action.type === "register") {
    try {
      const addUser = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        body: JSON.stringify(action.data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const newUser = await addUser.json();
      if (!newUser._id) {
        if (!newUser.message) {
          const key = Object.entries(newUser.keyValue)[0][0];

          throw new Error(`The ${key} is already exist`);
        } else if (newUser.message === "Unauthorized") {
          throw new Error(newUser.errors[0].msg);
        }

        throw new Error(newUser.message);
      }
      action.setData({ ...action.data, password: "" });
      action.setModeType("login");
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
      return;
    }
  } else if (action.type === "login") {
    try {
      const loginData = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        body: JSON.stringify(action.data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const logedUser = await loginData.json();
      if (!logedUser._id) {
        throw new Error(logedUser.message);
      }
      localStorage.setItem("user", JSON.stringify(logedUser));
      action.setUser(logedUser);
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
      return;
    }
  } else if (action.type === "forgotPassword") {
    try {
      const checkEmail = await fetch(
        `http://localhost:5000/api/user/check-email/${action.data.email}`
      );
      const data = await checkEmail.json();
      if (data.randomInt) action.setOtp(data.randomInt);
      if (checkEmail.ok) {
        action.setShowError(false);
        action.navigate("/forgot-password");
        action.setComponent("verfi-password");
      } else {
        // email does not exist, display an error message
        throw new Error("This email address is not registered.");
      }
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  } else if (action.type === "resetPassword") {
    try {
      const resetPassword = await fetch(
        `http://localhost:5000/api/user/reset-password`,
        {
          method: "POST",
          body: JSON.stringify({ ...action.data, password: action.password }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (resetPassword.ok) action.setComponent("recoved-password");
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  } else if (action.type === "changePassword") {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/update-password/${action.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: action.oldPassword,
            newPassword: action.newPassword,
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        action.setShowError(false);
        action.setShowSuccess(true);
        action.setSuccessMessage("Password successfully changed!");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowSuccess(false);
      action.setShowError(true);
    }
  } else if (action.type === "updateProfilePicture") {
    try {
      const formProfileUser = new FormData();
      formProfileUser.append("profilePicture", action.profilePicture);
      if (action.user.imgProfile.fieldname === "profilePicture") {
        formProfileUser.append(
          "oldProfilePicture",
          action.user.imgProfile.path
        );
      }
      const response = await fetch(
        `http://localhost:5000/api/user/update-profile-picture/${action.user._id}`,
        {
          method: "PUT",
          body: formProfileUser,
        }
      );
      const result = await response.json();
      if (result.message) throw new Error(result.message);
      if (result._id) {
        action.setUser(result);
        return localStorage.setItem("user", JSON.stringify(result));
      }
    } catch (error) {
      console.log(error);
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  }
}

export default reducer;
