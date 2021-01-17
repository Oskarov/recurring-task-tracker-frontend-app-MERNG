import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (_, {name, value}) => {
        setValues({
            ...values,
            [name]: value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}



