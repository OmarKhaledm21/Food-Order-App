import React from 'react';
import styles from './Header.module.css';
import mealsImage from "../../assets/meals.jpg";

import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div>
                <img src={mealsImage} alt="meals"
                    className={styles['main-image']} />
            </div>
        </React.Fragment>
    );
};

export default Header;