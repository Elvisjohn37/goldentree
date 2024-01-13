import { useState, useEffect } from 'react'
import styles from './App.module.scss'
import classnames from 'classnames'
import { Link } from 'react-scroll'
import defaultTree from '/src/assets/images/default-tree.png'
import brand from '/src/assets/images/Layer_1.png'
import dragon from '/src/assets/images/GOLDEN TREE 2.png'
import bag from '/src/assets/images/BAG DESIGN 1.png'
import shiningTree from '/src/assets/images/shining-tree.png'
import hand from '/src/assets/images/hand.png'
import cloud from '/src/assets/images/divider cloud 1.png'
import copyLine from '/src/assets/images/COPYLINE 1.png'
import button1 from '/src/assets/images/BUTTON 1.png'
import arrow from '/src/assets/images/ARROW 1.png'
import envelope from '/src/assets/images/ENVELOPE 1.png'
import buttonOpen from '/src/assets/images/BUTTON OPEN 1.png'
import prizesResults from '/src/assets/images/PRIZES RESULTS.png'
import notWinCase from '/src/assets/images/NOTWIN CASE.png'
import buttonOk from '/src/assets/images/BUTTON OK.png'
import tryAgainButton from '/src/assets/images/TRY AGAIN BUTTON.png'
import howToPlay from '/src/assets/images/HOW TO PLAY 1.png'
import howToClaimButton from '/src/assets/images/how to claim button.png'
import howToClaim from '/src/assets/images/how to claim.png'
import howToClaimDropdown from '/src/assets/images/how to claim dropdown.png'
import prizes from '/src/assets/images/prizes.png'
import footer1 from '/src/assets/images/footer 1.png'
import layer1 from '/src/assets/images/Layer_1.png'

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
    const [activeTree, setActiveTree] = useState(true)
    const [arrowDirection, setArrowDirection] = useState('down')

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

    window.onscroll = function () {
        if (
            window.innerHeight + window.pageYOffset >=
            document.body.offsetHeight
        ) {
            setArrowDirection('up')
        } else {
            setArrowDirection('down')
        }
    }

    const initializeTreeClick = () => {
        setStartInitialize(true)
        setShowHand(true)
        document.documentElement.style.overflow = 'hidden'
        setIsShowButtonScroll(false)
        document.body.scrollTop = 0 // For Safari
        document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
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

    // useEffect(() => {
    //     treeShineInterval = setInterval(() => {
    //         setActiveTree((prev) => !prev)
    //     }, 1000)

    //     return () => clearInterval(treeShineInterval)
    // }, [])

    return (
        <div className={styles.app}>
            <div className={styles.header} onClick={stopGame}>
                <div className={styles.headerImage}></div>
                <img className={styles.brand} src={brand} alt="" />
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
                <img className={styles.dragon} src={dragon} alt="" />
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
                    src={bag}
                    alt=""
                />

                <img
                    className={classnames([
                        styles.goldenTree,
                        startShake && styles.shake,
                        startInitialize && styles.showTree,
                    ])}
                    src={defaultTree}
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
                    src={shiningTree}
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
                        src={hand}
                        alt=""
                    />
                </div>
                <img
                    className={classnames([
                        styles.cloud,
                        startInitialize && styles.showCloud,
                    ])}
                    src={cloud}
                    alt=""
                    onClick={stopGame}
                />
                <img
                    className={classnames([
                        styles.title,
                        startInitialize && styles.showTitle,
                    ])}
                    src={copyLine}
                    alt=""
                />
                <img
                    className={classnames([
                        styles.button1,
                        startInitialize && styles.disableClick,
                    ])}
                    src={button1}
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
                            className={classnames([
                                styles.arrow,
                                styles[arrowDirection],
                            ])}
                            src={arrow}
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
                    <img className={styles.envelope} src={envelope} alt="" />
                    <img
                        className={styles.buttonOpen}
                        src={buttonOpen}
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
                        src={isWin ? prizesResults : notWinCase}
                        alt=""
                    />
                    {!isWin && (
                        <div className={styles.playerLife}>{playerLife}</div>
                    )}
                    <img
                        className={styles.buttonOk}
                        src={isWin ? buttonOk : tryAgainButton}
                        alt=""
                        onClick={isWin ? handleRedirect : restartInitialize}
                    />
                </div>
            </div>
            <div className={styles.subContent} id="subContent">
                <img className={styles.howToplay} src={howToPlay} alt="" />
                <div className={styles.coin}></div>
                <img
                    className={styles.howToClaimButton}
                    src={howToClaimButton}
                    alt=""
                />

                <img className={styles.howToClaim} src={howToClaim} alt="" />
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
                        src={howToClaimDropdown}
                        alt=""
                        onClick={handleShowPrize}
                    />
                    <img
                        className={classnames([
                            styles.prizes,
                            isShowPrize && styles.show,
                        ])}
                        src={prizes}
                        alt=""
                    />
                </div>
            </div>
            <div className={styles.footerContainer}>
                <img className={styles.footer} src={footer1} alt="" />
                <img className={styles.footerBrand} src={layer1} alt="" />
            </div>
        </div>
    )
}

export default App
