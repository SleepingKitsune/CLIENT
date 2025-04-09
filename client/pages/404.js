import { useEffect } from "react";
import { useRouter } from "next/router";


const Error= () =>{
    const router = useRouter();
    useEffect(() =>{
        setTimeout(() => {
            router.push('/');
        }, 3000);
    }, [router]);
    return(
        <>
            <h3 style={{alignItems:"center"}}>Возникла ошибка! Сейчас мы вас переправим на главную страницу</h3>
        </>
        
    )
    
};

export default Error;