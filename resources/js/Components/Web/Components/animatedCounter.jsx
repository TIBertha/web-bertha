import React from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";


export default function AnimatedCounter({num }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0,
    });

    return (
        <span ref={ref}>
          <CountUp
              className="contador-trabajadores-colocados"
              start={0}
              end={inView ? num : 0}
              duration={2}
              separator=","
          />
        </span>
    );
}
