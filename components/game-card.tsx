"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
}

export function GameCard({ title, description, icon, children }: GameCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] bg-card"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader className="text-center pb-2">
          <div className="text-4xl mb-2">{icon}</div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button variant="secondary" className="w-full" size="sm">
            Play Now
          </Button>
        </CardContent>
      </Card>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-card rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{icon}</span>
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 flex justify-center">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
