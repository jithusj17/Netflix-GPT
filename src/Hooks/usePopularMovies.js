import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { API_CALL } from "../utilits/constants"
import { addPopularMovies } from "../utilits/moviesSlice"

const usePopularMovies = () =>{
const dispatch = useDispatch()
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular', API_CALL)
        const json = await data.json()
        dispatch(addPopularMovies(json.results))
        console.log(json.results)
       
    }

    useEffect(() => {
        getPopularMovies()
    },[])
}
 export default usePopularMovies
