import React, { useEffect, useState } from 'react';

type Data = {
    message: string;
};

export function App(): React.JSX.Element {
    const [data, setData] = useState<Data>();

    useEffect(() => {
        fetch('/data')
            .then((response) => response.json())
            .then((incoming: Data) => {
                setData(incoming);
            });
    }, []);

    return <div>Received: {data?.message}</div>;
}
