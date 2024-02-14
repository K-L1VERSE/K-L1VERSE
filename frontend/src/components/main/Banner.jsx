import React, { useEffect, useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import Banner1 from "../../assets/banners/banner1.png";
import Banner2 from "../../assets/banners/banner2.png";
import {
  BannerWrap,
  BannerItem,
  Toggles,
  Toggle,
} from "../../styles/main-styles/BannerStyle";

export default function Banner() {
  const imgRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const imgElement = imgRef.current;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setHeight(entry.target.offsetHeight);
    });

    resizeObserver.observe(imgElement);

    return () => {
      resizeObserver.unobserve(imgElement);
    };
  }, []);

  const [curIndex, setCurIndex] = useState(0);
  const imgs = [
    {
      id: 0,
      src: Banner1,
    },
    {
      id: 1,
      src: Banner2,
    },
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurIndex((curIndex + 1) % imgs.length);
    },
    onSwipedRight: () =>
      setCurIndex((curIndex - 1 + imgs.length) % imgs.length),
    trackMouse: true,
  });

  setInterval(() => {
    setCurIndex((curIndex + 1) % imgs.length);
  }, [5000]);

  return (
    <>
      <BannerWrap {...handlers} height={height}>
        {imgs.map((img) => (
          <BannerItem key={img.id} $display={img.id === curIndex}>
            <img ref={imgRef} src={img.src} alt="banner" />
          </BannerItem>
        ))}
      </BannerWrap>

      <Toggles>
        {imgs.map((img) => (
          <Toggle $display={img.id === curIndex} key={img.id} />
        ))}
      </Toggles>
    </>
  );
}
