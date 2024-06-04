import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { FaEye, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";


export default function Home() {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        axios.get('https://dummyjson.com/posts')
            .then((response) => {
                setInfo(response.data.posts);
                // console.log(response.data.posts);
            });
    }, []);

    if (!info) return null;

    return (
        <div className='bg-black'>
            <Header />
            {info.map((post) => {
                return (
                    <main className="mx-8 md:mx-5 pb-8 cursor-default" key={post.id}>
                        <div className="flex justify-between px-4 mx-auto shadow-md rounded-lg shadow-yellow-300 border border-purple-600 max-w-2xl my-3">
                            <article className="mx-auto p-6 w-full max-w-2xl">
                                <header className="mb-4 lg:mb-6 not-format">
                                    <address className="flex justify-around items-center mb-6 not-italic">
                                        <div className='flex items-center text-white gap-3'>
                                            <FaRegThumbsUp size={25} color='blue' className='hover:scale-125' />{post.reactions.likes}
                                        </div>
                                        <div className='flex items-center text-white gap-3'>
                                            <FaRegThumbsDown size={25} color='orange' className='hover:scale-125' />{post.reactions.dislikes}
                                        </div>
                                        <div className='flex items-center text-white gap-3'>
                                            <FaEye size={30} color='violet' className='hover:scale-125' />{post.views}
                                        </div>
                                    </address>
                                    <h1 className="mb-4 text-3xl text-center font-extrabold leading-tight lg:mb-6 lg:text-4xl text-green-400">{post.title}</h1>
                                </header>
                                <p className="lead text-center text-white">{post.body}</p>
                            </article>
                        </div>
                    </main>
                )
            })}
        </div>
    )
}
