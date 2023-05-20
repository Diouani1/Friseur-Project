async function reducer(prev, action) {
  // adding a new Employer
  if (action.type === "addemployer") {
    try {
      const addEmployer = await fetch("/api/admin/register-employer", {
        method: "POST",
        body: JSON.stringify(action.employer),
        headers: {
          "Content-type": "application/json",
        },
      });
      const newEmployer = await addEmployer.json();

      // Check if registration was successful
      if (addEmployer.ok) {
        action.setSuccessMessage("The new Employer was added successfully!");
        action.setShowError(false);
        action.setShowSuccess(true);
        action.setEmployerCard([...action.employerCard, newEmployer]);
        return;
      }
      // check where is the error
      if (!newEmployer._id) {
        if (!newEmployer.message) {
          const key = Object.entries(newEmployer.keyValue)[0][0];

          throw new Error(`The ${key} is already exist`);
        } else if (newEmployer.message === "Unauthorized") {
          throw new Error(newEmployer.errors[0].msg);
        }

        throw new Error(newEmployer.message);
      }
    } catch (error) {
      // Display error message
      action.setErrorMessage(error.message);
      action.setShowError(true);
      return;
    }
  }
  // change to reciption component
  if (action.type === "reception") {
    try {
      const data = {
        password: action.password,
        reception: action.user.reception,
      };
      const response = await fetch("/api/admin/reception", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();

      if (response.ok) {
        action.setUser(result);
        localStorage.setItem("user", JSON.stringify(result));
        action.setShow(false);
        action.setShowError(false);
        return;
      }
      throw new Error(result.message);
    } catch (error) {
      // Display error message
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  }
  // saving the receipt in data base
  if (action.type === "receipt") {
    try {
      const data = {
        employer: action.worker._id,
        services: action.selectedService,
        totalePrice: action.totalPrice,
        fullName: action.worker.fullName,
      };
      const response = await fetch("/api/admin/add-receipt", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        action.setModalShow(false);
        action.setSelectedService([]);
        action.setTotalPrice(0);
        action.setSuccessMessage("The submit price was completed successfully");
        action.setShowSuccess(true);
        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  }
  // making employer as user
  if (action.type === "make-as-user") {
    try {
      const response = await fetch("/api/admin/make-as-user", {
        method: "PUT",
        body: JSON.stringify({ id: action.employer._id }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        const employers = action.employerCard.filter(
          (item) => item._id !== action.employer._id
        );
        action.setEmployerCard(employers);
        action.setSuccessMessage(
          "Changing employer role to user role was completed successfully"
        );
        action.setShowSuccess(true);
        action.setShowError(false);
        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  }
  // delete employer
  if (action.type === "delete-employer") {
    try {
      const response = await fetch("/api/admin/delete-employer", {
        method: "DELETE",
        body: JSON.stringify({ id: action.employer._id }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        const employers = action.employerCard.filter(
          (item) => item._id !== action.employer._id
        );
        action.setEmployerCard(employers);
        action.setSuccessMessage(
          `Delete ${action.employer.fullName.toUpperCase()} was completed successfully`
        );
        action.setShowSuccess(true);
        action.setShowError(false);
        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  }
  // get receipt
  if (action.type === "get-receipt") {
    try {
      const response = await fetch(
        `/api/admin/get-receipts?startDate=${action.startDate}&endDate=${action.endDate}`
      );
      const result = await response.json();
      if (response.ok) {
        action.setReceiptData(result);
        action.setShowError(false);
        action.setShowReceiptModal(true);
        action.setOnOff(false);

        return;
      }
      throw new Error(result.message);
    } catch (error) {
      action.setErrorMessage(error.message);
      action.setShowError(true);
    }
  }
  // get receipt of employer
  if (action.type === "get-receipt-of-employer") {
    try {
      const response = await fetch(
        `/api/admin/get-receipts/${action.selectedEmployer}?startDate=${action.startDate}&endDate=${action.endDate}`
      );
      const result = await response.json();
      if (response.ok) {
        action.setReceiptData(result);
        action.setShowError(false);
        action.setShowReceiptModal(true);
        action.setOnOff(false);
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
