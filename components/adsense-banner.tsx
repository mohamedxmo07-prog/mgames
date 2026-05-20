"use client";

interface AdSenseBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

export function AdSenseBanner({ slot, format = "auto", className = "" }: AdSenseBannerProps) {
  return (
    <div className={`w-full bg-muted/50 border border-border rounded-lg overflow-hidden ${className}`}>
      {/* 
        Replace this placeholder with your actual Google AdSense code:
        
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        
        And add this script to your layout.tsx:
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      */}
      <div className="flex items-center justify-center h-[90px] md:h-[90px] text-muted-foreground text-sm">
        <div className="text-center">
          <p className="font-medium">Advertisement</p>
          <p className="text-xs">Google AdSense Banner - Slot: {slot}</p>
        </div>
      </div>
    </div>
  );
}
