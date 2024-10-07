"use client";
import React, { useState } from "react";
import type { ChangeEvent, ReactNode } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { PlaceholdersAndVanishInput } from "../ui/placeholder-vanish-input";

const PromptFilterCard = (props: { setIsOpen: (isOpen: boolean) => void }) => {
    const { setIsOpen } = props;

    const [term, setTerm] = useState<string>("")
    const [prompt, setPrompt] = useState<string>("")

    const onSubmitPrompt = () => {
        console.log(prompt)
        setIsOpen(true);

        const urlsPanel = document.getElementById('urls-panel');
        if (urlsPanel) {
            urlsPanel.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const placeholders = [
        "Research about burger joints in Austin Texas and categorize on pricing",
        "Categorize the different female fast fashion brands in London, categorize their pricing",
        "Research about the top Sushi Chains Tokyo, Japan and categorize on quality and service",
    ]

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Start Research</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col space-y-6">
                    <FormFieldContainer className="w-full" label="Search Term">
                        <Input
                            value={term}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setTerm(e.target.value);
                            }}
                            className="flex-1 py-2"
                        />
                    </FormFieldContainer>
                    <FormFieldContainer label="Enter/Select Keywords">
                        <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                            onChange={(e) => setPrompt(e.target.value)}
                            onSubmit={onSubmitPrompt}
                        />
                    </FormFieldContainer>
                </div>
            </CardContent>
        </Card>
    );
};

interface FormFieldContainerProps {
    label: string;
    children: ReactNode;
    className?: string;
}

export const FormFieldContainer = (props: FormFieldContainerProps) => {
    const { label, children, className } = props;
    return (
        <div className={cn("flex flex-col items-start space-y-2", className)}>
            <Label className="text-slate-600">{label}</Label>
            {children}
        </div>
    );
};

export default PromptFilterCard;
