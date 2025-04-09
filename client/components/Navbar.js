import Link from "next/link";
import styles from "../styles/Navbar.module.scss"
import Image from "next/image";


const Navbar = ({ }) => {
    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Image src="/logo.svg" height={60} width={150} alt="SIBERIAN FASAD"/>
                </div>
                <div className={styles.navigationPanel}>
                    <ul>
                        <li><Link href="/">Главная</Link></li>
                        <li><Link href="/authorization">Авторизация</Link></li>
                        <li><Link href="/registration">Регистрация</Link></li>
                        <li><Link href="/objects">Объекты</Link></li>
                        <li><Link href="/employees">Сотрудники</Link></li>

                    </ul>
                </div>

            </nav>
        </>
    )
}

export default Navbar;