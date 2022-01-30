import React, { createContext } from "react";
import { Producto } from "../interfaces/appInterfaces";
import { useState } from 'react';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () =>  Promise<void>;
    addProduct: ( categoryId: string, productName: string ) => Promise<void>;
    updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>;
    deleteProduct: ( productId: string ) => Promise<void>;
    loadProductById: ( productId: string ) => Promise<Producto>;
    uploadImage: ( data: any, productId: string ) => Promise<void>; //TODO: Change any...
}

const ProductsContext = createContext({} as ProductsContextProps );

export const ProductsProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [products, setProducts] = useState<Producto[]>([]);

    const loadProducts = async() => {

    };

    const addProduct = async( categoryId: string, productName: string ) => {

    };

    const updateProduct = async( categoryId: string, productName: string, productId: string ) => {

    };

    const deleteProduct = async( productId: string ) => {

    };

    const loadProductById = async( productId: string ) => {
        throw new Error('Not implemented');
    };

    //TODO: Change any...
    const uploadImage = async( data: any, productId: string ) => {

    };

    return(
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,
        }}>
            { children }
        </ProductsContext.Provider>
    );
}