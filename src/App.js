import React from 'react';
import { useAuthCheck } from 'modules/auth/hooks';
import { useGetProjects } from 'modules/project/hooks';

import Header from 'containers/Header';
import SideBar from 'containers/SideBar';

import styles from './styles.m.scss';

const AuthRouter = () => {
    useAuthCheck();
    const result = useGetProjects();
    console.warn('result', result);
    
    return (
        <div className={styles.page}>
            <Header />
            <SideBar />
            <main>
                body
            </main>
        </div>
    );
}

export default AuthRouter;
