import * as React from 'react';
import { useState, useEffect } from 'react';


interface propType{
    countryCode: string 
}

function FlagEmoji(props: propType){
    const [emoji, setEmoji] = useState('')

    function getFlagEmoji(countryCode: string) {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char =>  127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }

    useEffect(()=>{
        const str: string = getFlagEmoji(props.countryCode);
        setEmoji(str); 
    }, [])

    return (
        <>{`  ${emoji}`}</>
    )
}

export default FlagEmoji; 