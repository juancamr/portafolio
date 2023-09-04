"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Ubuntu_Mono } from "next/font/google";
import { HoverCardContent, HoverCard, HoverCardTrigger } from "./ui/hover-card";
import { GITHUB_URL, LENGUAGES, LINKEDIN_URL } from "@/lib/constants";
import Typed from "typed.js";
import Link from "next/link";
import { SendMailDialog } from "./send-mail-dialog";
import { MoveDown } from "lucide-react";

interface Command {
  type: "command" | "response";
  text: string;
}

const ubuntu = Ubuntu_Mono({ subsets: ["latin"], weight: "400" });

const TerminalSimulator = ({
  isTerminalMaximized,
  setIsTerminalMaximized,
}: {
  isTerminalMaximized: boolean;
  setIsTerminalMaximized: Function;
}) => {
  const comandosDisponibles = ["lenguajes", "about_me", "clear", "neofetch"];
  const [comandos, setComandos] = useState<Command[]>([]);
  const [command, setCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const typedCommand = useRef<HTMLInputElement>(null);

  let lenguagesResponse = "Estos son los lenguajes que domino:";
  LENGUAGES.forEach((lenguage) => {
    lenguagesResponse += `\n${lenguage}`;
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCommand(value.toLowerCase());
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setComandos(function (prev) {
      return [
        ...prev,
        {
          type: "command",
          text: command,
        },
      ];
    });
    if (comandosDisponibles.includes(command)) {
      switch (command) {
        case "lenguajes":
          setComandos(function (prev) {
            return [
              ...prev,
              {
                type: "response",
                text: lenguagesResponse,
              },
            ];
          });
          break;
        case "about_me":
          setComandos(function (prev) {
            return [
              ...prev,
              {
                type: "response",
                text: "Soy un desarrollador de software con 6 meses de experiencia, me gusta aprender cosas nuevas y me considero una persona autodidacta, me gusta trabajar en equipo y soy muy responsable con mis tareas.",
              },
            ];
          });
          break;
        case "neofetch":
          setComandos(function (prev) {
            return [
              ...prev,
              {
                type: "response",
                text: `
                888888 888b     d888 
                  "88b 8888b   d8888 
                    888 88888b.d88888 
                    888 888Y88888P888 
                    888 888 Y888P 888 
                    888 888  Y8P  888 
                    88P 888   "   888 
                    888 888       888 
                  .d88P               
                .d88P"                
                888P"                  

                `,
              },
            ];
          });
          break;
        case "clear":
          setComandos([]);
          break;
      }
    } else {
      setComandos(function (prev) {
        return [
          ...prev,
          {
            type: "response",
            text: `jash: ${command.split(" ")[0]}: command not found`,
          },
        ];
      });
    }
    setTimeout(() => {
      if (terminalRef.current) {
        console.log("terasoe");
        terminalRef.current.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
    setCommand("");
  };

  //function to empty comandos array when the user press ctrl + l
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key === "l") {
      setComandos([]);
      event.preventDefault();
    }
    if (event.ctrlKey && event.key === "u") {
      setCommand("");
      event.preventDefault();
    }
  };

  const minimizarTerminal = () => {
    setIsTerminalMaximized(!isTerminalMaximized);
  };

  useEffect(() => {
    document.getElementById("command-input")?.focus();
    // const typed = new Typed(typedCommand.current, {
    //   strings: comandosDisponibles,
    //   typeSpeed: 50,
    //   backSpeed: 50,
    //   loop: true,
    //   attr: "placeholder",
    //   bindInputFocusEvents: true,
    //   backDelay: 1000,
    // });
    // return () => {
    //   typed.destroy();
    // };
  }, []);

  return (
    <section
      className={`${ubuntu.className} fixed top-0 right-0 h-screen flex items-center`}
    >
      <div>
        {/* <p className="text-gray-400">
          Intenta escribiendo <span ref={typedCommand}></span>
        </p> */}
        <div
          ref={terminalRef}
          onClick={() => document.getElementById("command-input")?.focus()}
          className={`${
            isTerminalMaximized
              ? "lg:w-[350px] xl:w-[450px] 3xl:w-[600px]"
              : "2xl:w-[70px] xl:w-[70px] lg:w-[70px]"
          } lg:h-[400px] xl:h-[500px]  shadow-2xl transition-all rounded-l-2xl bg-slate-50 dark:bg-gray-800 overflow-y-auto relative border border-gray-200 dark:border-gray-800`}
        >
          <section className={`${!isTerminalMaximized && "hidden"}`}>
            <div className={`w-full h-8 rounded-tl-xl absolute top-0`}>
              <div className="flex items-center h-full space-x-3 px-4">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div
                  className="h-3 w-3 rounded-full bg-yellow-500 cursor-pointer"
                  onClick={minimizarTerminal}
                ></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                {isTerminalMaximized && (
                  <i
                    className={`fa-solid fa-angles-right text-gray-400 dark:text-gray-500 cursor-pointer`}
                    onClick={minimizarTerminal}
                  ></i>
                )}
              </div>
            </div>
            <div className={`h-full rounded-bl-xl p-4 dark:text-white `}>
              <HoverCard>
                <HoverCardTrigger className="cursor-pointer">
                  <p className="text-base text-blue-400 dark:text-indigo-300 font-medium mb-4 mt-8">
                    Comandos disponibles
                  </p>
                </HoverCardTrigger>
                <HoverCardContent>
                  Ctrl + L - Ctrl + U
                  <ul className="mt-2">
                    {comandosDisponibles.map((command, index) => (
                      <li key={index} className="mb-2">
                        <CommandLine type="command" command={command} />
                      </li>
                    ))}
                  </ul>
                </HoverCardContent>
              </HoverCard>
              <div className="space-y-1 mb-1">
                {comandos.map((command, index) => (
                  <CommandLine
                    key={index}
                    type={command.type}
                    command={command.text}
                  />
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-center pb-3">
                <i className="fa-solid fa-chevron-right mr-2 text-[0.7rem] text-green-500"></i>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  value={command}
                  id="command-input"
                  type="text"
                  autoComplete="off"
                  className="bg-transparent dark:text-white border-transparent focus:border-transparent focus:ring-transparent w-full outline-none"
                />
              </form>
            </div>
          </section>
          <section
            className={`${isTerminalMaximized && "hidden"} h-full relative`}
          >
            <div
              className={`w-full py-4 rounded-tl-xl flex justify-center absolute top-0`}
            >
              <i
                onClick={minimizarTerminal}
                className="fa-solid fa-angles-left cursor-pointer
              text-gray-400 dark:text-gray-500
                "
              ></i>
            </div>
            <pre
              style={{
                fontFamily: "__Ubuntu_Mono_328342",
                whiteSpace: "pre-wrap",
              }}
              className="absolute top-20 w-full justify-center text-center hidden xl:flex"
            >
              {"mis\nlinks\n"}
              {/* <MoveDown /> */}
            </pre>
            <div
              className={`${
                isTerminalMaximized && "hidden"
              } flex items-center justify-center h-full`}
            >
              <div className="space-y-3">
                <div className="text-center">
                  <Link
                    style={{ fontFamily: "__Montserrat_cabfd8" }}
                    href={LINKEDIN_URL}
                    target="_blank"
                    className="font-bold text-3xl text-blue-500 dark:text-white text-center"
                  >
                    in
                    {/* <img
                      src="https://static.vecteezy.com/system/resources/previews/018/930/584/original/linkedin-logo-linkedin-icon-transparent-free-png.png"
                      alt="linkedin-logo"
                      className="w-10 rounded bg-slate-50"
                    /> */}
                  </Link>
                </div>
                <div>
                  <Link href={GITHUB_URL} target="_blank">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      alt="github-logo"
                      className="w-10 bg-slate-50 rounded-full border border-gray-400"
                    />
                  </Link>
                </div>
                <div className="cursor-pointer">
                  <SendMailDialog>
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/017/396/815/small_2x/google-contacts-icon-free-png.png"
                      alt=""
                      className="w-10 rounded"
                    />
                  </SendMailDialog>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

function CommandLine({
  command,
  type,
}: {
  command: string;
  type: "command" | "response";
}) {
  return (
    <div className="flex items-center">
      {type === "command" && (
        <i className="fa-solid fa-chevron-right mr-2 text-[0.7rem] text-green-500"></i>
      )}
      <pre
        style={{ fontFamily: "__Ubuntu_Mono_328342", whiteSpace: "pre-wrap" }}
      >
        {command}
      </pre>
    </div>
  );
}

export default TerminalSimulator;
