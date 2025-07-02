import { createSlice } from '@reduxjs/toolkit';
 
const initialState=
{
    isLoading:false,
}
 
const LoadingSlice=createSlice({
    name:"loading",
    initialState,
    reducers:
    {
        fetching:(state)=>
        {
            state.isLoading=true;
        },
        fetchDone:(state)=>
        {
            state.isLoading=false;
        }
    }
 
});
export const {fetchDone,fetching}=LoadingSlice.actions;
export const selectIsLoading = (state) => state.loading.isLoading;
export default LoadingSlice.reducer;