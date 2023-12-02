import React from "react";
import './Spiner.scss'
export default function Spiner() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40px"
            height="40px"
            viewBox="-1 -1 40 40"
            stroke="#fff"
        >
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="4">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                    </path>
                </g>
            </g>
        </svg>
    );
}
