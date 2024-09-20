import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/login/Login";
// import Login from './components/login/Login';
import { auth } from "./Firebase";
import { useAuth } from "./context/GlobalState";
import { useEffect } from "react";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import Orders from "./components/Orders/Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const App = () => {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_live_51PsuD1Lq7FCDYkBaftMRf5pRDS5ktwHNYVKVXmC8KCZpkOS6KyqaK9RkwK3Y5Tn8XNpoFN5lxsveVr7fkImGmOIK00WtmiYEL8"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
