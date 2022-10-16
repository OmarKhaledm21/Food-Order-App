import CartContext from "./cart-context";
import React, { useReducer } from 'react';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {

        const existingCartItemIndex = state.items.findIndex((item) => {
            return action.item.id === item.id
        });

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItem;
        let updatedItems;

        if (existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === "REMOVE_ITEM") {
        const item_index = state.items.findIndex((item) => {
            return item.id === action.id;
        })

        let item = state.items[item_index];
        let updatedItem = {
            ...item,
            amount: item.amount - 1,
        };

        const updatedTotalAmount = state.totalAmount - (item.price);

        let updatedItems = [...state.items];
        if (item.amount === 1) {
            updatedItems.splice(item_index, 1);
        } else {
            updatedItems[item_index] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({ type: 'ADD_ITEM', item: item });
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;