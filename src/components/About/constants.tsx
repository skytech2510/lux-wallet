import { InterfaceElementName } from '@uniswap/analytics-events'
import { DollarSign, Terminal } from 'react-feather'
import styled from 'styled-components/macro'
import { lightTheme } from 'theme/colors'

import darkArrowImgSrc from './images/aboutArrowDark.png'
import lightArrowImgSrc from './images/aboutArrowLight.png'
import darkDollarImgSrc from './images/aboutDollarDark.png'
import darkTerminalImgSrc from './images/aboutTerminalDark.png'
import nftCardImgSrc from './images/nftCard.png'
import swapCardImgSrc from './images/swapCard.png'

export const MAIN_CARDS = [
  {
    to: '/swap',
    title: 'Swap tokens',
    description: 'Buy, sell, and trade real world assets and tokens and NFTs on Ethereum, Polygon, Optimism, and more.',
    cta: 'Trade Tokens',
    darkBackgroundImgSrc: swapCardImgSrc,
    lightBackgroundImgSrc: swapCardImgSrc,
    elementName: InterfaceElementName.ABOUT_PAGE_SWAP_CARD,
  },
  {
    to: '/nfts',
    title: 'Trade NFTs',
    description: 'Buy and sell NFTs across marketplaces to find more listings at better prices.',
    cta: 'Explore NFTs',
    darkBackgroundImgSrc: nftCardImgSrc,
    lightBackgroundImgSrc: nftCardImgSrc,
    elementName: InterfaceElementName.ABOUT_PAGE_NFTS_CARD,
  },
]

const StyledCardLogo = styled.img`
  min-width: 20px;
  min-height: 20px;
  max-height: 48px;
  max-width: 48px;
`

export const MORE_CARDS = [
  {
    to: 'https://app.lux.market',
    external: true,
    title: 'Mint',
    description: 'Stake NFTs and mint real world asset (RWA) backed tokens, like LUX Uranium.',
    lightIcon: <DollarSign color={lightTheme.textTertiary} size={48} />,
    darkIcon: <StyledCardLogo src={darkDollarImgSrc} alt="Earn" />,
    cta: 'Find on secondary market',
    elementName: InterfaceElementName.ABOUT_PAGE_BUY_CRYPTO_CARD,
  },
  {
    to: '/pool',
    title: 'Earn',
    description: 'Provide liquidity to pools and earn fees from AMMs, bridges and other DeFi protocols.',
    lightIcon: <StyledCardLogo src={lightArrowImgSrc} alt="Analytics" />,
    darkIcon: <StyledCardLogo src={darkArrowImgSrc} alt="Analytics" />,
    cta: 'Provide liquidity',
    elementName: InterfaceElementName.ABOUT_PAGE_EARN_CARD,
  },
  {
    to: 'https://docs.lux.finance',
    external: true,
    title: 'Docs',
    description: 'Build apps and tools on the only decentralized, private, and quantum secure financial fabric.',
    lightIcon: <Terminal color={lightTheme.textTertiary} size={48} />,
    darkIcon: <StyledCardLogo src={darkTerminalImgSrc} alt="Developers" />,
    cta: 'Learn more',
    elementName: InterfaceElementName.ABOUT_PAGE_DEV_DOCS_CARD,
  },
]
