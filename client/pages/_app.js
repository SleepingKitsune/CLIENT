import Layout from "../components/Layout";
import "../styles/global.scss"


const MyApp = ({Component, pageProps})=>(

    <div className='container'>
        <Layout>
            <main>
                <Component {...pageProps} />
            </main>
        </Layout>
    </div>
)

export default MyApp;