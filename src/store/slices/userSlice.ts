import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

interface UserState {
  selectedUser: User | null;
  favorites: number[];
}

const initialState: UserState = {
  selectedUser: null,
  favorites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { 
  setSelectedUser, 
  addToFavorites, 
  removeFromFavorites, 
  clearFavorites 
} = userSlice.actions;

export default userSlice.reducer;