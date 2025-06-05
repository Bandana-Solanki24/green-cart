/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from '../assets/assets';
import toast from "react-hot-toast";


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
    const [searchQuery, setSearchQuery] = useState({})


    // fetch all products 
    const fetchProducts = async () => {
        setProducts(dummyProducts)

    }

    // add to cart
    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        // eslint-disable-next-line no-undef
        if (cartData[itemId]) {
            cartData[itemId] += 1

        } else {
            cartData[itemId] = 1

        }
        setCartItems(cartData)
        toast.success("Item Added To Cart")
    }
    // upadte cart item quantity
    const updateCartItems = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Item Updated")


    }


    // remove product from cart 

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] == 0) {
                delete cartData[itemId]

            }
        }
        toast.success("Removed from cart")
        setCartItems(cartData)

    }
    useEffect(() => { fetchProducts() }, [])

    console.log(dummyProducts)

    const value = { currency, navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, addToCart, updateCartItems, removeFromCart, cartItems, searchQuery, setSearchQuery };
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