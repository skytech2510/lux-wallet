import { fetchTrendingCollections } from 'nft/queries'
import { TimePeriod } from 'nft/types'
import { calculateCardIndex } from 'nft/utils'
import { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { opacify } from 'theme/utils'

import { Carousel, LoadingCarousel } from './Carousel'
import { CarouselCard, LoadingCarouselCard } from './CarouselCard'

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 22px;
  position: relative;

  @media only screen and (min-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    padding: 32px 16px;
  }
`

const AbsoluteFill = styled.div`
  position: absolute;
  top: -96px;
  left: 0;
  right: 0;
  bottom: 0;
`

// Safari has issues with blur / overflow, forcing GPU rendering with `translate3d` fixes it
// https://stackoverflow.com/a/71353198
const BannerBackground = styled(AbsoluteFill)<{ backgroundImage: string }>`
  transform: translate3d(0, 0, 0) scaleY(1.1);

  background-image: ${(props) => `url(${props.backgroundImage})`};
  filter: blur(62px);

  opacity: ${({ theme }) => (theme.darkMode ? 0.3 : 0.2)};
`

const PlainBackground = styled(AbsoluteFill)`
  background: ${({ theme }) => `linear-gradient(${opacify(10, theme.userThemeColor)}, transparent)`};
`

const BannerMainArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 36px;
  max-width: 1200px;
  justify-content: space-between;
  z-index: 2;

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    flex-direction: column;
    height: 100%;
    gap: 14px;
    margin-top: 4px;
    margin-bottom: 6px;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  max-width: 500px;
  font-weight: 500;
  font-size: 72px;
  line-height: 88px;
  align-self: center;
  flex-shrink: 0;
  padding-bottom: 32px;

  color: ${({ theme }) => theme.textPrimary};

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.lg}px`}) {
    font-size: 48px;
    line-height: 67px;
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.md}px`}) {
    font-size: 36px;
    line-height: 50px;
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    line-height: 43px;
    text-align: center;
    padding-bottom: 16px;

    br {
      display: none;
    }
  }

  /* Custom breakpoint to split into two lines on smaller screens */
  @media only screen and (max-width: 550px) {
    font-size: 28px;
    line-height: 34px;
    padding-bottom: 0;

    br {
      display: unset;
    }
  }
`

// Exclude collections that are not available in any of the following - OpenSea, X2Y2 and LooksRare:
const EXCLUDED_COLLECTIONS = ['0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb']
const TRENDING_COLLECTION_SIZE = 5

const Banner = () => {
  const navigate = useNavigate()

  const { data } = useQuery(
    ['trendingCollections'],
    () => {
      return fetchTrendingCollections({
        volumeType: 'eth',
        timePeriod: TimePeriod.OneDay,
        size: TRENDING_COLLECTION_SIZE + EXCLUDED_COLLECTIONS.length,
      })
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )

  const collections = useMemo(
    () => data?.filter((collection) => !EXCLUDED_COLLECTIONS.includes(collection.address)).slice(0, 5),
    [data]
  )

  const [activeCollectionIdx, setActiveCollectionIdx] = useState(0)
  const onToggleNextSlide = useCallback(
    (direction: number) => {
      if (!collections) return
      setActiveCollectionIdx((idx) => calculateCardIndex(idx + direction, collections.length))
    },
    [collections]
  )

  const activeCollection = collections?.[activeCollectionIdx]

  return (
    <BannerContainer>
      {activeCollection ? (
        activeCollection.bannerImageUrl ? (
          <BannerBackground backgroundImage={activeCollection.bannerImageUrl} />
        ) : (
          <PlainBackground />
        )
      ) : null}
      <BannerMainArea>
        <HeaderContainer style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '12px 16px 24px rgba(0,0,0,0.24),12px 8px 12px rgba(0,0,0,0.24),4px 4px 8px rgba(0,0,0,0.32)', borderRadius: 16, padding: '0 16px 16px', margin: 16, top: '-16px', position: 'relative' }}>
          <a href="https://app.lux.market/collection/ethereum/0x31e0f919c67cedd2bc3e294340dc900735810311" style={{ fontSize: '40px', color: 'white', textDecoration: 'none' }} onClick={() => navigate(`/nfts/collection/0x31e0f919c67cedd2bc3e294340dc900735810311`)}>
            <strong style={{ position: 'relative', left: 8, top: 8, margin: 0, padding: 0, verticalAlign: 'middle', fontSize: '42px' }}>
            ▼ Genesis
            </strong>
            <strong style={{ position: 'relative', left: 20, top: 10, verticalAlign: 'middle', fontSize: '14.2px' }}>NEW!</strong>
            <p style={{ fontSize: ".9rem", margin: '20px 10px 10px 10px', lineHeight: '1.42', fontWeight: '300', color: '#98A1C0' }}>
              The Lux Genesis collection is backed by 7.65 million pounds of physical uranium (U3O8), in a first-of-its-kind mining transaction.
            </p>
            <p style={{ fontSize: ".9rem", margin: '10px', lineHeight: '1.42', fontWeight: '300', color: '#98A1C0' }}>
              Each Genesis NFT provides access to governance, and unique utility. Mint a DeFi credit card, secure network rights and more.
            </p>
            <p style={{ fontSize: ".9rem", margin: '10px', lineHeight: '1.42', fontWeight: '300', color: '#98A1C0' }}>
              Stake, vote and build your reputation. Help us increase economic freedom through decentralized access to RWAs.
            </p>
          </a>
        </HeaderContainer>
        {collections ? (
          <Carousel activeIndex={activeCollectionIdx} toggleNextSlide={onToggleNextSlide}>
            {collections.map((collection) => (
              <CarouselCard
                key={collection.address}
                collection={collection}
                onClick={() => navigate(`/nfts/collection/${collection.address}`)}
              />
            ))}
          </Carousel>
        ) : (
          <LoadingCarousel>
            <LoadingCarouselCard />
          </LoadingCarousel>
        )}
      </BannerMainArea>
    </BannerContainer>
  )
}

export default Banner
