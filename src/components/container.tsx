import React from 'react';

const Container = ({children}) => {
    return (
        <div className='h-[calc(100vh-60px)] overflow-auto pb-[20px]'>{children}</div>
    )
}

export default Container;