import Head from "next/head"
import ContactForm from "../components/forms/contact-form"

export default function ContactPage(){
    return (
        <>
            <Head>
                <title>Please contact me</title>
                <meta name="description" content="Please contact me about anything you want." />
            </Head>
            <ContactForm />
        </>
        
    )
}