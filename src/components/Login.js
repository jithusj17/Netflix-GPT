import { useState } from "react"
import Header from "./Header"

 const Login = () =>{  

    const [isSignInForm,setisSignInfORM] = useState(true)
    const toggleSignInForm = ()=>{
        setisSignInfORM(!isSignInForm)
    }


    return(
        <div>
            <Header />
            <div className="absolute">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/0b0dad79-ad4d-42b7-b779-8518da389976/web/IN-en-20250908-TRIFECTA-perspective_0647b106-80e1-4d25-9649-63099752b49a_large.jpg"
            alt="logo"
            />
            </div>
            <form className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In": "Sign Up"}</h1>
                {!isSignInForm &&
                (<input type="text" placeholder="Full Name" className="p-4 my-4 w-full rounded-lg bg-gray-700" />)}
                <input type="text" placeholder="Email Address" className="p-4 my-4 w-full rounded-lg bg-gray-700"/>
                <input type="text" placeholder="Password" className="p-4 my-4 w-full rounded-lg bg-gray-700" />
                <button className="p-4 my-6 w-full bg-red-800 rounded-lg">{isSignInForm? "Sign In": "Sign up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign Up Now"
                :"Already Registered? Sign In Now."}</p>
            </form>
        </div>
    )
}
export default Login