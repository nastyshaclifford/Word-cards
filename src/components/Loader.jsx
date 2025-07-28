import React from 'react';
import { inject, observer } from 'mobx-react';
import '../styles/Loader.css';

const Loader = inject('wordStore')(observer(({ wordStore }) => {
    if (!wordStore.loading) return null;

    return (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    );
}));

export default Loader;
