import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const useMenu = () => {
    return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const value = {
        isOpen,
        setIsOpen,
    };

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
};