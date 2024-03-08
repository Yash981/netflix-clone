import axios from 'axios'
import React, { useCallback, useMemo } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineCheck } from "react-icons/md";
import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton:React.FC<FavoriteButtonProps> = ({ movieId }) => {

    const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);
  
  const toggleFavorites = useCallback(async () => {
    let response;
        // Once we clicked toggleFavorites, we want to check if the current movie is favorited, if it is we want to trigger the delete axios request.
        if(isFavorite){
            response = await axios.delete(`/api/favorite?movieId=${movieId}`)
        }else{
            // if is not favorite, we want to add it in to favorites. Since its a post method, we don't have to add explicit  {data: {movieId}}, you have to do it for delete request. For post request, we just nee movieId
            response = await axios.post('/api/favorite', {movieId});  
        }
        // console.log(response,'response')
        const updatedFavoriteIds =  response?.data?.favoriteIds;
        // console.log(updatedFavoriteIds,'updatedFavoriteIds')
    mutate({ 
        ...currentUser, 
        favoriteIds: updatedFavoriteIds,
      });
        mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate,mutateFavorites]);


  const Icon = isFavorite ? MdOutlineCheck : AiOutlinePlus;
    return (
    <div  onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  )
}

export default FavoriteButton
// import axios from "axios";
// import React, { useCallback, useMemo } from "react";

// import useCurrentUser from "../hooks/useCurrentUser";
// import useFavorites from "../hooks/useFavorites";
// import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

// interface FavoriteButtonProps {
// 	movieId: string;
// }
// const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
// 	const { mutate: mutateFavorites } = useFavorites();

// 	const { data: currentUser, mutate } = useCurrentUser();

// 	const isFavorite = useMemo(() => {
// 		const list = currentUser?.favoriteIds || [];
// 		return list.includes(movieId);
// 	}, [currentUser, movieId]);

// 	const toggleFavorites = useCallback(async () => {
// 		let response;
// 		if (isFavorite) {
// 			response = await axios.delete("/api/favorite", {
// 				params: { movieId },
// 			});
// 		} else {
// 			response = await axios.post("/api/favorite", { movieId });
// 		}

// 		const updatedFavoriteIds = response?.data?.favoriteIds;

// 		mutate({
// 			...currentUser,
// 			favoriteIds: updatedFavoriteIds,
// 		});
// 		mutateFavorites();
// 	}, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

// 	const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

// 	return (
// 		<div
// 			onClick={toggleFavorites}
// 			className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
// 		>
// 			<Icon
// 				className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
// 				size={25}
// 			/>
// 		</div>
// 	);
// };

// export default FavoriteButton;