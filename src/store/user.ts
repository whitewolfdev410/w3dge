import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    
}

const initialState: UserState = {
    
};

const userInfo = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<any>) {
        },
    },
});

export const { setUserInfo } = userInfo.actions;
export default userInfo.reducer;