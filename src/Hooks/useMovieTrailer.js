import { useDispatch } from "react-redux"
import { addTrailerVideo } from "../utilits/moviesSlice"
import { useEffect } from "react"
import { API_CALL } from "../utilits/constants"

const useMovieTrailer = (movieId) =>{
    const dispatch = useDispatch()
    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_CALL)
        const json = await data.json()
        const filterData = json.results.filter((video) => video.type === "Trailer")
        const trailer = filterData.length ? filterData[0] : json.results[0]
        console.log("movie trailer",trailer)
        // console.log(trailer)
        dispatch(addTrailerVideo(trailer))


        // console.log(json)
    }

    useEffect(() => {
        getMovieVideos()
    }, [])
}
export default useMovieTrailer