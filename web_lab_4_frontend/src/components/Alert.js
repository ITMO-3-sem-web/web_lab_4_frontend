import React from 'react'

export default function Alert({ alertText }) {
    return (
        <div className="alert alert-warning" role="alert">
            {alertText}
        </div>
    )
}