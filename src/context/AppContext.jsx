import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from '../assets/assets';


// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({})


    // fetch all products 
    const fetchProducts = async () => {
        setProducts(dummyProducts)

    }


    const addToCart = async () => {


    }

    useEffect(() => { fetchProducts() }, [])

    console.log(dummyProducts)

    const value = { currency, navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    return useContext(AppContext);
}