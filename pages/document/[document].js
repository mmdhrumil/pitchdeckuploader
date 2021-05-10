import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Document = () => {

    const router = useRouter();
    const {document} = router.query;
    console.log("routerQuery")
    console.log(router.query)

    return (
        <>
            <p>Document Component: {document}</p>
        </>
    );
}

export default Document;