import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuthCheck } from 'modules/auth/hooks';
import { useGetProjects } from 'modules/project/hooks';

import Board from 'screens/Board';
import Header from 'containers/Header';
import SideBar from 'containers/SideBar';

import styles from './styles.m.scss';

const AuthRouter = () => {
    useAuthCheck();
    useGetProjects();

    return (
        <div className={styles.page}>
            <Header />
            <SideBar />
            <main>
                <Switch>
                    <Route exact path="/:companyId/board" component={Board} />
                </Switch>
            </main>
        </div>
    );
}

export default AuthRouter;
