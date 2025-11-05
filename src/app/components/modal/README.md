# Система модальных окон

Универсальная система для управления модальными окнами с типизацией и поддержкой стека.

## Быстрый старт

### 1. Регистрация модального окна

Создайте компонент модального окна и зарегистрируйте его:

```tsx
// src/app/components/modal/examples/confirm-modal.tsx
"use client";

import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { registerModal } from "../modal-registry";

// Типы данных для модального окна
interface ConfirmModalData {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

// Компонент модального окна
function ConfirmModalContent({ data, onClose }: { data: ConfirmModalData; onClose: () => void }) {
    const handleConfirm = () => {
        data.onConfirm();
        onClose();
    };

    const handleCancel = () => {
        data.onCancel?.();
        onClose();
    };

    return (
        <>
            <ModalHeader>{data.title}</ModalHeader>
            <ModalBody>{data.message}</ModalBody>
            <ModalFooter>
                <Button variant="light" onPress={handleCancel}>
                    Отмена
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                    Подтвердить
                </Button>
            </ModalFooter>
        </>
    );
}

// Регистрация
registerModal<ConfirmModalData>("confirm", ConfirmModalContent);
```

### 2. Использование в компоненте

```tsx
"use client";

import { useModal } from "@/app/hooks/use-modal";

export function MyComponent() {
    const { openModal } = useModal();

    const handleDelete = () => {
        openModal("confirm", {
            title: "Удалить элемент?",
            message: "Вы уверены, что хотите удалить этот элемент?",
            onConfirm: () => {
                console.log("Элемент удален");
            },
        });
    };

    return <button onClick={handleDelete}>Удалить</button>;
}
```

## API

### useModal()

Хук для работы с модальными окнами.

```tsx
const {
    openModal,      // Открыть модальное окно
    closeModal,     // Закрыть модальное окно по ID
    closeAllModals, // Закрыть все модальные окна
    closeLastModal, // Закрыть последнее открытое модальное окно
    getModal,       // Получить модальное окно по ID
    modals,         // Все открытые модальные окна
} = useModal();
```

### openModal(type, data, config?)

Открывает модальное окно.

**Параметры:**
- `type` (string) - Тип модального окна (должен быть зарегистрирован)
- `data` (T) - Данные для модального окна
- `config` (опционально) - Дополнительная конфигурация:
  - `id` - Уникальный ID (генерируется автоматически)
  - `closeOnOverlay` - Закрывать при клике на overlay (по умолчанию: true)
  - `closeOnEscape` - Закрывать при нажатии Escape (по умолчанию: true)
  - `size` - Размер модального окна: 'sm' | 'md' | 'lg' | 'xl' | 'full' (по умолчанию: 'md')

**Возвращает:** ID модального окна

**Пример:**
```tsx
const modalId = openModal("confirm", {
    title: "Подтверждение",
    message: "Вы уверены?",
    onConfirm: () => console.log("OK"),
}, {
    size: "lg",
    closeOnOverlay: false,
});
```

### registerModal(type, component)

Регистрирует новый тип модального окна.

**Параметры:**
- `type` (string) - Тип модального окна
- `component` - Компонент, который будет рендериться внутри модального окна

**Пример:**
```tsx
registerModal<MyModalData>("myModal", MyModalComponent);
```

## Особенности

- ✅ Полная типизация TypeScript
- ✅ Поддержка стека модальных окон (можно открывать несколько одновременно)
- ✅ Универсальность (любой компонент может быть модальным окном)
- ✅ Минимум кода (не нужно локальное состояние для каждого модального окна)
- ✅ Централизованное управление через Zustand
- ✅ Интеграция с HeroUI Modal

## Примеры использования

### Модальное окно с формой

```tsx
// Регистрация
interface FormModalData {
    title: string;
    onSubmit: (data: FormData) => void;
}

function FormModalContent({ data, onClose }: { data: FormModalData; onClose: () => void }) {
    // ... ваша форма
}

registerModal<FormModalData>("form", FormModalContent);

// Использование
openModal("form", {
    title: "Новый элемент",
    onSubmit: (data) => {
        console.log(data);
        // ... сохранение
    },
});
```

### Модальное окно без закрытия по overlay

```tsx
openModal("confirm", {
    title: "Важное подтверждение",
    message: "Это действие нельзя отменить",
    onConfirm: () => {},
}, {
    closeOnOverlay: false,
    closeOnEscape: false,
});
```

