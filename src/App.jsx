import { useState, useEffect } from 'react'
import styles from './App.module.scss'
import classnames from 'classnames'
import { Link } from 'react-scroll'

const App = () => {
    const [isShowPrize, setIsShowPrize] = useState(false)
    const [startShake, setStartShake] = useState(false)
    const [startInitialize, setStartInitialize] = useState(false)
    const [showHand, setShowHand] = useState(false)
    const [showEnvelope, setShowEnvelope] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [disableClickable, setDisableClickable] = useState(false)
    const [playerLife, setPlayerLife] = useState(3)
    const [isWin, setIsWin] = useState()
    const [isShowButtonScroll, setIsShowButtonScroll] = useState(true)
    const [activeTree, setActiveTree] = useState(false)

    const handleShowPrize = () => {
        setIsShowPrize((prev) => !prev)
    }

    let clickTimeout

    const handleClickable = () => {
        if (startInitialize) {
            setStartShake(true)
            setShowHand(false)
        }
    }

    const initializeTreeClick = () => {
        setStartInitialize(true)
        setShowHand(true)
        document.documentElement.style.overflow = 'hidden'
        setIsShowButtonScroll(false)
    }

    const handleButtonOpen = () => {
        setPlayerLife((prev) => prev - 1)
        setIsWin(playerLife < 2 ? 1 : Math.floor(Math.random() * 2))
        setShowResult(true)
        setShowEnvelope(false)
    }

    const restartInitialize = () => {
        initializeTreeClick()
        setShowResult(false)
        setDisableClickable(false)
    }

    const stopGame = () => {
        if (!isWin) {
            document.documentElement.style.overflow = 'unset'
            setStartShake(false)
            setShowHand(false)
            setStartInitialize(false)
            setShowResult(false)
            setDisableClickable(false)
            setIsShowButtonScroll(true)
        }
        setShowEnvelope(false)
    }

    const handleRedirect = () => {
        window.location.href = 'https://2upfans.com/index-pc.html?/'
    }

    useEffect(() => {
        startShake &&
            (clickTimeout = setTimeout(() => {
                setStartShake(false)
                setShowEnvelope(true)
                setDisableClickable(true)
            }, 2000))
        return () => clearTimeout(clickTimeout)
    }, [startShake])

    let treeShineInterval

    useEffect(() => {
        treeShineInterval = setInterval(() => {
            setActiveTree((prev) => !prev)
        }, 2000)

        return () => clearInterval(treeShineInterval)
    }, [])

    return (
        <div className={styles.app}>
            <div className={styles.header} onClick={stopGame}>
                <div className={styles.headerImage}></div>
                <img
                    className={styles.brand}
                    src="/src/assets/images/Layer_1.png"
                    alt=""
                />
            </div>
            <div className={styles.firstScreen}>
                <div className={styles.heroImage}></div>
                <div
                    className={classnames([
                        styles.shadow,
                        startInitialize && styles.showShadow,
                        (showEnvelope || showResult) && styles.fullShadow,
                    ])}
                    onClick={stopGame}
                ></div>
                <img
                    className={styles.dragon}
                    src="/src/assets/images/GOLDEN TREE 2.png"
                    alt=""
                />
                <div className={styles.fireworkContainer1}>
                    <div className={styles.firework}></div>
                </div>

                <div className={styles.fireworkContainer2}>
                    <div className={styles.firework}></div>
                </div>
                <img
                    className={classnames([
                        styles.bag,
                        startInitialize && styles.showBag,
                    ])}
                    src="/src/assets/images/BAG DESIGN 1.png"
                    alt=""
                />

                <img
                    className={classnames([
                        styles.goldenTree,
                        startShake && styles.shake,
                        startInitialize && styles.showTree,
                    ])}
                    src="/src/assets/images/default-tree.png"
                    alt=""
                />
                <img
                    className={classnames([
                        styles.goldenTree,
                        startShake && styles.shake,
                        startInitialize && styles.showTree,
                        activeTree && styles.activeTree,
                        styles.shine,
                    ])}
                    src="/src/assets/images/shining-tree.png"
                    alt=""
                />
                <div
                    className={classnames([
                        styles.clickable,
                        disableClickable && styles.disableClickable,
                    ])}
                    onClick={handleClickable}
                >
                    <img
                        className={classnames([
                            styles.hand,
                            startInitialize && showHand && styles.showHand,
                        ])}
                        src="/src/assets/images/hand.png"
                        alt=""
                    />
                </div>
                <img
                    className={classnames([
                        styles.cloud,
                        startInitialize && styles.showCloud,
                    ])}
                    src="/src/assets/images/divider cloud 1.png"
                    alt=""
                    onClick={stopGame}
                />
                <img
                    className={classnames([
                        styles.title,
                        startInitialize && styles.showTitle,
                    ])}
                    src="/src/assets/images/COPYLINE 1.png"
                    alt=""
                />
                <img
                    className={classnames([
                        styles.button1,
                        startInitialize && styles.disableClick,
                    ])}
                    src="/src/assets/images/BUTTON 1.png"
                    alt=""
                    onClick={initializeTreeClick}
                />
                {isShowButtonScroll && (
                    <Link
                        to="subContent"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <img
                            className={styles.arrow}
                            src="/src/assets/images/ARROW 1.png"
                            alt=""
                        />
                    </Link>
                )}
                <div
                    className={classnames([
                        styles.envelopeContainer,
                        showEnvelope && styles.showEnvelope,
                    ])}
                >
                    <img
                        className={styles.envelope}
                        src="/src/assets/images/ENVELOPE 1.png"
                        alt=""
                    />
                    <img
                        className={styles.buttonOpen}
                        src="/src/assets/images/BUTTON OPEN 1.png"
                        alt=""
                        onClick={handleButtonOpen}
                    />
                </div>
                <div
                    className={classnames([
                        styles.prizesContainerResult,
                        showResult && styles.showPrizesResult,
                    ])}
                >
                    <img
                        className={styles.prizesResult}
                        src={
                            isWin
                                ? '/src/assets/images/PRIZES RESULTS.png'
                                : '/src/assets/images/NOTWIN CASE.png'
                        }
                        alt=""
                    />
                    {!isWin && (
                        <div className={styles.playerLife}>{playerLife}</div>
                    )}
                    <img
                        className={styles.buttonOk}
                        src={
                            isWin
                                ? '/src/assets/images/BUTTON OK.png'
                                : '/src/assets/images/TRY AGAIN BUTTON.png'
                        }
                        alt=""
                        onClick={isWin ? handleRedirect : restartInitialize}
                    />
                </div>
            </div>
            <div className={styles.subContent} id="subContent">
                <img
                    className={styles.howToplay}
                    src="/src/assets/images/HOW TO PLAY 1.png"
                    alt=""
                />
                <div className={styles.coin}></div>
                <img
                    className={styles.howToClaimButton}
                    src="/src/assets/images/how to claim button.png"
                    alt=""
                />

                <img
                    className={styles.howToClaim}
                    src="/src/assets/images/how to claim.png"
                    alt=""
                />
                <div
                    className={classnames([
                        styles.prizesContainer,
                        !isShowPrize && styles.show,
                    ])}
                >
                    <img
                        className={classnames([
                            styles.howToClaimDropdown,
                            isShowPrize && styles.show,
                        ])}
                        src="/src/assets/images/how to claim dropdown.png"
                        alt=""
                        onClick={handleShowPrize}
                    />
                    <img
                        className={classnames([
                            styles.prizes,
                            isShowPrize && styles.show,
                        ])}
                        src="/src/assets/images/prizes.png"
                        alt=""
                    />
                </div>
            </div>
            <div className={styles.footerContainer}>
                <img
                    className={styles.footer}
                    src="/src/assets/images/footer 1.png"
                    alt=""
                />
                <img
                    className={styles.footerBrand}
                    src="/src/assets/images/Layer_1.png"
                    alt=""
                />
            </div>
        </div>
    )
}

export default App
