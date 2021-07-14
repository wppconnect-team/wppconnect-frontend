import { useEffect, useRef, useState } from "react";

function Main({ fetchMore }) {
  const contentRef = useRef();
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        fetchMore();
      }
    }, options);
    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);
  return <div ref={contentRef} />;
}

export function InfiniteScroll({ total, fetchMore }) {
  const [mounted, setMounted] = useState(false);
  const [accumulated, setAccumulated] = useState(0);
  const [_total, _setTotal] = useState(total || 0);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 3000);
  }, []);

  if (!mounted) return null;

  return (
    // _total > 0 &&
    // _total > accumulated &&
    <Main
      {...{
        fetchMore: () => {
          setAccumulated(_total);
          fetchMore();
        },
      }}
    />
  );
}
