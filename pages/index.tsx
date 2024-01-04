
// import useCurrentUser from "@/hooks/useCurrentUser";
import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";


export async function getServerSideProps(context:GetServerSidePropsContext){
  const session = await getServerSession(context.req, context.res, authOptions);
  // console.log(session,'sessionsss');
  if (!session) {
    return {
      redirect:{
        destination:'/auth',
        permanent:false,
      },
    };
  }

  return {
    props : {},
  }
}

export default function Home() {
  const { data:movies = []} = useMovieList()
  const { data:favorites = []} = useFavorites();
  const {isOpen, closeModal} = useInfoModal()
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      </div>
    </>
  )
}
