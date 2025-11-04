// useFetch Hook
// TODO: Implement custom hook for data fetching with loading/error states

export const useFetch = () => {
  return {
    data: null,
    loading: false,
    error: null,
  };
};

export default useFetch;
