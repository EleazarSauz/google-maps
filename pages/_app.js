import Head from 'next/head'
import '../styles.css'


export default function App({ Component, pageProps }) {
    return (
    <>
        <Head>
            <title>Maps Rutas</title>
            <meta name="viewport" content="initial-scale=1, width=device-width user-scalable=no" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"/>

            <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`}>
            </script>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
        </Head>

        <Component {...pageProps} />

    </>
    )
}