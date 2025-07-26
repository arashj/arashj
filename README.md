# React Query + Redux Toolkit Implementation

A comprehensive example demonstrating the integration of **React Query (TanStack Query)** with **Redux Toolkit** for modern state management in React applications.

## 🚀 Features

- **React Query** for server state management
- **Redux Toolkit** for client state management
- **TypeScript** for type safety
- **Axios** for HTTP requests
- **Modern UI** with responsive design
- **Loading & Error States** handling
- **Caching & Background Updates**
- **Developer Tools** integration

## 🏗️ Architecture

This project demonstrates the separation of concerns between:

- **Server State** (React Query): API data, caching, synchronization
- **Client State** (Redux): UI state, user preferences, local data

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Counter.tsx      # Redux-only component
│   ├── UserList.tsx     # React Query + Redux integration
│   └── UserDetail.tsx   # Combined state management
├── hooks/               # Custom hooks
│   ├── redux.ts         # Typed Redux hooks
│   ├── useUsers.ts      # React Query hooks for users
│   └── usePosts.ts      # React Query hooks for posts
├── services/            # API services
│   └── api.ts           # Axios configuration and API calls
├── store/               # Redux store configuration
│   ├── store.ts         # Store setup
│   └── slices/          # Redux slices
│       ├── userSlice.ts # User-related state
│       └── counterSlice.ts # Counter state
└── App.tsx              # Main application component
```

## 🔧 Key Implementation Details

### Redux Store Configuration

```typescript
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import counterSlice from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    counter: counterSlice,
  },
});
```

### React Query Setup

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Custom Hooks Integration

```typescript
// React Query hook for fetching users
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
};

// Redux hooks with TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 🎯 State Management Strategy

### When to use React Query:
- ✅ Server data fetching
- ✅ Caching API responses
- ✅ Background data synchronization
- ✅ Loading and error states
- ✅ Optimistic updates

### When to use Redux:
- ✅ Client-side state
- ✅ UI state management
- ✅ User preferences
- ✅ Complex state logic
- ✅ State that needs to persist

## 🛠️ Available Scripts

- `npm start` - Runs the development server
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## 🌟 Features Demonstrated

### 1. User Management (React Query + Redux)
- Fetch users from JSONPlaceholder API
- Cache and background refresh
- Select users (Redux state)
- Favorite users (Redux state)
- Loading and error handling

### 2. Posts Integration
- Fetch posts by selected user
- Conditional data fetching
- Related data management

### 3. Counter (Pure Redux)
- Basic counter operations
- Custom increment amounts
- State persistence across navigation

### 4. Developer Experience
- TypeScript integration
- React Query DevTools
- Redux DevTools support
- Hot reloading
- Error boundaries

## 🔍 Key Patterns

### 1. Query Key Management
```typescript
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};
```

### 2. Mutation with Cache Updates
```typescript
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
```

### 3. Typed Redux Slices
```typescript
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
  },
});
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-query-redux-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Dependencies

### Core Dependencies
- `react` & `react-dom` - React library
- `@tanstack/react-query` - Server state management
- `@reduxjs/toolkit` - Redux with modern APIs
- `react-redux` - React bindings for Redux
- `axios` - HTTP client
- `typescript` - Type safety

### Dev Dependencies
- `@tanstack/react-query-devtools` - Query debugging
- `@types/*` - TypeScript definitions

## 📚 Learning Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TypeScript React Documentation](https://react-typescript-cheatsheet.netlify.app/)

## 🤝 Best Practices Implemented

1. **Separation of Concerns**: Server state vs Client state
2. **Type Safety**: Full TypeScript integration
3. **Performance**: Proper caching and memoization
4. **Developer Experience**: DevTools integration
5. **Error Handling**: Comprehensive error boundaries
6. **Code Organization**: Modular file structure
7. **Responsive Design**: Mobile-first approach

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React Query + Redux Toolkit**

