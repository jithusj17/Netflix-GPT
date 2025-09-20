export const checkValidData = (name, email, password, isSignInForm) => {
    
    if (!isSignInForm) {
      const isNameValid = /^[a-zA-Z\s]{3,}$/.test(name); 
      if (!isNameValid) return "Name should be more than 2 characters";
    }
  
  
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    if (!isEmailValid) return "Email ID is not valid";
  
   
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    if (!isPasswordValid)
      return "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number";
  
    return null; 
  };