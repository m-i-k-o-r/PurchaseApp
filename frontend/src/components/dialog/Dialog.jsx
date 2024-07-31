"use client"

import React from "react"
import { cx } from "class-variance-authority"
import { Root, Trigger, Portal, Overlay, Content, Close, Title, Description } from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import './Dialog.css';

export const Dialog = Root

export const DialogTrigger = Trigger

export const DialogContent = React.forwardRef(
    ({ children, className, ...props }, ref) => {
        return (
            <Portal>
                <Content
                    ref={ref}
                    className={cx("dialog-content", className)}
                    {...props}
                >
                    {children}
                    <Close className="dialog-close">
                        <XIcon size={20} />
                    </Close>
                </Content>
                <Overlay className="dialog-overlay" />
            </Portal>
        )
    }
);
DialogContent.displayName = "DialogContent"

export const DialogTitle = React.forwardRef(
    ({ className, ...props }, ref) => {
        return (
            <Title
                ref={ref}
                className={cx("dialog-title", className)}
                {...props}
            />
        )
    }
);
DialogTitle.displayName = "DialogTitle"

export const DialogDescription = React.forwardRef(
    ({ className, ...props }, ref) => {
        return (
            <Description
                ref={ref}
                className={cx("dialog-description", className)}
                {...props}
            />
        )
    }
);
DialogDescription.displayName = "DialogDescription"
