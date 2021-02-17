import React from 'react';
import { useQueryClient } from 'react-query';

const Header = () => {
    
    const queryClient = useQueryClient();
    // const query = queryClient.queryCache('projects');

    console.warn('query HEADER', queryClient.getQueryData('projects'));
    

    return (
        <header>
            header
        </header>
    )
}

export default Header;
