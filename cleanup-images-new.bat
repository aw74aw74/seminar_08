@echo off
chcp 1251
echo Удаление неиспользуемых изображений...

rem Удаление неиспользуемых SVG файлов
del /q "public\img\Vector.svg"
del /q "public\img\advertisement001.svg"
del /q "public\img\advertisement002.svg"
del /q "public\img\advertisement003.svg"
del /q "public\img\advertisement004.svg"
del /q "public\img\fon.svg"
del /q "public\img\header__title__img.svg"
del /q "public\img\instagram.svg"
del /q "public\img\main-product-button-card.svg"
del /q "public\img\main-product-button-left.svg"
del /q "public\img\main-product-button-right.svg"
del /q "public\img\p.svg"
del /q "public\img\top__info_img001.svg"
del /q "public\img\top__info_img002-2.svg"
del /q "public\img\top__info_img002.svg"
del /q "public\img\top__info_img003.svg"
del /q "public\img\top__info_img004.svg"
del /q "public\img\top__info_img005.svg"
del /q "public\img\top__info_img006.svg"
del /q "public\img\tviter.svg"
del /q "public\img\facebook.svg"

rem Удаление неиспользуемых JPG файлов
del /q "public\img\main-product.jpg"
del /q "public\img\main-product__bottom001.jpg"
del /q "public\img\main-product__bottom002.jpg"
del /q "public\img\main-product__bottom003.jpg"

rem Удаление папки product-selection и её содержимого
rd /s /q "public\img\product-selection"

echo Очистка завершена!
pause
