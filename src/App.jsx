import { Container, Spinner } from "react-bootstrap"
import Contentbar from "./components/Contentbar/Contentbar"
import Sidebar from "./components/Sidebar/Sidebar"
import { Route, Routes } from "react-router-dom"
import Contact from "./components/Contact/Contact"
import Add from "./components/Add/Add"
import Edit from "./components/Edit/Edit"
import View from "./components/View/View"
import Signup from "./components/Signup/Signup"
import Signin from "./components/Signin/Signin"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "./services/Action/AuthAction"
import { useEffect, useState } from "react"

function App() {

  const [loading, setLoading] = useState(true);

  const { isLogin } = useSelector(state => state.AuthReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('googleuser'));
    if (user) {
      dispatch(login(user));
    } else {
      dispatch(logout());
    }
    setLoading(false)
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    );
  } else {
    return (
      <>
        {isLogin === true ?
          <Container fluid className="d-flex flex-wrap p-0 overflow-hidden bg-light">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Contentbar page={<Contact />} />} />
              <Route path="/add" element={<Contentbar page={<Add />} />} />
              <Route path="/edit" element={<Contentbar page={<Edit />} />} />
              <Route path="/view" element={<Contentbar page={<View />} />} />
            </Routes>
          </Container>
          :
          <Container fluid className="d-flex flex-wrap p-0 justify-content-center align-items-center vh-100 container2">
            <Routes>
              <Route path="/" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
            </Routes>
          </Container>}
      </>
    )
  }

}

export default App
