import React from 'react';
import styles from 'src/components/Field/Field.module.css';

interface Props {
    label: string;
    value: string;
}

const Field: React.FC<Props> = ({label, value}) => {
    return (
        <div className={`${styles['row']}`}>
            <div className={`${styles['label']}`}>
                {label}
            </div>
            <div className={`${styles['value']}`}>
                {value}
            </div>
        </div>
    );
}

export default Field;