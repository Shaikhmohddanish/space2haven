declare module "@splidejs/react-splide" {
    import { ComponentType } from "react";
  
    interface SplideOptions {
      type?: "slide" | "loop" | "fade";
      perPage?: number;
      perMove?: number;
      gap?: string;
      padding?: string | { left?: string; right?: string };
      arrows?: boolean;
      pagination?: boolean;
      autoplay?: boolean;
      interval?: number;
      pauseOnHover?: boolean;
      breakpoints?: Record<string, any>;
      [key: string]: any;
    }
  
    interface SplideProps {
      options?: SplideOptions;
      className?: string;
      [key: string]: any;
    }
  
    export const Splide: ComponentType<SplideProps>;
    export const SplideSlide: ComponentType<SplideProps>;
  }
  