import Image from "next/image"

import classes from "./hero.module.css"

export default function Hero(){

    return (<section className={classes.hero}>
        <div className={classes.image}>
            <Image src="/images/site/blogger.jpg" alt="an image of me" width={300} height={300}/>
        </div>
        <h1>Hi I'm Selami</h1>
        <p>
            I blog about web development since my childhood.
        </p>
    </section>)

}