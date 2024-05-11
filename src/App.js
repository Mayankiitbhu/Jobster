import { RouterProvider } from 'react-router';
import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { Home, Landing, Register, Login, Error, ProtectedRoute } from './pages';
import AddJob from './pages/dashboard/AddJob';
import AllJobs from './pages/dashboard/AllJobs';
import Profile from './pages/dashboard/Profile';
import Stats from './pages/dashboard/Stats';
import SharedLayout from './pages/SharedLayout';


const router = createHashRouter([
  {
    path : '/',
    element : <Home />,
    errorElement : <Error />,
    children : [
      {
        element : <ProtectedRoute><SharedLayout /></ProtectedRoute>,
        errorElement : <Error />,
        children : [
          {
            index : true,
            element : <Stats />
          },
          {
            path : 'all-jobs',
            element : <AllJobs />
          },
          {
            path : 'add-job',
            element : <AddJob />
          },
          {
            path : 'profile',
            element : <Profile />
          }
        ]
      },
      {
        path : 'register',
        element : <Register />
      },
      {
        path : 'login',
        element : <Login />
      },
      {
        path : 'landing',
        element : <Landing />
      },
      {
        path : '*',
        element : <Error />
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
