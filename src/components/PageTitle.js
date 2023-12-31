import React from 'react';
import styles from '../Style/modules/title.module.css';

function PageTitle({ children, ...rest }) {
    return (
    <p className={styles.title} {...rest}>
        {children}
    </p>
    );
}

export default PageTitle;