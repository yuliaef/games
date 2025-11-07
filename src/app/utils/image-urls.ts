/**
 * Утилита для получения URL изображений уровней и подуровней кроссворда.
 * 
 * Для переключения на CDN достаточно изменить функцию getImageBaseUrl()
 * или добавить переменную окружения NEXT_PUBLIC_IMAGE_CDN_URL
 */

type ImageType = 'level' | 'sublevel';

/**
 * Получает базовый URL для изображений.
 * Если задана переменная окружения NEXT_PUBLIC_IMAGE_CDN_URL, использует CDN.
 * Иначе использует локальные файлы из папки public.
 */
function getImageBaseUrl(): string {
  // Для переключения на CDN раскомментируйте и укажите URL:
  // return process.env.NEXT_PUBLIC_IMAGE_CDN_URL || '/images';
  
  return '/images';
}

/**
 * Получает путь к папке с изображениями в зависимости от типа
 */
function getImageFolder(type: ImageType): string {
  return type === 'level' ? 'levels' : 'sublevels';
}

/**
 * Получает URL изображения для уровня кроссворда
 * @param levelId - ID уровня
 * @param extension - расширение файла (по умолчанию 'png')
 * @returns URL изображения
 */
export function getLevelImageUrl(levelId: number, extension: string = 'png'): string {
  const baseUrl = getImageBaseUrl();
  const folder = getImageFolder('level');
  return `${baseUrl}/${folder}/${levelId}.${extension}`;
}

/**
 * Получает URL изображения для подуровня кроссворда
 * @param sublevelId - ID подуровня
 * @param extension - расширение файла (по умолчанию 'png')
 * @returns URL изображения
 */
export function getSublevelImageUrl(sublevelId: number, extension: string = 'png'): string {
  const baseUrl = getImageBaseUrl();
  const folder = getImageFolder('sublevel');
  return `${baseUrl}/${folder}/${sublevelId}.${extension}`;
}

