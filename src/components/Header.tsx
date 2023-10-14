import styles from './Header.module.css';

import igniteLogo from "../assets/images/ignite-simbol.png" ;

export function Header () {
    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt="Logo do Ignite" />
            <strong>Ignite Feed</strong>
        </header>
    );
}