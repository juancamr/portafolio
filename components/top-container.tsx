"use client";
import NameAnimation from "./name-animation";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import SocialLink from "./social-link";
import { GITHUB_URL, LINKEDIN_PROFILE, LINKEDIN_URL } from "@/lib/constants";
interface Color {
  first_color: boolean;
  second_color: boolean;
  third_color: boolean;
}

const TopContainer = ({
  isTerminalMaximized
}: {
  isTerminalMaximized: boolean
}) => {
  const [activeColors, setActiveColors] = useState<Color>({
    first_color: true,
    second_color: false,
    third_color: false,
  });

  useEffect(() => {
    setInterval(() => {
      setActiveColors({
        first_color: true,
        second_color: false,
        third_color: false,
      });
    }, 6000);

    setTimeout(() => {
      setInterval(() => {
        setActiveColors({
          second_color: true,
          first_color: false,
          third_color: false,
        });
      }, 6000);
    }, 2000);

    setTimeout(() => {
      setInterval(() => {
        setActiveColors({
          third_color: true,
          first_color: false,
          second_color: false,
        });
      }, 6000);
    }, 4000);
  }, []);
  return (
    <div className="grid lg:grid-cols-2 relative min-h-screen px-4 md:px-16 lg:px-20 xl:px-40">
      <div className="h-screen flex items-center">
        <div>
          <div className="space-y-6">
            <div className="max-w-screen-md space-y-4">
              <NameAnimation activeColors={activeColors} />
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Tempor commodo laboris nisi exercitation eiusmod minim
                exercitation proident enim pariatur.
              </p>
            </div>
            <Button
              className={`font-bold
            transition-shadow duration-1000
              ${activeColors.first_color && "shadow-[0px_0px_20px_3px_#3b82f6]"}
              ${
                activeColors.second_color && "shadow-[0px_0px_20px_3px_#6366f1]"
              }
              ${activeColors.third_color && "shadow-[0px_0px_20px_3px_#eab308]"}
              
              `}
              variant={"default"}
              size={"lg"}
            >
              <Link target="_blank" href="/assets/curriculum.pdf">
                Descargar CV
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap space-y-3 sm:space-y-0 mt-12">
            <SocialLink
              photo={LINKEDIN_PROFILE}
              link={GITHUB_URL}
              label={"@github/juancamr"}
              type="github"
            />
            <SocialLink
              photo={LINKEDIN_PROFILE}
              link={LINKEDIN_URL}
              label="@linkedin/juancamr"
              type="linkedin"
            />
          </div>
        </div>
      </div>
      <div
        className={`flex items-center justify-end ${
          isTerminalMaximized && "hidden"
        }`}
      >
        <img
          src="https://miro.medium.com/max/320/1*cZm7wURoNLmjpwaxr8Jt5g.png"
          alt="emoji"
          className="h-40 w-40"
        />
      </div>
    </div>
  );
};

export default TopContainer;