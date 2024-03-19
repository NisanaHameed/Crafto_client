import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null,
    profData: localStorage.getItem('profData') ? JSON.parse(localStorage.getItem('profData') as string) : null,
    adminData: localStorage.getItem('adminData') ? JSON.parse(localStorage.getItem('adminData') as string) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserCredential: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },
        setProfCredential: (state, action) => {
            state.profData = action.payload;
            localStorage.setItem('profData', JSON.stringify(action.payload));
        },
        setAdminCredential: (state, action) => {
            state.adminData = action.payload;
            localStorage.setItem('adminData', JSON.stringify(action.payload));
        },
        userLogout: (state) => {
            console.log('user logout');
            state.userData = null;
            localStorage.removeItem('userData');
        },
        profLogout: (state) => {
            console.log('prof logout');
            state.profData = null;
            localStorage.removeItem('profData');
        },
        adminLogout: (state) => {
            state.adminData = null;
            localStorage.removeItem('adminData');
        }
    }
})

export const { setUserCredential, setProfCredential, setAdminCredential, userLogout, profLogout, adminLogout } = authSlice.actions;
export default authSlice.reducer;