import React from "react"
import "./PinItem.css"

export default function PinItem({suggestion}) {
    return (
        <div className="pinItem">
            <h1>{suggestion}</h1>
        </div>
    )
}