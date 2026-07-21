---
title: "Controlador LED RGB WiFi"
description: "PCB artesanal con ESP32 para control de tiras LED RGB vía WiFi con interfaz web responsive y modos de iluminación predefinidos."
date: "2024-03-15"
category: "artesanal"
status: "completado"
client: ""
featuredImage: "/images/proyectos/controlador-led/final.svg"
specifications:
  layers: 2
  dimensions: "60x40mm"
  type: "FR-4"
  software: "KiCad"
  microcontroller: "ESP32"
technologies:
  - "ESP32"
  - "KiCad"
  - "IoT"
  - "WiFi"
  - "LEDs"
  - "PWM"
  - "C++"
tags:
  - "ESP32"
  - "IoT"
  - "WiFi"
  - "LEDs"
  - "KiCad"
images:
  - src: "/images/proyectos/controlador-led/idea.svg"
    alt: "Diagrama de bloques inicial"
    phase: "diseno"
  - src: "/images/proyectos/controlador-led/esquematico.svg"
    alt: "Esquemático en KiCad"
    phase: "diseno"
  - src: "/images/proyectos/controlador-led/pcb-diseno.svg"
    alt: "Diseño PCB en KiCad"
    phase: "diseno"
  - src: "/images/proyectos/controlador-led/vista-3d.svg"
    alt: "Vista 3D del PCB"
    phase: "diseno"
  - src: "/images/proyectos/controlador-led/fabricacion.svg"
    alt: "Placa durante fabricación"
    phase: "fabricacion"
  - src: "/images/proyectos/controlador-led/revelado.svg"
    alt: "Revelado de la placa"
    phase: "fabricacion"
  - src: "/images/proyectos/controlador-led/ataque-quimico.svg"
    alt: "Ataque químico con cloruro férrico"
    phase: "fabricacion"
  - src: "/images/proyectos/controlador-led/perforado.svg"
    alt: "Perforado de la placa"
    phase: "fabricacion"
  - src: "/images/proyectos/controlador-led/soldadura.svg"
    alt: "Soldadura de componentes"
    phase: "fabricacion"
  - src: "/images/proyectos/controlador-led/final.svg"
    alt: "PCB terminado funcionando"
    phase: "final"
  - src: "/images/proyectos/controlador-led/pruebas.svg"
    alt: "Pruebas de funcionamiento con osciloscopio"
    phase: "pruebas"
challenges: "El principal reto fue manejar la disipación térmica de los transistores MOSFET sin comprometer el tamaño reducido de la placa. También fue necesario implementar un filtrado adecuado en la alimentación para evitar ruido en la señal PWM que afectara los LEDs."
solutions: "Se optó por un diseño de plano de tierra con vías térmicas estratégicamente ubicadas para disipar el calor. Para el filtrado se agregaron capacitores de desacoplo en cada etapa de potencia y un inductor de ferrita en la entrada de alimentación."
timeframe: "3 semanas"
objective: "Diseñar y fabricar un controlador LED RGB WiFi de bajo costo que permita controlar tiras LED de 12V desde cualquier dispositivo móvil, con modos de iluminación predefinidos y control manual de color e intensidad."
---

## Descripción del Proyecto

Este proyecto consistió en el diseño completo y fabricación artesanal de un controlador LED RGB con conectividad WiFi. Utiliza un ESP32 como cerebro principal, manejando tres canales PWM independientes para controlar tiras LED RGB de 12V mediante transistores MOSFET de canal N.

### Especificaciones Técnicas

- **Alimentación:** 12V DC / 2A
- **Controlador:** ESP32-WROOM-32
- **Canales:** 3 (R, G, B) con PWM de 12 bits
- **Protección:** Fusible reiniciable y protección contra polaridad inversa
- **Conectividad:** WiFi 802.11 b/g/n
- **Interfaz de usuario:** Web responsive con modo claro/oscuro

### Características Destacadas

- Control desde cualquier navegador web sin necesidad de apps
- 8 modos de iluminación predefinidos
- Temporizador programable
- Efectos de transición suave entre colores
- Almacenamiento de configuración en EEPROM
- Actualización OTA (Over The Air)

### Proceso de Fabricación

La placa fue fabricada artesanalmente utilizando el método de transferencia térmica y ataque químico con cloruro férrico. Se utilizó una placa de fibra de vidrio FR-4 de una cara con baño de estaño. Los componentes fueron soldados manualmente con estaño de 0.8mm y flux.

### Resultados

El controlador funciona correctamente, permitiendo el control fluido de tiras LED RGB de hasta 2 metros. La interfaz web responde en menos de 100ms y los efectos de transición son suaves gracias al PWM de alta resolución.
