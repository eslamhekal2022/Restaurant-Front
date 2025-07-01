import React, { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext.js";
import { UserProvider } from "./context/userContext.js";
import { ProductProvider } from "./context/productContext.js";
import { useDispatch } from "react-redux";
import { setUserRedux } from "./Redux/user.js";

// ✅ لازم دول يبقوا فوق
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute.jsx";
import { AdminRoute } from "./pages/AdminRoute/AdminRoute.jsx";

// ✅ Lazy Loading
const Layout = lazy(() => import("./pages/Layout/layout.jsx"));
const Home = lazy(() => import("./pages/home/Home.jsx"));
const AdminPanel = lazy(() => import("./pages/adminPanel/AdminPanel.jsx"));
const Register = lazy(() => import("./pages/Register/Register.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard/MainAdmin.jsx"));
const AddItem = lazy(() => import("./pages/AddItem/AddItem.jsx"));
const AllProducts = lazy(() => import("./pages/AllProducts/AllProducts.jsx"));
const ProductDet = lazy(() => import("./pages/ProductDetails/ProductDet.jsx"));
const CartComponent = lazy(() => import("./pages/Cart/Cart.jsx"));
const WishList = lazy(() => import("./pages/WislIst/WishList.jsx"));
const AllUser = lazy(() => import("./pages/AllUsers/AllUser.jsx"));
const UpdateRole = lazy(() => import("./pages/UpdateRole/UpdateRole.jsx"));
const SearchComponent = lazy(() => import("./pages/Search/Search.jsx"));
const GetCategories = lazy(() => import("./pages/GetCategories/GetCategories.jsx"));
const CheckoutPage = lazy(() => import("./pages/CheckOut/CheckOut.jsx"));
const AllOrders = lazy(() => import("./pages/AllOrders/AllOrders.jsx"));
const MyOrder = lazy(() => import("./pages/MyOrder/MyOrder.jsx"));
const AddReview = lazy(() => import("./pages/AddUserReviews/addReview.jsx"));
const UserDet = lazy(() => import("./pages/userDet/userDet.jsx"));
const OrderDet = lazy(() => import("./pages/OrderDet/OrderDet.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const GetContacts = lazy(() => import("./pages/GetContacts/GetContacts.jsx"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword/ForgetPass.jsx"));

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "ProductDet/:id", element: <ProductDet /> },
      {
        path: "adminPanel",
        element: <AdminRoute><AdminPanel /></AdminRoute>,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "AddItem", element: <AddItem /> },
          { path: "allOrders", element: <AdminRoute><AllOrders /></AdminRoute> },
          { path: "allProducts", element: <AdminRoute><AllProducts /></AdminRoute> },
          { path: "AllUser", element: <AdminRoute><AllUser /></AdminRoute> },
          { path: "GetContacts", element: <AdminRoute><GetContacts /></AdminRoute> },
        ],
      },

      { path: "register", element: <Register /> },
      { path: "UserDet/:id", element: <UserDet /> },
      { path: "login", element: <Login /> },
      { path: "allProducts", element: <AllProducts /> },
      { path: "AddReview", element: <AddReview /> },
      { path: "Contact", element: <Contact /> },
      { path: "About", element: <About /> },
      { path: "cart", element: <CartComponent /> },
      { path: "WishList", element: <WishList /> },
      { path: "AllUser", element: <AdminRoute><AllUser /></AdminRoute> },
      { path: "UpdateRole/:id", element: <UpdateRole /> },
      { path: "search", element: <SearchComponent /> },
      { path: "GetCategories/:id", element: <GetCategories /> },
      { path: "Checkout", element: <CheckoutPage /> },
      { path: "meOrder", element: <MyOrder /> },
      { path: "OrderDet/:id", element: <OrderDet /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
    ],
  },
]);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(setUserRedux(JSON.parse(savedUser)));
    }
  }, [dispatch]); // ✅ حل التحذير

  return (
    <CartProvider>
      <UserProvider>
        <ProductProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName="custom-toast"
            bodyClassName="custom-toast-body"
          />
          <Suspense fallback={<div className="loader">جاري التحميل...</div>}>
            <RouterProvider router={routers} />
          </Suspense>
        </ProductProvider>
      </UserProvider>
    </CartProvider>
  );
}
