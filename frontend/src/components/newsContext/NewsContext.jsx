import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllNews } from "../../apiEndpoints/news";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [allNews, setAllNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products from backend
        const fetchAllNews = async () => {
            try {
              const response = await getAllNews(); // Call the API function
              setAllNews(response.news); // Set the news data in state
            } catch (err) {
              setError(err); // Set error if the request fails
            }
           finally {
                setLoading(false);
            }
        };

        fetchAllNews();
    }, []);

    return (
        <NewsContext.Provider value={{ allNews, loading }}>
            {children}
        </NewsContext.Provider>
    );
};