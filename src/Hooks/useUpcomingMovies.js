import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { API_CALL } from "../utilits/constants"
import { addTopRatedMovies, addUpcomingMovies } from "../utilits/moviesSlice"

const useUpcomingMovies = () =>{
const dispatch = useDispatch()
    const getUpcomingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming', API_CALL)
        const json = await data.json()
        dispatch(addUpcomingMovies(json.results))
        console.log(json.results)
       
    }

    useEffect(() => {
        getUpcomingMovies()
    },[])
}
 export default useUpcomingMovies
