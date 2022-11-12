import Link from "next/link"
import {useSession,signOut} from "next-auth/client"

import Logo from "./logo"
import classes from "./main-navigation.module.css"

export default function MainNavigation(){

    const [session,loading] = useSession()

    const signOutHandler = () => {
        signOut()
    }

    return(
        <header className={classes.header}>
            <Link href="/">
                <a>
                    <Logo />
                </a>
            </Link>
            <nav>
                <ul>
                    <li><Link href="/posts">Posts</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    {!session && !loading && <li><Link href="/auth">Auth</Link></li>}
                    {session && <li><Link href="/admin">Admin</Link></li>}
                    {session && <li><button className="btn btn-link" onClick={signOutHandler}>Logut</button></li>}
                </ul>
            </nav>
        </header>
    )
}