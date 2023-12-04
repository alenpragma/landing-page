import React from 'react'
import Banner from './_components/_banner/Banner'
import WhoCanUse from './_components/_whocanuse/page'
import WhyShould from './_components/_whyyoushouldbuy/page'
import FirstAidKits from './_components/_firstaidkits/FirstAidKits'
import Benefits from './_components/_benefits/Benefits'
import Motivation from './_components/_motivation/Motivation'
import Faq from './_components/_faq/Faq'
import Footer from './_components/_footer/Footer'
import FirstAidKitsTwo from './_components/_firstsirkitstwo/FirstAidKitsTwo'
import FirstAidKitsThree from './_components/_firstaidkitsthree/FirstAidKitsThree'
import FirstAidKitsOne from './_components/_firstaidkitsone/firstaidkitsone'

const page = () => {
  return (
    <>
      <Banner />
      <WhoCanUse />
      <WhyShould />
      <FirstAidKits />
      <FirstAidKitsOne />
      <FirstAidKitsTwo />
      <FirstAidKitsThree />
      <Benefits />
      {/* payment here */}
      <Motivation />
      <Faq />
      <Footer />
    </>
  )
}

export default page