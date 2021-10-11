import React from 'react';

const Header = props => {
    const {onViewChange, dateLabel, messages, views, viewType, showAgenda, isEventPerspective} = props;
    const {goBack, goNext} = props;
    const defaultValue = `${viewType}${showAgenda ? 1 : 0}${isEventPerspective ? 1 : 0}`;
    return (
        <div className={"rbc-toolbar"}>
            <span className={'rbc-btn-group'}>
                <button
                    type={"button"}
                    onClick={goBack}
                >
                    {messages.previous}
                </button>
                <button
                    type={"button"}
                    onClick={goNext}>
                    {messages.next}
                </button>
            </span>
            <span className="rbc-toolbar-label">{dateLabel}</span>
            <span className={'rbc-btn-group'}>
                {views.map(item => {
                    const name = `${item.viewType}${item.showAgenda ? 1 : 0}${item.isEventPerspective ? 1 : 0}`
                    return (
                        <button
                            key={name}
                            type={"button"}
                            className={defaultValue === name ? "rbc-active" : null}
                            onClick={() => onViewChange(item)}
                        >
                            {item.viewName}
                        </button>
                    )
                })}
            </span>
        </div>
    );
};

export default Header;