import React, {useEffect, useState} from 'react';
import styles from "src/components/AccountSetupModal/AccountSetupModal.module.css";
import {useTranslation} from 'react-i18next';
import lightBulbImg from 'src/assets/lightbulb.png';

interface AccountSetupModalProps {
    showModal?: boolean;
}

const AccountSetupModal: React.FC<AccountSetupModalProps> = ({showModal = false}) => {
    const {t} = useTranslation();
    const [modalOpen, setModalOpen] = useState(showModal);
    useEffect(() => {
        setModalOpen(showModal);
    }, [showModal]);

    return (
        <>
            {modalOpen &&
                <>
                    <div className={`${styles['overlay']}`}/>
                    <div className={`${styles['container']}`}>
                        <div className={`${styles['header']}`}>
                            <span className={`${styles['header__close']}`} onClick={() => setModalOpen(false)}>
                            Close
                            <svg aria-hidden="true" focusable="false" role="img" width="24" height="24"
                                 style={{fill: "#71767A"}}>
                                <use xlinkHref="/assets/img/sprite.svg#close"></use>
                            </svg>
                            </span>
                        </div>
                        <div className={`${styles['content']}`}>
                            <img src={lightBulbImg} alt="Light Buld Image"/>
                            <div className={`${styles['content__title']}`}>
                                Your account is all set up.
                            </div>
                            <div className={`${styles['content__message']}`}>
                                Thank you for participating in this beta release. If you find a glitch, get lost in
                                something you find confusing, or have general ideas please provide feedback through
                                [________]
                            </div>
                        </div>
                        <div className={`${styles['footer']}`}>
                            <button type="button"
                                    className={`usa-button ${styles['footer-btn']}`}
                                    onClick={() => setModalOpen(false)}>All Done
                            </button>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default AccountSetupModal;