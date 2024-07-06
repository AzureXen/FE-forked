// src/components/SearchButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
interface SearchButtonProps {
    search: string;
    setSearch: (search: string) => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ search, setSearch }) => {
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    const encodedSearch = encodeURIComponent(search);
        navigate(`/jobs?search=${encodeURIComponent(search)}`);
    };

    return (
        <motion.div
        initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
               <div className="s128">
            <form onSubmit={handleSearch}>
                <div className="inner-form">
                    <div className="row">
                        <div className="input-field first" id="first">
                            <input
                                className="input"
                                id="inputFocus"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Keyword"
                            />
                            <button
                                type="button"
                                className="clear"
                                id="clear"
                                onClick={() => setSearch('')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </motion.div>
    );
};
