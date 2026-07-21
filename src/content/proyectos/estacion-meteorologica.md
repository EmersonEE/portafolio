---
title: "Estación Meteorológica IoT"
description: "Estación meteorológica con ESP8266 que mide temperatura, humedad y presión, enviando datos a la nube con visualización en tiempo real."
date: "2025-03-20"
category: "personal"
status: "completado"
featuredImage: "/images/proyectos/estacion-clima/final.svg"
specifications:
  layers: 2
  dimensions: "55x35mm"
  type: "FR-4"
  software: "KiCad"
  microcontroller: "ESP8266"
technologies:
  - "ESP8266"
  - "KiCad"
  - "IoT"
  - "Sensores"
  - "WiFi"
  - "MQTT"
  - "Arduino"
tags:
  - "ESP8266"
  - "IoT"
  - "Sensores"
  - "KiCad"
  - "Arduino"
  - "Personal"
images:
  - src: "/images/proyectos/estacion-clima/esquematico.svg"
    alt: "Esquemático del sistema"
    phase: "diseno"
  - src: "/images/proyectos/estacion-clima/pcb-diseno.svg"
    alt: "Diseño PCB en KiCad"
    phase: "diseno"
  - src: "/images/proyectos/estacion-clima/vista-3d.svg"
    alt: "Vista 3D del PCB"
    phase: "diseno"
  - src: "/images/proyectos/estacion-clima/fabricacion.svg"
    alt: "Proceso de fabricación"
    phase: "fabricacion"
  - src: "/images/proyectos/estacion-clima/soldadura.svg"
    alt: "Soldadura de componentes SMD"
    phase: "fabricacion"
  - src: "/images/proyectos/estacion-clima/final.svg"
    alt: "Estación funcionando con display OLED"
    phase: "final"
  - src: "/images/proyectos/estacion-clima/pruebas.svg"
    alt: "Pruebas de transmisión de datos"
    phase: "pruebas"
challenges: "El BME280 es muy sensible a la temperatura generada por el propio ESP8266, lo que distorsionaba las mediciones. Además, la antena del ESP-01 requería un diseño cuidadoso para no comprometer el alcance WiFi."
solutions: "Se separó físicamente el sensor del microcontrolador y se agregó un slot en el PCB debajo del sensor para mejorar el flujo de aire. La antena se diseñó siguiendo las recomendaciones de Espressif con un plano de tierra adecuado."
timeframe: "2 semanas"
objective: "Crear una estación meteorológica compacta y de bajo consumo que pueda funcionar con baterías por largos períodos, enviando datos ambientales a un dashboard en tiempo real vía MQTT."
---

## Descripción del Proyecto

Estación meteorológica personal diseñada para monitorear las condiciones ambientales de mi hogar. Utiliza un sensor BME280 para mediciones precisas de temperatura, humedad y presión atmosférica, con un ESP8266 para la conectividad WiFi.

### Características

- Sensor BME280 con precisión de ±0.5°C, ±3% HR, ±1 hPa
- Display OLED SSD1306 de 0.96" para lectura local
- Publicación de datos cada 5 minutos vía MQTT
- Dashboard en Node-RED con gráficos históricos
- Consumo promedio de 80mA (pico durante TX: 170mA)
- Modo deep sleep configurable para ahorro de energía

### Innovaciones

- Compensación de temperatura por software
- Detección de tendencias (subida/bajada de presión)
- Almacenamiento local de datos en EEPROM con buffer circular
- Calibración automática del sensor cada 24 horas

### Lecciones Aprendidas

Este proyecto me enseñó la importancia del diseño térmico en PCBs con sensores analógicos. La primera iteración tuvo errores de medición de hasta 3°C debido al calentamiento del microcontrolador. La solución con el slot de ventilación en el PCB redujo el error a menos de 0.5°C.
