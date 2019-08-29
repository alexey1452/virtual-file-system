import React, { Component } from 'react';
import AppContent from './parts/Content';
import AppHeader from './parts/Header';
import AppFooter from './parts/Footer';


class AppLayout extends Component {

    render() {
        return (
            <>
                <AppHeader />
                <AppContent>
                    {this.props.children}
                </AppContent>
                <AppFooter />
            </>
        );
    }
}

export default AppLayout;

