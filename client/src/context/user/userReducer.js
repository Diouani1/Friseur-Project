async function reducer(prev, action) {
  // Register user
  if (action.type === "register") {
    try {
      const addUser = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(action.data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const newUser = await addUser.json();
      // Check if registration was successful
      if (!newUser._id) {
        if (!newUser.message) {
          const key = Object.entries(newUser.keyValue)[0][0];

          throw new Error(`The ${key} is already exist`);
        } else if (newUser.message === "Unauthorized") {
          throw new Error(newUser.errors[0].msg);
        }

        throw new Error(newUser.message);
      }
      // Reset password and set mode to login
      action.setData({ ...action.data, password: "" });
      action.setModeType("login");
    } catch (error) {
      // Display error message
      action.setErrorMessage(error.message);
      action.setShowError(true);
      return;
    }
    // Login user
  } else if (action.type === "login") {
    try {
      const loginData = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(action.data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const logedUser = await loginData.json();
      if (loginData.ok) {
        // Store user data in localStorage or in seeionStorage
        if (action.rememberMe) {
          localStorage.setItem("user", JSON.stringify(logedUser));
          action.setUser(logedUser);
          return;
        }
        sessionStorage.setItem("user", JSON.stringify(logedUser));
        action.setUser(logedUser);
        return;
      }
      throw new Error(logedUser.message);
    } catch (error) {
      // Display error message
      action.setErrorMessage(error.message);
      action.setShowError(true);
      return;
    }
    // Send password reset email
  } else if (action.type === "forgotPassword") {
    try {
      const checkEmail = await fetch(
        `/api/user/check-email/${action.data.email}`
      );
      const data = await checkEmail.json();
      // If email exists, set component to "verfi-password"
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
      // Display error message
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
    // Reset user's password
  } else if (action.type === "resetPassword") {
    try {
      const resetPassword = await fetch(`/api/user/reset-password`, {
        method: "POST",
        body: JSON.stringify({ ...action.data, password: action.password }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (resetPassword.ok) action.setComponent("recoved-password");
    } catch (error) {
      // Display error message
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
    // Change user's password
  } else if (action.type === "changePassword") {
    try {
      const response = await fetch(`/api/user/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: action.oldPassword,
          newPassword: action.newPassword,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        action.setShowError(false);
        action.setShowSuccess(true);
        action.setSuccessMessage("Password successfully changed!");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      // Display error message
      action.setErrorMessage(error.message);
      action.setShowSuccess(false);
      action.setShowError(true);
    }
    // Change user's names
  } else if (action.type === "changeNames") {
    try {
      const response = await fetch(`/api/user/update-names`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.changeName),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        action.setUser(result);
        action.setShowError(false);
        action.setShowSuccess(true);
        action.setSuccessMessage("The change is successfully!");
      } else {
        const key = Object.entries(result.keyValue)[0][0];
        //  throw error if username is exist in date base
        throw new Error(
          `The ${key} : ${result.keyValue.userName} is already exist`
        );
      }
    } catch (error) {
      // Display error message
      action.setErrorMessage(error.message);
      action.setShowSuccess(false);
      action.setShowError(true);
    }
    // change or upload user's profile picture
  } else if (action.type === "updateProfilePicture") {
    try {
      const formProfileUser = new FormData();
      formProfileUser.append("profilePicture", action.profilePicture);
      if (action.user.imgProfile.fieldname === "profilePicture") {
        formProfileUser.append(
          "oldProfilePicture",
          action.user.imgProfile.filename
        );
      }
      const response = await fetch(`/api/user/update-profile-picture`, {
        method: "PUT",
        body: formProfileUser,
      });
      const result = await response.json();
      if (result.message) throw new Error(result.message);
      if (result._id) {
        // save new update in local storage
        action.setUser(result);
        return localStorage.setItem("user", JSON.stringify(result));
      }
    } catch (error) {
      // Display error message
      console.log(error);
      action.setErrorMessage(error.message);
      action.setShowError(true);
      return;
    }
    // delete user's profile picture and apload avatar picture
  } else if (action.type === "deleteProfilePicture") {
    try {
      let picture = "";

      if (action.user.imgProfile.fieldname === "profilePicture") {
        picture = action.user.imgProfile.filename;
      }
      const response = await fetch(`/api/user/delete-profile-picture`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldProfilePicture: picture,
        }),
      });
      const result = await response.json();
      if (result.message) throw new Error(result.message);
      if (result._id) {
        // save new update in local storage
        action.setUser(result);
        return localStorage.setItem("user", JSON.stringify(result));
      }
    } catch (error) {
      // Display error message
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  } else if (action.type === "logout") {
    try {
      const response = await fetch(`/api/user/logout`);
      const result = await response.json();
      if (response.ok) {
        action.setOnOff(false);
        action.setUser(null);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
    // deleting user acount and token and remove user from localstorage and sessionstorage
  } else if (action.type === "delete-acount") {
    try {
      const response = await fetch(`/api/user/delete-acount`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        action.setShowDeleteAcountModal(false);
        action.setOnOff(false);
        action.setUser(null);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  }
}

export default reducer;
