import { createSlice } from '@reduxjs/toolkit'

const { UserId, RoleId, token } = localStorage?.user ? JSON.parse(localStorage?.user) : '';

export const user = createSlice({
    name: 'user',
    initialState: { UserId, loading: false, RoleId, token },
    reducers: {
        setUser: (state, action: any) => {
            state.UserId = action.payload.UserId;
            state.RoleId = action.payload.RoleId;
            state.token = action.payload.token;
            state.loading = false;
            state = { ...state, ...action.payload };
            localStorage.setItem('user', JSON.stringify(state));
        },
        deleteUser: (state) => {
            state.UserId = "";
            state.RoleId = "";
            state.token = "";
            state.loading = false;
            localStorage.removeItem('user');
            localStorage.removeItem('order');
        },
        setLoadingTrue: (state) => {
            // document.body.style = 'pointer-events: none;'
            state.loading = true;
        },
        setLoadingFalse: (state) => {
            // document.body.style = 'pointer-events: auto;'
            state.loading = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, deleteUser, setLoadingFalse, setLoadingTrue } = user.actions

export default user.reducer