import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

// const useMovieList = () => {
//   const { data, error, isLoading } = useSwr('/api/movies', fetcher, {
//     revalidateIfStale: false,
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false,
//   });
//   return {
//     data,
//     error,
//     isLoading
//   }
// };

// export default useMovieList;
/**
 * Custom hook to fetch movie list
 * @returns {Object} - Object containing movie data, error, and loading state
 */
const useMovieList = () => {
  // Fetch movie data using useSwr hook
  const { data, error, isLoading } = useSwr('/api/movies', fetcher, {
    revalidateIfStale: false, // Disable revalidation if data is stale
    revalidateOnFocus: false, // Disable revalidation on window focus
    revalidateOnReconnect: false, // Disable revalidation on network reconnect
  });
  return {
    data, // Movie data
    error, // Error state
    isLoading // Loading state
  }
};
export default useMovieList;