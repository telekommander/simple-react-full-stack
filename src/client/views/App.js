import React, { Fragment, useEffect, useState } from 'react';
import '../scss/app.scss';
import ReactImage from '../assets/react.png';

const App = () => {

    const [userName, setUserName] = useState(null);

    useEffect(() => {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => setUserName(user.username));
    });

    return (
        <Fragment>
            <h1>{userName ? `Hello ${userName}` : 'Loading.. please wait!'}</h1>
            <img src={ReactImage} alt="react" />
        </Fragment>
    );

};

export default App;
