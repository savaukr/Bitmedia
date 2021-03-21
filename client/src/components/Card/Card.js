import React from "react";
import "./Card.scss"

export const Card = ({title, content, icon}) => {
    return (
        <div className="card">
            <div className="card__icon">
                <a href="/">
                    <img src={icon} alt={title}/>
                </a>
            </div>
            <h4>{title}</h4>
            <p>{content}</p>
        </div>

    )
};
