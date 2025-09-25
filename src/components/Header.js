import { useNavigate } from "react-router-dom";
import { auth } from "../utilits/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { use, useEffect } from "react";
import { addUser, removeUser } from "../utilits/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utilits/constants";
import { toggleGptSearchView } from "../utilits/gptSlice";
import { changeLanguage } from "../utilits/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());   
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;

        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );

        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
 
  const HandleGptSearchClick = () =>{
    dispatch(toggleGptSearchView())
  }

  const handlelanguageChange = (e) =>{
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />

      {user && (
        <div className="flex p-2 items-center space-x-4">

          { showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white" onChange={handlelanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) =>(
              <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
            ))}
          </select>)}
          <button className="py-2 px-4 mx-4 my-2 bg bg-purple-700 text-white rounded-lg"
          onClick={HandleGptSearchClick}>
            {showGptSearch ? "GPT Search": "Homepage"}
        
        
          </button>
          <img
            className="w-12 h-12 rounded-full"
            alt="usericon"
            src={user?.photoURL || "https://via.placeholder.com/40"}
          />
          <button
            onClick={handleSignout}
            className="font-bold text-white hover:text-red-500"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
