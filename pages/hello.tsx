import React, { FC } from 'react'

//getStaticPropsで外部APIを叩くことができる
export async function getStaticProps() {

    const res = await fetch('http://nginx_laravel_node/rest');
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data
        } // will be passed to the page component as props
    }
}


type Props = {
    data?: string
  }

const Hello = ({ data } : Props ) => {

    console.log(data)
    return (
        <div>
            <p>Hello</p>
            <p>{data[2]['message']}</p>
            <p>{data['url']}</p>
        </div>
    )
}

export default Hello;