import { Cctv, ChevronRight, Eye, Fingerprint, Lock, MoreHorizontal, PanelLeftCloseIcon, Paperclip, Popcorn, Search, Send, Shield, SquareChevronUpIcon, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import Avvvatars from 'avvvatars-react';

export const ChatApp = () => {
    return (
        <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
            <div className="h-16 px-4  shrink-0 items-center flex justify-between">
                {/* <Button variant="outline" size="icon">
                    <MoreHorizontal />
                </Button> */}
                <h1 className="text-2xl font-bold">Chats</h1>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <AiModelDropdown />
                </div>

            </div>
            <div className="flex flex-1 px-3 overflow-y-auto flex-col">
                <div className="grid-cols-1 gap-2 grid md:grid-cols-2 pb-4 pt-2">
                    {
                        Array.from({ length: 30 }).map(
                            (_, index) => ( <Card className="px-1 shadow-none border-0  hover:bg-accent transition duration-300 bg-card/70 py-2 gap-1 items-center flex  flex-row">
                                <Avvvatars size={40} value={index}  style="shape" />
                                <div className="flex ml-4 mr-1 flex-1 flex-col">
                                <h1 className="overflow-hidden  line-clamp-1 text-ellipsis">How to remove alerts in bluebot chats</h1>
                                <p className="text-sm text-muted-foreground">Few hours ago</p>
                                </div>
                                <ChevronRight className="text-foreground"/>
                            </Card>)
                        
                        )
                    }
                   

                    {/* <Card className="px-4 hover:bg-accent shadow-none py-3 gap-0 items-center flex  flex-row">
                        <Avvvatars value="px"  style="shape" />
                        <div className="flex ml-4 mr-1 flex-1 flex-col">
                        <h1 className="overflow-hidden  line-clamp-1 text-ellipsis">Can i bring pets in flight</h1>
                        <p className="text-xs text-">Today at 4:25 pm</p>
                        </div>
                        <ChevronRight/>
                    </Card> */}

                   
                </div>

            </div>
            {/* <div className="p-4z flex flex-1 gap-4 mx-auto container lg:max-w-6xl md:max-w-2xl flex-col items-center justify-center">
                <div className="space-y-4">
                    <h1 className="text-lg font-semibold">Things to remeber</h1>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
                        <PrivacyCard
                            title="Privacy"
                            description="Our chat application ensures your privacy and data are protected using state-of-the-art"
                            icon={Cctv}
                        />
                        <PrivacyCard
                            title="Shield Security"
                            description="Robust shield protection for every message you send"
                            icon={Shield}
                        />
                        <PrivacyCard
                            title="Secure Lock"
                            description="We lock down your chats with advanced encryption"
                            icon={Lock}
                        />
                        <PrivacyCard
                            title="Visual Privacy"
                            description="Our systems monitor and guard your data integrity"
                            icon={Eye}
                        />
                    </div>



                </div>

                <div className="space-y-4">
                    <h1 className="text-lg font-semibold">Frequently Asked Questions</h1>

                    <div className="flex flex-wrap gap-2">
                        <FAQCard
                            question="Can I use this app on multiple devices?"
                        />
                        <FAQCard
                            question="Is my data encrypted?"
                        />
                        <FAQCard
                            question="Can I delete my account?"
                        />

                        <FAQCard
                            question="Can I use this app on multiple devices?"
                        />

                        <FAQCard
                            question="How do I reset my password?"
                        />

                        <FAQCard
                            question="Is my data encrypted?"
                        />
                        <FAQCard
                            question="How do I reset my password?"
                        />
                        <FAQCard
                            question="Can I delete my account?"
                        />
                    </div>
                </div>

                {/* <BotMessageCard
                className="w-full"
                    message={`Hello! I'm here to assist you.\nLet me know what you need help with.`}
                    timestamp="Aug 6, 2025 • 10:12 AM"
                /> 


                <Card className="w-full shadow-none flex flex-col  justify-end  h-[150px] bg-card">
                    <CardContent>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button variant={'outline'}>
                                    <Paperclip /> File Upload
                                </Button>
                                <Button variant={'outline'}>
                                    <Popcorn /> ECMS
                                </Button>
                                <Button variant={'outline'}>
                                    <Search /> Search
                                </Button>
                            </div>
                            <Button variant={'default'}>
                                <Send />
                                Send
                            </Button>
                        </div>

                    </CardContent>
                </Card>

            </div> */}




        </div>
    );
}



import React from 'react';

interface PrivacyCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    className?: string;
}

const PrivacyCard: React.FC<PrivacyCardProps> = ({ title, description, icon: Icon, className }) => {
    return (
        <Card className={`shadow-none  gap-2 ${className}`}>
            <CardHeader className="m-0 font-semibold">
                <Icon className="mb-2 text-primary size- " />
                <h1>{title}</h1>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-sm">
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    );
};




interface FAQCardProps {
    question: string;
    className?: string;
}

const FAQCard: React.FC<FAQCardProps> = ({ question, className }) => {
    return (
        <div className={` px-4 bg-card py-2 rounded-xl border        ${className}`}>
            <h2 className=" text-">{question}</h2>
        </div>

    );
};




import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const MODELS = ["GPT-4", "GPT-3.5", "Claude 2", "Claude 3", "Gemini", "Mistral", "LLaMA 3"]

export function AiModelDropdown() {
    const [selectedModel, setSelectedModel] = useState("GPT-4")

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="" className="flex  items-center gap-2">
                    {selectedModel}
                    <ChevronDown className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
                {MODELS.map((model) => (
                    <DropdownMenuItem key={model} onClick={() => setSelectedModel(model)}>
                        {model}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



import { Copy, Share, ThumbsUp, ThumbsDown, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle";
import { Avatar } from "./ui/avatar";

interface BotMessageCardProps {
    message: string
    timestamp: string
    className?: string
}

export const BotMessageCard: React.FC<BotMessageCardProps> = ({
    message,
    timestamp,
    className,
}) => {
    return (
        <Card
            className={cn(
                "bg-gradient-to-sb from-purple-950/40 to-backgrousnd border-0 p-4 space-y-3",
                className
            )}
        >
            <CardHeader className="flex flex-row items-start gap-3 p-0">
                <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xs font-semibold text-purple-500">
                    🤖
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-sm text-muted-foreground">{timestamp}</div>
                    <div className="text-sm text-foreground whitespace-pre-line">{message}</div>
                </div>
            </CardHeader>

            <CardContent className="p-0 flex gap-2 flex-wrap">
                <Button variant="ghost" size="icon" className="w-8 h-8" aria-label="Copy">
                    <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8" aria-label="Share">
                    <Share className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8" aria-label="Like">
                    <ThumbsUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8" aria-label="Dislike">
                    <ThumbsDown className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8" aria-label="Favorite">
                    <Star className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    )
}
