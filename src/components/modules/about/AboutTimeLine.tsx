"use client";
import { aboutTimelineData } from "@/src/constant/about.constant";
import { ListEnd } from "lucide-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const AboutTimeLine = () => {
  const ref = useRef(null);
  const { inView } = useInView({
    threshold: 0.5,
  });

  // Animation logic (optional)
  useEffect(() => {
    if (inView) {
      console.log("Timeline is in view!");
    }
  }, [inView]);

  return (
    <div className="my-20 px-4 overflow-x-hidden" id="experience">
      <h2 className="text-3xl font-bold text-center text-common-600 mb-16">
        Project & Development Roadmap
      </h2>
      <VerticalTimeline animate={true} lineColor="#D3D3D3" ref={ref}>
        {aboutTimelineData.map((item, index) => (
          <VerticalTimelineElement
            visible={true}
            key={index}
            className={`vertical-timeline-element--${item.type}`}
            contentStyle={{ background: item.iconBgColor, color: "#fff" }}
            contentArrowStyle={{
              borderRight: `8px solid ${item.iconBgColor}`,
            }}
            date={item.date}
            iconStyle={{ background: item.iconBgColor, color: "#fff" }}
            icon={item.icon}
          >
            <h3 className="vertical-timeline-element-title text-xl font-semibold">
              {item.title}
            </h3>
            <h4 className="vertical-timeline-element-subtitle text-sm font-semibold">
              {item.subtitle}
            </h4>
            <p>{item.description}</p>
          </VerticalTimelineElement>
        ))}
        <VerticalTimelineElement
          iconStyle={{ background: "#000", color: "#fff" }}
          icon={<ListEnd />}
        />
      </VerticalTimeline>
    </div>
  );
};

export default AboutTimeLine;
