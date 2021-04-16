import React, { useState, useEffect } from "react";

// 스크롤 내려서 끝으로 가면 people page ++ 
export const useInfiniteScroll = () => {
    const [page, setPage] = useState(1);
    const handleScroll = () => {
        if (
            document.documentElement.scrollTop + window.innerHeight ===
            document.documentElement.scrollHeight
        ) {
            setPage((page) => page + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);
    return page;
}

