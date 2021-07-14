
import React, { FC, useState, useRef, useEffect } from 'react';



export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYSTICS_ID;
console.log(GA_ID)

const useTimeout = (callback: () => void, delay: number) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => savedCallback.current();

        const id = setTimeout(tick, delay);

        return () => clearTimeout(id);

    }, [delay])
}

const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;

    });

    return ref.current
}

const MoneyCount = () => {
    const [value, setValue] = useState(0);
    const lastValue = usePrevious(value);

    return (
        <div>
            <p>Current: {value} - Previous: {lastValue}</p>
            <button onClick={() => setValue(value => value + 1)} type="button">Increment Money</button>
        </div>
    )
}
interface HTMLButtonEvent extends Event {
    target: HTMLButtonElement;
}

const useClickInside = (ref, callback) => {
    const handleClick = (e: { target: any; }) => {
        if (ref.current && ref.current.contains(e.target)) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick)
        };
    });
};

const HitBox = ({ onClickInside }) => {
    const clickRef = useRef();
    useClickInside(clickRef, onClickInside);

    return (
        <div
            className="hit-box"
            ref={clickRef}
            style={{
                border: '5px solid green',
                height: 300,
                width: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <p>Hit the box!</p>
        </div>
    )
}
const Timer = () => {
    const [seconds, setSeconds] = useState(0)
    useTimeout(() => {
        setSeconds(seconds + 1)
    }, 5000);

    return seconds;
}

const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
            } catch {
                (error);
            }
        };

        fetchData();
    }, );

    return { response, error }
};

const FetchPerson = props => {
    const res = useFetch('https://swapi.co/api/people/1/', {});
    if (!res.response) {
        return <div>Loading...</div>
    }

    const person　= res.response.name;

    return (
        <div>
            <span>{person}</span>
        </div>
    )
}

const Test: FC = () => {
    // const seconds = Timer()
    const seconds = 0

    return (
        (
            <div>
                <p>{seconds}</p>
                <MoneyCount />
                <HitBox onClickInside={() => alert('hit the box')} />
                <FetchPerson />
            </div>
        )
    )
}


export default Test;
