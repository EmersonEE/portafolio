---
title: "Fuente Panel Solar"
description: "PCB profesional para sistema de gestión de carga solar con seguimiento MPPT, protección de batería y monitoreo IoT."
date: "2025-06-01"
category: "profesional"
status: "completado"
client: "Cliente Industrial"
featuredImage: "/images/proyectos/fuente-solar/final.svg"
specifications:
  layers: 4
  dimensions: "100x80mm"
  type: "FR-4 TG170"
  software: "EasyEDA Pro"
  microcontroller: "STM32F103"
technologies:
  - "STM32"
  - "EasyEDA"
  - "IoT"
  - "MPPT"
  - "Power Management"
  - "Sensores"
  - "Bluetooth"
tags:
  - "STM32"
  - "EasyEDA"
  - "IoT"
  - "Power Management"
  - "Profesional"
images:
  - src: "/images/proyectos/fuente-solar/esquematico.svg"
    alt: "Esquemático del sistema de gestión de carga"
    phase: "diseno"
  - src: "/images/proyectos/fuente-solar/pcb-diseno.svg"
    alt: "Diseño PCB 4 capas en EasyEDA Pro"
    phase: "diseno"
  - src: "/images/proyectos/fuente-solar/vista-3d.svg"
    alt: "Render 3D del PCB profesional"
    phase: "diseno"
  - src: "/images/proyectos/fuente-solar/ensamblado-profesional.svg"
    alt: "PCB ensamblado profesionalmente"
    phase: "fabricacion"
  - src: "/images/proyectos/fuente-solar/final.svg"
    alt: "Sistema completo funcionando"
    phase: "final"
  - src: "/images/proyectos/fuente-solar/pruebas-carga.svg"
    alt: "Pruebas de carga y eficiencia"
    phase: "pruebas"
challenges: "El principal desafío fue diseñar el layout de 4 capas para minimizar el ruido en las mediciones analógicas del MPPT, manteniendo al mismo tiempo un manejo adecuado de corrientes de hasta 5A en los rieles de potencia."
solutions: "Se implementó una estrategia de stacking con planos de tierra dedicados para la sección analógica y digital, separación física de circuitos de potencia y señal, y el uso de vías apantalladas en las trayectorias críticas de medición."
timeframe: "6 semanas"
objective: "Desarrollar un regulador de carga solar con seguimiento MPPT eficiente, monitoreo IoT vía Bluetooth, y protección inteligente de baterías de litio y plomo-ácido para aplicaciones de iluminación remota."
beforeAfter:
  before: "/images/proyectos/fuente-solar/vista-3d.svg"
  after: "/images/proyectos/fuente-solar/ensamblado-profesional.svg"
  label: "Render vs Realidad"
---

## Descripción del Proyecto

Sistema de gestión de energía solar con capacidades MPPT (Maximum Power Point Tracking) diseñado para maximizar la eficiencia de paneles solares en sistemas de iluminación remota. Fabricado profesionalmente en China con estándares IPC-6012.

### Especificaciones Técnicas

- **Topología:** Convertidor Buck síncrono con MPPT
- **Microcontrolador:** STM32F103C8T6
- **Capa base:** 4 capas FR-4 TG170
- **Acabado:** ENIG (Oro por inmersión)
- **Corriente máxima:** 5A
- **Rango de entrada:** 15-50V DC
- **Protecciones:** Sobrecorriente, sobretensión, polaridad inversa, temperatura
- **Comunicación:** Bluetooth 5.0 BLE

### Características

- Algoritmo MPPT adaptativo con eficiencia >95%
- Compatible con baterías Li-Ion, LiFePO4 y Plomo-Ácido
- Monitoreo en tiempo real vía app móvil
- Registro histórico de generación y consumo
- Compensación de temperatura para carga de baterías
- Modo de bajo consumo nocturno

### Resultados

El sistema superó las pruebas de eficiencia alcanzando un 96.3% de eficiencia máxima en condiciones óptimas. El cliente ha implementado 50 unidades en proyectos de iluminación rural con resultados satisfactorios después de 6 meses de operación continua.
