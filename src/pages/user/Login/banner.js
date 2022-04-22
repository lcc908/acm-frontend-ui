import React from 'react'
// swiper@6.8.4
import { Swiper, SwiperSlide } from 'swiper/react' // 引入js
import SwiperCore, { Autoplay } from 'swiper/core' // 引入核心插件和自动播放组件
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import "swiper/swiper-bundle.css";
SwiperCore.use([Autoplay])
const SwiperComp = (props) => {
  return <Swiper
    slidesPerView={1}
    // modules={[Navigation, Pagination, Scrollbar, A11y]}
    autoplay={{
      // delay: 3000, // 默认延迟3s播放下一张
      // stopOnLastSlide: false, // 播放到最后一张时停止：否
      // disableOnInteraction: true // 用户操作轮播图后停止 ：是
    }}
    // autoplay
    // loop
    // style={{ width: '400px' }}
    // onSlideChange={() => console.log('slide change')}
    // onSwiper={(swiper) => console.log(swiper)}
  >
    <SwiperSlide>
      <img
        src="https://p4.lefile.cn/fes/cms/2022/04/11/mdb6es413l17hnb4yiwwzd2jye3e4t242864.png"
        // className={styles.contentStyle}
        alt=""
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src="https://p3.lefile.cn/fes/cms/2022/04/12/6oxe9rkk6at5ti3dep6ecqsgcrzwto545948.jpg"
        // className={styles.contentStyle}
        alt=""
      />
    </SwiperSlide>
  </Swiper>
}

export default SwiperComp
