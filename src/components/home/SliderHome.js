import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function SliderHome() {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="Slide-img"
            src="https://dulichviet.com.vn/images/bandidau/danh-sach-nhung-buc-anh-viet-nam-lot-top-anh-dep-the-gioi.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="Slide-img"
            src="https://kynguyenlamdep.com/wp-content/uploads/2020/01/nuong-lua.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="Slide-img"
            src="https://toanthaydinh.com/wp-content/uploads/2020/04/chum-tour-du-lich-dong-tay-bac-mixtourist.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
