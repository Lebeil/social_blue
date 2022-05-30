import React, {useEffect, useState} from 'react';
import Routes from './components/Routes';
import {UidContext} from "./components/AppContext";
import axios from "axios";

const App = () => {
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const fetchToken = async()=> {
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true,
            })
                .then((res) =>
                    setUid(res.data)
                )
                .catch((err) => console.log("No Token"));
        };
        fetchToken();
    }, [uid]);

    return (
        <UidContext.Provider value={uid}>
            <Routes/>
        </UidContext.Provider>
    );
};

export default App;
