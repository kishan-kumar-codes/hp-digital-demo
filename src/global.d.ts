


export {};

// Extending the Window interface
declare global {
  interface Window {
    renderReviewWidget: (elementId: string, config: WidgetConfig) => void;
    Commerce?: any;
  }
}

interface Window {
  Commerce?: any;
}

import NextAuth from "next-auth";




// In your types or directly in the file
declare module "next-auth" {
  interface Session {
    user?: {
      id: string; // Add this line for user id
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
    };
  }
}

export interface WidgetConfig {
  widgetId: string;
  title?: string;
  color?: string;
  backgroundColor?: string;
  showRatings?: boolean;
  displayMode?: string;
  showAvatar?: boolean;
  customizeBackground?:string;
  customizeRadius?:any;
  customizeBorder?:any;
  customizeSize?:any;
  displayLayout?:any;
  customizeShadow?:any;
  setCustomizeShadow?:any;
  customizeTitleText?:any;
  customizeWidgetTitle?:any;
  isFullScreen?:any;
  customizeTextBgColor?:any;
  displayHeight?:any;
  selectedFonts?:any;
  noOfReviewsToShows?:any;
  handleSmallScreen?:any;
  rotateSlides?:any;
  transitionStyle?:any;
  transitionSpeed?:any;
  showSlideArrows?:any;
  showSlideDots?:any;
  displayReview?:any;
  designPresetTab?:any;
  shadowX?:any;
  shadowY?:any;
  shadowBlur?:any;
  shadowSpread?:any;
  shadowColor?:any;
  customizTextAlignment?:any;
  reviewBgColor?:any;
  cornerRadius?:any;
  showReviewerName?:any;
  showReviewerSiteIcon?:any;
  showBusinessDetails?:any;
  showDateFormat?:any;
  fontCharacter?:any;
  customizeLinkColor?:any;
  isExpanded?:any;
  noOfLayout?:any;
  carouselWidget?:any;
}

