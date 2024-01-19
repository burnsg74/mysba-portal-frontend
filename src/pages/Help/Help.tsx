import React from 'react';
import styles from "src/pages/Help/Help.module.css";

const Help = () => {
    return (
        <>
            <div className="grid-row">
                <div className={`grid-col ${styles['container']}`}>
                    <h1>Frequently Asked Questions</h1>
                    <div className="usa-accordion">
                        <h4 className="usa-accordion__heading">
                            <button
                                type="button"
                                className="usa-accordion__button"
                                aria-expanded="false"
                                aria-controls="a1"
                            >
                                Who do I call for help?
                            </button>
                        </h4>
                        <div id="a1" className="usa-accordion__content usa-prose" hidden>
                            <p>
                                Congress shall make no law respecting an establishment of religion, or
                                prohibiting the free exercise thereof; or abridging the freedom of speech,
                                or of the press; or the right of the people peaceably to assemble, and to
                                petition the Government for a redress of grievances.
                            </p>
                        </div>
                        <h4 className="usa-accordion__heading">
                            <button
                                type="button"
                                className="usa-accordion__button"
                                aria-expanded="false"
                                aria-controls="a2"
                            >
                                What is better star trek or star wars?
                            </button>
                        </h4>
                        <div id="a2" className="usa-accordion__content usa-prose" hidden>
                            <p>
                                A well regulated Militia, being necessary to the security of a free State,
                                the right of the people to keep and bear Arms, shall not be infringed.
                            </p>
                            <ul>
                                <li>This is a list item</li>
                                <li>Another list item</li>
                            </ul>
                        </div>
                    </div>
                    <div className="usa-alert usa-alert--info">
                        <div className="usa-alert__body">
                            <h4 className="usa-alert__heading">Still need assistance?</h4>
                            <p className="usa-alert__text">
                                The SBA is available over phone and email to help.
                                <br/>
                                Contact us today: <br/>
                                Tel: 1 (800) 827-5722 <br/>
                                Email: answerdesk@sba.gov
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Help;
