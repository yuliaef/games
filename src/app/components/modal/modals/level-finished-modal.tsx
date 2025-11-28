"use client";

import {useEffect} from "react";
import {ModalHeader, ModalBody, ModalFooter} from "@heroui/modal";
import {Button} from "@heroui/button";
import confetti from "canvas-confetti";
import {ModalContentProps, registerModal} from "../modal-registry";

type LevelFinishedModalData = {
    phrase: string;
};

export function LevelFinishedModalContent({
    data,
    onClose,
}: ModalContentProps<LevelFinishedModalData>) {
    useEffect(() => {
        let isActive = true;
        const duration = 2000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 6,
                spread: 75,
                startVelocity: 35,
                gravity: 0.8,
                scalar: 0.9,
                ticks: 90,
                origin: { y: 0.6 },
                colors: ["#FF6B6B", "#FFD166", "#06D6A0", "#4D96FF"],
            });

            if (isActive && Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <>
            <ModalHeader>
                <div>Поздравляем! Уровень завершён</div>
            </ModalHeader>
            <ModalBody>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ fontSize: "1rem", color: "var(--heroui-default-600, #71717a)" }}>
                        Собранная фраза
                    </div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4 }}>
                        {data.phrase}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onPress={onClose}>
                    Отлично
                </Button>
            </ModalFooter>
        </>
    );
}

registerModal<LevelFinishedModalData>("level-finished", LevelFinishedModalContent);


