import React from 'react'
import { Link } from 'react-router-dom'

type BrowsingHeadlinesTypes = {
    title: string,
    text: string,
    route: string,
}
export default function BrowsingHeadlines(props: BrowsingHeadlinesTypes) {
    return (
        <div className='flex justify-between items-center'>
            <h2 className='font-extrabold text-xl text-gray-900 border-b-4 border-primaryColor'>{props.title}</h2>
            {(props.title !== "All Products" && props.title !== "جميع المنتجات") && props.text && <Link to={props.route}>
                <div className='flex items-center text-primaryColor cursor-pointer'>
                    <span className='md:text-lg text-xs'>{props.text}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 rtl:hidden" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 ltr:hidden" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                </div>
            </Link>}
        </div>
    )
}
