import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { API_CALL } from "../utilits/constants"
import { addTopRatedMovies } from "../utilits/moviesSlice"

const useTopRatedMovies = () =>{
const dispatch = useDispatch()
    const getTopRatedMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated', API_CALL)
        const json = await data.json()
        dispatch(addTopRatedMovies(json.results))
        console.log(json.results)
       
    }

    useEffect(() => {
        getTopRatedMovies()
    },[])
}
 export default useTopRatedMovies
