import { useState, useRef } from "react"
import Header from "./Header"
import { checkValidData } from "../utilits/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utilits/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utilits/userSlice";

const Login = () => {

    const dispatch = useDispatch()
    const [isSignInForm, setisSignInfORM] = useState(true)
    const toggleSignInForm = () => {
        setisSignInfORM(!isSignInForm)
    }

    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const [errormessage, SetErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleButtonClick = () => {
        const nameValue = isSignInForm ? "" : name.current.value;
        const result = checkValidData(nameValue, email.current.value, password.current.value, isSignInForm)
        console.log(result)
        SetErrorMessage(result)


        if (!isSignInForm) {

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {

                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, 
                        photoURL: "https://i.pinimg.com/1200x/d7/19/6a/d7196adc7c4f353d52235c5e6ed12e65.jpg"
                      }).then(() => {
                        const {uid,email,displayName,photoURL} = auth.currentUser
                        dispatch(addUser({uid: uid,
                            email: email, 
                            displayName: displayName,
                            photoURL:photoURL}))          
                        navigate("/browse")
                        // Profile updated!
                        // ...
                      }).catch((error) => {
                        SetErrorMessage(error.message)
                      });
                    console.log(user)
                  
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    SetErrorMessage(errorCode + "-" + errorMessage)
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 

                    const user = userCredential.user;
                    console.log(user)
                    navigate("/browse")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    SetErrorMessage(errorCode + "-" + errorMessage)
                });
        }
        

    }


    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/0b0dad79-ad4d-42b7-b779-8518da389976/web/IN-en-20250908-TRIFECTA-perspective_0647b106-80e1-4d25-9649-63099752b49a_large.jpg"
                    alt="logo"
                />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleButtonClick(); }} className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm &&
                    (<input type="text" ref={name} placeholder="Full Name" className="p-4 my-4 w-full rounded-lg bg-gray-700" />)}
                <input
                    ref={email}
                    type="text" placeholder="Email Address"
                    className="p-4 my-4 w-full rounded-lg bg-gray-700" />
                <input
                    ref={password}
                    type="password" placeholder="Password"
                    className="p-4 my-4 w-full rounded-lg bg-gray-700" />
                <p className="text-red-500">{errormessage}</p>
                <button type="submit" className="p-4 my-6 w-full bg-red-800 rounded-lg" >{isSignInForm ? "Sign In" : "Sign up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now"
                    : "Already Registered? Sign In Now."}</p>
            </form>
        </div>
    )
}
export default Login