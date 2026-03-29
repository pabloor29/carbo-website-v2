import React from 'react'
import IntroRestaurant from './IntroRestaurant'
import SuggestionChef from './SuggestionChef'
import CarouselRestaurant from './CarouselRestaurant'
import GoogleReviews from './GoogleReviews'

function MainPage() {
  return (
    <div>
      <IntroRestaurant />
      {/* <SuggestionChef /> */}
      {/* <CarouselRestaurant /> */}
      <GoogleReviews />
    </div>
  )
}

export default MainPage