import { Dispatch, SetStateAction, useCallback, useState } from "react";

//use generic
type ReturnType<T = any> = [ T, (e: any) => void, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialData: T): ReturnType<T> => {
//const useInput = (initialData: any) => {
    const [value, setValue] = useState(initialData);
    const handler = useCallback((e: any) => {
        setValue(e.target.value);
    }, []);
    return [value, handler, setValue];
}

export default useInput;