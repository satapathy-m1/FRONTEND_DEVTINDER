import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from 'react-redux'
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Feed from "./components/Feed"
import {store} from "./utils/appStore"

function App() {
  

  return (
    <>

      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>   
            <Route path='/' element={ < Body /> }>
                <Route path='/' element={< Feed />} />
                <Route path='/login' element={< Login />} />
                <Route path='/profile' element={< Profile />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      
      {/* <h1 className="font-3xl text-white bg-gray-600">Devtinder Initialization</h1> */}
    </>
  )
}

export default App
